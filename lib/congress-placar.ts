import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Placar oficial das proposições citadas em notícias (só em tempo de build).
 * - content/proposicoes-noticias.json: slug da notícia -> proposições (mantido pela rotina de notícias).
 * - data/congresso/placares.json: votações de Plenário resolvidas nas APIs oficiais por
 *   scripts/build-congress-data.mjs (--only=votacoes). Nada aqui é calculado a partir de texto.
 */

export type PlacarCount = { sim: number; nao: number; abstencao: number; obstrucao: number; outros: number };

export type PlacarVotacao = {
  id: string;
  data: string;
  descricao: string | null;
  /** 1 aprovada, 0 rejeitada, null sem informação */
  aprovacao: number | null;
  /** nominal: com placar; simbolica: a fonte registra votação sem voto nominal; semNominal: deliberação sem votação nominal registrada; secreta: sem votos individuais */
  tipo: "nominal" | "simbolica" | "semNominal" | "secreta";
  placar?: PlacarCount & { total: number };
  orientacoes?: { sigla: string; voto: string }[];
  partidos?: ({ sigla: string } & PlacarCount)[];
};

export type PlacarCasa = { id: number | string | null; ementa: string | null; url: string | null; votacoes: PlacarVotacao[] };

export type PlacarProposicao = { sigla: string; numero: number; ano: number; camara: PlacarCasa | null; senado: PlacarCasa | null };

type Placares = { atualizadoEm: string; fontes: { camara: string; senado: string }; proposicoes: Record<string, PlacarProposicao> };
type Mapping = { noticias: Record<string, { sigla: string; numero: number; ano: number }[]> };

const MAP = join(process.cwd(), "content", "proposicoes-noticias.json");
const OUT = join(process.cwd(), "data", "congresso", "placares.json");

let cached: { map: Mapping; placares: Placares | null } | null = null;
function load() {
  if (!cached) {
    const map: Mapping = existsSync(MAP) ? JSON.parse(readFileSync(MAP, "utf8")) : { noticias: {} };
    const placares: Placares | null = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : null;
    cached = { map, placares };
  }
  return cached;
}

/** Proposições da notícia que têm ao menos uma votação de Plenário registrada na fonte oficial. */
export function getNewsPlacares(slug: string): { atualizadoEm: string; items: PlacarProposicao[] } | null {
  const { map, placares } = load();
  const refs = map.noticias?.[slug];
  if (!placares || !refs?.length) return null;
  const items = refs
    .map((r) => placares.proposicoes[`${String(r.sigla).toUpperCase()}-${Number(r.numero)}-${Number(r.ano)}`])
    .filter((p): p is PlacarProposicao => Boolean(p && ((p.camara?.votacoes.length ?? 0) > 0 || (p.senado?.votacoes.length ?? 0) > 0)));
  return items.length ? { atualizadoEm: placares.atualizadoEm, items } : null;
}
