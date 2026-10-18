"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { Container } from "@/components/Container";

export type ParlamentarNews = { nome: string; path: string | null; items: { slug: string; title: string; date: string; summary: string }[] };

const dmy = (iso: string) => iso.slice(0, 10).split("-").reverse().join("/");
const VALID = /^[a-z0-9-]{3,80}$/;
const subscribeNever = () => () => {};
function readSlug(): string | null {
  const p = new URLSearchParams(window.location.search).get("parlamentar");
  return p && VALID.test(p) ? p : null;
}

/**
 * Filtro /noticias?parlamentar=<slug>: mostra as notícias que citam o parlamentar (índice montado no
 * build a partir dos links do corpo) e esconde a listagem geral enquanto o filtro estiver ativo.
 */
export function ParlamentarNewsFilter({ index }: { index: Record<string, ParlamentarNews> }) {
  const slug = useSyncExternalStore(subscribeNever, readSlug, () => null);

  useEffect(() => {
    if (!slug) return;
    const style = document.createElement("style");
    style.textContent = "[data-news-row],[data-day-section],nav[aria-label='Filtrar notícias por tópico'],nav[aria-label='Paginação']{display:none !important}";
    document.head.appendChild(style);
    return () => style.remove();
  }, [slug]);

  if (!slug) return null;
  const entry = index[slug];
  const name = entry?.nome ?? slug.replace(/-\d+$/, "").replace(/-/g, " ");
  const items = entry?.items ?? [];
  return (
    <Container className="pt-8">
      <section aria-labelledby="filtro-parlamentar" className="border-t-[3px] border-foreground pt-3">
        <p className="label-mono text-accent">Filtro por parlamentar</p>
        <h2 id="filtro-parlamentar" className="mt-1 font-display text-2xl font-bold tracking-tight">
          Notícias que citam {name}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {items.length} {items.length === 1 ? "notícia" : "notícias"} com link para a página do parlamentar.{" "}
          {entry?.path && (
            <>
              <Link href={entry.path} className="text-accent underline">
                Ver a página de {name}
              </Link>{" "}
            </>
          )}
          <Link href="/noticias" className="text-accent underline">
            Limpar filtro
          </Link>
        </p>
        {items.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Nenhuma notícia do site cita este parlamentar com link para a página dele.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {items.map((n) => (
              <li key={n.slug} className="py-3">
                <time className="font-mono text-[11px] uppercase tracking-wider text-muted">{dmy(n.date)}</time>
                <Link href={`/noticias/${n.slug}`} className="mt-0.5 block font-display text-[15px] font-semibold leading-snug hover:text-accent">
                  {n.title}
                </Link>
                <p className="mt-0.5 text-sm text-muted">{n.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}
