import { getHistoriaBySlug, getPeriod, historia } from "@/lib/historia";
import { OG_SIZE, renderOgImage } from "@/lib/og";
import { formatDate } from "@/lib/seo";

export const alt = "Capa do artigo de História na Política Diária";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return historia.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getHistoriaBySlug(slug);
  const title = a?.title ?? "História | Política Diária";
  const period = a ? getPeriod(a.period)?.label : undefined;
  const byline = a ? `${period ?? "História"} · ${formatDate(a.date, "short")}` : undefined;
  return renderOgImage({ title, eyebrow: "História", byline });
}
