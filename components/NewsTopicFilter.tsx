"use client";

import { useState } from "react";

function chipClass(active: boolean): string {
  return `inline-flex h-8 items-center whitespace-nowrap rounded-lg border px-3 text-xs font-medium transition ${
    active
      ? "border-foreground bg-foreground text-background"
      : "border-border bg-surface text-muted hover:border-accent/50 hover:text-foreground"
  }`;
}

/**
 * Filtro de tópico só da listagem de notícias (lançamentos, regulação...),
 * diferente do CategoryChips de artigos (temas de livro), que
 * não faz sentido aqui. Filtra no navegador, sem recarregar a página:
 * esconde as linhas de `rootId` cujo `data-topic` não bate, e esconde o
 * cabeçalho do dia (`data-day-section`) quando nenhuma linha dele sobra.
 */
export function NewsTopicFilter({
  topics,
  rootId,
  className = "",
}: {
  topics: { slug: string; label: string }[];
  rootId: string;
  className?: string;
}) {
  const [active, setActive] = useState<string>("todas");

  function apply(topic: string) {
    setActive(topic);
    const root = document.getElementById(rootId);
    if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-topic]").forEach((row) => {
      row.style.display = topic === "todas" || row.dataset.topic === topic ? "" : "none";
    });
    root.querySelectorAll<HTMLElement>("[data-day-section]").forEach((section) => {
      const hasVisible = Array.from(section.querySelectorAll<HTMLElement>("[data-topic]")).some(
        (row) => row.style.display !== "none"
      );
      section.style.display = hasVisible ? "" : "none";
    });
  }

  return (
    <nav aria-label="Filtrar notícias por tópico" className={`relative ${className}`}>
      <ul className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-1">
        <li className="snap-start">
          <button type="button" onClick={() => apply("todas")} className={chipClass(active === "todas")}>
            Todas
          </button>
        </li>
        {topics.map((t) => (
          <li key={t.slug} className="snap-start">
            <button type="button" onClick={() => apply(t.slug)} className={chipClass(active === t.slug)}>
              {t.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
