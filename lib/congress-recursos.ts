import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Recursos do mandato além da cota (verba de gabinete, pessoal, auxílio-moradia, imóvel funcional,
 * viagens), gerados por scripts/build-congress-recursos.mjs em data/congresso/recursos/.
 * Só o que a fonte oficial publica; o resto é "não informado pela fonte".
 */

const DIR = join(process.cwd(), "data", "congresso", "recursos");

export type CamaraRecursos = {
  casa: "camara";
  id: number;
  coletadoEm: string;
  fonte: { pagina: string; verbaGabinete: string; cota: string };
  atualizadoNaFonte: string | null;
  verbaGabinete: {
    tetoMensal: number | null;
    totalGasto: number;
    anos: { ano: number; url: string; meses: { mes: string; disponivel: number; gasto: number }[]; totalGasto: number; totalDisponivel: number }[];
  } | null;
  pessoalGabinete: { noAno: number; ativas: number | null } | null;
  /** Quadro lotado hoje no gabinete (arquivo aberto de funcionários da Câmara): só contagem por grupo. */
  quadroGabinete?: { total: number; porGrupo: { grupo: string; n: number }[] } | null;
  imovelFuncional: { usa: boolean; desde: string | null } | null;
  auxilioMoradia: { recebe: boolean } | null;
  viagensMissaoOficial: number | null;
  passaporteDiplomatico: boolean | null;
  avisos: string[];
};

export type SenadoRecursos = {
  casa: "senado";
  id: number;
  coletadoEm: string;
  fonte: { pagina: string; api: string };
  anos: {
    ano: number;
    url: string;
    fonteApi: string;
    cota: { total: number; despesas: { recurso: string; valor: number }[] };
    foraDaCota: { total: number; despesas: { recurso: string; valor: number }[] };
    beneficios: { beneficio: string; utilizacao: string }[];
    pessoal: { local: string; quantidade: number; vinculos: { vinculo: string; quantidade: number }[] }[];
  }[];
  avisos: string[];
};

export type RecursosMeta = { atualizadoEm: string; geradoEm: string; deputados: number; senadores: number; fontes: Record<string, string>; falhas: unknown[] };

const cache = new Map<string, unknown>();
function read<T>(rel: string): T | null {
  if (cache.has(rel)) return cache.get(rel) as T;
  const f = join(DIR, rel);
  const v = existsSync(f) ? (JSON.parse(readFileSync(f, "utf8")) as T) : null;
  cache.set(rel, v);
  return v;
}

export const getRecursosMeta = () => read<RecursosMeta>("meta.json");
export const getCamaraRecursos = (id: number) => read<CamaraRecursos>(`c-${id}.json`);
export const getSenadoRecursos = (id: number) => read<SenadoRecursos>(`s-${id}.json`);
