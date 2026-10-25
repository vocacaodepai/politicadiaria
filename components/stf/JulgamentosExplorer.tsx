"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Judgment } from "@/lib/stf";
import { SIGILO_LABEL } from "@/lib/stf-labels";
import { SigiloBadge } from "./Sigilo";

const PAGE = 25;
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const fmt = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;
const RESULT_LABEL: Record<string, string> = { unanimidade: "Por unanimidade", maioria: "Por maioria", nao_informado: "Resultado não informado" };

const sel = "h-10 w-full border border-border bg-surface px-2 text-sm text-foreground";

/** Lista pesquisável de julgamentos, filtrada no navegador sobre dados gerados no build. */
export function JulgamentosExplorer({
  items,
  ministers,
  focus,
}: {
  items: Judgment[];
  ministers: { slug: string; nome: string }[];
  /** slug do ministro da página: mostra o papel dele em cada linha. */
  focus?: string;
}) {
  const [q, setQ] = useState("");
  const [orgao, setOrgao] = useState("");
  const [classe, setClasse] = useState("");
  const [res, setRes] = useState("");
  const [sig, setSig] = useState("");
  const [min, setMin] = useState("");
  const [shown, setShown] = useState(PAGE);

  const orgaos = useMemo(() => [...new Set(items.map((i) => i.orgao))].sort(), [items]);
  const classes = useMemo(() => [...new Set(items.map((i) => i.classe))].sort(), [items]);

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return items.filter((i) => {
      if (orgao && i.orgao !== orgao) return false;
      if (classe && i.classe !== classe) return false;
      if (res && i.resultado.tipo !== res) return false;
      if (sig && i.sigilo !== sig) return false;
      if (min && i.relatorSlug !== min && !i.votos.some((v) => v.slug === min)) return false;
      if (nq && !norm(`${i.processo} ${i.titulo} ${i.tema} ${i.relator ?? ""} ${i.outrosProcessos.join(" ")}`).includes(nq)) return false;
      return true;
    });
  }, [items, q, orgao, classe, res, sig, min]);

  const reset = () => {
    setQ("");
    setOrgao("");
    setClasse("");
    setRes("");
    setSig("");
    setMin("");
    setShown(PAGE);
  };
  const touch = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setShown(PAGE);
  };

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="sm:col-span-2 lg:col-span-2">
          <span className="label-mono text-muted">Buscar</span>
          <input type="search" value={q} onChange={(e) => touch(setQ)(e.target.value)} placeholder="ADI 4395, Funrural, relator..." className={`${sel} mt-1`} />
        </label>
        {!focus && (
          <label>
            <span className="label-mono text-muted">Ministro</span>
            <select value={min} onChange={(e) => touch(setMin)(e.target.value)} className={`${sel} mt-1`}>
              <option value="">Todos</option>
              {ministers.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.nome}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          <span className="label-mono text-muted">Órgão</span>
          <select value={orgao} onChange={(e) => touch(setOrgao)(e.target.value)} className={`${sel} mt-1`}>
            <option value="">Todos</option>
            {orgaos.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="label-mono text-muted">Classe</span>
          <select value={classe} onChange={(e) => touch(setClasse)(e.target.value)} className={`${sel} mt-1`}>
            <option value="">Todas</option>
            {classes.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="label-mono text-muted">Resultado</span>
          <select value={res} onChange={(e) => touch(setRes)(e.target.value)} className={`${sel} mt-1`}>
            <option value="">Todos</option>
            {Object.entries(RESULT_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="label-mono text-muted">Sigilo</span>
          <select value={sig} onChange={(e) => touch(setSig)(e.target.value)} className={`${sel} mt-1`}>
            <option value="">Todos</option>
            {Object.entries(SIGILO_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
      </form>

      <p className="mt-4 flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted" aria-live="polite">
        {list.length} de {items.length} julgamentos
        {(q || orgao || classe || res || sig || min) && (
          <button type="button" onClick={reset} className="text-accent underline">
            limpar filtros
          </button>
        )}
      </p>

      {list.length === 0 ? (
        <p className="mt-6 border border-border bg-surface p-4 text-sm text-muted">Nenhum julgamento coletado com esses filtros.</p>
      ) : (
        <ol className="mt-3 divide-y divide-border border-y border-border">
          {list.slice(0, shown).map((j) => {
            const own = focus ? j.votos.filter((v) => v.slug === focus) : j.votos;
            return (
              <li key={j.id} className="py-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-muted">
                  <time dateTime={j.data}>{fmt(j.data)}</time>
                  <span>{j.orgao}</span>
                  <SigiloBadge value={j.sigilo} />
                </div>
                <h3 className="mt-1 font-display text-lg font-bold leading-snug">
                  {j.processoUrl ? (
                    <a href={j.processoUrl} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-accent">
                      {j.processo}
                    </a>
                  ) : (
                    j.processo
                  )}
                  <span className="font-normal text-muted">: {j.titulo}</span>
                </h3>
                <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="inline text-muted">Relator: </dt>
                    <dd className="inline">
                      {j.relator ? j.relatorSlug ? <Link href={`/stf/ministros/${j.relatorSlug}`} className="text-accent underline">{j.relator}</Link> : j.relator : "não informado pela fonte"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline text-muted">Resultado: </dt>
                    <dd className="inline">
                      {RESULT_LABEL[j.resultado.tipo]}
                      {j.resultado.placar ? ` (${j.resultado.placar})` : ""}
                    </dd>
                  </div>
                </dl>
                {j.dataTipo.startsWith("data da notícia") && <p className="mt-1 text-xs text-muted">Data da notícia do STF; a sessão pode ser anterior.</p>}
                {own.length > 0 && (
                  <details className="mt-2 text-sm">
                    <summary className="cursor-pointer text-accent">
                      {focus ? "Voto descrito pela fonte" : `Votos descritos pela fonte (${own.length})`}
                    </summary>
                    <ul className="mt-2 space-y-2 border-l-[3px] border-border pl-3">
                      {own.map((v, k) => (
                        <li key={k}>
                          <strong>{v.slug ? <Link href={`/stf/ministros/${v.slug}`} className="underline">{v.ministro}</Link> : v.ministro}</strong>: {v.tipo}
                          {v.relator ? " (relator)" : ""}.<span className="block text-xs text-muted">Trecho da fonte: &ldquo;{v.trecho}&rdquo;</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                <p className="mt-2 flex flex-wrap gap-x-4 text-xs">
                  <a href={j.fonteUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
                    Notícia oficial do STF
                  </a>
                  {j.processoUrl && (
                    <a href={j.processoUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
                      Processo no portal do STF
                    </a>
                  )}
                </p>
              </li>
            );
          })}
        </ol>
      )}
      {list.length > shown && (
        <button type="button" onClick={() => setShown((n) => n + PAGE)} className="mt-4 inline-flex h-10 items-center border border-foreground px-4 font-mono text-xs font-semibold uppercase tracking-wide hover:bg-foreground hover:text-background">
          Mostrar mais ({list.length - shown})
        </button>
      )}
    </div>
  );
}
