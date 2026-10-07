#!/usr/bin/env node
/**
 * Guarda-corpo do conteúdo editorial (content/articles/*.ts e content/news/*.ts).
 *
 * O HTML dos artigos é renderizado com dangerouslySetInnerHTML, então este
 * script garante que nada perigoso entre no site, mesmo vindo das rotinas
 * automáticas de escrita. Roda em `npm run lint`, `npm run check:content` e
 * antes de todo `npm run build` (prebuild). Sai com código 1 se houver erro.
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const ARTICLES_DIR = resolve(ROOT, "content/articles");
const NEWS_DIR = resolve(ROOT, "content/news");

// Artigos com data igual ou posterior a esta seguem o padrão editorial novo
// (>= 10 links internos, >= 900 palavras, 3 keyPoints, FAQ). Os mais antigos só geram aviso.
const STRICT_FROM_DATE = "2026-10-07";
// Notícias com data igual ou posterior a esta precisam do mesmo tamanho de texto
// dos artigos (>= 900 palavras, >= 3 h2). As notícias já publicadas antes ficam como estão.
const NEWS_STRICT_FROM_DATE = "2026-10-07";
const MIN_INTERNAL_LINKS = 6;
const MIN_WORDS_STRICT = 900;
const MIN_WORDS_WARN = 600;

// "Hoje" no fuso editorial (America/Sao_Paulo): datas futuras são erro.
const TODAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const FORBIDDEN = [
  { re: /<\s*script\b/i, label: "<script>" },
  { re: /<\s*iframe\b/i, label: "<iframe>" },
  { re: /<\s*object\b/i, label: "<object>" },
  { re: /<\s*embed\b/i, label: "<embed>" },
  { re: /<\s*form\b/i, label: "<form>" },
  { re: /<\s*input\b/i, label: "<input>" },
  { re: /<\s*button\b/i, label: "<button>" },
  { re: /<\s*style\b/i, label: "<style>" },
  { re: /<\s*link\b/i, label: "<link>" },
  { re: /<\s*meta\b/i, label: "<meta>" },
  { re: /<\s*base\b/i, label: "<base>" },
  { re: /<\s*svg\b/i, label: "<svg> inline" },
  { re: /<\s*math\b/i, label: "<math>" },
  { re: /(?:^|[\s"'/])on[a-z]+\s*=/i, label: "atributo on*= (handler inline)" },
  { re: /<[a-z][a-z0-9]*\b[^>]*?\s[a-z:-]+\s*=\s*[^"'\s>]/i, label: "atributo sem aspas (use sempre aspas duplas)" },
  { re: /<[a-z][a-z0-9]*\/[a-z]/i, label: "barra colada em atributo (<img/src=...)" },
  { re: /&(?:#x?[0-9a-f]+|[a-z]+);?\s*[a-z]*:/i, label: "entidade HTML formando esquema de URL" },
  { re: /\b(?:srcset|ping|formaction|xlink:href|dynsrc)\s*=/i, label: "atributo perigoso" },
  { re: /javascript\s*:/i, label: "javascript: em URL" },
  { re: /vbscript\s*:/i, label: "vbscript: em URL" },
  { re: /data\s*:\s*text\/html/i, label: "data:text/html" },
  { re: /srcdoc\s*=/i, label: "srcdoc=" },
  { re: /expression\s*\(/i, label: "expression() em CSS" },
  { re: /\bstyle\s*=/i, label: "atributo style= (use as classes do site)" },
  { re: /\$\{/, label: "interpolação ${...} dentro do template literal" },
];

const ALLOWED_TAGS = new Set([
  "p", "h2", "h3", "h4", "ul", "ol", "li", "a", "strong", "em", "b", "i", "u",
  "br", "hr", "blockquote", "code", "pre", "table", "thead", "tbody", "tr",
  "th", "td", "div", "span", "img", "figure", "figcaption", "sup", "sub",
  "small", "mark", "del", "ins", "dl", "dt", "dd", "cite", "abbr", "kbd",
]);

const errors = [];
const warnings = [];

function readField(block, name) {
  const m = new RegExp(`\\n\\s*${name}:\\s*"([^"]*)"`).exec(block);
  return m ? m[1] : "";
}

function readContent(block) {
  // Respeita crase escapada; o escape em si é rejeitado depois (padrão editorial: nada de crase).
  const m = /\n\s*content:\s*`((?:\\[\s\S]|[^`\\])*)`/.exec(block);
  return m ? m[1] : "";
}

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);?/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);?/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&colon;/gi, ":")
    .replace(/&tab;|&newline;/gi, "")
    .replace(/&amp;/gi, "&");
}

function extractArticles() {
  const items = [];
  let files;
  try {
    files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts");
  } catch (e) {
    errors.push(`artigos: não consegui ler ${ARTICLES_DIR}: ${e.message}`);
    return items;
  }
  for (const file of files) {
    const src = readFileSync(resolve(ARTICLES_DIR, file), "utf8");
    const fileSlug = file.slice(0, -3);
    if (!/export const article: Article = \{/.test(src)) {
      errors.push(`artigos/${fileSlug}: arquivo precisa exportar \`export const article: Article = { ... }\``);
      continue;
    }
    const slug = readField(src, "slug");
    if (slug !== fileSlug) errors.push(`artigos/${fileSlug}: nome do arquivo difere do slug "${slug}"`);
    items.push({
      kind: "artigos",
      slug: fileSlug,
      date: readField(src, "date"),
      updated: readField(src, "updated"),
      title: readField(src, "title"),
      excerpt: readField(src, "excerpt"),
      articleKind: readField(src, "kind"),
      hasKeyPoints: /\n\s*keyPoints:\s*\[/.test(src),
      hasFaq: /\n\s*faq:\s*\[/.test(src),
      hasReview: /\n\s*review:\s*\{/.test(src),
      reviewUrl: (() => {
        const m = /\n\s*review:\s*\{[\s\S]*?\n\s*url:\s*"([^"]*)"/.exec(src);
        return m ? m[1] : "";
      })(),
      reviewScore: (() => {
        const m = /\n\s*review:\s*\{[\s\S]*?\n\s*score:\s*([\d.]+)/.exec(src);
        return m ? Number(m[1]) : null;
      })(),
      content: readContent(src),
      raw: src,
    });
  }
  return items;
}

function extractNews() {
  const items = [];
  let files;
  try {
    files = readdirSync(NEWS_DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts");
  } catch (e) {
    errors.push(`noticias: não consegui ler ${NEWS_DIR}: ${e.message}`);
    return items;
  }
  for (const file of files) {
    const src = readFileSync(resolve(NEWS_DIR, file), "utf8");
    const fileSlug = file.slice(0, -3);
    if (!/export const item: NewsItem = \{/.test(src)) {
      errors.push(`noticias/${fileSlug}: arquivo precisa exportar \`export const item: NewsItem = { ... }\``);
      continue;
    }
    const slug = readField(src, "slug");
    if (slug !== fileSlug) errors.push(`noticias/${fileSlug}: nome do arquivo difere do slug "${slug}"`);
    items.push({
      kind: "noticias",
      slug: fileSlug,
      date: readField(src, "date"),
      title: readField(src, "title"),
      summary: readField(src, "summary"),
      content: readContent(src),
      sourceUrl: readField(src, "sourceUrl"),
      raw: src,
    });
  }
  return items;
}

function check() {
  const articles = extractArticles();
  const news = extractNews();
  const articleSlugs = new Set(articles.map((a) => a.slug));
  const newsSlugs = new Set(news.map((n) => n.slug));

  for (const [label, list] of [["artigos", articles], ["noticias", news]]) {
    const seen = new Map();
    for (const it of list) seen.set(it.slug, (seen.get(it.slug) ?? 0) + 1);
    for (const [slug, n] of seen) if (n > 1) errors.push(`${label}/${slug}: slug duplicado (${n}x)`);
  }

  const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;

  for (const it of [...articles, ...news]) {
    const where = `${it.kind}/${it.slug}`;
    const strict =
      it.kind === "artigos" && (it.date >= STRICT_FROM_DATE || (it.updated && it.updated >= STRICT_FROM_DATE));
    const strictNews = it.kind === "noticias" && it.date >= NEWS_STRICT_FROM_DATE;

    if (!slugRe.test(it.slug)) {
      errors.push(`${where}: slug com caracteres inválidos (use só a-z, 0-9 e hífen, sem acentos)`);
    }
    if (it.slug.length > 90) warnings.push(`${where}: slug com ${it.slug.length} caracteres (ideal < 90)`);
    if (!dateRe.test(it.date)) errors.push(`${where}: date inválida "${it.date}" (use AAAA-MM-DD)`);
    else if (it.date > TODAY) errors.push(`${where}: data no futuro (${it.date} > hoje ${TODAY} em America/Sao_Paulo)`);
    if (it.updated && it.updated < it.date) errors.push(`${where}: updated (${it.updated}) anterior a date (${it.date})`);
    if (!it.title) errors.push(`${where}: sem title`);
    if (it.title.length > 70) warnings.push(`${where}: title com ${it.title.length} caracteres (Google corta em ~60-70)`);
    if (it.kind === "artigos") {
      if (!it.excerpt) errors.push(`${where}: sem excerpt`);
      else if (it.excerpt.length > 180) warnings.push(`${where}: excerpt com ${it.excerpt.length} caracteres (meta description ideal < 160)`);
      if (it.articleKind && it.articleKind !== "guia" && it.articleKind !== "review") {
        errors.push(`${where}: kind inválido "${it.articleKind}"`);
      }
      if (it.articleKind === "review" && !it.hasReview) errors.push(`${where}: kind "review" sem o objeto review`);
      // Todo artigo do site é resenha de livro, com link de afiliado da Amazon Brasil.
      if (it.articleKind !== "review") errors.push(`${where}: todo artigo precisa ser resenha de livro (kind: "review")`);
      if (it.hasReview && !/^https:\/\/www\.amazon\.com\.br\/.*[?&]tag=politicadiaria-20(?:&|$)/.test(it.reviewUrl)) {
        errors.push(`${where}: review.url precisa ser link da Amazon Brasil com tag=politicadiaria-20`);
      }
      if (it.reviewScore !== null && (it.reviewScore < 0 || it.reviewScore > 10)) {
        errors.push(`${where}: review.score fora de 0-10`);
      }
    }
    if (it.kind === "noticias") {
      if (!/^https:\/\//.test(it.sourceUrl)) errors.push(`${where}: sourceUrl precisa ser https`);
      if (!it.summary) errors.push(`${where}: sem summary`);
      if (it.date >= STRICT_FROM_DATE && !it.content) errors.push(`${where}: notícia sem content`);
    }

    if (it.kind === "artigos" && !it.content) {
      errors.push(`${where}: artigo sem content`);
      continue;
    }
    if (!it.content) continue;

    if (/\\/.test(it.content)) errors.push(`${where}: barra invertida/crase escapada dentro de content (não use crase nem \\ no HTML)`);
    const decoded = decodeEntities(it.content);
    for (const { re, label } of FORBIDDEN) {
      if (re.test(it.content) || re.test(decoded)) errors.push(`${where}: HTML proibido (${label})`);
    }
    // Travessão: proibido pelo padrão editorial (marca de texto de máquina).
    const editorial = [it.title, it.excerpt ?? "", it.summary ?? "", it.content].join("\n");
    if (/—/.test(editorial)) {
      const msg = `${where}: travessão (—) no texto; use dois-pontos, vírgula, parênteses ou ponto`;
      if (strict || (it.kind === "noticias" && it.date >= STRICT_FROM_DATE)) errors.push(msg);
      else warnings.push(msg);
    }

    const tagRe = /<\s*\/?\s*([a-zA-Z][a-zA-Z0-9]*)\b/g;
    let t;
    const badTags = new Set();
    while ((t = tagRe.exec(it.content))) {
      const tag = t[1].toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) badTags.add(tag);
    }
    if (badTags.size) errors.push(`${where}: tag(s) não permitida(s): ${[...badTags].join(", ")}`);

    if (/<h1\b/i.test(it.content)) errors.push(`${where}: <h1> no corpo (o título já é o h1)`);

    const hrefRe = /href\s*=\s*["']([^"']*)["']/g;
    let h;
    let external = 0;
    const internalTargets = new Set();
    while ((h = hrefRe.exec(it.content))) {
      const href = h[1].trim();
      if (href.startsWith("/artigos/")) {
        const target = href.slice("/artigos/".length).split(/[#?]/)[0].replace(/\/$/, "");
        if (target === it.slug && it.kind === "artigos") warnings.push(`${where}: link para si mesmo`);
        if (!articleSlugs.has(target)) errors.push(`${where}: link interno quebrado -> ${href}`);
        internalTargets.add(href);
      } else if (href.startsWith("/noticias/")) {
        const target = href.slice("/noticias/".length).split(/[#?]/)[0].replace(/\/$/, "");
        if (!newsSlugs.has(target)) errors.push(`${where}: link interno quebrado -> ${href}`);
        internalTargets.add(href);
      } else if (href.startsWith("/")) {
        internalTargets.add(href);
      } else if (/^https:\/\//i.test(href)) {
        external++;
      } else if (/^http:\/\//i.test(href)) {
        errors.push(`${where}: link externo sem https -> ${href}`);
      } else if (href.startsWith("#") || href.startsWith("mailto:")) {
        // ok
      } else {
        errors.push(`${where}: href suspeito -> ${href}`);
      }
    }

    // Links externos precisam de rel seguro (o renderizador também força, mas o conteúdo deve vir certo).
    const extAnchorRe = /<a\b[^>]*href\s*=\s*["']https?:\/\/[^"']*["'][^>]*>/gi;
    let ea;
    while ((ea = extAnchorRe.exec(it.content))) {
      const tag = ea[0];
      if (!/\brel\s*=\s*["'][^"']*noopener/i.test(tag)) {
        warnings.push(`${where}: link externo sem rel="noopener" -> ${tag.slice(0, 80)}`);
      }
    }

    const srcRe = /<img[^>]*\ssrc\s*=\s*["']([^"']*)["']/gi;
    let s;
    while ((s = srcRe.exec(it.content))) {
      const src = s[1].trim();
      if (!/^(https:\/\/(images\.pexels\.com|pixabay\.com|cdn\.pixabay\.com|upload\.wikimedia\.org|www\.camara\.leg\.br|www\.senado\.leg\.br|legis\.senado\.leg\.br)\/|\/)/i.test(src)) {
        errors.push(`${where}: <img src> fora dos domínios permitidos -> ${src}`);
      }
    }
    const imgNoAlt = /<img\b(?![^>]*\balt\s*=)[^>]*>/i;
    if (imgNoAlt.test(it.content)) errors.push(`${where}: <img> sem alt`);

    if (it.kind === "artigos" || it.kind === "noticias") {
      const words = it.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
      const h2s = (it.content.match(/<h2\b/gi) ?? []).length;
      const uniqueInternal = internalTargets.size;
      const issues = [];
      if (words < MIN_WORDS_STRICT) issues.push(`só ${words} palavras (mínimo ${MIN_WORDS_STRICT})`);
      if (h2s < 3) issues.push(`só ${h2s} <h2>`);
      if (it.kind === "artigos") {
        if (uniqueInternal < MIN_INTERNAL_LINKS) issues.push(`${uniqueInternal} link(s) interno(s) distinto(s) (mínimo ${MIN_INTERNAL_LINKS})`);
        if (external < 1) issues.push("nenhum link externo para fonte");
        if (!it.hasKeyPoints) issues.push("sem keyPoints");
        if (!it.hasFaq) issues.push("sem faq");
      }
      if (issues.length) {
        const msg = `${where}: ${issues.join("; ")}`;
        const isStrict = it.kind === "artigos" ? strict : strictNews;
        if (isStrict) errors.push(msg);
        else if (words < MIN_WORDS_WARN || (it.kind === "artigos" && uniqueInternal < 3)) warnings.push(msg);
      }
    }
  }

  return { articles: articles.length, news: news.length };
}

const stats = check();

for (const w of warnings) console.warn(`aviso: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`ERRO: ${e}`);
  console.error(`\ncheck-content: ${errors.length} erro(s) encontrado(s). Corrija antes de publicar.`);
  process.exit(1);
}
console.log(
  `check-content: ok (${stats.articles} artigos, ${stats.news} notícias, ${warnings.length} aviso(s))`
);
