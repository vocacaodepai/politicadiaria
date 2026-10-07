import Link from "next/link";
import { type Article, getCategory } from "@/lib/articles";
import { CoverImage } from "@/components/CoverImage";
import { formatDate, readingTime } from "@/lib/seo";

/** Bloco "Próximo artigo →" de largura total: card horizontal com a categoria. */
export function NextArticle({ article }: { article?: Article }) {
  if (!article) return null;
  const href = `/artigos/${article.slug}`;
  const label = getCategory(article.category)?.label ?? article.category;
  return (
    <section aria-labelledby="proximo-artigo" className="mt-10">
      <h2 id="proximo-artigo" className="sr-only">
        Próximo artigo
      </h2>
      <article className="group relative isolate grid overflow-hidden rounded-xl border border-border bg-surface card-hover sm:grid-cols-[minmax(0,1fr)_280px]">
        <Link href={href} className="absolute inset-0 z-10" aria-label={`Próximo artigo: ${article.title}`} />
        <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-mono text-accent">Próximo artigo →</span>
            <span className="label-mono rounded-lg border border-border px-2 py-1 text-muted">{label}</span>
          </div>
          <p className="font-display text-xl font-bold leading-tight tracking-tight transition group-hover:text-accent sm:text-2xl">
            {article.title}
          </p>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {formatDate(article.date, "short")} · {readingTime(article.content)} min de leitura
          </p>
        </div>
        <div className="order-first aspect-[16/9] sm:order-none sm:aspect-auto sm:h-full">
          <CoverImage
            query={article.imageQuery}
            seed={article.seed}
            alt=""
            className="h-full w-full"
            sizes="(max-width: 640px) 100vw, 280px"
            showCredit={false}
            label={label}
            override={article.coverImage}
          />
        </div>
      </article>
    </section>
  );
}
