import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getDeputiesIndex, getMeta, getSenatorsIndex, hasCongressData } from "./congress";

/**
 * Leitura (em tempo de build) dos dados extras do Congresso: evolução das bancadas
 * (data/congresso/evolucao.json) e tabelas por parlamentar (data/congresso/numeros.json),
 * ambos gerados por scripts/build-congress-data.mjs. Nada aqui roda no navegador.
 */

const DIR = join(process.cwd(), "data", "congresso");
const cache = new Map<string, unknown>();
function readJson<T>(rel: string): T {
  let v = cache.get(rel);
  if (v === undefined) {
    v = JSON.parse(readFileSync(join(DIR, rel), "utf8"));
    cache.set(rel, v);
  }
  return v as T;
}

/* ---------------------------------------------------------------- evolução */

export type Snapshot = {
  id: string;
  legislatura: number;
  tipo: "inicio" | "fim" | "hoje";
  data: string;
  total: number;
  partidos: Record<string, number>;
};
export type Evolucao = {
  atualizadoEm: string;
  geradoEm: string;
  legislaturas: { n: number; inicio: string; fim: string }[];
  camara: Snapshot[];
  senado: Snapshot[];
  fontes: Record<string, string>;
};

export const hasEvolucao = () => existsSync(join(DIR, "evolucao.json"));
export const getEvolucao = () => readJson<Evolucao>("evolucao.json");

/* ----------------------------------------------------------------- números */

export type NumeroRow = {
  s: string;
  n: string;
  p: string;
  u: string;
  /** gasto da cota no mandato (R$) */
  g: number;
  /** meses do período considerado */
  m: number;
  /** ausências em votação nominal */
  a: number;
  /** votações nominais em que podia votar */
  t: number;
  /** votos registrados */
  r: number;
  /** Senado: licença, missão e atividade parlamentar */
  af?: number;
  /** Senado: presente sem voto */
  ps?: number;
};
export type Numeros = { atualizadoEm: string; inicio: string; ultimoMes: string; camara: NumeroRow[]; senado: NumeroRow[] };

export const hasNumeros = () => existsSync(join(DIR, "numeros.json"));
export const getNumeros = () => readJson<Numeros>("numeros.json");

/* ----------------------------------------------------------------- sitemap */

export const NUMERO_SLUGS = [
  "cota-camara",
  "ceaps-senado",
  "subsidio",
  "verba-gabinete",
  "auxilio-moradia",
  "ausencias-camara",
  "ausencias-senado",
] as const;
export type NumeroSlug = (typeof NUMERO_SLUGS)[number];

/** Rotas novas da seção Congresso (para app/sitemap.ts). lastModified = data da coleta. */
export function congressExtraUrls(): { path: string; lastModified: string; priority: number }[] {
  if (!hasCongressData()) return [];
  const updated = getMeta().atualizadoEm;
  const out = [{ path: "/congresso/plenario", lastModified: updated, priority: 0.7 }];
  if (hasEvolucao()) out.push({ path: "/congresso/evolucao", lastModified: getEvolucao().atualizadoEm, priority: 0.6 });
  if (hasNumeros()) {
    out.push({ path: "/congresso/numeros", lastModified: updated, priority: 0.6 });
    for (const t of NUMERO_SLUGS) out.push({ path: `/congresso/numeros/${t}`, lastModified: updated, priority: 0.6 });
  }
  return out;
}

/** Contagens atuais, para textos. */
export const currentCounts = () => ({ deputados: getDeputiesIndex().length, senadores: getSenatorsIndex().length });
