import { articles, categories } from "@/lib/articles";
import { news } from "@/lib/news";
import type { SearchItem } from "@/lib/search";

// Índice gerado no build (estático). Só campos públicos, nada de HTML.
export const dynamic = "force-static";

export function GET() {
  const label = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;
  const items: SearchItem[] = [
    ...articles.map((a) => ({
      type: "artigo" as const,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      category: label(a.category),
      date: a.date,
    })),
    ...news.map((n) => ({
      type: "noticia" as const,
      slug: n.slug,
      title: n.title,
      excerpt: n.summary,
      category: "Notícias",
      date: n.date,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return Response.json(
    { generatedAt: new Date().toISOString(), items },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } }
  );
}
