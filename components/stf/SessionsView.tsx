"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { Session } from "@/lib/stf";

const fmt = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;
const WD = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const subscribe = () => () => {};
const brToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
const add = (iso: string, d: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + d * 86400000).toISOString().slice(0, 10);

/** Sessões do calendário oficial, filtradas pela data do leitor (semana, mês, todas). */
export function SessionsView({ sessions }: { sessions: Session[] }) {
  const [mode, setMode] = useState<"semana" | "mes" | "todas">("semana");
  // null no servidor e na hidratação; a data de Brasília do leitor depois disso
  const today = useSyncExternalStore(subscribe, brToday, () => null);

  const list = useMemo(() => {
    if (!today) return sessions;
    const dow = new Date(`${today}T12:00:00Z`).getUTCDay();
    const monday = add(today, -((dow + 6) % 7));
    const sunday = add(monday, 6);
    if (mode === "semana") return sessions.filter((s) => s.data >= monday && s.data <= sunday);
    if (mode === "mes") return sessions.filter((s) => s.data.slice(0, 7) === today.slice(0, 7));
    return sessions;
  }, [sessions, mode, today]);

  const btn = (active: boolean) =>
    `inline-flex h-9 items-center border px-3 font-mono text-xs font-semibold uppercase tracking-wide ${active ? "border-foreground bg-foreground text-background" : "border-border bg-surface hover:border-foreground"}`;

  return (
    <div>
      <div className="inline-flex" role="group" aria-label="Período">
        {(["semana", "mes", "todas"] as const).map((k, i) => (
          <button key={k} type="button" onClick={() => setMode(k)} aria-pressed={mode === k} className={`${btn(mode === k)} ${i ? "-ml-px" : ""}`}>
            {k === "semana" ? "Esta semana" : k === "mes" ? "Este mês" : "Todas"}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="mt-4 border border-border bg-surface p-4 text-sm text-muted">Nenhuma sessão no calendário oficial para este período.</p>
      ) : (
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {list.map((s) => (
            <li key={s.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3 text-sm">
              <time dateTime={s.data} className="w-28 font-mono text-xs uppercase text-muted">
                {WD[new Date(`${s.data}T12:00:00Z`).getUTCDay()]}, {fmt(s.data)}
              </time>
              <span className="font-semibold">{s.tipo}</span>
              <span className="text-muted">
                {s.inicio}
                {s.fim && s.fim !== s.inicio ? ` às ${s.fim}` : ""}
              </span>
              <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
                Calendário oficial
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
