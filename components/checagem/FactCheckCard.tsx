import Link from "next/link";
import { checagemPath, checagemUpdated } from "@/lib/checagens-meta";
import { formatDate } from "@/lib/seo";
import type { FactCheck } from "@/lib/types";
import { VerdictSeal } from "./VerdictSeal";

/** Campos da checagem necessários para o card (serializável para componentes de cliente). */
export type FactCheckCardData = Pick<FactCheck, "slug" | "title" | "summary" | "verdict" | "date" | "topic"> & {
  updated: string;
  sourceCount: number;
  claim: string;
};

export function toCardData(c: FactCheck): FactCheckCardData {
  return {
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    verdict: c.verdict,
    date: c.date,
    topic: c.topic,
    updated: checagemUpdated(c),
    sourceCount: c.sources.length,
    claim: c.claim.text,
  };
}

export function FactCheckCard({
  item,
  featured = false,
}: {
  item: FactCheckCardData;
  featured?: boolean;
}) {
  const href = checagemPath(item.slug);
  return (
    <article
      className={`group relative border-t-2 border-foreground bg-surface ${
        featured ? "p-5 sm:p-8" : "p-4 sm:p-5"
      } transition hover:bg-surface-2`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <VerdictSeal verdict={item.verdict} />
        <span className="label-mono text-muted">{item.topic}</span>
      </div>
      <h3
        className={`mt-3 font-display font-bold leading-tight tracking-tight ${
          featured ? "text-2xl sm:text-4xl" : "text-xl"
        }`}
      >
        <Link
          href={href}
          className="transition group-hover:text-accent after:absolute after:inset-0 after:content-['']"
        >
          {item.title}
        </Link>
      </h3>
      <p className={`mt-2 text-muted ${featured ? "text-base sm:text-lg" : "text-sm"}`}>{item.summary}</p>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
        <time dateTime={item.date}>Checado em {formatDate(item.date, "short")}</time>
        {item.updated !== item.date && (
          <>
            <span aria-hidden="true">·</span>
            <time dateTime={item.updated}>Atualizado em {formatDate(item.updated, "short")}</time>
          </>
        )}
        <span aria-hidden="true">·</span>
        <span>
          Checado em {item.sourceCount} {item.sourceCount === 1 ? "fonte" : "fontes"}
        </span>
      </p>
    </article>
  );
}
