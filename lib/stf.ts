import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Leitura (em tempo de build) dos dados do Supremo gerados por scripts/build-stf-data.mjs
 * em data/stf/. Nada aqui roda no navegador. Nunca edite os JSON à mão.
 */

const DIR = join(process.cwd(), "data", "stf");
const cache = new Map<string, unknown>();
function readJson<T>(file: string): T {
  let v = cache.get(file);
  if (v === undefined) {
    v = JSON.parse(readFileSync(join(DIR, file), "utf8"));
    cache.set(file, v);
  }
  return v as T;
}

export type StfPhoto = { url: string; credito: string; creditoUrl: string; licenca: string; fonte: "oficial" | "wikimedia" } | null;

import type { Sigilo } from "./stf-labels";
export { SIGILO_LABEL } from "./stf-labels";
export type { Sigilo } from "./stf-labels";

export type MinisterStats = {
  cobertura: { de: string; ate: string } | null;
  relatoriasEmJulgamentos: number;
  relatoriasNaPauta: number;
  votosRegistrados: number;
  votosPorTipo: Record<string, number>;
  tempoMedioPedidoVista: number | null;
  decisoesMonocraticasPorAno: Record<string, number> | null;
  nota: string;
};

export type Minister = {
  slug: string;
  nome: string;
  nomeCompleto: string;
  wikipedia: string;
  nascimento: string | null;
  nascimentoLocal: string | null;
  formacao: string;
  indicadoPor: string;
  posse: string | null;
  aposentadoriaCompulsoria: string | null;
  carreira: string | null;
  turma: string | null;
  turmaPresidente: boolean;
  cargo: string;
  aliases: string[];
  senado: { data: string | null; favoraveis: number; contrarios: number; trecho: string; fonte: string; fonteUrl: string } | null;
  foto: StfPhoto;
  estatisticas: MinisterStats;
};

export type MinistersFile = {
  atualizadoEm: string;
  presidente: string | null;
  vicePresidente: string | null;
  vagas: number;
  ministros: Minister[];
  fonteNome: string;
  fonteUrl: string;
  fontePortalUrl: string;
};

export type Vote = { ministro: string; slug: string | null; tipo: string; relator: boolean; trecho: string };

export type Judgment = {
  id: string;
  data: string;
  dataTipo: string;
  publicadoEm: string;
  orgao: string;
  classe: string;
  numero: string;
  processo: string;
  outrosProcessos: string[];
  titulo: string;
  tema: string;
  relator: string | null;
  relatorSlug: string | null;
  resultado: { tipo: "unanimidade" | "maioria" | "nao_informado"; placar?: string | null; texto: string | null };
  votos: Vote[];
  sigilo: Sigilo;
  fonteNome: string;
  fonteUrl: string;
  processoUrl: string | null;
};

export type Coverage = {
  de: string | null;
  ate: string | null;
  janelaSolicitada: { de: string; ate: string };
  julgamentos: number;
  comVotoIndividual: number;
  votosIndividuais: number;
  fonte: string;
  fonteUrl: string;
  limite: string;
};

export type JudgmentsFile = { atualizadoEm: string; cobertura: Coverage; itens: Judgment[] };

export type AgendaItem = {
  classe: string;
  numero: string;
  rotulo: string;
  tema: string | null;
  etapa: string | null;
  relator: string | null;
  relatorSlug: string | null;
  partes: string | null;
  resumo: string | null;
  url: string | null;
  sigilo: Sigilo;
};

export type Pauta = {
  id: string;
  titulo: string;
  publicadoEm: string;
  data: string;
  orgao: string;
  horario: string | null;
  periodoVirtual: string | null;
  itens: AgendaItem[];
  fonteNome: string;
  fonteUrl: string;
};

export type Session = { id: string; data: string; inicio: string; fim: string | null; tipo: string; titulo: string; registradoPor: string | null; url: string };

export type AgendaFile = {
  atualizadoEm: string;
  sessoes: Session[];
  pautas: Pauta[];
  fontes: { rotulo: string; url: string; obs?: string }[];
  recesso: { rotulo: string; url: string } | null;
  avisos: string[];
};

export type StfMeta = {
  atualizadoEm: string;
  coletadoEm: string;
  cobertura: Coverage;
  contagens: Record<string, number>;
  fontes: { id: string; nome: string; url: string; uso: string; acesso: string }[];
  avisos: string[];
};

export const hasStfData = () => existsSync(join(DIR, "meta.json")) && existsSync(join(DIR, "ministros.json"));
export const getStfMeta = () => readJson<StfMeta>("meta.json");
export const getMinistersFile = () => readJson<MinistersFile>("ministros.json");
export const getMinisters = () => getMinistersFile().ministros;
export const getMinister = (slug: string) => getMinisters().find((m) => m.slug === slug) ?? null;
export const ministerParams = () => getMinisters().map((m) => ({ slug: m.slug }));
export const getJudgmentsFile = () => readJson<JudgmentsFile>("julgamentos.json");
export const getAgenda = () => readJson<AgendaFile>("pauta.json");

export function judgmentsOfMinister(slug: string): Judgment[] {
  return getJudgmentsFile().itens.filter((j) => j.relatorSlug === slug || j.votos.some((v) => v.slug === slug));
}

export const fmtDateBR = (iso: string | null | undefined) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : "não informado");

export function ageOn(birth: string | null, today = new Date()): number | null {
  if (!birth) return null;
  const b = new Date(`${birth}T12:00:00Z`);
  let a = today.getUTCFullYear() - b.getUTCFullYear();
  if (today.getUTCMonth() < b.getUTCMonth() || (today.getUTCMonth() === b.getUTCMonth() && today.getUTCDate() < b.getUTCDate())) a--;
  return a;
}

export function stfUrls(): { path: string; lastModified: string; priority: number }[] {
  if (!hasStfData()) return [];
  const updated = getStfMeta().atualizadoEm;
  return [
    { path: "/stf", lastModified: updated, priority: 0.8 },
    { path: "/stf/julgamentos", lastModified: updated, priority: 0.6 },
    { path: "/stf/agenda", lastModified: updated, priority: 0.6 },
    ...ministerParams().map((p) => ({ path: `/stf/ministros/${p.slug}`, lastModified: updated, priority: 0.5 })),
  ];
}
