import { categories, site, sortedArticles } from "@/lib/articles";
import { feedDate, rssResponse } from "@/lib/feeds";

export const dynamic = "force-static";

export function GET() {
  const label = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;
  return rssResponse({
    title: `${site.name}: resenhas de livros`,
    description: "Resenhas de livros de política, com nota de 0 a 10.",
    path: "/artigos/feed.xml",
    entries: sortedArticles()
      .slice(0, 40)
      .map((a) => ({
        title: a.title,
        link: `${site.url}/artigos/${a.slug}`,
        description: a.excerpt,
        date: feedDate(undefined, a.date),
        category: label(a.category),
      })),
  });
}
