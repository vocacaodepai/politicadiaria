import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Gastos de campanha dos parlamentares (candidaturas de 2022 e 2026), gerados por
 * scripts/build-campanha-parlamentares.mjs em data/congresso/campanha/ a partir dos dados abertos do
 * TSE. Doadores só agregados por origem; nenhum CPF.
 */

const DIR = join(process.cwd(), "data", "congresso", "campanha");

export type Total = { nome: string; total: number };

export type CampanhaEleicao = {
  ano: number;
  status: "vinculado" | "nao-vinculado" | "sem-candidatura";
  motivo?: string;
  criterio?: string;
  fontes: { dadosAbertos: string; prestacaoDeContas: string; consultaPublica: string };
  candidatura?: {
    cargo: string;
    uf: string;
    numero: string;
    nomeUrna: string;
    partido: string;
    situacaoCandidatura: string | null;
    resultado: string | null;
  };
  prestacao?: { tipo: string | null; ultimaData: string | null } | null;
  receitas?: {
    total: number;
    porOrigem: Total[];
    porFonte: Total[];
    doadoresPessoaFisica: number;
    doadoresPessoaJuridica: number;
  } | null;
  despesas?: { contratadas: number; pagas: number; porOrigemContratadas: Total[]; porOrigemPagas: Total[] } | null;
  bens?: { total: number; quantidade: number; porTipo: Total[] } | null;
  avisoPrestacao?: string | null;
};

export type Campanha = { casa: "camara" | "senado"; id: number; geradoEm: string; eleicoes: CampanhaEleicao[] };
export type CampanhaMeta = {
  atualizadoEm: string;
  geradoEm: string;
  eleicoes: number[];
  estatisticas: Record<string, { candidaturas: number; vinculados: number }>;
  porStatus: Record<string, number>;
  observacao: string;
};

const cache = new Map<string, unknown>();
function read<T>(rel: string): T | null {
  if (cache.has(rel)) return cache.get(rel) as T;
  const f = join(DIR, rel);
  const v = existsSync(f) ? (JSON.parse(readFileSync(f, "utf8")) as T) : null;
  cache.set(rel, v);
  return v;
}

export const getCampanhaMeta = () => read<CampanhaMeta>("meta.json");
export const getCampanha = (casa: "camara" | "senado", id: number) => read<Campanha>(`${casa === "camara" ? "c" : "s"}-${id}.json`);
