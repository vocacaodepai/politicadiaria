import type { NewsSource } from "@/lib/sources";

/**
 * Caixa "Fontes desta notícia": gerada a partir dos dados (fonte original e
 * links externos do corpo), nunca escrita à mão no texto da notícia.
 */
export function NewsSources({ sources, className = "" }: { sources: NewsSource[]; className?: string }) {
  if (sources.length === 0) return null;
  const original = sources.find((s) => s.original);
  const primaryCount = sources.filter((s) => s.primary).length;

  return (
    <section
      aria-labelledby="fontes-da-noticia"
      className={`rounded-xl border border-border border-t-[3px] border-t-foreground bg-surface ${className}`}
    >
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div className="min-w-0">
          <p className="label-mono text-muted">
            {sources.length === 1 ? "1 fonte" : `${sources.length} fontes`}
            {primaryCount > 0 && ` · ${primaryCount === 1 ? "1 primária" : `${primaryCount} primárias`}`}
          </p>
          <h2 id="fontes-da-noticia" className="mt-1 font-display text-xl font-bold tracking-tight">
            Fontes desta notícia
          </h2>
        </div>
        {original && (
          <a
            href={original.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 font-display text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            Ler na fonte original <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      <ol className="divide-y divide-border">
        {sources.map((s, i) => (
          <li key={s.url} className="flex gap-3 px-5 py-3.5 sm:px-6">
            <span aria-hidden="true" className="w-5 shrink-0 pt-0.5 text-right font-mono text-xs text-muted">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-xs text-muted">{s.host}</span>
                {s.original && (
                  <span className="label-mono rounded-sm bg-foreground px-1.5 py-0.5 text-[10px] text-background">
                    Fonte original
                  </span>
                )}
                {s.primary && (
                  <span className="label-mono rounded-sm border border-accent px-1.5 py-0.5 text-[10px] text-accent">
                    Fonte primária
                  </span>
                )}
              </div>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block break-words font-serif text-[15px] leading-snug text-foreground transition hover:text-accent hover:underline"
              >
                {s.label}
                <span aria-hidden="true" className="ml-1 text-muted">
                  ↗
                </span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </li>
        ))}
      </ol>
      <p className="border-t border-border bg-surface-2 px-5 py-3 text-xs leading-relaxed text-muted sm:px-6">
        Lista gerada a partir dos links citados no texto. &ldquo;Fonte primária&rdquo; indica órgão oficial, Poder
        público ou organismo internacional.
      </p>
    </section>
  );
}
