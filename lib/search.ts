/** Busca client-side simples (sem dependência externa) sobre o índice estático. */
export type SearchItem = {
  type: "artigo" | "noticia";
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
};

export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function searchItems(items: SearchItem[], query: string, limit = 12): SearchItem[] {
  const tokens = normalize(query).split(/\s+/).filter((t) => t.length > 1);
  if (tokens.length === 0) return [];
  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of items) {
    const title = normalize(item.title);
    const excerpt = normalize(item.excerpt);
    const category = normalize(item.category);
    let score = 0;
    let all = true;
    for (const t of tokens) {
      let s = 0;
      if (title.includes(t)) s += title.startsWith(t) ? 5 : 3;
      if (excerpt.includes(t)) s += 1;
      if (category.includes(t)) s += 1;
      if (s === 0) {
        all = false;
        break;
      }
      score += s;
    }
    if (all) scored.push({ item, score: score + (item.type === "artigo" ? 0.5 : 0) });
  }
  return scored
    .sort((a, b) => b.score - a.score || b.item.date.localeCompare(a.item.date))
    .slice(0, limit)
    .map((s) => s.item);
}

export function hrefFor(item: SearchItem): string {
  return item.type === "artigo" ? `/artigos/${item.slug}` : `/noticias/${item.slug}`;
}
