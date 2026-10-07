import { articles, getArticleBySlug, getCategory } from "@/lib/articles";
import { author } from "@/lib/author";
import { OG_SIZE, renderOgImage } from "@/lib/og";
import { formatDate } from "@/lib/seo";

export const alt = "Capa do artigo na Política Diária";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title ?? "Política Diária";
  const label = article ? (getCategory(article.category)?.label ?? article.category) : undefined;
  const eyebrow = article?.kind === "review" ? "Review" : label;
  const byline = article
    ? `Por ${article.author ?? author.name} · ${formatDate(article.date, "short")}`
    : undefined;

  return renderOgImage({ title, eyebrow, byline });
}
