"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/html";

/**
 * Sumário da sidebar (só h2). O item ativo é marcado por IntersectionObserver
 * quando o título entra na faixa superior da tela; o estado só muda dentro do
 * callback do observer.
 */
export function TableOfContents({ entries, className = "" }: { entries: TocEntry[]; className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (entries.length === 0 || typeof IntersectionObserver === "undefined") return;
    const targets = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed.filter((o) => o.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 }
    );
    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav aria-label="Neste artigo" className={`rounded-xl border border-border bg-surface p-5 ${className}`}>
      <p className="label-mono text-muted">Neste artigo</p>
      <ol className="mt-3 space-y-1 border-l border-border">
        {entries.map((e) => {
          const isActive = active === e.id;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1 pl-3 text-sm leading-snug transition ${
                  isActive
                    ? "border-accent font-medium text-accent"
                    : "border-transparent text-muted hover:border-border hover:text-foreground"
                }`}
              >
                {e.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
