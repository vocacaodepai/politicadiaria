import { site, sortedArticles, categories } from "@/lib/articles";
import { sortedNews } from "@/lib/news";
import { author } from "@/lib/author";

export const dynamic = "force-static";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(iso: string) {
  return new Date(`${iso}T09:00:00-03:00`).toUTCString();
}

export function GET() {
  const label = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;
  const entries = [
    ...sortedArticles().slice(0, 30).map((a) => ({
      title: a.title,
      link: `${site.url}/artigos/${a.slug}`,
      description: a.excerpt,
      date: a.date,
      category: label(a.category),
    })),
    ...sortedNews().slice(0, 30).map((n) => ({
      title: n.title,
      link: `${site.url}/noticias/${n.slug}`,
      description: n.summary,
      date: n.date,
      category: "Notícias",
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 40);

  const items = entries
    .map(
      (e) => `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${e.link}</link>
      <guid isPermaLink="true">${e.link}</guid>
      <pubDate>${rfc822(e.date)}</pubDate>
      <category>${escapeXml(e.category)}</category>
      <dc:creator>${escapeXml(author.name)}</dc:creator>
      <description>${escapeXml(e.description)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>pt-BR</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${site.url}/logo-icon-dark.svg</url>
      <title>${escapeXml(site.name)}</title>
      <link>${site.url}</link>
    </image>
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
