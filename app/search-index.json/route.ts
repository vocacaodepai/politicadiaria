import { articles, categories } from "@/lib/articles";
import { sortedChecagens, checagemPath } from "@/lib/checagens";
import { getDeputiesIndex, getSenatorsIndex, hasCongressData } from "@/lib/congress";
import { news } from "@/lib/news";
import { newsTopics } from "@/lib/types";
import type { SearchItem } from "@/lib/search";

// Índice gerado no build (estático). Só campos públicos, nada de HTML.
// Tipos: artigo (resenha), noticia, checagem e parlamentar (sem data).
export const dynamic = "force-static";

export function GET() {
  const label = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;
  const topicLabel = (slug?: string) => newsTopics.find((t) => t.slug === slug)?.label ?? "Notícias";
  const dated: SearchItem[] = [
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
      category: topicLabel(n.topic),
      date: n.date,
    })),
    ...sortedChecagens().map((c) => ({
      type: "checagem" as const,
      slug: c.slug,
      title: c.title,
      excerpt: c.summary,
      category: c.topic,
      date: c.date,
      path: checagemPath(c.slug),
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const people: SearchItem[] = hasCongressData()
    ? [
        ...getDeputiesIndex().map((d) => ({
          type: "parlamentar" as const,
          slug: d.slug,
          title: d.nome,
          excerpt: `Deputado(a) federal · ${d.partido} · ${d.uf}`,
          category: "Deputados federais",
          date: "",
          path: `/congresso/deputados/${d.slug}`,
        })),
        ...getSenatorsIndex().map((d) => ({
          type: "parlamentar" as const,
          slug: d.slug,
          title: d.nome,
          excerpt: `Senador(a) · ${d.partido} · ${d.uf}`,
          category: "Senadores",
          date: "",
          path: `/congresso/senadores/${d.slug}`,
        })),
      ]
    : [];

  return Response.json(
    { generatedAt: new Date().toISOString(), items: [...dated, ...people] },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } }
  );
}
