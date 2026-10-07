"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ParliamentarianPhoto } from "./Photo";

export type DirEntry = {
  id: number;
  slug: string;
  nome: string;
  partido: string;
  uf: string;
  condicao: string | null;
  foto: { url: string } | null;
  gasto: number;
  presenca: number | null;
  ausencias: number;
  proposicoes: number;
};

type SortKey = "nome" | "gasto" | "presenca" | "proposicoes";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const PAGE = 48;
const brl0 = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/**
 * Lista filtrável (nome, partido, UF) e ordenável. A ordenação é só um recurso de consulta:
 * os números exibidos são fatos dos dados abertos, sem nota ou juízo de valor.
 */
export function Directory({
  entries,
  basePath,
  parties,
  ufs,
  initialParty = "",
  gastoLabel,
}: {
  entries: DirEntry[];
  basePath: string;
  parties: string[];
  ufs: string[];
  initialParty?: string;
  gastoLabel: string;
}) {
  const [q, setQ] = useState("");
  const [party, setParty] = useState(initialParty);
  const [uf, setUf] = useState("");
  const [sort, setSort] = useState<SortKey>("nome");
  const [shown, setShown] = useState(PAGE);

  const prepared = useMemo(() => entries.map((e) => ({ e, key: norm(e.nome) })), [entries]);
  const rows = useMemo(() => {
    const nq = norm(q.trim());
    const list = prepared.filter(({ e, key }) => (!nq || key.includes(nq)) && (!party || e.partido === party) && (!uf || e.uf === uf)).map((x) => x.e);
    const cmp: Record<SortKey, (a: DirEntry, b: DirEntry) => number> = {
      nome: (a, b) => a.nome.localeCompare(b.nome, "pt-BR"),
      gasto: (a, b) => b.gasto - a.gasto,
      presenca: (a, b) => (b.presenca ?? -1) - (a.presenca ?? -1),
      proposicoes: (a, b) => b.proposicoes - a.proposicoes,
    };
    return [...list].sort(cmp[sort]);
  }, [prepared, q, party, uf, sort]);

  const reset = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setShown(PAGE);
  };
  const field = "h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground";

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <label className="block">
          <span className="label-mono text-muted">Nome</span>
          <input
            type="search"
            value={q}
            onChange={(e) => reset(setQ)(e.target.value)}
            placeholder="Buscar por nome"
            className={`${field} mt-1 w-full`}
            autoComplete="off"
          />
        </label>
        <label className="block">
          <span className="label-mono text-muted">Partido</span>
          <select value={party} onChange={(e) => reset(setParty)(e.target.value)} className={`${field} mt-1 w-full`}>
            <option value="">Todos</option>
            {parties.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="label-mono text-muted">Estado (UF)</span>
          <select value={uf} onChange={(e) => reset(setUf)(e.target.value)} className={`${field} mt-1 w-full`}>
            <option value="">Todos</option>
            {ufs.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="label-mono text-muted">Ordenar por</span>
          <select value={sort} onChange={(e) => reset(setSort)(e.target.value as SortKey)} className={`${field} mt-1 w-full`}>
            <option value="nome">Nome (A a Z)</option>
            <option value="gasto">{gastoLabel} (maior primeiro)</option>
            <option value="presenca">Votos registrados, % (maior primeiro)</option>
            <option value="proposicoes">Proposições de autoria (maior primeiro)</option>
          </select>
        </label>
      </form>

      <p className="mt-4 font-mono text-xs text-muted" aria-live="polite">
        {rows.length.toLocaleString("pt-BR")} {rows.length === 1 ? "parlamentar" : "parlamentares"}
        {rows.length > shown && <> · mostrando {Math.min(shown, rows.length)}</>}
      </p>

      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.slice(0, shown).map((e) => (
          <li key={e.id}>
            <Link
              href={`${basePath}/${e.slug}`}
              className="card-hover flex h-full items-center gap-3 rounded-xl border border-border bg-surface p-3"
            >
              <ParliamentarianPhoto photo={e.foto} name={e.nome} size={56} />
              <span className="min-w-0">
                <span className="block truncate font-display text-base font-bold leading-tight">{e.nome}</span>
                <span className="mt-0.5 block text-xs text-muted">
                  {e.partido} · {e.uf}
                  {e.condicao && e.condicao !== "Titular" ? ` · ${e.condicao}` : ""}
                </span>
                <span className="mt-1 block font-mono text-[11px] text-muted">
                  {sort === "gasto" && <>{gastoLabel}: {brl0.format(e.gasto)}</>}
                  {sort === "presenca" && <>Votos registrados: {e.presenca === null ? "n/d" : `${e.presenca.toLocaleString("pt-BR")}%`}</>}
                  {sort === "proposicoes" && <>{e.proposicoes.toLocaleString("pt-BR")} proposições</>}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {rows.length === 0 && <p className="mt-6 rounded-xl border border-border bg-surface p-6 text-sm text-muted">Nenhum parlamentar encontrado com esses filtros.</p>}

      {rows.length > shown && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="inline-flex h-10 items-center rounded-lg border border-border bg-surface px-5 font-mono text-xs font-medium text-foreground transition hover:border-accent/50"
          >
            Mostrar mais {Math.min(PAGE, rows.length - shown)}
          </button>
        </div>
      )}
    </div>
  );
}
