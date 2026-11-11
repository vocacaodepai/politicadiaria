import { getIndicadores } from "@/lib/indicadores";

/** Faixa fina no alto do site com números que o leitor quer ver todo dia, com fonte e data. */
export async function UtilityBar() {
  const items = await getIndicadores();
  if (!items.length) return null;
  return (
    <div className="border-b border-border bg-surface-2/60" role="region" aria-label="Indicadores do dia">
      <div className="mx-auto flex max-w-7xl items-center gap-x-6 gap-y-1 overflow-x-auto px-4 py-1.5 text-xs sm:px-6">
        <p className="label-mono hidden shrink-0 text-muted sm:block">Hoje</p>
        <ul className="flex flex-1 flex-wrap items-baseline gap-x-6 gap-y-1">
          {items.map((i) => (
            <li key={i.id} className="shrink-0">
              <a
                href={i.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`${i.detalhe}. Fonte: ${i.fonte}`}
                className="group inline-flex items-baseline gap-1.5 hover:text-accent"
              >
                <span className="font-semibold text-muted group-hover:text-accent">{i.label}</span>
                <span className="font-display text-sm font-bold tabular-nums">{i.valor}</span>
                <span className="hidden text-[11px] text-muted lg:inline">{i.detalhe}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
