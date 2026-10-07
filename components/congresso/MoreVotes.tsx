"use client";

import { useState } from "react";
import type { CamaraVote, SenadoVote, VoteRow } from "@/lib/congress";
import { VOTE_LABELS, type Casa } from "./votes-shared";
import { VoteTableRows, VOTE_TABLE_HEAD, VOTE_TABLE_CLASS } from "./VoteRows";
import { brDate } from "./votes-shared";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const STEP = 50;

export type Extras = {
  /** Uma letra por votação, na ordem do dicionário ("-" = sem registro). */
  v: string;
  op: { sigla: string; nome: string; cargo: string; inicio: string | null; fim: string | null }[];
  fr: string[];
  pr: { id: number; titulo: string; data: string; ementa: string; situacao?: string | null; primeiro: boolean }[];
};

const CODE: Record<string, string> = { "7": "17", a: "AP", n: "NA" };
const cache = new Map<string, Promise<unknown>>();

function load<T>(url: string): Promise<T> {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p as Promise<T>;
}
export const loadExtras = (casa: Casa, id: number) => load<Extras>(`${BASE}/data/congresso/extras/${casa}/${id}.json`);
const loadDict = (casa: Casa) => load<{ votacoes: (CamaraVote | SenadoVote)[] }>(`${BASE}/data/congresso/votacoes-${casa}.json`);

function decode(v: string): VoteRow[] {
  const rows: VoteRow[] = [];
  for (let i = 0; i < v.length; i++) if (v[i] !== "-") rows.push([i, CODE[v[i]] ?? v[i]]);
  return rows;
}

/** Votos além dos mais recentes: carrega só quando o leitor pede. */
export function MoreVotes({ casa, id, skip }: { casa: Casa; id: number; skip: number }) {
  const [data, setData] = useState<{ rows: VoteRow[]; dict: (CamaraVote | SenadoVote)[] } | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [shown, setShown] = useState(0);
  const [filter, setFilter] = useState("");

  async function open() {
    setState("loading");
    try {
      const [ex, d] = await Promise.all([loadExtras(casa, id), loadDict(casa)]);
      setData({ rows: decode(ex.v).slice(skip), dict: d.votacoes });
      setShown(STEP);
      setState("idle");
    } catch {
      setState("error");
    }
  }

  if (!data) {
    return (
      <div className="mt-4">
        <button
          type="button"
          onClick={open}
          disabled={state === "loading"}
          className="inline-flex h-10 items-center rounded-lg border border-border bg-surface px-5 font-mono text-xs font-medium transition hover:border-accent/50 disabled:opacity-60"
        >
          {state === "loading" ? "Carregando…" : "Ver todas as votações anteriores"}
        </button>
        {state === "error" && <p className="mt-2 text-xs text-danger">Não foi possível carregar agora. Tente de novo em instantes.</p>}
      </div>
    );
  }

  const filtered = filter ? data.rows.filter((r) => r[1] === filter) : data.rows;
  const codes = Array.from(new Set(data.rows.map((r) => r[1])));
  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-bold">Votações anteriores ({data.rows.length.toLocaleString("pt-BR")})</h3>
        <label className="text-xs text-muted">
          Mostrar:{" "}
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setShown(STEP);
            }}
            className="ml-1 h-8 rounded-md border border-border bg-surface px-2 text-xs text-foreground"
          >
            <option value="">todos os registros</option>
            {codes.map((c) => (
              <option key={c} value={c}>
                {VOTE_LABELS[casa][c] ?? c}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className={VOTE_TABLE_CLASS}>
          <caption className="sr-only">Votações anteriores do parlamentar</caption>
          {VOTE_TABLE_HEAD}
          <tbody>
            <VoteTableRows casa={casa} rows={filtered.slice(0, shown)} dict={data.dict} />
          </tbody>
        </table>
      </div>
      {filtered.length > shown && (
        <button
          type="button"
          onClick={() => setShown((n) => n + STEP)}
          className="mt-4 inline-flex h-10 items-center rounded-lg border border-border bg-surface px-5 font-mono text-xs font-medium transition hover:border-accent/50"
        >
          Mostrar mais {Math.min(STEP, filtered.length - shown)} (restam {(filtered.length - shown).toLocaleString("pt-BR")})
        </button>
      )}
    </div>
  );
}

/** Listas longas (participações anteriores, frentes, proposições) carregadas sob demanda. */
export function LazyList({ casa, id, kind, label, skip = 0 }: { casa: Casa; id: number; kind: "op" | "fr" | "pr"; label: string; skip?: number }) {
  const [ex, setEx] = useState<Extras | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  async function open() {
    setState("loading");
    try {
      setEx(await loadExtras(casa, id));
      setState("idle");
    } catch {
      setState("error");
    }
  }

  if (!ex) {
    return (
      <div className="mt-4">
        <button
          type="button"
          onClick={open}
          disabled={state === "loading"}
          className="inline-flex h-9 items-center rounded-lg border border-border bg-surface px-4 font-mono text-xs font-medium transition hover:border-accent/50 disabled:opacity-60"
        >
          {state === "loading" ? "Carregando…" : label}
        </button>
        {state === "error" && <p className="mt-2 text-xs text-danger">Não foi possível carregar agora.</p>}
      </div>
    );
  }
  if (kind === "fr") {
    return (
      <ul className="mt-3 list-disc space-y-0.5 pl-5 text-sm">
        {ex.fr.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    );
  }
  if (kind === "op") {
    return (
      <ul className="mt-3 divide-y divide-border text-sm">
        {ex.op.map((o) => (
          <li key={`${o.sigla}-${o.inicio}-${o.fim}-${o.cargo}`} className="py-1.5">
            <span className="font-medium">{o.sigla}</span> · {o.nome}{" "}
            <span className="text-muted">
              ({o.cargo}, {o.inicio ? brDate(o.inicio) : "?"} a {o.fim ? brDate(o.fim) : "?"})
            </span>
          </li>
        ))}
      </ul>
    );
  }
  const link = (pid: number) =>
    casa === "camara" ? `https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=${pid}` : `https://www25.senado.leg.br/web/atividade/materias/-/materia/${pid}`;
  return (
    <ul className="mt-3 divide-y divide-border">
      {ex.pr.slice(skip).map((p) => (
        <li key={`${p.id}-${p.titulo}`} className="py-2.5">
          <a href={link(p.id)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-accent hover:underline">
            {p.titulo}
          </a>
          <span className="ml-2 font-mono text-xs text-muted">{brDate(p.data)}</span>
          <p className="mt-0.5 text-xs leading-snug text-muted">{p.ementa}</p>
          {p.situacao && <p className="mt-0.5 text-xs text-muted">Situação: {p.situacao}</p>}
        </li>
      ))}
    </ul>
  );
}
