import Link from "next/link";
import { articleFilterCategories } from "@/lib/articles";

/** Chips de tema de livro usados em /artigos e /categoria/[slug]. */
export function ArticleCategoryChips({ active, className = "" }: { active?: string; className?: string }) {
  const items = [
    { href: "/artigos", label: "Todos", key: "todos" },
    ...articleFilterCategories.map((c) => ({ href: `/categoria/${c.slug}`, label: c.label, key: c.slug })),
  ];
  return (
    <nav aria-label="Categorias de artigo" className={`relative ${className}`}>
      <ul className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-1">
        {items.map((it) => {
          const isActive = it.key === active;
          return (
            <li key={it.key} className="snap-start">
              <Link
                href={it.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex h-8 items-center whitespace-nowrap rounded-lg border px-3 text-xs font-medium transition ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-surface text-muted hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
