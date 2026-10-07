import Link from "next/link";

/** Caminho de uma página da listagem: página 1 é a raiz, as demais /pagina/n. */
export function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}/pagina/${page}`;
}

export function Pagination({
  current,
  total,
  basePath,
}: {
  current: number;
  total: number;
  basePath: string;
}) {
  if (total <= 1) return null;
  const pages: number[] = [];
  for (let p = Math.max(1, current - 2); p <= Math.min(total, current + 2); p++) pages.push(p);

  const linkCls =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-border bg-surface px-3 font-mono text-xs font-medium text-muted transition hover:border-accent/50 hover:text-foreground";

  return (
    <nav aria-label="Paginação" className="mt-10 flex items-center justify-center gap-1.5">
      {current > 1 ? (
        <Link href={pageHref(basePath, current - 1)} rel="prev" className={linkCls} aria-label="Página anterior">
          ←
        </Link>
      ) : (
        <span className={`${linkCls} opacity-40`} aria-hidden="true">←</span>
      )}
      {pages[0] > 1 && (
        <>
          <Link href={pageHref(basePath, 1)} className={linkCls}>1</Link>
          {pages[0] > 2 && <span className="px-1 text-muted">…</span>}
        </>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={pageHref(basePath, p)}
          aria-current={p === current ? "page" : undefined}
          className={p === current ? `${linkCls} !border-foreground !bg-foreground !text-background` : linkCls}
        >
          {p}
        </Link>
      ))}
      {pages[pages.length - 1] < total && (
        <>
          {pages[pages.length - 1] < total - 1 && <span className="px-1 text-muted">…</span>}
          <Link href={pageHref(basePath, total)} className={linkCls}>{total}</Link>
        </>
      )}
      {current < total ? (
        <Link href={pageHref(basePath, current + 1)} rel="next" className={linkCls} aria-label="Próxima página">
          →
        </Link>
      ) : (
        <span className={`${linkCls} opacity-40`} aria-hidden="true">→</span>
      )}
    </nav>
  );
}
