"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { AGENDA_CATEGORIAS, agendaDay, type AgendaCategoria, type AgendaEvento } from "@/lib/congress-agenda-format";
import { AgendaItem } from "./AgendaItem";

const field = "h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground focus:border-accent focus:outline-none";

type Periodo = "todos" | "hoje" | "semana" | "proximos" | "passados";
const PERIODOS: { id: Periodo; label: string }[] = [
  { id: "todos", label: "Toda a janela" },
  { id: "hoje", label: "Hoje" },
  { id: "semana", label: "Esta semana" },
  { id: "proximos", label: "Próximos" },
  { id: "passados", label: "Já ocorreram" },
];

const subscribeNever = () => () => {};
const brToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
/** Segunda a domingo da semana de `iso`. */
function weekOf(iso: string): [string, string] {
  const dow = (new Date(`${iso}T12:00:00Z`).getUTCDay() + 6) % 7; // segunda = 0
  const start = addDays(iso, -dow);
  return [start, addDays(start, 6)];
}
const WEEKDAY = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
function dayTitle(iso: string) {
  const w = WEEKDAY[new Date(`${iso}T12:00:00Z`).getUTCDay()];
  return `${w}, ${iso.split("-").reverse().join("/")}`;
}

export function AgendaExplorer({
  events,
  partidos,
  ufs,
  orgaos,
  janela,
}: {
  events: AgendaEvento[];
  partidos: string[];
  ufs: string[];
  orgaos: { sigla: string; nome: string }[];
  janela: { de: string; ate: string };
}) {
  const [casa, setCasa] = useState("");
  const [partido, setPartido] = useState("");
  const [uf, setUf] = useState("");
  const [orgao, setOrgao] = useState("");
  const [categoria, setCategoria] = useState<AgendaCategoria | "">("");
  const [chosen, setPeriodo] = useState<Periodo | null>(null);
  // Data de hoje em Brasília, só no navegador (no servidor e na hidratação é null: a página estática mostra tudo).
  const today = useSyncExternalStore(subscribeNever, brToday, () => null);
  // Sem escolha do leitor: se hoje cai na janela coletada, abre em "Próximos"; fora dela, mostra tudo.
  const periodo: Periodo = chosen ?? (today && today >= janela.de && today <= janela.ate ? "proximos" : "todos");

  const rows = useMemo(() => {
    const now = today ?? brToday();
    const [w0, w1] = weekOf(now);
    return events.filter((e) => {
      if (casa && e.casa !== casa) return false;
      if (categoria && e.categoria !== categoria) return false;
      if (orgao && e.orgao?.sigla !== orgao) return false;
      if (partido && !e.partidos.includes(partido)) return false;
      if (uf && !e.ufs.includes(uf)) return false;
      const day = agendaDay(e.inicio);
      if (periodo === "hoje") return day === now;
      if (periodo === "semana") return day >= w0 && day <= w1;
      if (periodo === "proximos") return day >= now;
      if (periodo === "passados") return day < now;
      return true;
    });
  }, [events, casa, categoria, orgao, partido, uf, periodo, today]);

  const byDay = useMemo(() => {
    const m = new Map<string, AgendaEvento[]>();
    for (const e of rows) (m.get(agendaDay(e.inicio)) ?? m.set(agendaDay(e.inicio), []).get(agendaDay(e.inicio))!).push(e);
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [rows]);

  const clear = () => {
    setCasa("");
    setPartido("");
    setUf("");
    setOrgao("");
    setCategoria("");
    setPeriodo("todos");
  };

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="block">
          <span className="label-mono text-muted">Casa</span>
          <select value={casa} onChange={(e) => setCasa(e.target.value)} className={`${field} mt-1 w-full`}>
            <option value="">Todas</option>
            <option value="camara">Câmara dos Deputados</option>
            <option value="senado">Senado Federal</option>
            <option value="congresso">Congresso Nacional</option>
          </select>
        </label>
        <label className="block">
          <span className="label-mono text-muted">Partido do parlamentar</span>
          <select value={partido} onChange={(e) => setPartido(e.target.value)} className={`${field} mt-1 w-full`}>
            <option value="">Todos</option>
            {partidos.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="label-mono text-muted">Estado (UF)</span>
          <select value={uf} onChange={(e) => setUf(e.target.value)} className={`${field} mt-1 w-full`}>
            <option value="">Todos</option>
            {ufs.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="label-mono text-muted">Comissão ou órgão</span>
          <select value={orgao} onChange={(e) => setOrgao(e.target.value)} className={`${field} mt-1 w-full`}>
            <option value="">Todos</option>
            {orgaos.map((o) => (
              <option key={o.sigla} value={o.sigla}>
                {o.sigla}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="label-mono text-muted">Tipo</span>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value as AgendaCategoria | "")} className={`${field} mt-1 w-full`}>
            <option value="">Todos</option>
            {(Object.keys(AGENDA_CATEGORIAS) as AgendaCategoria[]).map((c) => (
              <option key={c} value={c}>
                {AGENDA_CATEGORIAS[c]}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Período">
        {PERIODOS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPeriodo(p.id)}
            aria-pressed={periodo === p.id}
            className={`inline-flex h-8 items-center whitespace-nowrap rounded-lg border px-3 text-xs font-medium transition ${
              periodo === p.id ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-muted hover:border-accent/50 hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
        <button type="button" onClick={clear} className="ml-auto text-xs text-accent underline">
          Limpar filtros
        </button>
      </div>

      <p className="mt-4 font-mono text-xs text-muted" aria-live="polite">
        {rows.length} {rows.length === 1 ? "evento" : "eventos"}
        {today ? ` · hoje é ${today.split("-").reverse().join("/")} (Brasília)` : ""}
      </p>

      {byDay.length === 0 ? (
        <p className="mt-6 rounded-xl border border-border bg-surface p-6 text-sm text-muted">Nenhum evento encontrado com esses filtros na janela coletada.</p>
      ) : (
        <div className="mt-4 space-y-8">
          {byDay.map(([day, list]) => (
            <section key={day} aria-labelledby={`d-${day}`}>
              <h2 id={`d-${day}`} className="border-t-[3px] border-foreground pt-2 font-display text-xl font-bold capitalize tracking-tight">
                {dayTitle(day)}
                {today === day && <span className="ml-2 font-mono text-xs font-semibold uppercase text-accent">hoje</span>}
              </h2>
              <div className="mt-3 divide-y divide-border">
                {list.map((e) => (
                  <AgendaItem key={e.id} e={e} showParticipants />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
