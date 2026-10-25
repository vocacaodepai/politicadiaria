"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import type { PromessaStatus } from "@/lib/promessas";

export type PromessaCardData = {
  id: string;
  href: string;
  titulo: string;
  texto: string;
  area: string;
  areaLabel: string;
  status: PromessaStatus;
  statusText: string;
  prazo: string;
  origem: "plano" | "campanha";
  pagina: string;
};

type Sort = "plano" | "area" | "status" | "titulo";

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * Filtros por área e por status, busca simples e ordenação. Sem JavaScript a lista inteira do
 * candidato continua renderizada, na ordem do plano.
 */
export function PromessasBrowser({
  items,
  areas,
  statuses,
  counts,
}: {
  items: PromessaCardData[];
  areas: { slug: string; label: string; count: number }[];
  statuses: { slug: PromessaStatus; label: string }[];
  counts: Record<PromessaStatus, number>;
}) {
  const [area, setArea] = useState<string>("todas");
  const [status, setStatus] = useState<PromessaStatus | "todos">("todos");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("plano");

  const visible = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    const list = items.filter((p) => {
      if (area !== "todas" && p.area !== area) return false;
      if (status !== "todos" && p.status !== status) return false;
      if (terms.length === 0) return true;
      const hay = normalize(`${p.titulo} ${p.texto} ${p.areaLabel} ${p.id}`);
      return terms.every((t) => hay.includes(t));
    });
    const order = new Map(items.map((p, i) => [p.id, i]));
    const statusOrder = statuses.map((s) => s.slug);
    const sorted = [...list];
    if (sort === "titulo") sorted.sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));
    else if (sort === "area") sorted.sort((a, b) => a.areaLabel.localeCompare(b.areaLabel, "pt-BR") || order.get(a.id)! - order.get(b.id)!);
    else if (sort === "status") sorted.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status) || order.get(a.id)! - order.get(b.id)!);
    return sorted;
  }, [items, area, status, query, sort, statuses]);

  const filtering = area !== "todas" || status !== "todos" || query.trim() !== "";

  const chip = (active: boolean) =>
    `inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.06em] transition ${
      active
        ? "border-foreground bg-foreground text-background"
        : "border-border bg-surface text-muted hover:border-foreground hover:text-foreground"
    }`;

  return (
    <div>
      <div className="grid gap-5 border-b border-border pb-5">
        <div>
          <p className="label-mono mb-2 text-muted" id="filtro-status">Status</p>
          <div role="group" aria-labelledby="filtro-status" className="flex flex-wrap gap-2">
            <button type="button" className={chip(status === "todos")} aria-pressed={status === "todos"} onClick={() => setStatus("todos")}>
              Todos <span className="font-medium opacity-75">{items.length}</span>
            </button>
            {statuses.map((s) => (
              <button key={s.slug} type="button" className={chip(status === s.slug)} aria-pressed={status === s.slug} onClick={() => setStatus(s.slug)}>
                {s.label} <span className="font-medium opacity-75">{counts[s.slug]}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="label-mono mb-2 text-muted" id="filtro-area">Área</p>
          <div role="group" aria-labelledby="filtro-area" className="flex flex-wrap gap-2">
            <button type="button" className={chip(area === "todas")} aria-pressed={area === "todas"} onClick={() => setArea("todas")}>
              Todas
            </button>
            {areas.map((a) => (
              <button key={a.slug} type="button" className={chip(area === a.slug)} aria-pressed={area === a.slug} onClick={() => setArea(a.slug)}>
                {a.label} <span className="font-medium opacity-75">{a.count}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label htmlFor="promessas-busca" className="label-mono mb-2 block text-muted">
              Buscar
            </label>
            <input
              id="promessas-busca"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tema, programa ou palavra do plano"
              autoComplete="off"
              className="w-full border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="promessas-ordem" className="label-mono mb-2 block text-muted">
              Ordenar por
            </label>
            <select
              id="promessas-ordem"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="w-full border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent sm:w-52"
            >
              <option value="plano">Ordem do plano</option>
              <option value="area">Área</option>
              <option value="status">Status</option>
              <option value="titulo">Título (A a Z)</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted" aria-live="polite">
        {filtering
          ? `${visible.length} ${visible.length === 1 ? "proposta encontrada" : "propostas encontradas"} de ${items.length}`
          : `${items.length} propostas`}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-3 grid gap-x-8 gap-y-0 md:grid-cols-2">
          {visible.map((p) => (
            <li key={p.id} className="border-b border-border py-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={p.status} label={p.statusText} />
                {p.origem === "campanha" && (
                  <span className="label-mono border border-border px-1.5 py-0.5 text-[10px] text-muted">Campanha, fora do plano</span>
                )}
              </div>
              <h3 className="mt-2 font-display text-lg font-bold leading-snug">
                <Link href={p.href} className="hover:text-accent">
                  {p.titulo}
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{p.texto.length > 190 ? `${p.texto.slice(0, 187).replace(/[\s,;:.]+$/, "")}...` : p.texto}</p>
              <p className="label-mono mt-2 text-[11px] text-muted">
                {p.areaLabel} | {p.id}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 border border-dashed border-border p-6 text-center text-sm text-muted">
          Nenhuma proposta com esse filtro. Limpe a busca ou escolha outra área ou outro status.
        </p>
      )}
    </div>
  );
}
