/**
 * API de leitura das notícias.
 *
 * Cada notícia é um arquivo em content/news/<slug>.ts, reunido por
 * content/news/index.ts (gerado por scripts/build-content-index.mjs).
 * Notícias nunca são apagadas: URL indexada é URL que continua no ar.
 */
import { articles } from "@/content/articles";
import { news as allNews } from "@/content/news";
import type { NewsItem } from "@/lib/types";

export type { NewsItem, NewsFaqItem, NewsQuizQuestion, NewsTopic } from "@/lib/types";
export { newsTopics } from "@/lib/types";

/** Todas as notícias, mais recentes primeiro (ordem definida pelo índice gerado). */
export const news: NewsItem[] = allNews;

const bySlug = new Map(news.map((n) => [n.slug, n]));

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return bySlug.get(slug);
}

/**
 * Seed estável pra escolher a foto de capa (CoverImage) de uma notícia, que
 * não tem o campo `seed` sequencial do Article. Hash simples (djb2) da slug
 * inteira, não só o tamanho: duas notícias de tamanho de slug igual não
 * podem cair no mesmo índice do resultado de busca e repetir a mesma foto.
 */
export function newsImageSeed(slug: string): number {
  let hash = 5381;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 33) ^ slug.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function sortedNews(): NewsItem[] {
  return [...news].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

let popularityCache: Map<string, number> | null = null;

/**
 * "Mais lidas" sem analytics: nº de links internos recebidos de artigos e de
 * outras notícias. Mesmo proxy de relevância usado em getPopularArticles
 * (lib/articles.ts), aplicado a notícia.
 */
function newsPopularityCounts(): Map<string, number> {
  if (!popularityCache) {
    const counts = new Map<string, number>();
    const re = /href="\/noticias\/([a-z0-9-]+)"/g;
    const sources: { slug: string; content?: string }[] = [...articles, ...news];
    for (const a of sources) {
      if (!a.content) continue;
      let m: RegExpExecArray | null;
      const seen = new Set<string>();
      while ((m = re.exec(a.content))) {
        if (m[1] !== a.slug && !seen.has(m[1])) {
          seen.add(m[1]);
          counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
        }
      }
    }
    popularityCache = counts;
  }
  return popularityCache;
}

export function newsPopularity(slug: string): number {
  return newsPopularityCounts().get(slug) ?? 0;
}

/** Agrupa por dia, mantendo a ordem (mais recente primeiro). */
export function groupNewsByDay(items: NewsItem[]): { date: string; items: NewsItem[] }[] {
  const groups: { date: string; items: NewsItem[] }[] = [];
  for (const n of items) {
    const last = groups[groups.length - 1];
    if (last && last.date === n.date) last.items.push(n);
    else groups.push({ date: n.date, items: [n] });
  }
  return groups;
}

const STOP = new Set(
  "a o e de da do das dos em no na nos nas um uma por para com sem que se ao aos à às os as ia e-ia como sobre mais menos após entre contra".split(" ")
);

function tokens(text: string): Set<string> {
  return new Set(
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 2 && !STOP.has(t))
  );
}

/** Notícias relacionadas por sobreposição de termos do título, desempate por recência. */
export function getRelatedNews(current: NewsItem, limit = 4): NewsItem[] {
  const base = tokens(current.title);
  return sortedNews()
    .filter((n) => n.slug !== current.slug)
    .map((n) => {
      let score = 0;
      for (const t of tokens(n.title)) if (base.has(t)) score++;
      return { n, score };
    })
    .sort((a, b) => b.score - a.score || b.n.date.localeCompare(a.n.date))
    .slice(0, limit)
    .map((x) => x.n);
}
