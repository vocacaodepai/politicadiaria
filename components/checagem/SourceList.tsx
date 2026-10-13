import { sourceKindLabel } from "@/lib/checagens-meta";
import { formatDate } from "@/lib/seo";
import type { FactCheckSource } from "@/lib/types";

/** Fontes numeradas, cada uma com o que confirma. Links externos com rel seguro. */
export function SourceList({ sources }: { sources: FactCheckSource[] }) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {sources.map((s, i) => (
        <li key={s.url} id={`fonte-${i + 1}`} className="flex gap-4 py-4 scroll-mt-24">
          <span
            aria-hidden="true"
            className="w-7 shrink-0 text-right font-display text-2xl font-bold leading-none text-muted"
          >
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
              <span
                className={`border px-1.5 py-0.5 font-bold uppercase tracking-[0.06em] ${
                  s.kind === "primaria" ? "border-foreground text-foreground" : "border-border"
                }`}
              >
                {sourceKindLabel[s.kind]}
              </span>
              <span className="font-semibold text-foreground">{s.publisher}</span>
              {s.published && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={s.published}>{formatDate(s.published, "short")}</time>
                </>
              )}
            </p>
            <a
              href={s.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="mt-1 block break-words font-display text-base font-semibold leading-snug text-accent underline-offset-2 hover:underline"
            >
              {s.label} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <p className="mt-1 text-sm text-muted">{s.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
