/**
 * API de leitura dos temas ("Siga este tema", /temas).
 *
 * O mapeamento tema -> notícias vive em content/temas.ts, separado das notícias.
 * Slug que não existir em content/news/ é ignorado aqui e barrado pelo
 * `npm run check:content`.
 */
import { temas as allTemas } from "@/content/temas";
import { getNewsBySlug, type NewsItem } from "@/lib/news";
import type { Tema } from "@/lib/types";

export type { Tema } from "@/lib/types";

export const TEMAS_PATH = "/temas";

export function temaPath(slug: string): string {
  return `${TEMAS_PATH}/${slug}`;
}

/** Instante para ordenar: `publishedAt`, ou o meio-dia de `date`. */
function newsTime(n: NewsItem): number {
  const t = n.publishedAt ? Date.parse(n.publishedAt) : Number.NaN;
  return Number.isNaN(t) ? Date.parse(`${n.date}T12:00:00-03:00`) : t;
}

export type TemaResolved = Tema & {
  /** Notícias do tema em ordem cronológica (mais antiga primeiro). */
  items: NewsItem[];
  first?: NewsItem;
  last?: NewsItem;
};

function resolve(t: Tema): TemaResolved {
  const items = [...new Set(t.noticias)]
    .map((s) => getNewsBySlug(s))
    .filter((n): n is NewsItem => Boolean(n))
    .sort((a, b) => newsTime(a) - newsTime(b) || a.slug.localeCompare(b.slug));
  return { ...t, items, first: items[0], last: items[items.length - 1] };
}

/** Todos os temas com notícias, o atualizado mais recentemente primeiro. */
export const temas: TemaResolved[] = allTemas
  .map(resolve)
  .filter((t) => t.items.length > 0)
  .sort((a, b) => newsTime(b.last as NewsItem) - newsTime(a.last as NewsItem) || a.slug.localeCompare(b.slug));

const bySlug = new Map(temas.map((t) => [t.slug, t]));

export function getTemaBySlug(slug: string): TemaResolved | undefined {
  return bySlug.get(slug);
}

/** Temas de que uma notícia faz parte. */
export function temasDaNoticia(newsSlug: string): TemaResolved[] {
  return temas.filter((t) => t.items.some((n) => n.slug === newsSlug));
}
