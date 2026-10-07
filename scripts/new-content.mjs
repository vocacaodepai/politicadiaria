#!/usr/bin/env node
/**
 * Cria o esqueleto de um artigo ou notícia com data de hoje (America/Sao_Paulo)
 * e seed sequencial, já no formato de content/<tipo>/<slug>.ts.
 *
 *   npm run content:new -- artigo <slug> <categoria>
 *   npm run content:new -- noticia <slug>
 *
 * Depois é só preencher os campos e rodar `npm run check:content`.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const [kind, slug, category] = process.argv.slice(2);
const AMAZON_TAG = "politicadiaria-20";
const CATEGORIES = ["politica-brasileira", "politica-internacional", "historia-politica", "ideias-politicas", "economia-e-estado", "democracia-e-instituicoes", "biografias"];

function die(msg) {
  console.error(`new-content: ${msg}`);
  process.exit(1);
}

if (!["artigo", "noticia"].includes(kind)) die("uso: artigo <slug> <categoria> | noticia <slug>");
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) die("slug inválido (só a-z, 0-9 e hífen, sem acentos)");
if (kind === "artigo" && !CATEGORIES.includes(category)) die(`categoria inválida; use uma de: ${CATEGORIES.join(", ")}`);

const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const dir = resolve(ROOT, kind === "artigo" ? "content/articles" : "content/news");
const file = resolve(dir, `${slug}.ts`);
if (existsSync(file)) die(`já existe: ${file}`);

const nowSp = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}).format(new Date()).replace(" ", "T");

let body;
if (kind === "artigo") {
  let maxSeed = -1;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".ts") || f === "index.ts") continue;
    const m = /\n\s*seed:\s*(\d+)/.exec(readFileSync(resolve(dir, f), "utf8"));
    if (m) maxSeed = Math.max(maxSeed, Number(m[1]));
  }
  body = `import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "${slug}",
  title: "",
  seoTitle: "",
  excerpt: "",
  metaDescription: "",
  category: "${category}",
  date: "${today}",
  readTime: 7,
  imageQuery: "",
  seed: ${maxSeed + 1},
  kind: "review",
  author: "Equipe Política Diária",
  keyPoints: ["", "", ""],
  sources: [{ label: "", url: "https://" }],
  review: {
    tool: "",
    bookAuthor: "",
    publisher: "",
    year: 2026,
    pages: 0,
    score: 0,
    criteria: [
      { label: "Clareza", score: 0 },
      { label: "Profundidade", score: 0 },
      { label: "Rigor e fontes", score: 0 },
      { label: "Atualidade", score: 0 },
      { label: "Leitura", score: 0 },
    ],
    pros: [""],
    cons: [""],
    price: "",
    bestFor: "",
    url: "https://www.amazon.com.br/dp/ISBN10?tag=${AMAZON_TAG}",
    affiliate: true,
    ctaLabel: "Ver o livro na Amazon",
  },
  content: \`
    <p></p>
  \`,
  faq: [{ question: "", answer: "" }],
};
`;
} else {
  body = `import type { NewsItem } from "@/lib/types";

export const item: NewsItem = {
  slug: "${slug}",
  title: "",
  summary: "",
  author: "Equipe Política Diária",
  sourceName: "",
  sourceUrl: "https://",
  date: "${today}",
  publishedAt: "${nowSp}-03:00",
  topic: "brasil",
  imageQuery: "",
  content: \`
    <p></p>
  \`,
};
`;
}

writeFileSync(file, body);
console.log(`new-content: criado ${file.replace(ROOT + "/", "")} (date ${today})`);
