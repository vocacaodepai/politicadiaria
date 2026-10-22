import Link from "next/link";
import type { ReactNode } from "react";

/** Peças visuais das páginas de eleições. Cores neutras do tema: nunca cor de partido ou de candidato. */

export type Tone = "a" | "b" | "n";

const FILL: Record<Tone, string> = {
  a: "bg-accent",
  b: "bg-accent-2",
  n: "bg-foreground/55",
};

export type SubNavId = "painel" | "apuracao" | "pesquisas" | "debate" | "agenda" | "campanha";

export function SubNav({ active }: { active: SubNavId }) {
  const items = [
    { id: "painel", href: "/eleicoes", label: "Painel e resultados" },
    { id: "apuracao", href: "/eleicoes/apuracao", label: "Apuração ao vivo" },
    { id: "pesquisas", href: "/eleicoes/pesquisas", label: "Pesquisas e ranking de acerto" },
    { id: "debate", href: "/eleicoes/debate-band", label: "Debate da Band" },
    { id: "agenda", href: "/eleicoes/agenda", label: "Agenda" },
    { id: "campanha", href: "/eleicoes/campanha", label: "Gastos e bens" },
  ] as const;
  return (
    <nav aria-label="Seções de Eleições 2026" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y-2 border-foreground/80 py-2">
      {items.map((i) => (
        <Link
          key={i.id}
          href={i.href}
          aria-current={i.id === active ? "page" : undefined}
          className={`font-sans text-xs font-bold uppercase tracking-[0.12em] ${
            i.id === active ? "text-accent underline decoration-2 underline-offset-8" : "text-muted hover:text-foreground"
          }`}
        >
          {i.label}
        </Link>
      ))}
    </nav>
  );
}

export function Badge({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "strong" | "soft" }) {
  const cls =
    tone === "strong"
      ? "border-accent bg-accent text-accent-foreground"
      : tone === "soft"
        ? "border-accent text-accent"
        : "border-border text-muted";
  return <span className={`inline-block whitespace-nowrap border px-1.5 py-0.5 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] ${cls}`}>{children}</span>;
}

export type BarRow = {
  label: ReactNode;
  sub?: ReactNode;
  value: number;
  display: ReactNode;
  tone?: Tone;
  badge?: ReactNode;
};

/**
 * Barras horizontais em CSS. `max` é o valor que ocupa a trilha inteira; `marker` desenha uma linha
 * de referência (por exemplo, 50%). O número sempre aparece em texto, a barra é só apoio visual.
 */
export function Bars({
  rows,
  max,
  marker,
  markerLabel,
  labelWidth = "9.5rem",
  valueWidth = "5rem",
  ariaLabel,
}: {
  rows: BarRow[];
  max: number;
  marker?: number;
  markerLabel?: string;
  labelWidth?: string;
  valueWidth?: string;
  ariaLabel?: string;
}) {
  return (
    <ul className="space-y-2.5" aria-label={ariaLabel} style={{ ["--lw" as string]: labelWidth, ["--vw" as string]: valueWidth }}>
      {rows.map((r, i) => {
        const w = r.value > 0 ? Math.max(0.8, Math.min(100, (r.value / max) * 100)) : 0;
        return (
          <li key={i} className="grid grid-cols-[var(--lw)_minmax(0,1fr)_var(--vw)] items-center gap-x-3 gap-y-1 max-sm:grid-cols-[minmax(0,1fr)_var(--vw)]">
            <div className="min-w-0 max-sm:col-span-2">
              <p className="text-sm font-semibold leading-tight">{r.label}</p>
              {r.sub && <p className="text-xs leading-snug text-muted">{r.sub}</p>}
              {r.badge && <p className="mt-0.5">{r.badge}</p>}
            </div>
            <div className="relative h-3.5 bg-surface-2 max-sm:col-start-1" aria-hidden="true">
              <div className={`h-full ${FILL[r.tone ?? "a"]}`} style={{ width: `${w}%` }} />
              {marker !== undefined && (
                <span className="absolute inset-y-[-3px] w-px bg-foreground/70" style={{ left: `${(marker / max) * 100}%` }} title={markerLabel} />
              )}
            </div>
            <p className="text-right font-mono text-xs tabular-nums text-foreground">{r.display}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function Legend({ items }: { items: { tone: Tone; label: string }[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
      {items.map((i) => (
        <li key={i.label} className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 ${FILL[i.tone]}`} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

export function Section({
  id,
  kicker,
  title,
  children,
  lead,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="mt-12 scroll-mt-24">
      <header className="border-t-4 border-double border-foreground/80 pt-3">
        <p className="label-mono text-accent">{kicker}</p>
        <h2 id={`${id}-t`} className="mt-1 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          {title}
        </h2>
        {lead && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{lead}</p>}
      </header>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Panel({ title, children, note, className = "" }: { title?: string; children: ReactNode; note?: ReactNode; className?: string }) {
  return (
    <div className={`border border-border bg-surface p-4 sm:p-5 ${className}`}>
      {title && <h3 className="font-display text-lg font-bold leading-tight tracking-tight">{title}</h3>}
      <div className={title ? "mt-3" : ""}>{children}</div>
      {note && <p className="mt-3 text-xs leading-relaxed text-muted">{note}</p>}
    </div>
  );
}

export function Tile({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="border border-border bg-surface p-3 sm:p-4">
      <p className="label-mono text-muted">{label}</p>
      <p className="mt-1 font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">{value}</p>
      {hint && <p className="mt-1 text-xs leading-snug text-muted">{hint}</p>}
    </div>
  );
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="break-words text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
      {children}
    </a>
  );
}

export function TableWrap({ children, caption, min = 560 }: { children: ReactNode; caption: string; min?: number }) {
  return (
    <div className="overflow-x-auto border border-border" tabIndex={0} role="region" aria-label={caption}>
      <table className="w-full border-collapse text-sm" style={{ minWidth: min }}>
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export const th = "bg-surface-2 px-3 py-2 text-left font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted";
export const td = "border-t border-border px-3 py-2 align-top";
