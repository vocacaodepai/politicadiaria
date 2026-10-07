"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { hrefFor, searchItems, type SearchItem } from "@/lib/search";
import { withBasePath } from "@/lib/seo";

let cache: SearchItem[] | null = null;
let pending: Promise<SearchItem[]> | null = null;

async function loadIndex(): Promise<SearchItem[]> {
  if (cache) return cache;
  if (!pending) {
    pending = fetch(withBasePath("/search-index.json"))
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data: { items?: SearchItem[] }) => {
        cache = Array.isArray(data.items) ? data.items : [];
        return cache;
      })
      .catch(() => {
        pending = null;
        return [];
      });
  }
  return pending;
}

export function SearchDialog({ className = "" }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    d.showModal();
    setStatus("loading");
    loadIndex().then(() => setStatus("ready"));
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!query.trim()) return;
    let active = true;
    loadIndex().then((items) => {
      if (active) setResults(searchItems(items, query));
    });
    return () => {
      active = false;
    };
  }, [query]);

  const visibleResults = query.trim() ? results : [];

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={`inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-2.5 text-sm text-muted transition hover:border-accent/50 hover:text-foreground ${className}`}
        aria-label="Buscar no site (atalho Ctrl+K)"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="hidden lg:inline">Buscar</span>
        <kbd className="hidden rounded border border-border bg-surface-2 px-1.5 font-mono text-[10px] text-muted lg:inline">
          Ctrl K
        </kbd>
      </button>

      <dialog
        ref={dialogRef}
        className="m-0 w-full max-w-none bg-transparent p-0 backdrop:bg-ink/60 backdrop:backdrop-blur-sm open:flex open:items-start open:justify-center sm:mx-auto sm:mt-[10vh] sm:max-w-2xl"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label="Busca"
      >
        <div className="flex w-full flex-col overflow-hidden border border-border bg-surface text-foreground shadow-2xl sm:rounded-2xl sm:max-h-[70vh]">
          <div className="flex items-center gap-3 border-b border-border px-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar artigos e notícias…"
              className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
              autoComplete="off"
              aria-label="Termo de busca"
            />
            <button
              type="button"
              onClick={close}
              className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted hover:text-foreground"
            >
              Esc
            </button>
          </div>
          <div className="overflow-y-auto p-2">
            {status === "loading" && (
              <p className="px-3 py-6 text-center text-sm text-muted">Carregando índice…</p>
            )}
            {status === "ready" && query.trim() && visibleResults.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-muted">
                Nada encontrado para “{query}”. Tente outra palavra.
              </p>
            )}
            {!query.trim() && status !== "loading" && (
              <p className="px-3 py-6 text-center text-sm text-muted">
                Digite para buscar em {cache ? cache.length : "todos os"} artigos e notícias.
              </p>
            )}
            {visibleResults.length > 0 && (
              <ul className="divide-y divide-border">
                {visibleResults.map((r) => (
                  <li key={`${r.type}-${r.slug}`}>
                    <Link
                      href={hrefFor(r)}
                      onClick={close}
                      className="block rounded-lg px-3 py-3 transition hover:bg-surface-2"
                    >
                      <span className="label-mono text-accent">
                        {r.type === "artigo" ? r.category : "Notícia"}
                      </span>
                      <span className="mt-0.5 block font-display text-[15px] font-semibold leading-snug">
                        {r.title}
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-sm text-muted">{r.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
