"use client";

import { useState } from "react";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Perguntas frequentes</h2>
      <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:text-accent"
              >
                <span className="font-medium text-foreground">{item.question}</span>
                <span
                  aria-hidden
                  className={`shrink-0 font-mono text-muted transition-transform ${open ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              {open && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-muted">{item.answer}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
