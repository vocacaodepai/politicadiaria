import { site } from "@/lib/articles";
import { feedDate, rssResponse } from "@/lib/feeds";
import { sortedNews } from "@/lib/news";

export const dynamic = "force-static";

export function GET() {
  return rssResponse({
    title: `${site.name}: notícias`,
    description: "Notícias de política do Brasil e do mundo, com fonte primária.",
    path: "/noticias/feed.xml",
    entries: sortedNews()
      .slice(0, 40)
      .map((n) => ({
        title: n.title,
        link: `${site.url}/noticias/${n.slug}`,
        description: n.summary,
        date: feedDate(n.publishedAt, n.date),
        category: "Notícias",
      })),
  });
}
