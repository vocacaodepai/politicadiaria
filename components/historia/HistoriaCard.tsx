import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
import { getPeriod, historiaPath } from "@/lib/historia-meta";
import { newsImageSeed } from "@/lib/news";
import type { HistoryArticle } from "@/lib/types";

/** Card de artigo de História: miniatura (cascata de imagens real), período, título e resumo. */
export function HistoriaCard({ item, featured = false }: { item: HistoryArticle; featured?: boolean }) {
  const period = getPeriod(item.period);
  return (
    <article
      className={`group relative flex gap-4 border-t-2 border-foreground bg-surface p-4 transition hover:bg-surface-2 sm:p-5 ${
        featured ? "flex-col md:flex-row md:gap-6" : "flex-col sm:flex-row"
      }`}
    >
      <div className={`shrink-0 ${featured ? "md:w-[46%]" : "sm:w-40"}`}>
        <CoverImage
          query={item.imageQuery}
          seed={newsImageSeed(item.slug)}
          alt=""
          showCredit={false}
          label={String(item.year)}
          className={`w-full ${featured ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-[4/3]"}`}
        />
      </div>
      <div className="min-w-0">
        <p className="label-mono flex flex-wrap items-center gap-x-2 text-muted">
          <span className="text-accent">{period?.label}</span>
          <span aria-hidden="true">·</span>
          <span>{item.year}</span>
        </p>
        <h3
          className={`mt-1.5 font-display font-bold leading-tight tracking-tight ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          <Link
            href={historiaPath(item.slug)}
            className="transition group-hover:text-accent after:absolute after:inset-0 after:content-['']"
          >
            {item.title}
          </Link>
        </h3>
        <p className={`mt-2 text-muted ${featured ? "text-base sm:text-lg" : "text-sm"}`}>{item.summary}</p>
      </div>
    </article>
  );
}
