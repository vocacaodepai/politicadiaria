#!/usr/bin/env node
/**
 * Coleta dos dados do Supremo (/stf): composição, julgamentos e pauta.
 *
 *   npm run stf:update                       # padrão: últimos 45 dias de notícias do STF
 *   npm run stf:update -- --desde=2026-08-01 # amplia a janela (a rotina amplia aos poucos)
 *   npm run stf:update -- --refresh          # ignora o cache em .cache/stf/
 *
 * Fontes (todas abertas, sem login):
 *  - Portal de Notícias do STF (noticias.stf.jus.br): pautas, destaques do Plenário Virtual e
 *    notícias de julgamento. É a fonte oficial acessível por script; o portal.stf.jus.br
 *    (Corte Aberta, jurisprudência, pauta estruturada) responde 403 a clientes automáticos.
 *  - Calendário de eventos do mesmo portal (sessões do Plenário e das Turmas).
 *  - Wikipédia (REST) para a composição atual, datas e indicação; Wikimedia Commons para fotos.
 *    São fontes secundárias, sempre identificadas nos dados.
 *
 * Voto individual só entra quando a notícia oficial o diz em frase explícita; a frase fica
 * guardada como evidência. Nada é inferido. Idempotente e retomável (cache em .cache/stf/).
 * Atrás de proxy HTTP(S), rode com NODE_USE_ENV_PROXY=1. Nunca edite data/stf/ à mão.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const CACHE = join(ROOT, ".cache", "stf");
const OUT = join(ROOT, "data", "stf");
const PUB = join(ROOT, "public", "data", "stf");
const UA = "PoliticaDiariaBot/1.0 (+https://www.politicadiaria.com.br; dados abertos do STF)";
const NEWS = "https://noticias.stf.jus.br";
const WP = "https://pt.wikipedia.org/api/rest_v1/page/html/";
const COMMONS = "https://commons.wikimedia.org/w/api.php";

const args = process.argv.slice(2);
const REFRESH = args.includes("--refresh");
const arg = (n) => (args.find((a) => a.startsWith(`--${n}=`)) ?? "").slice(n.length + 3);
const TODAY = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
const addDays = (iso, d) => new Date(Date.parse(`${iso}T12:00:00Z`) + d * 86400000).toISOString().slice(0, 10);
const SINCE = arg("desde") || addDays(TODAY, -(Number(arg("dias")) || 45));
const MAX_PAGES = Number(arg("paginas")) || 120;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
for (const d of [CACHE, OUT, PUB]) mkdirSync(d, { recursive: true });

/* ------------------------------------------------------------------ rede */

let last = 0;
async function getText(url, { tries = 9, gap = 1800, cache = true, accept = "text/html,application/json", retry404 = false } = {}) {
  const f = join(CACHE, createHash("sha1").update(url).digest("hex") + ".txt");
  if (cache && !REFRESH && existsSync(f)) return readFileSync(f, "utf8");
  let err;
  for (let i = 0; i < tries; i++) {
    const wait = last + gap - Date.now();
    if (wait > 0) await sleep(wait);
    last = Date.now();
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: accept }, signal: AbortSignal.timeout(60000) });
      if (res.ok) {
        const t = await res.text();
        if (cache) writeFileSync(f, t);
        return t;
      }
      if (!retry404 && (res.status === 404 || res.status === 410)) throw Object.assign(new Error(`HTTP ${res.status} ${url}`), { fatal: true });
      err = new Error(`HTTP ${res.status} ${url}`);
    } catch (e) {
      if (e.fatal) throw e;
      err = e;
    }
    // o WAF do portal recusa de forma intermitente: espera crescente e tenta de novo
    await sleep(Math.min(60000, 2500 * 2 ** i) + Math.random() * 800);
  }
  throw err;
}

/* ------------------------------------------------------------------ texto */

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "-", hellip: "…", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', ordm: "º", ordf: "ª" };
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
const noDash = (s) => s.replace(/\s*[—–]\s*/g, ": ").replace(/:\s*:/g, ":");
const flat = (html) => noDash(decode(html.replace(/<[^>]+>/g, " ")).replace(/[\s ]+/g, " ").trim());
/** HTML -> linhas de texto (um bloco por linha). */
function lines(html) {
  const t = html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?(p|div|h[1-6]|li|ul|ol|br|tr|table|blockquote|figure|section)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  return decode(t)
    .split("\n")
    .map((l) => noDash(l.replace(/[\s ]+/g, " ").trim()))
    .filter(Boolean);
}
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const slugify = (s) => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
function ptDate(s) {
  const m = /(\d{1,2})(?:º)?\s+de\s+([a-zç]+)\s+de\s+(\d{4})/i.exec(s.replace(/\s+/g, " "));
  if (!m) return null;
  const mo = MONTHS.indexOf(m[2].toLowerCase());
  if (mo < 0) return null;
  return `${m[3]}-${String(mo + 1).padStart(2, "0")}-${String(+m[1]).padStart(2, "0")}`;
}

/* ================================================================ MINISTROS */

const ALIASES_EXTRA = {
  "kassio-nunes-marques": ["Nunes Marques", "Kassio Nunes Marques"],
  "carmen-lucia": ["Cármen Lúcia", "Carmen Lúcia"],
  "andre-mendonca": ["André Mendonça", "Mendonça"],
  "dias-toffoli": ["Dias Toffoli", "Toffoli"],
  "alexandre-de-moraes": ["Alexandre de Moraes", "Moraes"],
  "gilmar-mendes": ["Gilmar Mendes", "Gilmar"],
  "luiz-fux": ["Luiz Fux", "Fux"],
  "edson-fachin": ["Edson Fachin", "Fachin"],
  "cristiano-zanin": ["Cristiano Zanin", "Zanin"],
  "flavio-dino": ["Flávio Dino", "Dino"],
};
const FORMER = ["Luís Roberto Barroso", "Barroso", "Rosa Weber", "Ricardo Lewandowski", "Lewandowski", "Marco Aurélio", "Ellen Gracie"];

async function commonsFile(title) {
  const params = new URLSearchParams({ action: "query", format: "json", titles: title, prop: "imageinfo", iiprop: "url|mime|extmetadata", iiurlwidth: "480" });
  try {
    const j = JSON.parse(await getText(`${COMMONS}?${params}`, { tries: 5, gap: 1500, accept: "application/json" }));
    const p = Object.values(j.query?.pages ?? {})[0];
    const ii = p?.imageinfo?.[0];
    if (!ii) return null;
    const m = ii.extmetadata ?? {};
    const lic = flat(m.LicenseShortName?.value ?? "");
    if (!/^(CC0|CC[ -]?BY(?:[ -]SA)?[ -]\d|Public domain|PD)/i.test(lic)) return null;
    return {
      url: ii.thumburl || ii.url,
      credito: `${flat(m.Artist?.value ?? "") || "Wikimedia Commons"} / Wikimedia Commons`,
      creditoUrl: ii.descriptionurl,
      licenca: lic,
      fonte: "wikimedia",
    };
  } catch (e) {
    log("foto sem metadados:", title, e.message);
    return null;
  }
}

const withDate = (iso, plus) => `${+iso.slice(0, 4) + plus}${iso.slice(4)}`;

async function collectMinisters() {
  const url = WP + "Supremo_Tribunal_Federal";
  const html = await getText(url, { accept: "text/html" });
  const i = html.indexOf('id="Composição_atual"');
  const tb = html.slice(html.indexOf("<table", i), html.indexOf("</table>", i));
  const rows = [...tb.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
  const infobox = flat(html.slice(0, i));
  const presidente = /Presidente\s+([A-ZÀ-Ú][\p{L} ]+?)\s*(?:\[|Vice)/u.exec(infobox)?.[1]?.trim() ?? null;
  const vice = /Vice-presidente\s+([A-ZÀ-Ú][\p{L} ]+?)\s*(?:Site|\[)/u.exec(infobox)?.[1]?.trim() ?? null;
  const out = [];
  let vagas = 0;
  for (const r of rows) {
    const cells = [...r.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    if (/<i>\s*vago/i.test(cells[1] ?? "")) {
      vagas++;
      continue;
    }
    if (cells.length < 4) continue;
    const link = /<a[^>]*rel="mw:WikiLink"[^>]*href="\.\/([^"#]+)"[^>]*title="([^"]+)"/.exec(cells[1]);
    if (!link) continue;
    const nome = decode(link[2]).replace(/\s*\(.*\)$/, "");
    const completo = flat(cells[1].replace(/<span typeof="mw:File"[\s\S]*?<\/span>/, "")).replace(/\s+/g, " ").trim();
    const file = /resource="\.\/Ficheiro:([^"]+)"/.exec(cells[1])?.[1];
    const nasc = /data-sort-value="B(\d{4})(\d{2})(\d{2})"/.exec(r);
    const nascimento = nasc ? `${nasc[1]}-${nasc[2]}-${nasc[3]}` : null;
    const local = flat(cells[2].split(/<br\s*\/?>/i)[1] ?? "");
    const posse = ptDate(flat(cells[5]));
    const slug = slugify(nome);
    out.push({
      slug,
      nome,
      nomeCompleto: completo,
      wikipedia: link[1],
      nascimento,
      nascimentoLocal: local || null,
      formacao: flat(cells[3]).replace(/\[\s*\d+\s*\]/g, "").trim(),
      indicadoPor: flat(cells[4]),
      posse,
      aposentadoriaCompulsoria: nascimento ? withDate(nascimento, 75) : null,
      carreira: cells[7] ? flat(cells[7]).replace(/\[\s*\d+\s*\]/g, "").trim() : null,
      commonsFile: file ? decodeURIComponent(file).replace(/_/g, " ") : null,
    });
  }
  // turmas: listas logo após "A primeira turma" / "A segunda turma"
  const tx = flat(html.slice(i));
  const turma = (n) => {
    const m = new RegExp(`A ${n} turma é composta pelos ministros:\\s*(?:\\[\\s*\\d+\\s*\\]\\s*)?(.*?)(?=A (?:primeira|segunda) turma|Presidentes|$)`, "i").exec(tx);
    return m ? m[1] : "";
  };
  const turmas = { primeira: turma("primeira"), segunda: turma("segunda") };
  for (const m of out) {
    const last = norm(m.nome);
    const t = ["primeira", "segunda"].find((k) => norm(turmas[k]).includes(last) || norm(turmas[k]).includes(norm(ALIASES_EXTRA[m.slug]?.[0] ?? "__")));
    m.turma = t ? (t === "primeira" ? "Primeira Turma" : "Segunda Turma") : null;
    m.turmaPresidente = t ? new RegExp(`${last.split(" ").pop()}[^A-Za-z]{0,6}\\(presidente\\)`, "i").test(norm(turmas[t])) || norm(turmas[t]).includes(`${last} (presidente)`) : false;
    m.cargo = norm(m.nome) === norm(presidente ?? "") || norm(presidente ?? "").includes(norm(m.nome)) ? "Presidente do STF" : norm(vice ?? "").includes(norm(m.nome)) && vice ? "Vice-presidente do STF" : "Ministro";
    m.aliases = [...new Set([m.nome, ...(ALIASES_EXTRA[m.slug] ?? [])])];
  }
  return { ministros: out, presidente, vice, vagas, turmasTexto: turmas, wpUrl: "https://pt.wikipedia.org/wiki/Supremo_Tribunal_Federal" };
}

async function enrichMinister(m, prev) {
  // Senado: votação da indicação, quando o artigo traz em frase explícita
  m.senado = null;
  try {
    const html = await getText(WP + encodeURIComponent(m.wikipedia), { accept: "text/html", tries: 7, gap: 2500 });
    const t = flat(html.replace(/<sup[\s\S]*?<\/sup>/g, ""));
    const sents = t.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú])/);
    for (let k = 0; k < sents.length; k++) {
      const s = sents[k];
      for (const v of s.matchAll(/(\d{1,2})\s+votos?\s+(?:favor[áa]veis?|a favor|sim)[^.]{0,40}?(\d{1,2})\s+(?:contr[áa]rios?|votos? contr[áa]rios?|contra)|por\s+(\d{1,2})\s+votos?\s+a\s+(\d{1,2})/gi)) {
        const before = s.slice(Math.max(0, v.index - 80), v.index);
        if (!/plen[áa]rio/i.test(before) || /(Comiss[ãa]o|CCJ)/i.test(before.slice(before.search(/plen[áa]rio/i)))) continue;
        if (!/(Senado|sabatin)/i.test(s)) continue;
        m.senado = { data: ptDate(s), favoraveis: +(v[1] ?? v[3]), contrarios: +(v[2] ?? v[4]), trecho: s.length > 420 ? s.slice(0, 417) + "..." : s, fonte: "Wikipédia (artigo do ministro)", fonteUrl: `https://pt.wikipedia.org/wiki/${m.wikipedia}` };
        break;
      }
      if (m.senado) break;
    }
  } catch (e) {
    log("artigo do ministro indisponível:", m.nome, e.message);
  }
  m.foto = m.commonsFile ? await commonsFile("File:" + m.commonsFile) : null;
  // falha de rede (Wikimedia limita requisições): mantém o que já havia sido coletado
  if (!m.senado && prev?.senado) m.senado = prev.senado;
  if (!m.foto && prev?.foto && prev.foto.url) m.foto = prev.foto;
  delete m.commonsFile;
  return m;
}

/* ================================================================ NOTÍCIAS */

const PROC_RE = /\b(ADI|ADPF|ADC|ADO|ARE|RE|RHC|HC|Rcl|MS|MI|Inq|AP|ACO|Pet|PSV|SV|AO|AI|EP|Ext|PPE|STP|SS|SL|TPA)\)?\s*(?:n[º°.]?\s*)?(\d{1,3}(?:\.\d{3})+|\d{1,6})\b/g;

function procs(text) {
  const seen = new Map();
  for (const m of text.matchAll(PROC_RE)) {
    const num = m[2].replace(/\./g, "");
    const key = `${m[1]} ${num}`;
    if (!seen.has(key)) seen.set(key, { classe: m[1], numero: num, rotulo: `${m[1]} ${m[2]}` });
  }
  return [...seen.values()];
}
function anchorsFor(html) {
  const map = new Map();
  for (const m of html.matchAll(/<a[^>]*href="(https:\/\/portal\.stf\.jus\.br\/processos\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const url = decode(m[1]);
    for (const p of procs(flat(m[2]))) if (!map.has(`${p.classe} ${p.numero}`)) map.set(`${p.classe} ${p.numero}`, url);
    const q = /classe=([A-Za-z]+)&(?:amp;)?numeroProcesso=(\d+)/.exec(m[1]);
    if (q && !map.has(`${q[1]} ${q[2]}`)) map.set(`${q[1]} ${q[2]}`, url);
  }
  return map;
}

function ministerFinder(ministros) {
  const defs = ministros.map((m) => ({ slug: m.slug, nome: m.nome, names: m.aliases }));
  const all = [...defs.flatMap((d) => d.names.map((n) => ({ n, slug: d.slug, nome: d.nome }))), ...FORMER.map((n) => ({ n, slug: null, nome: n }))].sort((a, b) => b.n.length - a.n.length);
  return {
    /** menções de ministros em um trecho, na ordem do texto. */
    mentions(text) {
      const found = [];
      for (const a of all) {
        const re = new RegExp(`(?<![\\p{L}])${a.n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}])`, "gu");
        for (const m of text.matchAll(re)) found.push({ idx: m.index, end: m.index + a.n.length, slug: a.slug, nome: a.nome });
      }
      found.sort((x, y) => x.idx - y.idx || y.end - x.end);
      const out = [];
      let until = -1;
      for (const f of found) {
        if (f.idx < until) continue;
        out.push(f);
        until = f.end;
      }
      return out;
    },
  };
}

function orgaoOf(text) {
  if (/Plen[áa]rio Virtual|sess[ãa]o virtual/i.test(text)) return "Plenário Virtual";
  if (/Primeira Turma/i.test(text)) return "Primeira Turma";
  if (/Segunda Turma/i.test(text)) return "Segunda Turma";
  if (/Plen[áa]rio/i.test(text)) return "Plenário";
  return null;
}
const SIGILO_RE = /(sob sigilo|segredo de justi[çc]a|processo sigiloso|tramita em sigilo|corre em sigilo|decretou sigilo)/i;

/** "nesta quarta-feira (14)" -> data ISO mais próxima (até 31 dias antes) da publicação. */
function dateFromWeekday(text, postDay) {
  const m = /(?:nesta|desta|na|da|dessa)\s+(segunda|ter[çc]a|quarta|quinta|sexta|s[áa]bado|domingo)-feira\s*\((\d{1,2})\)/i.exec(text) || /(?:nesta|desta)\s+(s[áa]bado|domingo)\s*\((\d{1,2})\)/i.exec(text);
  if (!m) return null;
  const day = +m[2];
  const p = new Date(`${postDay}T12:00:00Z`);
  for (const off of [0, -1, 1]) {
    const d = new Date(Date.UTC(p.getUTCFullYear(), p.getUTCMonth() + off, day, 12));
    if (d.getUTCDate() === day && Math.abs(d - p) <= 31 * 86400000) return d.toISOString().slice(0, 10);
  }
  return null;
}

function parseListing(html) {
  const items = [];
  for (const blk of html.split('<div class="card-lt-md').slice(1)) {
    const a = /<a href="(https:\/\/noticias\.stf\.jus\.br\/postsnoticias\/[^"]+)">\s*([\s\S]*?)<\/a>/.exec(blk);
    const d = /noticia-compartilhar">\s*<span class="noticia-data">(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/.exec(blk);
    if (a && d) items.push({ url: a[1], titulo: flat(a[2]), data: `${d[3]}-${d[2]}-${d[1]}`, hora: `${d[4]}:${d[5]}` });
  }
  return items;
}

function parsePost(html) {
  const id = /<article id="noticia-(\d+)"/.exec(html)?.[1] ?? null;
  const titulo = flat(/<h3 class="noticia-titulo">([\s\S]*?)<\/h3>/.exec(html)?.[1] ?? "");
  const resumo = flat(/<div class="noticia-resumo[^"]*">([\s\S]*?)<\/div>/.exec(html)?.[1] ?? "");
  const dt = /hora-atualizacao">\s*(\d{2})\/(\d{2})\/(\d{4}) (\d{2}:\d{2})/.exec(html);
  const body = /<div class="noticia-conteudo[^"]*">([\s\S]*?)<\/article>/.exec(html)?.[1] ?? "";
  return { id, titulo, resumo, data: dt ? `${dt[3]}-${dt[2]}-${dt[1]}` : null, hora: dt?.[4] ?? null, body };
}

const HEAD_RE = /^(?:[\p{L}ªº.\- ]{3,80}\s)?\(?(ADI|ADPF|ADC|ADO|ARE|RE|RHC|HC|Rcl|MS|MI|Inq|AP|ACO|Pet|PSV|SV|AO|EP|AI)\)?\s*(?:n[º°.]?\s*)?(\d{1,3}(?:\.\d{3})+|\d{1,6})(?:\s*[:(–-].*)?$/u;

/** Itens de pauta: cabeçalho "Classe (SIGLA) número", "Relator: ...", partes, resumo. */
function parsePautaItems(post, find) {
  const ls = lines(post.body);
  const anchors = anchorsFor(post.body);
  const items = [];
  let cur = null;
  const close = () => {
    if (cur) items.push(cur);
    cur = null;
  };
  for (const l of ls) {
    const h = HEAD_RE.exec(l);
    if (h && l.length < 160) {
      close();
      const num = h[2].replace(/\./g, "");
      const tema = /Tema\s+(\d+)/i.exec(l)?.[1];
      cur = { classe: h[1], numero: num, rotulo: `${h[1]} ${h[2]}`, tema: tema ? `Tema ${tema}` : null, etapa: null, relator: null, relatorSlug: null, partes: null, resumo: null, url: anchors.get(`${h[1]} ${num}`) ?? null };
      continue;
    }
    if (!cur) continue;
    let m;
    if ((m = /^Etapa:\s*(.+)/i.exec(l))) cur.etapa = m[1].slice(0, 200);
    else if ((m = /^Relator(a)?:\s*(.+)/i.exec(l))) {
      const mm = find.mentions(m[2])[0];
      cur.relator = mm ? mm.nome : m[2].replace(/^ministr[oa]\s+/i, "").slice(0, 80);
      cur.relatorSlug = mm?.slug ?? null;
      if (/aposentad/i.test(m[2])) cur.relatorSlug = null;
    } else if (!cur.partes && / x /.test(l) && l.length < 300) cur.partes = l;
    else if (!cur.resumo && l.length > 60 && !/^(Sinal|Fot[óo]grafos|Jornalistas|Cinegrafistas|Saiba mais)/.test(l)) cur.resumo = l.length > 420 ? l.slice(0, 417).replace(/\s+\S*$/, "") + "..." : l;
  }
  close();
  return items;
}

const VERBS = [
  [/(?:abriu|abriram|inaugurou)\s+(?:a\s+)?diverg[êe]ncia|divergiu|divergiram|votou\s+contra|votaram\s+contra/i, "divergiu"],
  [/ficou\s+(?:parcialmente\s+)?vencid[oa]|ficaram\s+(?:parcialmente\s+)?vencid[oa]s|foi\s+vencid[oa]|ficaram\s+vencid[oa]s/i, "vencido"],
  [/pediu\s+vista|pediram\s+vista|devolveu\s+a\s+vista|pedido\s+de\s+vista/i, "vista"],
  [/declarou-se\s+impedid[oa]|declarou\s+impedimento|esteve\s+impedid[oa]|impedid[oa]\s+de\s+participar|declarou\s+suspei[çc][ãa]o|declarou-se\s+suspeit[oa]/i, "impedimento"],
  [/acompanh(?:ou|aram)\s+(?:integralmente\s+|parcialmente\s+)?(?:o\s+)?(?:voto\s+d[oa]\s+)?(?:relator|relatora|diverg[êe]ncia|ministr[oa])/i, "acompanhou"],
  [/votou\s+(?:pel[oa]|para|no\s+sentido)|votaram\s+(?:pel[oa]|para)|proferiu\s+voto|apresentou\s+(?:seu\s+)?voto/i, "votou"],
];

/** Votos explícitos: frase com nome de ministro e verbo de voto. Nada além do que a frase diz. */
/** Ministros imediatamente antes do verbo: "O ministro X", "X e Y", "X, Y e Z (presidente do STF)". */
function subjectsBefore(s, end, find) {
  const ms = find.mentions(s.slice(0, end));
  const out = [];
  let edge = end;
  for (let i = ms.length - 1; i >= 0; i--) {
    const gap = s.slice(ms[i].end, edge);
    const ok = out.length
      ? /^\s*(?:\([^)]{0,40}\))?\s*(?:,|e)\s*(?:o\s+|a\s+|os\s+|as\s+)?(?:ministr[oa]s?\s+)?$/i.test(gap)
      : gap.length <= 60 && !/relatoria|\bde\b.*\bministr|[;:]/i.test(gap) && !/\)\s*,/.test(gap) && !/[.]/.test(gap);
    if (!ok) break;
    out.unshift(ms[i]);
    edge = ms[i].idx;
  }
  return out;
}

function extractVotes(ls, find, relatorSlug) {
  const out = [];
  const sents = ls.flatMap((l) => l.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú"“])/));
  for (const s of sents) {
    if (s.length > 700) continue;
    const verb = VERBS.find(([re]) => re.test(s));
    if (!verb) continue;
    const vm = verb[0].exec(s);
    const after = find.mentions(s.slice(vm.index + vm[0].length));
    let who = subjectsBefore(s, vm.index, find);
    let detail = null;
    if (verb[1] === "acompanhou") {
      const target = after[0];
      const rel = /relator|relatora/i.test(vm[0]);
      detail = rel ? "acompanhou o relator" : /diverg/i.test(vm[0]) ? "acompanhou a divergência" : target ? `acompanhou o voto do ministro ${target.nome}` : "acompanhou o voto";
    } else {
      detail = { divergiu: "divergiu", vencido: "ficou vencido", vista: "pediu vista", impedimento: "impedimento ou suspeição", votou: "votou" }[verb[1]];
      if (verb[1] === "votou" && relatorSlug && who.some((b) => b.slug === relatorSlug) && /relator/i.test(s.slice(0, vm.index))) detail = "votou como relator";
      // "Ficaram vencidos os ministros X e Y": os nomes vêm depois do verbo
      if (verb[1] === "vencido" && !who.length && /^ficaram/i.test(vm[0])) {
        const tail = s.slice(vm.index + vm[0].length);
        const list = /^\s*(?:parcialmente\s+)?(?:a\s+|o\s+|os\s+|as\s+)?(?:ministr[oa]s?\s+)?(.*?)(?:,\s+que\b|\.|$)/i.exec(tail)?.[1] ?? "";
        who = find.mentions(list);
      }
    }
    // "foi acompanhado(a) pelos ministros X e Y"
    const fm = /foi\s+acompanhad[oa]\s+(?:integralmente\s+)?(?:pel[oa]s?)\s+(?:ministr[oa]s?\s+)?(.+)/i.exec(s);
    if (fm && !who.length) {
      who = find.mentions(fm[1]);
      const subj = find.mentions(s.slice(0, fm.index)).at(-1);
      detail = subj ? `acompanhou o voto do ministro ${subj.nome}` : "acompanhou";
    }
    for (const w of who) out.push({ ministro: w.nome, slug: w.slug, tipo: detail, relator: w.slug === relatorSlug && !!w.slug, trecho: s.length > 360 ? s.slice(0, 357) + "..." : s });
  }
  // sem duplicata por (ministro,tipo)
  const key = new Set();
  return out.filter((v) => {
    const k = `${v.ministro}|${v.tipo}`;
    return key.has(k) ? false : (key.add(k), true);
  });
}

function resultOf(text) {
  const s = text.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú"“])/).find((x) => /\b(por\s+unanimidade|por\s+maioria|por\s+\d+\s+votos?\s+a\s+\d+|unanimemente|maioria\s+dos\s+ministros)\b/i.test(x));
  if (!s) return { tipo: "nao_informado", texto: null };
  const tipo = /unanimidade|unanimemente/i.test(s) ? "unanimidade" : /maioria|\d+\s+votos?\s+a\s+\d+/i.test(s) ? "maioria" : "nao_informado";
  const placar = /(\d+)\s+votos?\s+a\s+(\d+)/i.exec(s);
  return { tipo, placar: placar ? `${placar[1]} a ${placar[2]}` : null, texto: s.length > 420 ? s.slice(0, 417) + "..." : s };
}

function judgmentFrom(post, url, find) {
  const text = flat(post.body);
  const all = `${post.titulo}. ${post.resumo}. ${text}`;
  const list = procs(all);
  if (!list.length) return null;
  const orgao = orgaoOf(all);
  if (!orgao) return null;
  if (/^Confira|Supremo na Semana|Informe|^Relator(a)?\b|^Ministr[oa]\b|monocr[áa]tic/i.test(post.titulo)) return null;
  const anchors = anchorsFor(post.body);
  const main = procs(`${post.titulo} ${post.resumo}`)[0] ?? list[0];
  const rel = /relator(?:a)?(?:\s+do\s+(?:caso|processo|recurso|a[çc][ãa]o))?[,:]?\s+(?:o\s+|a\s+)?(?:ministr[oa]\s+)?([^.;]{0,60})/i.exec(all);
  const rm = rel ? find.mentions(rel[1])[0] : null;
  const relSlug = rm?.slug ?? null;
  const resultado = resultOf(text);
  const votos = extractVotes(lines(post.body), find, relSlug);
  const dataJ = dateFromWeekday(all, post.data) ?? null;
  return {
    id: `n${post.id}`,
    data: dataJ ?? post.data,
    dataTipo: dataJ ? "data do julgamento, conforme a notícia" : "data da notícia (julgamento anterior ou no mesmo dia)",
    publicadoEm: `${post.data}T${post.hora}:00-03:00`,
    orgao,
    classe: main.classe,
    numero: main.numero,
    processo: main.rotulo,
    outrosProcessos: list.filter((p) => p !== main).slice(0, 6).map((p) => p.rotulo),
    titulo: post.titulo,
    tema: post.resumo || post.titulo,
    relator: rm?.nome ?? null,
    relatorSlug: relSlug,
    resultado,
    votos,
    sigilo: SIGILO_RE.test(all) ? "sigiloso" : "nao_informado",
    fonteNome: "Portal de Notícias do STF",
    fonteUrl: url,
    processoUrl: anchors.get(`${main.classe} ${main.numero}`) ?? null,
  };
}

function agendaFrom(post, url, find) {
  const all = `${post.titulo}. ${post.resumo}`;
  const virtual = /Plen[áa]rio Virtual|sess[ãa]o virtual/i.test(all + flat(post.body).slice(0, 600));
  const itens = parsePautaItems(post, find);
  const dia = dateFromWeekday(all, post.data);
  const per = /(\d{1,2}\/\d{1,2}(?:\/\d{4})?)\s+(?:a|até)\s+(\d{1,2}\/\d{1,2}(?:\/\d{4})?)/.exec(flat(post.body));
  return {
    id: `p${post.id}`,
    titulo: post.titulo,
    publicadoEm: `${post.data}T${post.hora}:00-03:00`,
    data: dia ?? post.data,
    orgao: virtual ? "Plenário Virtual" : /Primeira Turma/i.test(all) ? "Primeira Turma" : /Segunda Turma/i.test(all) ? "Segunda Turma" : "Plenário",
    horario: /come[çc]a\s+às?\s+(\d{1,2}h(?:\d{2})?)/i.exec(all)?.[1] ?? null,
    periodoVirtual: virtual && per ? `${per[1]} a ${per[2]}` : null,
    itens: itens.map((it) => ({ ...it, sigilo: "publico" })),
    fonteNome: "Portal de Notícias do STF",
    fonteUrl: url,
  };
}

/* ================================================================ EVENTOS */

async function collectEvents(from, to) {
  const events = [];
  let source = null;
  try {
    for (let page = 1; page <= 6; page++) {
      const u = `${NEWS}/wp-json/tribe/events/v1/events?per_page=50&page=${page}&start_date=${from}&end_date=${to}`;
      const j = JSON.parse(await getText(u, { tries: 8, gap: 2200, accept: "application/json" }));
      for (const e of j.events ?? []) events.push(e);
      if (page >= (j.total_pages ?? 1)) break;
    }
    source = "API de eventos do Portal de Notícias do STF";
  } catch (e) {
    log("API de eventos indisponível:", e.message);
  }
  const sessoes = [];
  for (const e of events) {
    const title = flat(e.title ?? "");
    if (!/^Sess[ãa]o\b/i.test(title) || /CNJ|CNMP|TSE|Comiss|Conselho|Veneza|Solene/i.test(title)) continue;
    const cat = (e.categories ?? []).map((c) => c.name).join(", ");
    const tipo = /extraordin/i.test(title) ? "Sessão extraordinária" : /Primeira Turma/i.test(title) ? "Sessão da Primeira Turma" : /Segunda Turma/i.test(title) ? "Sessão da Segunda Turma" : /virtual/i.test(title) ? "Sessão virtual" : /Pleno|Plen[áa]ria/i.test(title) ? "Sessão plenária" : "Sessão do STF";
    sessoes.push({ id: `e${e.id}`, data: e.start_date.slice(0, 10), inicio: e.start_date.slice(11, 16), fim: e.end_date?.slice(11, 16) ?? null, tipo, titulo: title, registradoPor: cat || null, url: e.url });
  }
  // várias entradas do mesmo dia/horário (agendas de gabinetes diferentes) viram uma sessão
  const uniq = new Map();
  for (const s of sessoes.sort((a, b) => a.data.localeCompare(b.data) || a.inicio.localeCompare(b.inicio))) {
    const k = `${s.data}|${s.tipo}`;
    if (!uniq.has(k)) uniq.set(k, s);
  }
  return { sessoes: [...uniq.values()], source, total: events.length };
}

/* ================================================================== MAIN */

const writeJson = (f, o) => writeFileSync(f, JSON.stringify(o, null, 1) + "\n");
const readJson = (f, d) => {
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return d;
  }
};

async function main() {
  log(`STF: janela de notícias desde ${SINCE}`);
  const avisos = [];

  /* 1. Ministros */
  let comp;
  try {
    comp = await collectMinisters();
    const prevMin = new Map((readJson(join(OUT, "ministros.json"), { ministros: [] }).ministros ?? []).map((x) => [x.slug, x]));
    for (const m of comp.ministros) await enrichMinister(m, prevMin.get(m.slug));
    log(`ministros: ${comp.ministros.length}, vagas: ${comp.vagas}`);
  } catch (e) {
    const prev = readJson(join(OUT, "ministros.json"), null);
    if (!prev) throw e;
    log("composição indisponível; mantendo a anterior:", e.message);
    avisos.push(`Composição não atualizada nesta coleta (${e.message}).`);
    comp = { ministros: prev.ministros, presidente: prev.presidente, vice: prev.vice, vagas: prev.vagas, wpUrl: prev.fonteUrl };
  }
  const find = ministerFinder(comp.ministros);

  /* 2. Listagem de notícias (API REST do portal; páginas HTML como reserva) */
  const posts = [];
  let failedPages = 0;
  try {
    for (let page = 1; page <= 60; page++) {
      const u = `${NEWS}/wp-json/wp/v2/postsnoticias?per_page=50&page=${page}&orderby=date&order=desc&after=${SINCE}T00:00:00&_fields=id,date,link,title`;
      const rows = JSON.parse(await getText(u, { tries: 9, gap: 1800, cache: false, accept: "application/json" }));
      for (const r of rows) posts.push({ url: r.link, titulo: flat(r.title?.rendered ?? ""), data: r.date.slice(0, 10), hora: r.date.slice(11, 16) });
      if (rows.length < 50) break;
    }
  } catch (e) {
    log("API de notícias indisponível, usando as páginas da listagem:", e.message);
    posts.length = 0;
    let reached = false;
    for (let p = 1; p <= MAX_PAGES && !reached; p++) {
      try {
        const html = await getText(p === 1 ? `${NEWS}/` : `${NEWS}/page/${p}/`, { tries: p > 8 ? 2 : 7, gap: 1800, cache: p > 1, retry404: true });
        const items = parseListing(html);
        if (!items.length) break;
        for (const it of items) {
          if (it.data < SINCE) reached = true;
          else posts.push(it);
        }
      } catch (e2) {
        failedPages++;
        log(`página ${p} da listagem falhou:`, e2.message);
        if (failedPages >= 2) break;
      }
    }
  }
  const uniqPosts = [...new Map(posts.map((p) => [p.url, p])).values()];
  log(`notícias na janela: ${uniqPosts.length} (páginas com falha: ${failedPages})`);
  if (failedPages) avisos.push(`${failedPages} página(s) da listagem do portal responderam com erro; a cobertura pode ter lacunas.`);

  /* 3. Posts relevantes */
  const RELEV = /\b(pauta|Plen[áa]rio|Turma|julg|decide|valida|derruba|considera|mant[ée]m|rejeita|suspende|determina|declara|STF (?:fixa|define|anula|autoriza|nega|aprova|forma|condena|torna|recebe|mant)|vista|destaques|Supremo na Semana|relator|Segunda Turma|Primeira Turma|inconstitucional|constitucional|tese|repercuss)/i;
  const target = uniqPosts.filter((p) => RELEV.test(p.titulo));
  const prev = readJson(join(OUT, "julgamentos.json"), { itens: [] });
  const prevAg = readJson(join(OUT, "pauta.json"), { pautas: [] });
  const julg = new Map(prev.itens.map((j) => [j.id, j]));
  const pautas = new Map((prevAg.pautas ?? []).map((a) => [a.id, a]));
  let analisados = 0;
  let falhas = 0;
  for (const it of target) {
    let html;
    try {
      html = await getText(it.url, { tries: 8, gap: 1800 });
    } catch (e) {
      falhas++;
      log("post indisponível:", it.url, e.message);
      continue;
    }
    const post = parsePost(html);
    if (!post.id || !post.data) continue;
    analisados++;
    if (/^Confira a pauta|^Confira os destaques|pauta do Plen|^Supremo na Semana|pauta da (?:Primeira|Segunda) Turma/i.test(post.titulo)) {
      if (/^Supremo na Semana/i.test(post.titulo)) continue;
      const a = agendaFrom(post, it.url, find);
      if (a.itens.length) pautas.set(a.id, a);
      continue;
    }
    const j = judgmentFrom(post, it.url, find);
    if (j) julg.set(j.id, j);
  }
  log(`posts analisados: ${analisados}, falhas: ${falhas}`);
  if (falhas) avisos.push(`${falhas} notícia(s) não puderam ser lidas nesta coleta.`);

  const itens = [...julg.values()].sort((a, b) => b.data.localeCompare(a.data) || b.id.localeCompare(a.id));
  const datas = itens.map((i) => i.data).sort();
  const cobertura = {
    de: datas[0] ?? null,
    ate: datas.at(-1) ?? null,
    janelaSolicitada: { de: SINCE, ate: TODAY },
    julgamentos: itens.length,
    comVotoIndividual: itens.filter((i) => i.votos.length).length,
    votosIndividuais: itens.reduce((n, i) => n + i.votos.length, 0),
    fonte: "Portal de Notícias do STF (noticias.stf.jus.br)",
    fonteUrl: NEWS + "/",
    limite:
      "Cobre as notícias de julgamento que o portal publicou na janela. O voto de cada ministro só aparece quando a notícia o descreve em frase explícita. Votações sem notícia, sessões sem voto individual divulgado e o Plenário Virtual detalhado (portal de jurisprudência, Corte Aberta) não estão aqui.",
  };
  writeJson(join(OUT, "julgamentos.json"), { atualizadoEm: TODAY, cobertura, itens });

  /* 4. Eventos / sessões */
  const ev = await collectEvents(addDays(TODAY, -30), addDays(TODAY, 60));
  if (!ev.source) avisos.push("Calendário de sessões do portal indisponível nesta coleta.");
  const prevSes = readJson(join(OUT, "pauta.json"), { sessoes: [] }).sessoes ?? [];
  const sessoes = ev.source ? ev.sessoes : prevSes;
  const pautaList = [...pautas.values()].sort((a, b) => b.data.localeCompare(a.data));
  writeJson(join(OUT, "pauta.json"), {
    atualizadoEm: TODAY,
    sessoes,
    pautas: pautaList,
    fontes: [
      { rotulo: "Calendário de eventos do STF (sessões)", url: NEWS + "/events/", obs: ev.source ?? "não coletado nesta rodada" },
      { rotulo: "Pautas e destaques publicados pelo STF", url: NEWS + "/" },
    ],
    recesso: null,
    avisos,
  });

  /* 5. Estatísticas por ministro (somente o que a cobertura permite) */
  for (const m of comp.ministros) {
    const rel = itens.filter((i) => i.relatorSlug === m.slug);
    const rp = pautaList.flatMap((p) => p.itens.map((x) => ({ ...x, data: p.data }))).filter((x) => x.relatorSlug === m.slug);
    const votos = itens.flatMap((i) => i.votos.filter((v) => v.slug === m.slug));
    const por = {};
    for (const v of votos) por[v.tipo.replace(/ o voto do ministro .*/, " o voto de outro ministro")] = (por[v.tipo.replace(/ o voto do ministro .*/, " o voto de outro ministro")] ?? 0) + 1;
    m.estatisticas = {
      cobertura: cobertura.de ? { de: cobertura.de, ate: cobertura.ate } : null,
      relatoriasEmJulgamentos: rel.length,
      relatoriasNaPauta: rp.length,
      votosRegistrados: votos.length,
      votosPorTipo: por,
      tempoMedioPedidoVista: null,
      decisoesMonocraticasPorAno: null,
      nota: "Contagens limitadas às notícias do portal na janela de cobertura. Tempo de pedido de vista e decisões monocráticas por ano dependem de bases do portal de jurisprudência e da Corte Aberta, não acessíveis por script nesta coleta: não coletado.",
    };
  }
  writeJson(join(OUT, "ministros.json"), {
    atualizadoEm: TODAY,
    presidente: comp.presidente,
    vicePresidente: comp.vice,
    vagas: comp.vagas,
    ministros: comp.ministros.map(({ aliases, ...m }) => ({ ...m, aliases })),
    fonteNome: "Wikipédia (Supremo Tribunal Federal), conferida com o portal do STF",
    fonteUrl: comp.wpUrl ?? "https://pt.wikipedia.org/wiki/Supremo_Tribunal_Federal",
    fontePortalUrl: "https://portal.stf.jus.br/ministros/",
  });

  writeJson(join(OUT, "meta.json"), {
    atualizadoEm: TODAY,
    coletadoEm: new Date().toISOString(),
    janelaSolicitada: { de: SINCE, ate: TODAY },
    cobertura,
    contagens: { ministros: comp.ministros.length, vagas: comp.vagas, julgamentos: itens.length, pautas: pautaList.length, sessoes: sessoes.length },
    fontes: [
      { id: "noticias-stf", nome: "Portal de Notícias do STF", url: NEWS + "/", uso: "pautas, destaques do Plenário Virtual e notícias de julgamento", acesso: "ok" },
      { id: "eventos-stf", nome: "Calendário de eventos do STF", url: NEWS + "/events/", uso: "sessões do Plenário e das Turmas", acesso: ev.source ? "ok" : "indisponível nesta coleta" },
      { id: "portal-stf", nome: "Portal do STF (Corte Aberta, jurisprudência, ministros)", url: "https://portal.stf.jus.br/", uso: "referência oficial; recusa clientes automáticos (HTTP 403), por isso não é coletado", acesso: "bloqueado" },
      { id: "wikipedia", nome: "Wikipédia (REST)", url: "https://pt.wikipedia.org/wiki/Supremo_Tribunal_Federal", uso: "composição, datas de posse, indicação e votação no Senado (fonte secundária)", acesso: "ok" },
      { id: "commons", nome: "Wikimedia Commons", url: "https://commons.wikimedia.org/", uso: "fotos com licença livre e crédito", acesso: "ok" },
    ],
    avisos,
  });

  // cópias públicas (download e uso por terceiros)
  for (const f of ["ministros", "julgamentos", "pauta", "meta"]) writeFileSync(join(PUB, `${f}.json`), readFileSync(join(OUT, `${f}.json`)));
  log(`pronto: ${itens.length} julgamentos (${cobertura.votosIndividuais} votos individuais), ${pautaList.length} pautas, ${sessoes.length} sessões`);
}

main().catch((e) => {
  console.error("stf:update falhou:", e);
  process.exit(1);
});
