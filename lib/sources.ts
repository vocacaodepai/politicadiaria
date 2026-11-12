/**
 * Fontes de uma notícia, montadas a partir do que já está nos dados:
 * a fonte original (sourceName/sourceUrl) e os links externos do corpo.
 * Nada é inventado aqui: sem link no dado, sem fonte na caixa.
 */
import { site } from "@/lib/articles";
import { stripTags } from "@/lib/html";

/**
 * Domínios tratados como fonte primária (órgãos oficiais, Poderes, organismos
 * internacionais). Vale o domínio exato e qualquer subdomínio dele: "gov.br"
 * cobre "ibge.gov.br", "bcb.gov.br", "planalto.gov.br"; "leg.br" cobre Câmara e
 * Senado; "jus.br" cobre STF, TSE, STJ e tribunais; "mp.br" cobre o MPF.
 * Esta é a única lista: para incluir um domínio, acrescente aqui.
 */
export const PRIMARY_SOURCE_DOMAINS = [
  // Brasil
  "gov.br",
  "leg.br",
  "jus.br",
  "mp.br",
  "def.br",
  // Organismos internacionais
  "un.org",
  "imf.org",
  "worldbank.org",
  "oecd.org",
  "wto.org",
  "oas.org",
  "iadb.org",
  "bis.org",
  "europa.eu",
  "int", // who.int, nato.int, icc-cpi.int e demais organismos com domínio .int
  // Governos estrangeiros
  "gov", // domínios do governo dos EUA (whitehouse.gov, state.gov, congress.gov)
  "gov.uk",
  "gc.ca",
  "gob.ar",
  "gob.mx",
  "gob.cl",
  "gov.py",
  "gub.uy",
] as const;

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function isPrimarySource(url: string): boolean {
  const host = hostOf(url);
  if (!host) return false;
  return PRIMARY_SOURCE_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));
}

export type NewsSource = {
  url: string;
  host: string;
  /** Texto do link no corpo, ou o nome da fonte original. */
  label: string;
  primary: boolean;
  /** true só para a fonte original declarada no dado (sourceName/sourceUrl). */
  original: boolean;
};

/** Chave de comparação para não repetir a mesma página (ignora www, âncora e barra final). */
function urlKey(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    const path = u.pathname.replace(/\/+$/, "");
    return `${host}${path}${u.search}`;
  } catch {
    return url.trim();
  }
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_m, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, n: string) => String.fromCodePoint(parseInt(n, 16)));
}

/**
 * Links externos (https) do corpo, na ordem em que aparecem, sem os links
 * internos do site e sem os créditos de foto (dentro de <figure>).
 */
export function extractExternalLinks(html: string): { url: string; text: string }[] {
  const ownHost = hostOf(site.url);
  const withoutFigures = html.replace(/<figure\b[\s\S]*?<\/figure>/gi, "");
  const out: { url: string; text: string }[] = [];
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(withoutFigures))) {
    const href = /href\s*=\s*"([^"]*)"/i.exec(m[1])?.[1]?.replace(/&amp;/g, "&");
    if (!href || !/^https:\/\//i.test(href)) continue;
    const host = hostOf(href);
    if (!host || host === ownHost || host === ownHost.replace(/^www\./, "")) continue;
    out.push({ url: href, text: decodeEntities(stripTags(m[2])) });
  }
  return out;
}

/**
 * Lista final de fontes: a original primeiro, depois os links do corpo,
 * sem repetir a mesma página.
 */
export function buildNewsSources(item: { sourceName: string; sourceUrl: string }, bodyHtml: string): NewsSource[] {
  const seen = new Set<string>();
  const list: NewsSource[] = [];

  if (item.sourceUrl && /^https?:\/\//i.test(item.sourceUrl)) {
    seen.add(urlKey(item.sourceUrl));
    list.push({
      url: item.sourceUrl,
      host: hostOf(item.sourceUrl),
      label: item.sourceName,
      primary: isPrimarySource(item.sourceUrl),
      original: true,
    });
  }

  for (const link of extractExternalLinks(bodyHtml)) {
    const key = urlKey(link.url);
    if (seen.has(key)) continue;
    seen.add(key);
    const host = hostOf(link.url);
    list.push({
      url: link.url,
      host,
      label: link.text || host,
      primary: isPrimarySource(link.url),
      original: false,
    });
  }

  return list;
}
