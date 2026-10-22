import { site } from "@/lib/articles";
import { author } from "@/lib/author";

export type FeedEntry = { title: string; link: string; description: string; date: Date; category: string };

export function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Data ISO (com ou sem hora) para Date; sem hora, 09:00 de Brasília. */
export function feedDate(iso: string | undefined, fallbackDay: string): Date {
  const d = iso ? new Date(iso) : new Date(NaN);
  return Number.isNaN(d.getTime()) ? new Date(`${fallbackDay}T09:00:00-03:00`) : d;
}

export function rssResponse(opts: { title: string; description: string; path: string; entries: FeedEntry[] }) {
  const entries = [...opts.entries].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 40);
  const items = entries
    .map(
      (e) => `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${e.link}</link>
      <guid isPermaLink="true">${e.link}</guid>
      <pubDate>${e.date.toUTCString()}</pubDate>
      <category>${escapeXml(e.category)}</category>
      <dc:creator>${escapeXml(author.name)}</dc:creator>
      <description>${escapeXml(e.description)}</description>
    </item>`
    )
    .join("\n");
  const last = entries[0]?.date ?? new Date();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(opts.title)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(opts.description)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${last.toUTCString()}</lastBuildDate>
    <atom:link href="${site.url}${opts.path}" rel="self" type="application/rss+xml"/>
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
