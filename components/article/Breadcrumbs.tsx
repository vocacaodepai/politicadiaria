import Link from "next/link";

export type Crumb = { name: string; href?: string };

/**
 * Trilha de navegação em mono pequeno. O último item (a página atual) não é
 * link e é truncado em uma linha. O JSON-LD BreadcrumbList fica a cargo da
 * página (breadcrumbJsonLd), com os mesmos itens.
 */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Trilha de navegação" className={`font-mono text-xs text-muted ${className}`}>
      <ol className="flex min-w-0 items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className={`flex min-w-0 items-center gap-1.5 ${last ? "min-w-0 flex-1" : "shrink-0"}`}>
              {i > 0 && (
                <span aria-hidden="true" className="text-border">
                  /
                </span>
              )}
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined} className="truncate text-foreground/80">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition hover:text-accent">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
