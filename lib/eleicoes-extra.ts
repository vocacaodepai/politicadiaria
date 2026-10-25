import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  finalistas,
  getMeta,
  getResultados,
  pesquisasSegundoTurno,
  segundoTurnoComecou,
  type Apuracao,
  type Candidato,
  type FonteLink,
  type Pesquisa2,
  type TseStamp,
} from "@/lib/eleicoes";

/**
 * Dados extras das eleições 2026 (apuração ao vivo, debates, agenda, campanha). Leitura em tempo de build de
 * data/eleicoes/*.json. Debates e agenda são mantidos à mão a partir de fonte aberta; campanha vem de
 * scripts/build-campanha-data.mjs (API pública do TSE).
 */

const DIR = join(process.cwd(), "data", "eleicoes");
const readJson = <T,>(rel: string): T => JSON.parse(readFileSync(join(DIR, rel), "utf8")) as T;

/* ------------------------------------------------------------ apuração */

export type ApuracaoCandidato = { nome: string; partido: string; votos: number; pct: number; eleito: boolean };
export type ApuracaoRodada = {
  titulo: string;
  uf: string | null;
  apuracao: Apuracao;
  tse: TseStamp;
  candidatos: ApuracaoCandidato[];
  comecou: boolean;
};
export type ApuracaoPesquisa = { instituto: string; campoFim: string; flavio: number; lula: number; base: "validos" | "totais"; materia: string; veiculo: string };
export type ApuracaoSnapshot = {
  /** Momento em que os dados do repositório foram atualizados (ISO com offset). */
  atualizadoEm: string;
  fonte: FonteLink;
  turno2: string;
  presidente: ApuracaoRodada;
  governadores: ApuracaoRodada[];
  /** Última rodada de pesquisas (campo mais recente de cada instituto), em votos válidos normalizados entre os dois. */
  pesquisas: ApuracaoPesquisa[];
};

const mapCand = (c: Candidato): ApuracaoCandidato => ({ nome: c.nome, partido: c.partido, votos: c.votos, pct: c.pct, eleito: c.situacao === "Eleito" });

export function ultimaRodadaPesquisas(): Pesquisa2[] {
  const m = new Map<string, Pesquisa2>();
  for (const p of pesquisasSegundoTurno()) {
    if (p.lula === null || p.flavio === null) continue;
    const a = m.get(p.instituto);
    if (!a || p.campoFim > a.campoFim) m.set(p.instituto, p);
  }
  return [...m.values()].sort((a, b) => b.campoFim.localeCompare(a.campoFim) || a.instituto.localeCompare(b.instituto, "pt-BR"));
}

export function apuracaoSnapshot(): ApuracaoSnapshot {
  const res = getResultados();
  const meta = getMeta();
  const fin = finalistas();
  const ordem = (c: Candidato[]) => [...c].sort((a, b) => b.pct - a.pct || a.nome.localeCompare(b.nome, "pt-BR"));
  const t2 = res.presidente.turno2;
  const comecou = segundoTurnoComecou();
  return {
    atualizadoEm: meta.atualizadoEm,
    fonte: { rotulo: "TSE, portal de resultados 2026", url: "https://resultados.tse.jus.br/" },
    turno2: meta.eleicao.turno2,
    presidente: {
      titulo: `${fin[0].nome} x ${fin[1].nome}`,
      uf: null,
      apuracao: t2.apuracao,
      tse: t2.tse,
      candidatos: (comecou ? ordem(t2.candidatos) : [...t2.candidatos].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))).map(mapCand),
      comecou,
    },
    governadores: res.governadores
      .filter((g) => g.segundoTurno)
      .map((g) => {
        const r = g.turno2;
        const c = r ? r.candidatos : g.turno1.candidatos.slice(0, 2);
        const ok = Boolean(r && r.apuracao.pctSecoesTotalizadas > 0);
        return {
          titulo: g.estado,
          uf: g.uf,
          apuracao: r?.apuracao ?? { secoesTotal: 0, secoesTotalizadas: 0, pctSecoesTotalizadas: 0 },
          tse: r?.tse ?? { data: "", hora: "", ultimaTotalizacao: null },
          candidatos: (ok ? ordem(c) : [...c].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))).map(mapCand),
          comecou: ok,
        };
      }),
    pesquisas: ultimaRodadaPesquisas().map((p) => ({
      instituto: p.instituto,
      campoFim: p.campoFim,
      flavio: p.flavio as number,
      lula: p.lula as number,
      base: p.base,
      materia: p.materia.url,
      veiculo: p.materia.veiculo,
    })),
  };
}

/* ------------------------------------------------------------- debates */

export type Fonte = { rotulo: string; url: string; verificadoEm?: string };
export type Fala = { candidato: string; texto: string; minuto: string | null; fonte: Fonte; checagem: string | null };
export type DebateTema = { id: string; titulo: string; falas: Fala[] };
export type DebateChecagem = { afirmacao: string; candidato: string; checagem: string | null; situacao: "em_checagem" | "checada"; fonte: Fonte };
export type TempoDeFala = { candidato: string; segundos: number; fonte: Fonte };
export type Debate = {
  id: string;
  titulo: string;
  data: string;
  horaInicio: string;
  horaFimPrevista: string | null;
  fuso: string;
  emissora: string;
  pool: string[];
  local: string;
  participantes: string[];
  mediadores: string[];
  status: "agendado" | "realizado" | "cancelado";
  formato: { bloco: string; descricao: string }[];
  regras: string[];
  fontes: Fonte[];
  noticiaRegras: string | null;
  temas: DebateTema[];
  tempoDeFala: TempoDeFala[];
  checagens: DebateChecagem[];
};
export type DebatesFile = { atualizadoEm: string; observacao: string; debates: Debate[] };
export const getDebates = (): DebatesFile => readJson<DebatesFile>("debates.json");

/* -------------------------------------------------------------- agenda */

export type EventoAgenda = {
  id: string;
  candidato: string;
  cargo: "Presidente" | "Governador";
  /** UF do cargo em disputa, para governador. */
  ufCandidato?: string;
  dataHora: string;
  tipo: string;
  descricao: string;
  cidade: string;
  uf: string;
  fonte: { rotulo: string; url: string };
  verificadoEm: string;
};
export type AgendaFile = { atualizadoEm: string; observacao: string; eventos: EventoAgenda[] };
export const getAgenda = (): AgendaFile => readJson<AgendaFile>("agenda.json");

/* ------------------------------------------------------------ campanha */

export type ValorCategoria = { categoria: string; valor: number };
export type CampanhaCandidato = {
  nome: string;
  partido: string;
  cargo: string;
  uf: string | null;
  receitas: { total: number | null; porCategoria: ValorCategoria[] | null } | null;
  despesas: { total: number | null; porCategoria: ValorCategoria[] | null } | null;
  bensDeclarados: { total: number | null; porTipo: ValorCategoria[] | null } | null;
  ultimaPrestacao: string | null;
  sigilo: boolean | null;
  urlTse: string | null;
};
export type CampanhaFile = { status: "coletado" | "nao_coletado"; motivo: string | null; coletadoEm: string; fonte: FonteLink; candidatos: CampanhaCandidato[] };
export const getCampanha = (): { presidente: CampanhaFile; governadores: CampanhaFile } => ({
  presidente: readJson<CampanhaFile>("campanha/presidente.json"),
  governadores: readJson<CampanhaFile>("campanha/governadores.json"),
});

/* ------------------------------------------------------------- sitemap */

export function eleicoesExtraUrls(): { path: string; lastModified: string; priority: number }[] {
  const u = getMeta().atualizadoEm;
  return ["/eleicoes/apuracao", "/eleicoes/agenda", "/eleicoes/debate-band", "/eleicoes/campanha"].map((path) => ({ path, lastModified: u, priority: 0.7 }));
}

/** Relógio isolado para páginas que dependem da hora da renderização (revalidate). */
export const agoraMs = (): number => Date.now();
