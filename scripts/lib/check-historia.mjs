/**
 * Validação dos artigos de História (content/historia/*.ts), chamada por scripts/check-content.mjs.
 *
 * Além do guarda-corpo de HTML das notícias, exige: autor da casa, período e datas coerentes,
 * mínimo de 1.200 palavras e 4 h2, fontes https com hosts e URLs distintos (e fonte primária, ou aviso
 * no texto de que ela não abriu), todo link externo do texto listado em `sources`, FAQ de 3 a 5 perguntas,
 * artigos de eleição (slug "eleicao-...") com tabela de resultado e seções de propostas e do que veio
 * depois, citação literal curta, nenhum travessão e nenhum rótulo ideológico pejorativo.
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const PERIODS = ["nova-republica", "ditadura-militar", "republica-1946", "era-vargas", "republica-velha", "imperio"];
const SOURCE_KINDS = ["primaria", "imprensa", "referencia"];
const HOUSE_AUTHOR = "Equipe Política Diária";
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const RESERVED_SLUGS = ["periodo"];
/** Anos cujo artigo ainda não pode ser escrito (eleição em andamento ou sem diplomação). */
const BLOCKED_YEARS = [2026];
export const MIN_WORDS_HISTORIA = 1200;
const MIN_H2 = 4;
const MIN_INTERNAL_LINKS = 5;
const BANNED_PHRASES = [/\bEm resumo\b/i, /É importante ressaltar/i, /como já discutimos/i, /\bVale destacar\b/i];
const LOADED_LABELS = /\b(esquerdopata|bolsominion|petralha|mortadela|coxinha|fascistas?|comunistas? de ?plant[aã]o|direitopata|gado)\b/i;

function readFieldIn(block, name) {
  const m = new RegExp(`(?:^|[\\n{,])\\s*${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(block);
  return m ? m[1] : "";
}

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

const wordCount = (html) => html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

export function loadHistoria(dir, ctx) {
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
    if (!/export const entry: HistoryArticle = \{/.test(src)) {
      errors.push(`historia/${fileSlug}: arquivo precisa exportar \`export const entry: HistoryArticle = { ... }\``);
      continue;
    }
    const yearM = /\n\s*year:\s*(\d{4})\b/.exec(src);
    items.push({
      slug: fileSlug,
      declaredSlug: readField(src, "slug"),
      title: readField(src, "title"),
      summary: readField(src, "summary"),
      author: readField(src, "author"),
      date: readField(src, "date"),
      updated: readField(src, "updated"),
      period: readField(src, "period"),
      eventDate: readField(src, "eventDate"),
      imageQuery: readField(src, "imageQuery"),
      year: yearM ? Number(yearM[1]) : null,
      keyPoints: (readArrayBlock(src, "keyPoints").match(/"(?:[^"\\]|\\.)*"/g) ?? []).map((s) => s.slice(1, -1)),
      sources: objectsIn(readArrayBlock(src, "sources")),
      faq: objectsIn(readArrayBlock(src, "faq")),
      relatedBooks: ((/\n\s*relatedBooks:\s*\[([^\]]*)\]/.exec(src) ?? [])[1] ?? "").match(/"([^"]+)"/g)?.map((s) => s.slice(1, -1)) ?? [],
      content: readContent(src),
      raw: src,
    });
  }
  return items;
}

export function checkHistoria(items, ctx) {
  const { errors, warnings, TODAY, FORBIDDEN, ALLOWED_TAGS, decodeEntities, articleSlugs, newsSlugs, checagemSlugs } = ctx;

  const seen = new Map();
  for (const c of items) seen.set(c.slug, (seen.get(c.slug) ?? 0) + 1);
  for (const [slug, n] of seen) if (n > 1) errors.push(`historia/${slug}: slug duplicado (${n}x)`);
  const historiaSlugs = new Set(items.map((c) => c.slug));
  const years = new Map();

  for (const c of items) {
    const where = `historia/${c.slug}`;
    const isElection = c.slug.startsWith("eleicao-");
    if (c.declaredSlug !== c.slug) errors.push(`${where}: nome do arquivo difere do slug "${c.declaredSlug}"`);
    if (!SLUG_RE.test(c.slug)) errors.push(`${where}: slug com caracteres inválidos`);
    if (RESERVED_SLUGS.includes(c.slug)) errors.push(`${where}: slug reservado pela rota (${RESERVED_SLUGS.join(", ")})`);
    if (c.slug.length > 90) warnings.push(`${where}: slug com ${c.slug.length} caracteres (ideal < 90)`);

    if (!c.title) errors.push(`${where}: sem title`);
    else if (c.title.length > 80) errors.push(`${where}: title com ${c.title.length} caracteres (máximo 80; ideal 50 a 70)`);
    else if (c.title.length > 70 || c.title.length < 40) warnings.push(`${where}: title com ${c.title.length} caracteres (ideal 50 a 70)`);
    if (!c.summary) errors.push(`${where}: sem summary`);
    else if (c.summary.length > 170 || c.summary.length < 100) {
      warnings.push(`${where}: summary com ${c.summary.length} caracteres (meta description ideal 120 a 160)`);
    }
    if (c.author !== HOUSE_AUTHOR) errors.push(`${where}: author deve ser "${HOUSE_AUTHOR}"`);
    if (!PERIODS.includes(c.period)) errors.push(`${where}: period inválido "${c.period}" (use ${PERIODS.join(", ")})`);

    if (!DATE_RE.test(c.date)) errors.push(`${where}: date inválida "${c.date}" (use AAAA-MM-DD)`);
    else if (c.date > TODAY) errors.push(`${where}: data no futuro (${c.date} > hoje ${TODAY} em America/Sao_Paulo)`);
    if (c.updated) {
      if (!DATE_RE.test(c.updated)) errors.push(`${where}: updated inválida "${c.updated}"`);
      else if (c.updated < c.date) errors.push(`${where}: updated (${c.updated}) anterior a date (${c.date})`);
      else if (c.updated > TODAY) errors.push(`${where}: updated no futuro (${c.updated})`);
    }
    if (!DATE_RE.test(c.eventDate)) errors.push(`${where}: eventDate inválida "${c.eventDate}"`);
    else if (c.eventDate > TODAY) errors.push(`${where}: eventDate no futuro (${c.eventDate})`);
    if (c.year === null) errors.push(`${where}: sem year`);
    else {
      if (DATE_RE.test(c.eventDate) && Number(c.eventDate.slice(0, 4)) !== c.year) {
        errors.push(`${where}: year (${c.year}) não bate com eventDate (${c.eventDate})`);
      }
      if (BLOCKED_YEARS.includes(c.year)) {
        errors.push(`${where}: a eleição de ${c.year} está em andamento; o artigo de História só entra depois da apuração e da diplomação (veja /eleicoes)`);
      }
      const key = `${c.year}|${c.period}`;
      years.set(key, [...(years.get(key) ?? []), c.slug]);
    }
    if (c.imageQuery.split(/\s+/).filter(Boolean).length < 3) {
      errors.push(`${where}: imageQuery precisa ser frase concreta em inglês (3 palavras ou mais, ligada a pessoa, lugar ou instituição)`);
    }
    if (c.keyPoints.length !== 3) errors.push(`${where}: keyPoints precisa ter 3 itens (tem ${c.keyPoints.length})`);

    // Fontes: https, URLs distintas, tipos válidos, primária (ou aviso no texto).
    if (c.sources.length < 4) errors.push(`${where}: mínimo de 4 fontes (tem ${c.sources.length})`);
    const urls = new Set();
    let primary = 0;
    for (const s of c.sources) {
      const url = readFieldIn(s, "url");
      const kind = readFieldIn(s, "kind");
      if (!/^https:\/\/[^\s"]+$/.test(url)) errors.push(`${where}: fonte com url inválida (precisa ser https) -> ${url}`);
      if (urls.has(url)) errors.push(`${where}: fonte repetida -> ${url}`);
      urls.add(url);
      if (!SOURCE_KINDS.includes(kind)) errors.push(`${where}: fonte com kind inválido "${kind}" (${SOURCE_KINDS.join(", ")})`);
      if (kind === "primaria") primary++;
      for (const f of ["label", "publisher", "note"]) {
        if (!readFieldIn(s, f)) errors.push(`${where}: fonte sem ${f} -> ${url}`);
      }
    }
    const hosts = new Set([...urls].map(hostOf));
    if (hosts.size < 2) errors.push(`${where}: fontes de um só site; use ao menos 2 hosts distintos`);

    // Travessão, menções e frases-fórmula valem para o arquivo todo (menos comentários de linha).
    const everything = c.raw.replace(/\n\s*\/\/[^\n]*/g, "");
    if (/—/.test(everything)) errors.push(`${where}: travessão (—) no texto; use dois-pontos, vírgula, parênteses ou ponto`);
    if (/\b(Claude|Anthropic|ChatGPT|inteligência artificial)\b/i.test(everything)) {
      errors.push(`${where}: menção a IA, Claude ou Anthropic no conteúdo do site`);
    }
    for (const re of BANNED_PHRASES) if (re.test(everything)) errors.push(`${where}: frase-fórmula proibida (${re})`);
    if (LOADED_LABELS.test(everything)) errors.push(`${where}: rótulo pejorativo (${LOADED_LABELS.exec(everything)[0]}); descreva posição, não carimbe`);

    // FAQ: 3 a 5 perguntas, respostas curtas e factuais.
    if (c.faq.length < 3 || c.faq.length > 5) errors.push(`${where}: faq precisa ter de 3 a 5 perguntas (tem ${c.faq.length})`);
    for (const q of c.faq) {
      const question = readFieldIn(q, "question");
      const answer = readFieldIn(q, "answer");
      if (!question || !answer) errors.push(`${where}: faq com pergunta ou resposta vazia`);
      const n = answer.split(/\s+/).filter(Boolean).length;
      if (answer && (n < 20 || n > 110)) warnings.push(`${where}: resposta do faq com ${n} palavras (ideal 30 a 90): ${question.slice(0, 50)}`);
    }

    for (const b of c.relatedBooks) {
      if (!articleSlugs.has(b)) errors.push(`${where}: relatedBooks aponta para resenha que não existe -> ${b}`);
    }

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

    const words = wordCount(c.content);
    const h2s = (c.content.match(/<h2\b/gi) ?? []).length;
    if (words < MIN_WORDS_HISTORIA) errors.push(`${where}: só ${words} palavras (mínimo ${MIN_WORDS_HISTORIA})`);
    if (h2s < MIN_H2) errors.push(`${where}: só ${h2s} <h2> (mínimo ${MIN_H2})`);
    if (isElection) {
      if (!/<table\b/i.test(c.content)) errors.push(`${where}: artigo de eleição precisa de tabela com o resultado oficial`);
      if (!/<h2\b[^>]*>[^<]*Propostas/i.test(c.content)) errors.push(`${where}: falta o <h2> "Propostas de cada candidato"`);
      if (!/<h2\b[^>]*>[^<]*O que aconteceu depois/i.test(c.content)) errors.push(`${where}: falta o <h2> "O que aconteceu depois"`);
    }

    // Links: internos existentes, externos sempre listados em `sources` (aberto e conferido).
    const hrefRe = /href\s*=\s*["']([^"']*)["']/g;
    let h;
    const internal = new Set();
    while ((h = hrefRe.exec(c.content))) {
      const href = h[1].trim();
      const target = (prefix) => href.slice(prefix.length).split(/[#?]/)[0].replace(/\/$/, "");
      if (href.startsWith("/artigos/")) {
        internal.add(href);
        if (!articleSlugs.has(target("/artigos/"))) errors.push(`${where}: link interno quebrado -> ${href}`);
      } else if (href.startsWith("/noticias/")) {
        internal.add(href);
        if (!newsSlugs.has(target("/noticias/"))) errors.push(`${where}: link interno quebrado -> ${href}`);
      } else if (href.startsWith("/checagem/")) {
        internal.add(href);
        if (!checagemSlugs.has(target("/checagem/"))) errors.push(`${where}: link interno quebrado -> ${href}`);
      } else if (href.startsWith("/historia/")) {
        internal.add(href);
        const slug = target("/historia/");
        if (slug === c.slug) warnings.push(`${where}: link para si mesmo`);
        if (!historiaSlugs.has(slug) && !slug.startsWith("periodo/")) errors.push(`${where}: link interno quebrado -> ${href}`);
      } else if (href.startsWith("/")) {
        internal.add(href);
      } else if (/^http:\/\//i.test(href)) {
        errors.push(`${where}: link externo sem https -> ${href}`);
      } else if (/^https:\/\//i.test(href)) {
        if (!urls.has(href)) errors.push(`${where}: link externo que não está em sources (abra, confira e liste) -> ${href}`);
      } else if (!href.startsWith("#") && !href.startsWith("mailto:")) {
        errors.push(`${where}: href suspeito -> ${href}`);
      }
    }
    if (internal.size < MIN_INTERNAL_LINKS) {
      errors.push(`${where}: ${internal.size} link(s) interno(s) distinto(s) (mínimo ${MIN_INTERNAL_LINKS}; use /eleicoes, /congresso, /checagem, notícias e resenhas que existam)`);
    }
    if (!internal.has("/eleicoes") && ![...internal].some((l) => l.startsWith("/eleicoes"))) {
      errors.push(`${where}: nenhum link para /eleicoes`);
    }
    if (primary === 0 && !/não pôde ser aberta|não abriu|não foi possível abrir/i.test(c.content)) {
      errors.push(`${where}: sem fonte primária em sources; diga no texto que a fonte primária não pôde ser aberta, ou inclua uma`);
    }
    const extAnchorRe = /<a\b[^>]*href\s*=\s*["']https?:\/\/[^"']*["'][^>]*>/gi;
    let ea;
    while ((ea = extAnchorRe.exec(c.content))) {
      if (!/\brel\s*=\s*["'][^"']*noopener/i.test(ea[0])) {
        warnings.push(`${where}: link externo sem rel="noopener" -> ${ea[0].slice(0, 80)}`);
      }
    }

    // Imagens: só Wikimedia Commons ou arquivo local, com alt e crédito.
    const srcRe = /<img[^>]*\ssrc\s*=\s*["']([^"']*)["']/gi;
    let sm;
    let imgs = 0;
    while ((sm = srcRe.exec(c.content))) {
      imgs++;
      if (!/^(https:\/\/upload\.wikimedia\.org\/|\/)/i.test(sm[1].trim())) {
        errors.push(`${where}: <img src> fora dos domínios permitidos -> ${sm[1]}`);
      }
    }
    if (/<img\b(?![^>]*\balt\s*=)[^>]*>/i.test(c.content)) errors.push(`${where}: <img> sem alt`);
    if (imgs > 0 && !/Wikimedia Commons/.test(c.content)) errors.push(`${where}: imagem no corpo sem crédito "Foto: autor / Wikimedia Commons (licença)"`);

    // Citação literal só curta (até 25 palavras) entre aspas curvas.
    const quoteRe = /“([^”]+)”/g;
    let q;
    while ((q = quoteRe.exec(c.content.replace(/<[^>]+>/g, " ")))) {
      const n = q[1].split(/\s+/).filter(Boolean).length;
      if (n > 25) errors.push(`${where}: citação literal com ${n} palavras (máximo 25): “${q[1].slice(0, 50)}...”`);
    }
    if (/<blockquote\b/i.test(c.content)) warnings.push(`${where}: <blockquote> presente; confirme que a citação tem até 25 palavras e fonte`);
  }

  for (const [key, slugs] of years) {
    if (slugs.length > 1) errors.push(`historia: mais de um artigo para ${key.replace("|", " / ")} (${slugs.join(", ")}); nunca repita eleição`);
  }
  return items.length;
}
