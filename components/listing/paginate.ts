/** Paginação das listagens: 12 artigos ou 30 notícias por página. */
export const ARTICLES_PER_PAGE = 12;
export const NEWS_PER_PAGE = 30;

export function countPages(total: number, perPage: number): number {
  return Math.max(1, Math.ceil(total / perPage));
}

export function slicePage<T>(items: T[], page: number, perPage: number): T[] {
  return items.slice((page - 1) * perPage, page * perPage);
}

/** Converte o segmento [page] em número; null quando não é um inteiro positivo. */
export function parsePage(raw: string): number | null {
  if (!/^[1-9]\d*$/.test(raw)) return null;
  const n = Number(raw);
  return Number.isSafeInteger(n) ? n : null;
}

/** Params de todas as páginas (1..total) para generateStaticParams. */
export function pageParams(total: number): { page: string }[] {
  return Array.from({ length: total }, (_, i) => ({ page: String(i + 1) }));
}

/** "91 artigos", "1 notícia". */
export function countLabel(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
