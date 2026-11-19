import { BookCoverImage } from "@/components/article/BookCoverImage";
import { CoverImage } from "@/components/CoverImage";
import type { Article } from "@/lib/articles";

/**
 * Capa de um artigo nos cartões e listas: a foto do livro (`review.productImage`) quando existe;
 * sem ela, ou se ela falhar, a capa por `imageQuery`.
 */
export function ArticleCover({
  article,
  className = "",
  sizes,
  priority = false,
  label,
  alt = "",
}: {
  article: Article;
  className?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
  alt?: string;
}) {
  const fallback = (
    <CoverImage
      query={article.imageQuery}
      seed={article.seed}
      alt={alt}
      className={className}
      priority={priority}
      sizes={sizes}
      showCredit={false}
      label={label}
      override={article.coverImage}
    />
  );
  const image = article.review?.productImage;
  if (!image) return fallback;
  return <BookCoverImage image={image} alt={alt} fallback={fallback} priority={priority} sizes={sizes} className={className} />;
}
