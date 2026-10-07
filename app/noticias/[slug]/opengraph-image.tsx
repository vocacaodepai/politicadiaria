import { getNewsBySlug, news } from "@/lib/news";
import { OG_SIZE, renderOgImage } from "@/lib/og";
import { formatDate } from "@/lib/seo";

export const alt = "Capa da notícia na Política Diária";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  const title = item?.title ?? "Política Diária";
  const byline = item ? `via ${item.sourceName} · ${formatDate(item.date, "short")}` : undefined;

  return renderOgImage({ title, eyebrow: "Notícia", byline });
}
