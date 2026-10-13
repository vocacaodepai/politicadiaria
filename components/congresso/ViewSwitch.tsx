import Link from "next/link";

type Current = "lista-camara" | "lista-senado" | "plenario";

const seg = (active: boolean) =>
  `inline-flex h-10 items-center border px-4 font-mono text-xs font-semibold uppercase tracking-wide transition ${
    active ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-foreground hover:border-foreground"
  }`;

/** Seletor "Lista | Plenário" das páginas de deputados, senadores e plenário. */
export function ViewSwitch({ current }: { current: Current }) {
  const listHref = current === "lista-senado" ? "/congresso/senadores" : "/congresso/deputados";
  const plenHref = current === "lista-senado" ? "/congresso/plenario?casa=senado" : "/congresso/plenario";
  return (
    <nav aria-label="Forma de visualização" className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="label-mono text-muted">Ver como</span>
      <div className="inline-flex">
        <Link href={listHref} className={seg(current !== "plenario")} aria-current={current !== "plenario" ? "page" : undefined}>
          Lista
        </Link>
        <Link href={plenHref} className={`${seg(current === "plenario")} -ml-px`} aria-current={current === "plenario" ? "page" : undefined}>
          Plenário
        </Link>
      </div>
      {current === "plenario" && (
        <span className="flex gap-3 text-xs">
          <Link className="text-accent underline" href="/congresso/deputados">
            Lista de deputados
          </Link>
          <Link className="text-accent underline" href="/congresso/senadores">
            Lista de senadores
          </Link>
        </span>
      )}
    </nav>
  );
}
