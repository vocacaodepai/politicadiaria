"use client";

import { useState } from "react";
import type { CamaraVote, SenadoVote, VoteRow } from "@/lib/congress";
import { VOTE_LABELS, type Casa } from "./votes-shared";
import { VoteTableRows, VOTE_TABLE_HEAD } from "./VoteRows";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const STEP = 50;

/** Votos além dos 100 primeiros: o dicionário de votações só é baixado quando o leitor pede. */
export function MoreVotes({ casa, rows }: { casa: Casa; rows: VoteRow[] }) {
  const [dict, setDict] = useState<(CamaraVote | SenadoVote)[] | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [shown, setShown] = useState(0);
  const [filter, setFilter] = useState("");

  if (rows.length === 0) return null;

  async function load() {
    setState("loading");
    try {
      const res = await fetch(`${BASE}/data/congresso/votacoes-${casa}.json`);
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as { votacoes: (CamaraVote | SenadoVote)[] };
      setDict(json.votacoes);
      setShown(STEP);
      setState("idle");
    } catch {
      setState("error");
    }
  }

  const filtered = filter ? rows.filter((r) => r[1] === filter) : rows;
  const codes = Array.from(new Set(rows.map((r) => r[1])));

  if (!dict) {
    return (
      <div className="mt-4">
        <button
          type="button"
          onClick={load}
          disabled={state === "loading"}
          className="inline-flex h-10 items-center rounded-lg border border-border bg-surface px-5 font-mono text-xs font-medium transition hover:border-accent/50 disabled:opacity-60"
        >
          {state === "loading" ? "Carregando…" : `Ver mais ${rows.length.toLocaleString("pt-BR")} votações anteriores`}
        </button>
        {state === "error" && <p className="mt-2 text-xs text-danger">Não foi possível carregar agora. Tente de novo em instantes.</p>}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-base font-bold">Votações anteriores</h3>
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
        <table className="w-full min-w-[640px] border-collapse">
          <caption className="sr-only">Votações anteriores do parlamentar</caption>
          {VOTE_TABLE_HEAD}
          <tbody>
            <VoteTableRows casa={casa} rows={filtered.slice(0, shown)} dict={dict} />
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
