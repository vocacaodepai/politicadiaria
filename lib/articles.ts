/**
 * API de leitura dos artigos.
 *
 * Os artigos ficam em content/articles/<slug>.ts (um arquivo por artigo) e são
 * reunidos por content/articles/index.ts, gerado por scripts/build-content-index.mjs.
 * Este módulo só expõe tipos, constantes do site e funções de consulta.
 */
import { articles as allArticles } from "@/content/articles";
import type { Article, Category } from "@/lib/types";
import { categories } from "@/lib/types";

export type { Article, Category, FaqItem, QuizQuestion, ReviewData } from "@/lib/types";
export { categories } from "@/lib/types";

export const site = {
  name: "Política Diária",
  tagline: "Política nacional e internacional, o Congresso por dentro e livros que ajudam a entender o poder",
  description:
    "A Política Diária traz notícias de política nacional e internacional todos os dias, mostra quem são os 594 parlamentares do Congresso Nacional, como votam e quanto custam, e indica os melhores livros de política com resenha e nota.",
  url: "https://www.politicadiaria.com.br",
  locale: "pt_BR",
  /** Ano de fundação, usado no rodapé e no schema Organization. */
  foundingYear: 2026,
  /** Tag de afiliado da Amazon Brasil (Associados). */
  amazonTag: "politicadiaria-20",
} as const;

/** Todos os artigos, mais recentes primeiro (ordem definida pelo índice gerado). */
export const articles: Article[] = allArticles;

const bySlug = new Map(articles.map((a) => [a.slug, a]));

export function getArticleBySlug(slug: string): Article | undefined {
  return bySlug.get(slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function isCategory(slug: string): slug is Category {
  return categories.some((c) => c.slug === slug);
}

function byDateDesc(a: Article, b: Article) {
  return b.date.localeCompare(a.date) || b.seed - a.seed;
}

/** Artigos ordenados do mais novo para o mais antigo. */
export function sortedArticles(): Article[] {
  return [...articles].sort(byDateDesc);
}

export function getArticlesByCategory(category: string): Article[] {
  return sortedArticles().filter((a) => a.category === category);
}

/** Resenhas de livros (todo artigo do site é uma resenha). */
export function getReviews(): Article[] {
  return sortedArticles().filter((a) => a.kind === "review");
}

/** Categorias mostradas no filtro de /artigos e /categoria/[slug]. */
export const articleFilterCategories = categories;

/**
 * Relacionados: primeiro os da mesma categoria (mais novos primeiro), depois
 * completa com os demais, sempre sem repetir o artigo atual.
 */
export function getRelatedArticles(current: Article, limit = 3): Article[] {
  const others = sortedArticles().filter((a) => a.slug !== current.slug);
  const same = others.filter((a) => a.category === current.category);
  const rest = others.filter((a) => a.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

/** Próximo artigo da mesma categoria (o publicado logo antes do atual). */
export function getNextArticle(current: Article): Article | undefined {
  const list = getArticlesByCategory(current.category);
  const i = list.findIndex((a) => a.slug === current.slug);
  if (i === -1) return undefined;
  return list[i + 1] ?? list.find((a) => a.slug !== current.slug);
}

let popularCache: Article[] | null = null;

/**
 * "Mais lidos" sem analytics: os artigos que mais recebem links internos de
 * outros artigos. É um bom proxy de relevância editorial e é determinístico.
 */
export function getPopularArticles(limit = 5): Article[] {
  if (!popularCache) {
    const counts = new Map<string, number>();
    const re = /href="\/artigos\/([a-z0-9-]+)"/g;
    for (const a of articles) {
      let m: RegExpExecArray | null;
      const seen = new Set<string>();
      while ((m = re.exec(a.content))) {
        if (m[1] !== a.slug && !seen.has(m[1])) {
          seen.add(m[1]);
          counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
        }
      }
    }
    popularCache = [...articles]
      .sort(
        (a, b) =>
          (counts.get(b.slug) ?? 0) - (counts.get(a.slug) ?? 0) || byDateDesc(a, b)
      )
      .filter((a) => bySlug.has(a.slug));
  }
  return popularCache.slice(0, limit);
}

/** Contagem de artigos por categoria (para chips e sidebar). */
export function countByCategory(): Record<Category, number> {
  const out = Object.fromEntries(categories.map((c) => [c.slug, 0])) as Record<Category, number>;
  for (const a of articles) out[a.category]++;
  return out;
}

/** Palavras do corpo (sem tags), usado no schema e em auditorias. */
export function wordCount(html: string): number {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}
