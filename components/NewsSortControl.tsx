"use client";

import { useRef, useState } from "react";

const OPTIONS = [
  { value: "recentes", label: "Mais recentes" },
  { value: "antigas", label: "Mais antigas" },
  { value: "lidas", label: "Mais lidas" },
] as const;

type SortValue = (typeof OPTIONS)[number]["value"];

function chipClass(active: boolean): string {
  return `inline-flex h-7 items-center whitespace-nowrap rounded-lg border px-2.5 text-[11px] font-medium transition ${
    active
      ? "border-foreground bg-foreground text-background"
      : "border-border bg-surface text-muted hover:border-accent/50 hover:text-foreground"
  }`;
}

/**
 * Classificação da listagem de notícias (não é filtro: não esconde nada,
 * só reordena). "Mais recentes" é o padrão (agrupado por dia, como sempre
 * foi). "Mais antigas" e "mais lidas" viram uma lista só, sem cabeçalho de
 * dia (não faz sentido agrupar por dia quando a ordem não é cronológica
 * dentro do dia). "Mais lidas" usa o mesmo proxy sem analytics que o site
 * já usa pra "Destaques" (lib/news.ts: nº de links internos recebidos).
 * Reordena só os cards que já estão na página atual.
 */
export function NewsSortControl({ rootId }: { rootId: string }) {
  const [active, setActive] = useState<SortValue>("recentes");
  const originalRef = useRef<{ container: HTMLElement; rows: HTMLElement[] }[] | null>(null);

  function capture(root: HTMLElement) {
    if (originalRef.current) return originalRef.current;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-day-section]"));
    const snap = sections
      .map((s) => {
        const container = s.querySelector<HTMLElement>("[data-news-rows]");
        if (!container) return null;
        const rows = Array.from(container.querySelectorAll<HTMLElement>(":scope > [data-news-row]"));
        return { container, rows };
      })
      .filter((x): x is { container: HTMLElement; rows: HTMLElement[] } => x !== null);
    originalRef.current = snap;
    return snap;
  }

  function setHeadersVisible(root: HTMLElement, visible: boolean) {
    root.querySelectorAll<HTMLElement>("[data-day-section] h2").forEach((h2) => {
      h2.style.display = visible ? "" : "none";
    });
  }

  function apply(value: SortValue) {
    setActive(value);
    const root = document.getElementById(rootId);
    if (!root) return;
    const snap = capture(root);
    if (snap.length === 0) return;

    if (value === "recentes") {
      snap.forEach(({ container, rows }) => rows.forEach((r) => container.appendChild(r)));
      setHeadersVisible(root, true);
      return;
    }

    const allRows = snap.flatMap((s) => s.rows);
    const sorted = [...allRows].sort((a, b) => {
      if (value === "antigas") return (a.dataset.date ?? "").localeCompare(b.dataset.date ?? "");
      return Number(b.dataset.popularity ?? 0) - Number(a.dataset.popularity ?? 0);
    });
    const target = snap[0].container;
    sorted.forEach((r) => target.appendChild(r));
    setHeadersVisible(root, false);
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Ordenar:</span>
      {OPTIONS.map((o) => (
        <button key={o.value} type="button" onClick={() => apply(o.value)} className={chipClass(active === o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
