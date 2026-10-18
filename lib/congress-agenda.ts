import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Leitura (em tempo de build) da agenda do Congresso gerada por scripts/build-congress-agenda.mjs
 * em data/congresso/agenda/. Fontes: API de eventos da Câmara e agenda de comissões, Plenário e
 * Congresso Nacional do Senado. Nada aqui roda no navegador.
 */

import type { AgendaEvento, AgendaMeta } from "./congress-agenda-format";

export * from "./congress-agenda-format";

const DIR = join(process.cwd(), "data", "congresso", "agenda");

export type AgendaVinculo = { e: string; v: "registro" | "membro"; c?: string };

const cache = new Map<string, unknown>();
function read<T>(rel: string): T | null {
  if (cache.has(rel)) return cache.get(rel) as T;
  const f = join(DIR, rel);
  const v = existsSync(f) ? (JSON.parse(readFileSync(f, "utf8")) as T) : null;
  cache.set(rel, v);
  return v;
}

export const hasAgenda = () => existsSync(join(DIR, "eventos.json")) && existsSync(join(DIR, "meta.json"));
export const getAgendaMeta = () => read<AgendaMeta>("meta.json");
export const getAgendaEvents = () => read<AgendaEvento[]>("eventos.json") ?? [];

let byIdCache: Map<string, AgendaEvento> | null = null;
const eventsById = () => (byIdCache ??= new Map(getAgendaEvents().map((e) => [e.id, e])));

/** Agenda de um parlamentar: eventos (mais antigos primeiro) com o tipo de vínculo. */
export function getParliamentarianAgenda(casa: "camara" | "senado", id: number): { evento: AgendaEvento; v: AgendaVinculo["v"]; cargo?: string }[] | null {
  const links = read<AgendaVinculo[]>(`parlamentares/${casa === "camara" ? "c" : "s"}-${id}.json`);
  if (!links) return null;
  const byId = eventsById();
  return links
    .map((l) => ({ evento: byId.get(l.e), v: l.v, cargo: l.c }))
    .filter((x): x is { evento: AgendaEvento; v: AgendaVinculo["v"]; cargo: string | undefined } => !!x.evento)
    .sort((a, b) => a.evento.inicio.localeCompare(b.evento.inicio));
}

