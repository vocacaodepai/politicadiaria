import Link from "next/link";
import { categories } from "@/lib/articles";

/** Linha de chips de navegação por categoria (rola horizontal no mobile). */
export function CategoryChips({
  active,
  className = "",
}: {
  /** slug da categoria ativa, "todos", "reviews" ou "noticias" */
  active?: string;
  className?: string;
}) {
  const items = [
    { href: "/artigos", label: "Livros", key: "todos" },
    ...categories.map((c) => ({ href: `/categoria/${c.slug}`, label: c.label, key: c.slug })),
    { href: "/reviews", label: "Mais bem avaliados", key: "reviews" },
    { href: "/noticias", label: "Notícias", key: "noticias" },
    { href: "/congresso", label: "Congresso", key: "congresso" },
  ];
  return (
    <nav aria-label="Categorias" className={`relative ${className}`}>
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
