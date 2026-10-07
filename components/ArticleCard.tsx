import Link from "next/link";
import { type Article, categories } from "@/lib/articles";
import { formatDate, readingTime } from "@/lib/seo";
import { CoverImage } from "./CoverImage";

type Variant = "default" | "featured" | "horizontal" | "compact";

function categoryLabel(slug: string) {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

function ReviewBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-ink/80 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
      <span className="text-accent-2">★</span>
      {score.toFixed(1)}
    </span>
  );
}

/**
 * Card de artigo em 4 variantes:
 * - default: vertical, imagem 16/10 (grids)
 * - featured: destaque grande com texto sobre a imagem (hero da home)
 * - horizontal: imagem à esquerda (40%) + texto (secundários do hero, listas)
 * - compact: miniatura 96px + título (sidebar, "continue lendo" no mobile)
 */
export function ArticleCard({
  article,
  variant = "default",
  priority = false,
  headingLevel = "h3",
  showExcerpt = true,
  className = "",
}: {
  article: Article;
  variant?: Variant;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  showExcerpt?: boolean;
  className?: string;
}) {
  const Heading = headingLevel;
  const href = `/artigos/${article.slug}`;
  const label = categoryLabel(article.category);
  const minutes = readingTime(article.content);
  const score = article.review?.score;
  const hasScore = typeof score === "number";

  if (variant === "featured") {
    return (
      <article
        className={`group relative isolate flex flex-col overflow-hidden rounded-xl border border-border bg-ink text-white card-hover ${className}`}
      >
        <Link href={href} className="absolute inset-0 z-10" aria-label={article.title} />
        <div className="aspect-[16/10] flex-1 sm:aspect-[16/9] lg:aspect-auto lg:min-h-[22rem]">
          <CoverImage
            query={article.imageQuery}
            seed={article.seed}
            alt={article.title}
            className="h-full w-full"
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 66vw"
            showCredit={false}
            override={article.coverImage}
            label={label}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/5" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="label-mono rounded-md bg-white/10 px-2 py-1 text-white backdrop-blur-sm">
              {label}
            </span>
            {hasScore && <ReviewBadge score={score} />}
          </div>
          <Heading className="mt-3 max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
            {article.title}
          </Heading>
          {showExcerpt && (
            <p className="mt-3 hidden max-w-2xl text-sm leading-relaxed text-white/80 sm:line-clamp-2 sm:block sm:text-base">
              {article.excerpt}
            </p>
          )}
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-white/70">
            {formatDate(article.date, "short")} · {minutes} min de leitura
          </p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group flex gap-3">
        <Link href={href} className="relative block h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border" tabIndex={-1} aria-hidden="true">
          <CoverImage
            query={article.imageQuery}
            seed={article.seed}
            alt=""
            className="h-full w-full"
            sizes="96px"
            showCredit={false}
            override={article.coverImage}
          />
        </Link>
        <div className="min-w-0">
          <span className="label-mono text-accent">{label}</span>
          <Heading className="mt-0.5 line-clamp-2 font-display text-[15px] font-semibold leading-snug">
            <Link href={href} className="transition hover:text-accent">
              {article.title}
            </Link>
          </Heading>
          <p className="mt-1 font-mono text-[11px] text-muted">{minutes} min</p>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group grid grid-cols-[40%_1fr] overflow-hidden rounded-xl border border-border bg-surface card-hover">
        <Link href={href} className="relative block h-full min-h-[128px] overflow-hidden" tabIndex={-1} aria-hidden="true">
          <CoverImage
            query={article.imageQuery}
            seed={article.seed}
            alt=""
            className="h-full w-full"
            sizes="(max-width: 1024px) 40vw, 160px"
            showCredit={false}
            override={article.coverImage}
            label={label}
          />
        </Link>
        <div className="flex flex-col justify-center gap-1.5 p-4">
          <div className="flex items-center gap-2">
            <span className="label-mono text-accent">{label}</span>
            {hasScore && <ReviewBadge score={score} />}
          </div>
          <Heading className="line-clamp-3 font-display text-base font-semibold leading-snug">
            <Link href={href} className="transition group-hover:text-accent">
              {article.title}
            </Link>
          </Heading>
          <p className="font-mono text-[11px] text-muted">
            {formatDate(article.date, "short")} · {minutes} min
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface card-hover"
      data-review-tool={article.review?.tool}
    >
      <Link href={href} className="relative block aspect-[16/10] w-full overflow-hidden" tabIndex={-1} aria-hidden="true">
        <CoverImage
          query={article.imageQuery}
          seed={article.seed}
          alt=""
          className="h-full w-full"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          showCredit={false}
          label={label}
          override={article.coverImage}
        />
        <span className="label-mono absolute left-3 top-3 rounded-md bg-ink/70 px-2 py-1 text-white backdrop-blur-sm">
          {label}
        </span>
        {hasScore && (
          <span className="absolute right-3 top-3">
            <ReviewBadge score={score} />
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <Heading className="line-clamp-2 font-display text-lg font-semibold leading-snug tracking-tight">
          <Link href={href} className="transition group-hover:text-accent">
            {article.title}
          </Link>
        </Heading>
        {showExcerpt && <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>}
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {formatDate(article.date, "short")} · {minutes} min de leitura
        </p>
      </div>
    </article>
  );
}
