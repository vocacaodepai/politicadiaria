// Relatório de SEO: cruza Search Console (o que o Google já indexa e como
// rankeia), GA4 (o que as pessoas de fato leem) e PageSpeed (velocidade) para
// apontar quais páginas vale reescrever primeiro. Uso: node scripts/seo-report.mjs
import { getGoogleAccessToken } from "./lib/google-auth.mjs";

const SITE_URL = "https://www.politicadiaria.com.br/";
const SEARCH_CONSOLE_SITE = "https://www.politicadiaria.com.br/";

const GSC_CREDENTIALS = process.env.GOOGLE_SEARCH_CONSOLE_CREDENTIALS;
const GA4_PROPERTY_ID = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
const PAGESPEED_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;

if (!GSC_CREDENTIALS) {
  console.error("seo-report: faltou GOOGLE_SEARCH_CONSOLE_CREDENTIALS no ambiente.");
  process.exit(1);
}

async function fetchSearchConsole(days = 28) {
  const token = await getGoogleAccessToken(GSC_CREDENTIALS, "https://www.googleapis.com/auth/webmasters.readonly");
  const end = new Date();
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  const fmt = (d) => d.toISOString().slice(0, 10);

  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SEARCH_CONSOLE_SITE)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: ["page"],
        rowLimit: 500,
      }),
    },
  );
  const json = await res.json();
  if (!res.ok) throw new Error(`Search Console: ${res.status} ${JSON.stringify(json)}`);
  return (json.rows ?? []).map((row) => ({
    page: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));
}

async function fetchGA4TopPages(days = 28) {
  if (!GA4_PROPERTY_ID) return new Map();
  const token = await getGoogleAccessToken(GSC_CREDENTIALS, "https://www.googleapis.com/auth/analytics.readonly");
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "averageSessionDuration" }],
      limit: 500,
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`aviso: GA4 falhou (${res.status}), seguindo sem esses dados.`, JSON.stringify(json));
    return new Map();
  }
  const map = new Map();
  for (const row of json.rows ?? []) {
    const path = row.dimensionValues[0].value;
    map.set(path, {
      pageViews: Number(row.metricValues[0].value),
      avgSessionSeconds: Number(row.metricValues[1].value),
    });
  }
  return map;
}

async function fetchPageSpeed(url) {
  if (!PAGESPEED_KEY) return null;
  const res = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${PAGESPEED_KEY}&strategy=mobile&category=performance`,
  );
  const json = await res.json();
  if (!res.ok) return null;
  const score = json.lighthouseResult?.categories?.performance?.score;
  return score != null ? Math.round(score * 100) : null;
}

function pathFromPage(pageUrl) {
  try {
    return new URL(pageUrl).pathname;
  } catch {
    return pageUrl;
  }
}

async function main() {
  console.log(`Relatório de SEO — ${SITE_URL}\n`);

  const [gscRows, ga4Map] = await Promise.all([fetchSearchConsole(28), fetchGA4TopPages(28)]);

  const merged = gscRows.map((row) => ({
    ...row,
    path: pathFromPage(row.page),
    ga4: ga4Map.get(pathFromPage(row.page)) ?? null,
  }));

  // Oportunidade 1: página na "página 2" do Google (posição 11-20) com impressão relevante.
  // Reescrever título/H1/conteúdo costuma empurrar essas pra página 1.
  const page2 = merged
    .filter((r) => r.position >= 11 && r.position <= 20 && r.impressions >= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);

  // Oportunidade 2: impressão alta mas CTR baixo (abaixo de 2%). Sinal de título/meta description fraco.
  const lowCtr = merged
    .filter((r) => r.impressions >= 50 && r.ctr < 0.02)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);

  // Top de tráfego real (GA4), pra saber o que já funciona e merece série/continuação.
  const topTraffic = merged
    .filter((r) => r.ga4?.pageViews)
    .sort((a, b) => (b.ga4?.pageViews ?? 0) - (a.ga4?.pageViews ?? 0))
    .slice(0, 10);

  console.log(`Total de páginas com dado de busca (últimos 28 dias): ${merged.length}\n`);

  console.log("== Oportunidade: página 2 do Google (posição 11-20, reescrever pra subir) ==");
  if (page2.length === 0) console.log("  nenhuma no momento.");
  for (const r of page2) {
    console.log(
      `  pos ${r.position.toFixed(1)} | ${r.impressions} impressões | ${r.clicks} cliques | ${(r.ctr * 100).toFixed(1)}% CTR | ${r.path}`,
    );
  }

  console.log("\n== Oportunidade: impressão alta, CTR baixo (ajustar título/meta description) ==");
  if (lowCtr.length === 0) console.log("  nenhuma no momento.");
  for (const r of lowCtr) {
    console.log(
      `  ${r.impressions} impressões | ${(r.ctr * 100).toFixed(1)}% CTR | pos ${r.position.toFixed(1)} | ${r.path}`,
    );
  }

  console.log("\n== Top tráfego real (GA4, últimos 28 dias) ==");
  if (topTraffic.length === 0) console.log("  sem dado de GA4 ainda (tráfego baixo ou API não configurada).");
  for (const r of topTraffic) {
    console.log(`  ${r.ga4.pageViews} pageviews | ${Math.round(r.ga4.avgSessionSeconds)}s médio | ${r.path}`);
  }

  if (PAGESPEED_KEY) {
    console.log("\n== PageSpeed (mobile) das páginas com mais oportunidade ==");
    const candidates = [...new Set([...page2, ...lowCtr].slice(0, 5).map((r) => r.page))];
    for (const url of candidates) {
      const score = await fetchPageSpeed(url);
      console.log(`  ${score ?? "erro"}/100 | ${pathFromPage(url)}`);
    }
  }

  console.log("");
}

main().catch((err) => {
  console.error("seo-report: falhou:", err.message);
  process.exit(1);
});
