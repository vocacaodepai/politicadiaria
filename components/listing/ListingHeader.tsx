/**
 * Cabeçalho das listagens: rótulo em mono, h1 em display, descrição e
 * contagem em mono ("91 artigos · página 2 de 8").
 */
export function ListingHeader({
  label,
  title,
  description,
  intro,
  count,
  page = 1,
  totalPages = 1,
}: {
  label: string;
  title: string;
  description: string;
  intro?: string;
  /** Texto já formatado, ex.: "91 artigos". */
  count: string;
  page?: number;
  totalPages?: number;
}) {
  return (
    <header className="max-w-3xl">
      <p className="label-mono text-accent">{label}</p>
      <h1 className="mt-2 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      {intro && <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{intro}</p>}
      <p className="mt-5 font-mono text-xs text-muted">
        {count}
        {totalPages > 1 && (
          <>
            <span aria-hidden="true"> · </span>
            página {page} de {totalPages}
          </>
        )}
      </p>
    </header>
  );
}
