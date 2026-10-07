/** Gráficos de barras em HTML/CSS puro (sem biblioteca). Cor única e neutra: nenhuma cor de partido. */

export type BarItem = { label: string; value: number; display?: string; href?: string; hint?: string };

export function BarList({
  items,
  max,
  className = "",
  labelWidth = "7.5rem",
  compact = false,
}: {
  items: BarItem[];
  max?: number;
  className?: string;
  labelWidth?: string;
  compact?: boolean;
}) {
  const top = max ?? Math.max(1, ...items.map((i) => i.value));
  return (
    <ul className={`${compact ? "space-y-1" : "space-y-1.5"} ${className}`}>
      {items.map((it) => {
        const w = Math.max(it.value > 0 ? 1.5 : 0, (it.value / top) * 100);
        const label = it.href ? (
          <a href={it.href} className="hover:text-accent hover:underline">
            {it.label}
          </a>
        ) : (
          it.label
        );
        return (
          <li key={it.label} className="grid items-center gap-2 text-sm" style={{ gridTemplateColumns: `${labelWidth} minmax(0,1fr) auto` }} title={it.hint}>
            <span className="truncate text-foreground/90">{label}</span>
            <span className="h-3.5 overflow-hidden rounded-sm bg-surface-2" aria-hidden="true">
              <span className="block h-full rounded-sm bg-accent" style={{ width: `${w}%` }} />
            </span>
            <span className="min-w-[3.5rem] text-right font-mono text-xs tabular-nums text-muted">{it.display ?? it.value.toLocaleString("pt-BR")}</span>
          </li>
        );
      })}
    </ul>
  );
}

export type Segment = { label: string; value: number; tone: "a" | "b" | "c" | "d" | "e" };

const TONES: Record<Segment["tone"], string> = {
  a: "bg-accent",
  b: "bg-foreground/70",
  c: "bg-warn",
  d: "bg-muted/60",
  e: "bg-border",
};

/** Barra empilhada com legenda; os números absolutos e percentuais ficam visíveis em texto. */
export function StackedBar({ segments, total, ariaLabel }: { segments: Segment[]; total?: number; ariaLabel: string }) {
  const sum = total ?? segments.reduce((a, s) => a + s.value, 0);
  return (
    <div>
      <div role="img" aria-label={ariaLabel} className="flex h-4 w-full overflow-hidden rounded-md bg-surface-2">
        {segments
          .filter((s) => s.value > 0)
          .map((s) => (
            <span key={s.label} className={`${TONES[s.tone]} h-full`} style={{ width: `${(s.value / Math.max(1, sum)) * 100}%` }} title={`${s.label}: ${s.value}`} />
          ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {segments.map((s) => (
          <li key={s.label} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 rounded-sm ${TONES[s.tone]}`} />
            <span>
              {s.label}: <strong className="font-semibold text-foreground">{s.value.toLocaleString("pt-BR")}</strong>
              {sum > 0 && <span> ({((s.value / sum) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%)</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
