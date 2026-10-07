import type { TocEntry } from "@/lib/html";

/** Sumário colapsável para telas pequenas (só h2). */
export function TocDetails({ entries, className = "" }: { entries: TocEntry[]; className?: string }) {
  if (entries.length < 2) return null;
  return (
    <details className={`group rounded-xl border border-border bg-surface ${className}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 [&::-webkit-details-marker]:hidden">
        <span className="label-mono text-muted">Neste artigo</span>
        <span aria-hidden="true" className="font-mono text-xs text-muted transition group-open:rotate-180">
          ▾
        </span>
      </summary>
      <nav aria-label="Sumário do artigo" className="border-t border-border px-5 py-3">
        <ol className="space-y-2">
          {entries.map((e, i) => (
            <li key={e.id} className="flex gap-3 text-sm leading-snug">
              <span className="shrink-0 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <a href={`#${e.id}`} className="transition hover:text-accent">
                {e.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
