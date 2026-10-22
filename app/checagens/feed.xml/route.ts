import { site } from "@/lib/articles";
import { checagemPath, sortedChecagens, verdictMeta } from "@/lib/checagens";
import { feedDate, rssResponse } from "@/lib/feeds";

export const dynamic = "force-static";

export function GET() {
  return rssResponse({
    title: `${site.name}: checagens`,
    description: "Verificação de boatos e notícias falsas, com veredito e fontes numeradas.",
    path: "/checagens/feed.xml",
    entries: sortedChecagens()
      .slice(0, 40)
      .map((c) => ({
        title: `${verdictMeta[c.verdict].label}: ${c.title}`,
        link: `${site.url}${checagemPath(c.slug)}`,
        description: c.summary,
        date: feedDate(c.checkedAt, c.date),
        category: "Checagem",
      })),
  });
}
