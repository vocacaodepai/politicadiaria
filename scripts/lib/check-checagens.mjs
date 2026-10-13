/**
 * Validação das checagens (content/checagens/*.ts), chamada por scripts/check-content.mjs.
 *
 * Além do guarda-corpo de HTML das notícias, exige veredito válido, fontes abertas (mínimo 2,
 * https, hosts distintos), datas coerentes, linha do tempo e nenhum travessão. Regra editorial:
 * sem fonte primária ou ao menos duas fontes independentes, não há veredito.
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const VERDICTS = ["falso", "enganoso", "fora-de-contexto", "sem-provas", "verdadeiro"];
const SOURCE_KINDS = ["primaria", "agencia", "imprensa", "referencia"];
const POINT_STATUS = ["verdade", "falso", "atencao"];
const HOUSE_AUTHOR = "Equipe Política Diária";
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Lê `name: "valor"` em qualquer ponto do bloco (início de linha, chave ou vírgula). */
function readFieldIn(block, name) {
  const m = new RegExp(`(?:^|[\\n{,])\\s*${name}:\\s*"([^"]*)"`).exec(block);
  return m ? m[1] : "";
}

/** Corpo de um array de topo `  name: [ ... ],` (2 espaços de indentação). */
function readArrayBlock(src, name) {
  const m = new RegExp(`\\n  ${name}: \\[([\\s\\S]*?)\\n  \\],`).exec(src);
  return m ? m[1] : "";
}

function objectsIn(block) {
  return block.match(/\{[^{}]*\}/g) ?? [];
}

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function loadChecagens(dir, ctx) {
  const { errors, readField, readContent } = ctx;
  const items = [];
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "index.ts");
  } catch {
    return items; // seção ainda sem conteúdo
  }
  for (const file of files) {
    const src = readFileSync(resolve(dir, file), "utf8");
    const fileSlug = file.slice(0, -3);
    if (!/export const checagem: FactCheck = \{/.test(src)) {
      errors.push(`checagens/${fileSlug}: arquivo precisa exportar \`export const checagem: FactCheck = { ... }\``);
      continue;
    }
    const claimBlock = /\n {2}claim: \{([\s\S]*?)\n {2}\},/.exec(src);
    items.push({
      slug: fileSlug,
      declaredSlug: readField(src, "slug"),
      title: readField(src, "title"),
      summary: readField(src, "summary"),
      author: readField(src, "author"),
      verdict: readField(src, "verdict"),
      quick: readField(src, "quick"),
      date: readField(src, "date"),
      updated: readField(src, "updated"),
      checkedAt: readField(src, "checkedAt"),
      topic: readField(src, "topic"),
      claim: claimBlock ? claimBlock[1] : "",
      points: objectsIn(readArrayBlock(src, "points")),
      sources: objectsIn(readArrayBlock(src, "sources")),
      timeline: objectsIn(readArrayBlock(src, "timeline")),
      corrections: objectsIn(readArrayBlock(src, "corrections")),
      content: readContent(src),
      raw: src,
    });
  }
  return items;
}

export function checkChecagens(checagens, ctx) {
  const { errors, warnings, TODAY, FORBIDDEN, ALLOWED_TAGS, decodeEntities, articleSlugs, newsSlugs } = ctx;

  const seen = new Map();
  for (const c of checagens) seen.set(c.slug, (seen.get(c.slug) ?? 0) + 1);
  for (const [slug, n] of seen) if (n > 1) errors.push(`checagens/${slug}: slug duplicado (${n}x)`);
  const checagemSlugs = new Set(checagens.map((c) => c.slug));

  for (const c of checagens) {
    const where = `checagens/${c.slug}`;
    if (c.declaredSlug !== c.slug) errors.push(`${where}: nome do arquivo difere do slug "${c.declaredSlug}"`);
    if (!SLUG_RE.test(c.slug)) errors.push(`${where}: slug com caracteres inválidos`);
    if (!VERDICTS.includes(c.verdict)) errors.push(`${where}: veredito inválido "${c.verdict}" (use ${VERDICTS.join(", ")})`);
    if (!c.title) errors.push(`${where}: sem title`);
    else if (c.title.length > 110) warnings.push(`${where}: title com ${c.title.length} caracteres (ideal < 90)`);
    if (!c.summary) errors.push(`${where}: sem summary`);
    else if (c.summary.length > 180) warnings.push(`${where}: summary com ${c.summary.length} caracteres (meta description ideal < 160)`);
    if (!c.quick) errors.push(`${where}: sem quick (resumo "em 20 segundos")`);
    if (c.author !== HOUSE_AUTHOR) errors.push(`${where}: author deve ser "${HOUSE_AUTHOR}"`);
    if (!c.topic) errors.push(`${where}: sem topic`);

    if (!DATE_RE.test(c.date)) errors.push(`${where}: date inválida "${c.date}" (use AAAA-MM-DD)`);
    else if (c.date > TODAY) errors.push(`${where}: data no futuro (${c.date} > hoje ${TODAY} em America/Sao_Paulo)`);
    if (c.updated) {
      if (!DATE_RE.test(c.updated)) errors.push(`${where}: updated inválida "${c.updated}"`);
      else if (c.updated < c.date) errors.push(`${where}: updated (${c.updated}) anterior a date (${c.date})`);
      else if (c.updated > TODAY) errors.push(`${where}: updated no futuro (${c.updated})`);
    }
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(c.checkedAt)) {
      errors.push(`${where}: checkedAt precisa ser ISO 8601 com offset (ex.: 2026-10-13T15:30:00-03:00)`);
    } else if (!c.checkedAt.startsWith(c.date)) {
      errors.push(`${where}: checkedAt (${c.checkedAt}) não bate com date (${c.date})`);
    }

    if (!readFieldIn(c.claim, "text")) errors.push(`${where}: claim.text vazio`);
    if (!readFieldIn(c.claim, "origin")) errors.push(`${where}: claim.origin vazio`);
    if (!readFieldIn(c.claim, "attribution")) errors.push(`${where}: claim.attribution vazio`);
    const firstSeen = readFieldIn(c.claim, "firstSeen");
    if (firstSeen && (!DATE_RE.test(firstSeen) || firstSeen > TODAY)) {
      errors.push(`${where}: claim.firstSeen inválida ou futura "${firstSeen}"`);
    }
    if (/https?:\/\//i.test(c.claim)) errors.push(`${where}: a alegação não pode conter link (não amplificamos o boato)`);

    if (c.points.length < 1) errors.push(`${where}: precisa de pelo menos 1 item em points`);
    for (const p of c.points) {
      if (!POINT_STATUS.includes(readFieldIn(p, "status"))) errors.push(`${where}: points.status inválido (${POINT_STATUS.join(", ")})`);
      if (!readFieldIn(p, "text")) errors.push(`${where}: points.text vazio`);
    }

    // Fontes: mínimo 2, https, hosts distintos; primária OU duas independentes.
    if (c.sources.length < 2) errors.push(`${where}: mínimo de 2 fontes (tem ${c.sources.length})`);
    const hosts = new Set();
    const urls = new Set();
    let primary = 0;
    for (const s of c.sources) {
      const url = readFieldIn(s, "url");
      const kind = readFieldIn(s, "kind");
      if (!/^https:\/\/[^\s"]+$/.test(url)) errors.push(`${where}: fonte com url inválida (precisa ser https) -> ${url}`);
      if (urls.has(url)) errors.push(`${where}: fonte repetida -> ${url}`);
      urls.add(url);
      hosts.add(hostOf(url));
      if (!SOURCE_KINDS.includes(kind)) errors.push(`${where}: fonte com kind inválido "${kind}" (${SOURCE_KINDS.join(", ")})`);
      if (kind === "primaria") primary++;
      for (const f of ["label", "publisher", "note"]) {
        if (!readFieldIn(s, f)) errors.push(`${where}: fonte sem ${f} -> ${url}`);
      }
      const published = readFieldIn(s, "published");
      if (published && (!DATE_RE.test(published) || published > TODAY)) {
        errors.push(`${where}: fonte com published inválida ou futura -> ${url}`);
      }
    }
    if (c.sources.length >= 2 && primary === 0 && hosts.size < 2) {
      errors.push(`${where}: sem fonte primária e sem duas fontes independentes (hosts distintos)`);
    }

    if (c.timeline.length < 1) errors.push(`${where}: linha do tempo vazia`);
    for (const t of c.timeline) {
      const d = readFieldIn(t, "date");
      if (!DATE_RE.test(d) || d > TODAY) errors.push(`${where}: timeline com data inválida ou futura "${d}"`);
      if (!readFieldIn(t, "text")) errors.push(`${where}: timeline sem texto`);
    }
    for (const t of c.corrections) {
      const d = readFieldIn(t, "date");
      if (!DATE_RE.test(d) || d > TODAY) errors.push(`${where}: correção com data inválida ou futura "${d}"`);
      if (!readFieldIn(t, "text")) errors.push(`${where}: correção sem texto`);
    }

    // Travessão e menções proibidas valem para todo o texto da checagem, não só para o content.
    const everything = c.raw.replace(/\n\s*\/\/[^\n]*/g, "");
    if (/—/.test(everything)) errors.push(`${where}: travessão (—) no texto; use dois-pontos, vírgula, parênteses ou ponto`);
    if (/\b(Claude|Anthropic)\b/.test(everything)) errors.push(`${where}: menção a Claude/Anthropic no conteúdo do site`);

    if (!c.content) {
      errors.push(`${where}: sem content`);
      continue;
    }
    if (/\\/.test(c.content)) errors.push(`${where}: barra invertida/crase escapada dentro de content`);
    const decoded = decodeEntities(c.content);
    for (const { re, label } of FORBIDDEN) {
      if (re.test(c.content) || re.test(decoded)) errors.push(`${where}: HTML proibido (${label})`);
    }

    const tagRe = /<\s*\/?\s*([a-zA-Z][a-zA-Z0-9]*)\b/g;
    const badTags = new Set();
    let t;
    while ((t = tagRe.exec(c.content))) {
      const tag = t[1].toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) badTags.add(tag);
    }
    if (badTags.size) errors.push(`${where}: tag(s) não permitida(s): ${[...badTags].join(", ")}`);
    if (/<h1\b/i.test(c.content)) errors.push(`${where}: <h1> no corpo (o título já é o h1)`);

    const hrefRe = /href\s*=\s*["']([^"']*)["']/g;
    let h;
    while ((h = hrefRe.exec(c.content))) {
      const href = h[1].trim();
      const target = (prefix) => href.slice(prefix.length).split(/[#?]/)[0].replace(/\/$/, "");
      if (href.startsWith("/artigos/")) {
        if (!articleSlugs.has(target("/artigos/"))) errors.push(`${where}: link interno quebrado -> ${href}`);
      } else if (href.startsWith("/noticias/")) {
        if (!newsSlugs.has(target("/noticias/"))) errors.push(`${where}: link interno quebrado -> ${href}`);
      } else if (href.startsWith("/checagem/")) {
        if (!checagemSlugs.has(target("/checagem/"))) errors.push(`${where}: link interno quebrado -> ${href}`);
      } else if (href.startsWith("/")) {
        // outras rotas internas (congresso etc.)
      } else if (/^http:\/\//i.test(href)) {
        errors.push(`${where}: link externo sem https -> ${href}`);
      } else if (!/^https:\/\//i.test(href) && !href.startsWith("#") && !href.startsWith("mailto:")) {
        errors.push(`${where}: href suspeito -> ${href}`);
      }
    }
    const extAnchorRe = /<a\b[^>]*href\s*=\s*["']https?:\/\/[^"']*["'][^>]*>/gi;
    let ea;
    while ((ea = extAnchorRe.exec(c.content))) {
      if (!/\brel\s*=\s*["'][^"']*noopener/i.test(ea[0])) {
        warnings.push(`${where}: link externo sem rel="noopener" -> ${ea[0].slice(0, 80)}`);
      }
    }
    const srcRe = /<img[^>]*\ssrc\s*=\s*["']([^"']*)["']/gi;
    let sm;
    while ((sm = srcRe.exec(c.content))) {
      if (!/^(https:\/\/upload\.wikimedia\.org\/|\/)/i.test(sm[1].trim())) {
        errors.push(`${where}: <img src> fora dos domínios permitidos -> ${sm[1]}`);
      }
    }
    if (/<img\b(?![^>]*\balt\s*=)[^>]*>/i.test(c.content)) errors.push(`${where}: <img> sem alt`);
    const words = c.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    if (words < 150) warnings.push(`${where}: content com só ${words} palavras (a análise das fontes costuma pedir mais)`);
  }
  return checagens.length;
}
