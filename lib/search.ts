/** Busca client-side simples (sem dependência externa) sobre o índice estático /search-index.json. */
export type SearchType = "artigo" | "noticia" | "checagem" | "parlamentar";

export type SearchItem = {
  type: SearchType;
  slug: string;
  title: string;
  /** Resumo curto. */
  excerpt: string;
  /** Tópico para exibição e filtro (tópico da notícia, tema do livro, tema da checagem, casa legislativa). */
  category: string;
  /** AAAA-MM-DD; vazio para parlamentares (sem data). */
  date: string;
  /** Caminho quando não segue o padrão do tipo (parlamentares). */
  path?: string;
};

export const typeLabels: Record<SearchType, string> = {
  noticia: "Notícias",
  checagem: "Checagens",
  artigo: "Resenhas",
  parlamentar: "Parlamentares",
};

export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export type SearchFilters = { types?: SearchType[]; topic?: string; from?: string; to?: string };

export function applyFilters(items: SearchItem[], f: SearchFilters): SearchItem[] {
  return items.filter((i) => {
    if (f.types && f.types.length && !f.types.includes(i.type)) return false;
    if (f.topic && i.category !== f.topic) return false;
    if (f.from || f.to) {
      if (!i.date) return false;
      if (f.from && i.date < f.from) return false;
      if (f.to && i.date > f.to) return false;
    }
    return true;
  });
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
  if (item.path) return item.path;
  if (item.type === "artigo") return `/artigos/${item.slug}`;
  if (item.type === "checagem") return `/checagem/${item.slug}`;
  return `/noticias/${item.slug}`;
}

/** Rótulo curto da linha de resultado. */
export function resultLabel(item: SearchItem): string {
  const t = typeLabels[item.type].replace(/s$/, "");
  return item.type === "noticia" || item.type === "artigo" ? `${t} · ${item.category}` : item.type === "checagem" ? `Checagem · ${item.category}` : item.category;
}
