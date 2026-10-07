"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { hrefFor, searchItems, type SearchItem } from "@/lib/search";
import { withBasePath } from "@/lib/seo";

export function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();
  const urlQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setQuery(urlQuery);
  }
  const [items, setItems] = useState<SearchItem[] | null>(null);

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

  const results = items && query.trim() ? searchItems(items, query, 30) : [];

  return (
    <div className="mt-6 max-w-3xl">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(query.trim() ? `/busca?q=${encodeURIComponent(query.trim())}` : "/busca");
        }}
        className="flex gap-2"
      >
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
      </form>

      <div className="mt-8" aria-live="polite">
        {items === null && <p className="text-sm text-muted">Carregando índice…</p>}
        {items !== null && query.trim() && results.length === 0 && (
          <p className="text-sm text-muted">Nada encontrado para “{query}”. Tente outra palavra.</p>
        )}
        {results.length > 0 && (
          <>
            <p className="label-mono text-muted">
              {results.length} resultado{results.length > 1 ? "s" : ""}
            </p>
            <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-surface">
              {results.map((r) => (
                <li key={`${r.type}-${r.slug}`}>
                  <Link href={hrefFor(r)} className="block px-5 py-4 transition hover:bg-surface-2">
                    <span className="label-mono text-accent">
                      {r.type === "artigo" ? r.category : "Notícia"}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold leading-snug">
                      {r.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm text-muted">{r.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
