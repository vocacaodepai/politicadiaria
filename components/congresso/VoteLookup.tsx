"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { UF_NAMES } from "@/lib/congress-format";
import type { CamaraVote, SenadoVote } from "@/lib/congress";
import { brDate, resultText } from "./votes-shared";

/** Formato de public/data/congresso/votacoes-recentes.json (scripts/build-congress-data.mjs, buildRecentes). */
type Row = { s: string; n: string; p: string; u: string; v: string };
type Recentes = {
  atualizadoEm: string;
  n: number;
  camara: { votacoes: CamaraVote[]; parl: Row[] };
  senado: { votacoes: SenadoVote[]; parl: Row[] };
};
type Casa = "camara" | "senado";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const PATH: Record<Casa, string> = { camara: "/congresso/deputados", senado: "/congresso/senadores" };
const ABSENT = "Ausente em votação nominal";

/** Letra gravada no arquivo -> [rótulo curto, rótulo completo]. "-" = não estava em exercício na data. */
const CODES: Record<Casa, Record<string, [string, string]>> = {
  camara: {
    S: ["Sim", "Sim"],
    N: ["Não", "Não"],
    A: ["Abst.", "Abstenção"],
    O: ["Obstr.", "Obstrução"],
    "7": ["Art. 17", "Art. 17: presidia a sessão"],
    F: ["Ausente", ABSENT],
    "-": ["·", "Não estava em exercício nesta data"],
  },
  senado: {
    S: ["Sim", "Sim"],
    N: ["Não", "Não"],
    A: ["Abst.", "Abstenção"],
    O: ["Obstr.", "Obstrução"],
    V: ["Secreto", "Votou (votação secreta)"],
    P: ["Presidiu", "Presidiu a sessão"],
    R: ["Sem voto", "Presente, sem registrar voto"],
    F: ["Ausente", `${ABSENT} (não compareceu)`],
    a: ["Ativ. parl.", "Atividade parlamentar"],
    M: ["Missão", "Missão oficial"],
    L: ["Licença", "Licença"],
    n: ["N/A", "Não aplicável"],
    "-": ["·", "Sem registro nesta votação (fora do exercício)"],
  },
};

let dataPromise: Promise<Recentes> | null = null;
function loadData(): Promise<Recentes> {
  if (!dataPromise) {
    dataPromise = fetch(`${BASE}/data/congresso/votacoes-recentes.json`).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });
    dataPromise.catch(() => {
      dataPromise = null;
    });
  }
  return dataPromise;
}

const field = "h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground";
const seg = (active: boolean) =>
  `inline-flex h-10 items-center border px-4 font-mono text-xs font-semibold uppercase tracking-wide transition ${
    active ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-foreground hover:border-foreground"
  }`;
/** Descrição oficial sem o placar no fim (o resultado aparece logo depois, por extenso). */
const describe = (t: string) => {
  const s = t.replace(/\s*Sim:\s*\d[\s\S]*$/, "").trim();
  return s.length > 150 ? `${s.slice(0, 149).replace(/\s\S*$/, "")}…` : s;
};
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function cellClass(code: string) {
  if (code === "S" || code === "N") return "font-semibold text-foreground";
  if (code === "F") return "bg-surface-2 text-foreground";
  return "text-muted";
}

function Table({ casa, data, rows }: { casa: Casa; data: Recentes; rows: Row[] }) {
  const votes = data[casa].votacoes;
  const label = casa === "camara" ? "Câmara dos Deputados" : "Senado Federal";
  return (
    <section aria-label={`${label}: votos nas últimas votações nominais`} className="mt-6">
      <h3 className="font-display text-lg font-bold tracking-tight">
        {label} <span className="font-mono text-xs font-normal text-muted">{rows.length} {casa === "camara" ? (rows.length === 1 ? "deputado" : "deputados") : rows.length === 1 ? "senador" : "senadores"}</span>
      </h3>
      <ol className="mt-2 grid gap-x-6 gap-y-1.5 text-xs leading-snug text-muted md:grid-cols-2">
        {votes.map((v, i) => (
          <li key={v.id} className="flex gap-2">
            <span className="w-5 shrink-0 font-mono font-semibold text-foreground">{i + 1}</span>
            <span>
              <span className="font-mono">{brDate(v.d)}</span>
              {/* No Senado, "m" é a matéria votada. Na Câmara, o campo do arquivo em lote pode apontar
                  para um requerimento ligado à votação; a descrição oficial já nomeia o que foi votado. */}
              {casa === "senado" && v.m && (
                <>
                  {" · "}
                  <b className="text-foreground">{v.m}</b>
                </>
              )}
              {" · "}
              {describe(v.t)} <span className="whitespace-nowrap">({resultText(casa, v)})</span>
            </span>
          </li>
        ))}
      </ol>
      {rows.length === 0 ? (
        <p className="mt-3 border border-border bg-surface p-4 text-sm">Nenhum parlamentar com esses filtros.</p>
      ) : (
        <div className="relative mt-3 max-h-[70vh] overflow-auto border border-border">
          <table className="w-full min-w-[760px] border-collapse text-xs">
            <thead className="sticky top-0 z-10 bg-surface">
              <tr className="text-left font-mono text-[11px] uppercase tracking-wider text-muted">
                <th scope="col" className="border-b border-border px-2 py-2">
                  Parlamentar
                </th>
                {votes.map((v, i) => (
                  <th key={v.id} scope="col" className="border-b border-border px-1 py-2 text-center" title={`${brDate(v.d)} · ${describe(v.t)}`}>
                    {i + 1}
                    <span className="block text-[10px] font-normal normal-case tracking-normal">{brDate(v.d).slice(0, 5)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.s} className="border-t border-border">
                  <th scope="row" className="sticky left-0 whitespace-nowrap bg-surface px-2 py-1.5 text-left font-normal">
                    <Link href={`${PATH[casa]}/${r.s}`} className="font-medium text-foreground hover:text-accent hover:underline">
                      {r.n}
                    </Link>{" "}
                    <span className="font-mono text-[11px] text-muted">
                      {r.p}-{r.u}
                    </span>
                  </th>
                  {votes.map((v, i) => {
                    const code = r.v[i] ?? "-";
                    const [short, long] = CODES[casa][code] ?? [code, code];
                    return (
                      <td key={v.id} className={`px-1 py-1.5 text-center ${cellClass(code)}`} title={long}>
                        {short === long ? short : <abbr title={long} className="no-underline">{short}</abbr>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export function VoteLookup() {
  const [data, setData] = useState<Recentes | null>(null);
  const [error, setError] = useState(false);
  const [casa, setCasa] = useState<"ambas" | Casa>("ambas");
  const [uf, setUf] = useState("");
  const [party, setParty] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    let live = true;
    loadData()
      .then((d) => live && setData(d))
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, []);

  const parties = useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    for (const c of ["camara", "senado"] as Casa[]) if (casa === "ambas" || casa === c) for (const r of data[c].parl) set.add(r.p);
    return [...set].sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [data, casa]);

  const filter = (rows: Row[]) => {
    const nq = norm(q.trim());
    return rows.filter((r) => (!uf || r.u === uf) && (!party || r.p === party) && (!nq || norm(r.n).includes(nq)));
  };

  if (error) {
    return <p className="border border-border bg-surface p-4 text-sm">Não foi possível carregar os votos agora. Tente recarregar a página.</p>;
  }
  if (!data) {
    return <p className="border border-border bg-surface p-4 text-sm text-muted">Carregando os votos…</p>;
  }

  const filtered = !uf && !party && !q.trim();
  return (
    <div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex" role="group" aria-label="Casa">
          {(
            [
              ["ambas", "Ambas"],
              ["camara", "Câmara"],
              ["senado", "Senado"],
            ] as const
          ).map(([k, l]) => (
            <button key={k} type="button" className={seg(casa === k)} aria-pressed={casa === k} onClick={() => setCasa(k)}>
              {l}
            </button>
          ))}
        </div>
        <label className="flex flex-col gap-1 text-xs text-muted">
          Estado
          <select className={field} value={uf} onChange={(e) => setUf(e.target.value)}>
            <option value="">Todos</option>
            {Object.entries(UF_NAMES)
              .sort((a, b) => a[1].localeCompare(b[1], "pt-BR"))
              .map(([k, name]) => (
                <option key={k} value={k}>
                  {name} ({k})
                </option>
              ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted">
          Partido
          <select className={field} value={party} onChange={(e) => setParty(e.target.value)}>
            <option value="">Todos</option>
            {parties.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1 text-xs text-muted">
          Nome
          <input className={field} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar parlamentar" />
        </label>
      </div>
      {filtered && <p className="mt-3 text-sm text-muted">Escolha um estado ou partido para encurtar a lista. Sem filtro, aparecem todos os parlamentares em exercício.</p>}
      <p className="mt-3 text-xs leading-relaxed text-muted">
        <b className="text-foreground">Ausente</b> significa ausente em votação nominal: o parlamentar estava em exercício e não registrou voto naquela votação. Não é falta em sessão, porque a pessoa pode ter participado de outras atividades da Casa, estar em licença ou em missão oficial. No Senado, licença, missão e atividade parlamentar aparecem como a Casa as registra. Ponto (·) indica que o parlamentar não estava em exercício na data.
      </p>
      {(casa === "ambas" || casa === "camara") && <Table casa="camara" data={data} rows={filter(data.camara.parl)} />}
      {(casa === "ambas" || casa === "senado") && <Table casa="senado" data={data} rows={filter(data.senado.parl)} />}
      <p className="mt-4 text-xs text-muted">
        Últimas {data.n} votações nominais de Plenário de cada Casa presentes nos dados coletados em {brDate(data.atualizadoEm)}. A lista segue a ordem alfabética e não classifica ninguém.
      </p>
    </div>
  );
}
