import { site } from "@/lib/articles";
import { author } from "@/lib/author";
import { RESUMO_PATH, getResumo, resumoDays, resumoPath } from "@/lib/resumo";
import { dayLabel } from "@/lib/timeline";

/*
 * Feed do resumo diário: um item por dia, com as notícias agrupadas por tópico.
 * Estático como /feed.xml: cada publicação gera um deploy, que recria o feed.
 */
export const dynamic = "force-static";

const DAYS = 30;

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = resumoDays()
    .slice(0, DAYS)
    .map((day) => getResumo(day))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => {
      const link = `${site.url}${resumoPath(r.day)}`;
      const html = [
        ...r.groups.map(
          (g) =>
            `<h2>${escapeXml(g.label)}</h2><ul>${g.entries
              .map(
                ({ t, news }) =>
                  `<li><a href="${site.url}${t.href}">${escapeXml(news.title)}</a>${t.time ? ` (${t.time})` : ""}<br/>${escapeXml(news.summary)}</li>`
              )
              .join("")}</ul>`
        ),
        ...(r.checagens.length
          ? [
              `<h2>Checagem</h2><ul>${r.checagens
                .map((c) => `<li><a href="${site.url}${c.href}">${escapeXml(c.title)}</a></li>`)
                .join("")}</ul>`,
            ]
          : []),
      ].join("");
      return `    <item>
      <title>${escapeXml(`Resumo do dia ${dayLabel(r.day)}: ${r.totalNoticias} ${r.totalNoticias === 1 ? "notícia" : "notícias"}`)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(r.updatedAt).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(author.name)}</dc:creator>
      <description>${escapeXml(html)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${site.name}: resumo do dia`)}</title>
    <link>${site.url}${RESUMO_PATH}</link>
    <description>Um item por dia com todas as notícias da Política Diária, agrupadas por tópico.</description>
    <language>pt-BR</language>
    <atom:link href="${site.url}${RESUMO_PATH}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
