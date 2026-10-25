"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  applyFilters,
  hrefFor,
  resultLabel,
  searchItems,
  typeLabels,
  type SearchItem,
  type SearchType,
} from "@/lib/search";
import { withBasePath } from "@/lib/seo";

const ALL_TYPES = Object.keys(typeLabels) as SearchType[];
const PAGE = 30;

function fmt(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();
  const urlQuery = params.get("q") ?? "";
  const typesParam = params.get("tipo") ?? "";
  const urlTypes = typesParam.split(",").filter((t): t is SearchType => ALL_TYPES.includes(t as SearchType));
  const topic = params.get("topico") ?? "";
  const from = params.get("de") ?? "";
  const to = params.get("ate") ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setQuery(urlQuery);
  }
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [shown, setShown] = useState(PAGE);

  useEffect(() => {
    let active = true;
    fetch(withBasePath("/search-index.json"))
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data: { items?: SearchItem[] }) => {
        if (active) setItems(Array.isArray(data.items) ? data.items : []);
      })
      .catch(() => {
        if (active) setItems([]);
      });
    return () => {
      active = false;
    };
  }, []);

  function go(next: { q?: string; tipo?: SearchType[]; topico?: string; de?: string; ate?: string }) {
    const p = new URLSearchParams();
    const q = (next.q ?? query).trim();
    const tipo = next.tipo ?? urlTypes;
    const t = next.topico ?? topic;
    const de = next.de ?? from;
    const ate = next.ate ?? to;
    if (q) p.set("q", q);
    if (tipo.length) p.set("tipo", tipo.join(","));
    if (t) p.set("topico", t);
    if (de) p.set("de", de);
    if (ate) p.set("ate", ate);
    setShown(PAGE);
    router.replace(p.toString() ? `/busca?${p}` : "/busca", { scroll: false });
  }

  const hasFilter = urlTypes.length > 0 || !!topic || !!from || !!to;

  const topics = (() => {
    const counts = new Map<string, number>();
    for (const i of items ?? []) {
      if (urlTypes.length && !urlTypes.includes(i.type)) continue;
      counts.set(i.category, (counts.get(i.category) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"));
  })();

  const results = (() => {
    if (!items) return [];
    const filtered = applyFilters(items, { types: urlTypes, topic, from, to });
    if (urlQuery.trim()) return searchItems(filtered, urlQuery, 500);
    if (hasFilter) return filtered; // índice já vem ordenado por data (parlamentares ao fim)
    return [];
  })();

  const active = !!urlQuery.trim() || hasFilter;
  const input =
    "h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm outline-none transition focus:border-accent";

  return (
    <div className="mt-6 max-w-3xl">
      <form
        role="search"
        aria-label="Buscar no site"
        onSubmit={(e) => {
          e.preventDefault();
          go({});
        }}
        className="space-y-4"
      >
        <div className="flex gap-2">
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex.: reforma tributária, STF, livro sobre democracia…"
            className="h-12 w-full rounded-lg border border-border bg-surface px-4 text-base outline-none transition focus:border-accent"
            aria-label="Termo de busca"
            autoFocus
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            Buscar
          </button>
        </div>

        <fieldset className="border border-border p-3">
          <legend className="px-1 label-mono text-muted">Filtros</legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Tipo de conteúdo">
            {ALL_TYPES.map((t) => (
              <label key={t} className="inline-flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={urlTypes.includes(t)}
                  onChange={(e) => {
                    const next = e.target.checked ? [...urlTypes, t] : urlTypes.filter((x) => x !== t);
                    go({ tipo: next, topico: "" });
                  }}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                {typeLabels[t]}
              </label>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <label className="block text-sm">
              <span className="mb-1 block text-muted">Tópico</span>
              <select value={topic} onChange={(e) => go({ topico: e.target.value })} className={input}>
                <option value="">Todos</option>
                {topics.map(([t, n]) => (
                  <option key={t} value={t}>
                    {t} ({n})
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">De</span>
              <input type="date" value={from} max={to || undefined} onChange={(e) => go({ de: e.target.value })} className={input} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">Até</span>
              <input type="date" value={to} min={from || undefined} onChange={(e) => go({ ate: e.target.value })} className={input} />
            </label>
          </div>
          {(from || to) && (
            <p className="mt-2 text-xs text-muted">Parlamentares não têm data e saem da lista quando há filtro de datas.</p>
          )}
          {hasFilter && (
            <button
              type="button"
              onClick={() => go({ tipo: [], topico: "", de: "", ate: "" })}
              className="mt-3 text-sm text-accent underline"
            >
              Limpar filtros
            </button>
          )}
        </fieldset>
      </form>

      <div className="mt-8" aria-live="polite">
        {items === null && <p className="text-sm text-muted">Carregando índice…</p>}
        {items !== null && !active && (
          <p className="text-sm text-muted">Digite um termo ou escolha um filtro para ver resultados.</p>
        )}
        {items !== null && active && results.length === 0 && (
          <p className="text-sm text-muted">Nada encontrado. Tente outra palavra ou afrouxe os filtros.</p>
        )}
        {results.length > 0 && (
          <>
            <p className="label-mono text-muted">
              {results.length} resultado{results.length > 1 ? "s" : ""}
            </p>
            <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-surface">
              {results.slice(0, shown).map((r) => (
                <li key={`${r.type}-${r.slug}`}>
                  <Link href={hrefFor(r)} className="block px-5 py-4 transition hover:bg-surface-2">
                    <span className="label-mono text-accent">
                      {resultLabel(r)}
                      {r.date && <span className="text-muted"> · {fmt(r.date)}</span>}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold leading-snug">{r.title}</span>
                    <span className="mt-1 line-clamp-2 block text-sm text-muted">{r.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {results.length > shown && (
              <button
                type="button"
                onClick={() => setShown((s) => s + PAGE)}
                className="mt-4 h-10 rounded-lg border border-border px-4 text-sm font-semibold hover:border-accent"
              >
                Mostrar mais
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
