#!/usr/bin/env node
/**
 * Busca e baixa fotos do Wikimedia Commons para capas (primeira fonte de imagens do blog).
 *
 *   node scripts/wikimedia-cover.mjs search "Zoysia japonica lawn" [--limit 12]
 *   node scripts/wikimedia-cover.mjs get "File:Zoysia japonica 3.jpg" <slug-do-artigo>
 *
 * `search` lista só fotos com licença livre (CC0, domínio público, CC BY e CC BY-SA), em
 * paisagem e com pelo menos 1.200 px de largura. `get` baixa a foto em 1080 px para
 * public/images/covers/<slug>.jpg e imprime o bloco `coverImage` pronto para colar no artigo,
 * com autor, licença e link da página do arquivo (atribuição exigida pelas licenças).
 *
 * O Wikimedia limita requisições por IP: o script espera e tenta de novo sozinho.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "PoliticaDiaria/1.0 (https://github.com/vocacaodepai/politicadiaria; contato@politicadiaria.com.br)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FREE = /^(CC0|CC[ -]?BY(?:[ -]SA)?[ -]\d|Public domain|PD)/i;
const SKIP_TITLE = /\.(svg|tiff?|pdf|gif|webp|png)$|\b(map|diagram|logo|icon|flag|coat of arms|scan|cyclopedia)\b/i;

async function request(url, asJson) {
  for (let i = 0; i < 7; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: asJson ? "application/json" : "*/*" } });
      if (res.ok) {
        if (!asJson) return Buffer.from(await res.arrayBuffer());
        const text = await res.text();
        if (text.trim().startsWith("{")) return JSON.parse(text);
      }
    } catch {
      /* tenta de novo */
    }
    await sleep(3000 + 4000 * i);
  }
  throw new Error(`Wikimedia não respondeu (limite de requisições): ${url.slice(0, 120)}`);
}

const strip = (html = "") => html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/\s+/g, " ").trim();

function describe(page) {
  const ii = page.imageinfo?.[0];
  if (!ii) return null;
  const m = ii.extmetadata ?? {};
  const val = (k) => m[k]?.value ?? "";
  return {
    title: page.title,
    width: ii.width,
    height: ii.height,
    thumbUrl: ii.thumburl,
    thumbWidth: ii.thumbwidth,
    thumbHeight: ii.thumbheight,
    page: ii.descriptionurl,
    license: strip(val("LicenseShortName")),
    artist: strip(val("Artist")) || strip(val("Credit")) || "Wikimedia Commons",
    restrictions: strip(val("Restrictions")),
    mime: ii.mime,
  };
}

const PROPS = { prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "1080" };

async function search(query, limit) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: "6",
    gsrlimit: String(Math.min(50, limit * 3)),
    ...PROPS,
  });
  const data = await request(`${API}?${params}`, true);
  const pages = Object.values(data.query?.pages ?? {}).sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const out = [];
  for (const p of pages) {
    const d = describe(p);
    if (!d || SKIP_TITLE.test(d.title) || d.mime !== "image/jpeg") continue;
    if (!FREE.test(d.license) || d.restrictions) continue;
    if (d.width < 1200 || d.width < d.height * 1.15) continue;
    out.push(d);
    if (out.length >= limit) break;
  }
  return out;
}

async function get(title, slug) {
  const params = new URLSearchParams({ action: "query", format: "json", titles: title, ...PROPS });
  const data = await request(`${API}?${params}`, true);
  const page = Object.values(data.query?.pages ?? {})[0];
  const d = page && describe(page);
  if (!d || !d.thumbUrl) throw new Error(`Arquivo não encontrado: ${title}`);
  if (!FREE.test(d.license) || d.restrictions) throw new Error(`Licença não aceita (${d.license || "desconhecida"}): ${title}`);
  await sleep(1500);
  const bytes = await request(d.thumbUrl, false);
  const dir = resolve(ROOT, "public/images/covers");
  mkdirSync(dir, { recursive: true });
  const file = resolve(dir, `${slug}.jpg`);
  writeFileSync(file, bytes);
  const credit = `${d.artist.slice(0, 70)} / Wikimedia Commons (${d.license})`.replace(/"/g, "'");
  console.log(`Baixado: public/images/covers/${slug}.jpg (${d.thumbWidth}x${d.thumbHeight}, ${Math.round(bytes.length / 1024)} KB)`);
  console.log("\nCole no artigo, logo depois de `seed`:\n");
  console.log(`  coverImage: {
    url: "/images/covers/${slug}.jpg",
    width: ${d.thumbWidth},
    height: ${d.thumbHeight},
    fit: "cover",
    credit: "${credit}",
    creditUrl: "${d.page}",
  },`);
}

const [cmd, a, b, ...rest] = process.argv.slice(2);
try {
  if (cmd === "search" && a) {
    const li = [b, ...rest].indexOf("--limit");
    const limit = li >= 0 ? Number([b, ...rest][li + 1]) || 12 : 12;
    const results = await search(a, limit);
    if (!results.length) console.log("Nenhuma foto com licença livre em paisagem. Tente outra busca (em inglês ou nome científico).");
    results.forEach((r, i) =>
      console.log(`${String(i + 1).padStart(2)}. ${r.title} | ${r.width}x${r.height} | ${r.license} | ${r.artist.slice(0, 40)}`)
    );
  } else if (cmd === "get" && a && b) {
    await get(a, b);
  } else {
    console.error('uso: search "<consulta>" [--limit N] | get "File:Nome.jpg" <slug>');
    process.exit(1);
  }
} catch (e) {
  console.error(`wikimedia-cover: ${e.message}`);
  process.exit(1);
}
