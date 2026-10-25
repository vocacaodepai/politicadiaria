import Link from "next/link";
import { HISTORIA_PATH, historiaPeriodPath } from "@/lib/historia-meta";
import { historyPeriods, type HistoryPeriod } from "@/lib/types";

/** Filtro por período: links reais (cada período tem a própria página indexável). */
export function PeriodChips({
  active,
  counts,
}: {
  active?: HistoryPeriod;
  counts?: Partial<Record<HistoryPeriod, number>>;
}) {
  const base = "inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] transition";
  const on = "border-foreground bg-foreground text-background";
  const off = "border-border text-foreground/80 hover:border-accent hover:text-accent";
  return (
    <nav aria-label="Filtrar por período" className="-mx-1 flex flex-wrap gap-2 px-1">
      <Link href={HISTORIA_PATH} aria-current={!active ? "page" : undefined} className={`${base} ${!active ? on : off}`}>
        Todos
      </Link>
      {historyPeriods.map((p) => (
        <Link
          key={p.slug}
          href={historiaPeriodPath(p.slug)}
          aria-current={active === p.slug ? "page" : undefined}
          className={`${base} ${active === p.slug ? on : off}`}
        >
          {p.label}
          {counts && <span className="font-normal opacity-70">{counts[p.slug] ?? 0}</span>}
        </Link>
      ))}
    </nav>
  );
}
