"use client";

import { useMemo, useState } from "react";
import { factCheckVerdicts, type FactCheckVerdict } from "@/lib/types";
import { FactCheckCard, type FactCheckCardData } from "./FactCheckCard";

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * Filtro por veredito e busca simples (título, resumo e alegação). Sem JavaScript
 * a lista inteira continua renderizada. `hideSlug` esconde a checagem em destaque
 * enquanto não houver filtro nem busca, para ela não aparecer duas vezes.
 */
export function FactCheckBrowser({
  items,
  counts,
  hideSlug,
}: {
  items: FactCheckCardData[];
  counts: Record<FactCheckVerdict, number>;
  hideSlug?: string;
}) {
  const [verdict, setVerdict] = useState<FactCheckVerdict | "todos">("todos");
  const [query, setQuery] = useState("");

  const filtering = verdict !== "todos" || query.trim() !== "";

  const visible = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return items.filter((c) => {
      if (!filtering && c.slug === hideSlug) return false;
      if (verdict !== "todos" && c.verdict !== verdict) return false;
      if (terms.length === 0) return true;
      const haystack = normalize(`${c.title} ${c.summary} ${c.claim} ${c.topic}`);
      return terms.every((t) => haystack.includes(t));
    });
  }, [items, verdict, query, filtering, hideSlug]);

  const chip = (active: boolean) =>
    `inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.06em] transition ${
      active
        ? "border-foreground bg-foreground text-background"
        : "border-border bg-surface text-muted hover:border-foreground hover:text-foreground"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrar por veredito" className="flex flex-wrap gap-2">
          <button type="button" className={chip(verdict === "todos")} aria-pressed={verdict === "todos"} onClick={() => setVerdict("todos")}>
            Todas <span className="font-medium opacity-75">{items.length}</span>
          </button>
          {factCheckVerdicts
            .filter((v) => counts[v.slug] > 0)
            .map((v) => (
              <button
                key={v.slug}
                type="button"
                className={chip(verdict === v.slug)}
                aria-pressed={verdict === v.slug}
                onClick={() => setVerdict(v.slug)}
              >
                {v.label} <span className="font-medium opacity-75">{counts[v.slug]}</span>
              </button>
            ))}
        </div>
        <div className="w-full lg:max-w-xs">
          <label htmlFor="checagem-busca" className="sr-only">
            Buscar nas checagens
          </label>
          <input
            id="checagem-busca"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por tema, nome ou alegação"
            autoComplete="off"
            className="w-full border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent"
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-muted" aria-live="polite">
        {filtering
          ? `${visible.length} ${visible.length === 1 ? "checagem encontrada" : "checagens encontradas"}`
          : `${items.length} ${items.length === 1 ? "checagem publicada" : "checagens publicadas"}`}
      </p>

      {visible.length > 0 ? (
        <div className="mt-2 grid gap-x-8 gap-y-2 md:grid-cols-2">
          {visible.map((c) => (
            <FactCheckCard key={c.slug} item={c} />
          ))}
        </div>
      ) : (
        <p className="mt-6 border border-dashed border-border p-6 text-center text-sm text-muted">
          Nenhuma checagem com esse filtro. Limpe a busca ou escolha outro veredito.
        </p>
      )}
    </div>
  );
}
