import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Leitura (em tempo de build) dos dados das eleições gerais de 2026 em data/eleicoes/:
 * resultados.json e meta.json (gerados por scripts/build-eleicoes-data.mjs a partir do TSE),
 * pesquisas.json e institutos.json (mantidos à mão a partir de fonte aberta conferida).
 * Nada aqui roda no navegador.
 */

const DIR = join(process.cwd(), "data", "eleicoes");

function readJson<T>(name: string): T {
  return JSON.parse(readFileSync(join(DIR, name), "utf8")) as T;
}

/* ------------------------------------------------------------------ tipos */

export type Candidato = {
  numero: string;
  nome: string;
  partido: string;
  federacao: string | null;
  coligacao: string | null;
  vice: string | null;
  votos: number;
  pct: number;
  situacao: string;
};

export type Apuracao = { secoesTotal: number; secoesTotalizadas: number; pctSecoesTotalizadas: number };
export type Eleitorado = { aptos: number; comparecimento: number; pctComparecimento: number; abstencoes: number; pctAbstencao: number };
export type VotosResumo = { validos: number; brancos: number; pctBrancos: number; nulos: number; pctNulos: number; totais: number };
export type TseStamp = { data: string; hora: string; ultimaTotalizacao: string | null };

export type Rodada = {
  turno?: number;
  apuracao: Apuracao;
  eleitorado: Eleitorado;
  votos: VotosResumo;
  candidatos: Candidato[];
  tse: TseStamp;
};

export type Governador = {
  uf: string;
  estado: string;
  turno1: Rodada;
  turno2: Rodada | null;
  segundoTurno: boolean;
  eleito: string | null;
};

export type SenadorEleito = { uf: string; nome: string; partido: string; votos: number; pct: number };

export type Agrupamento = {
  nome: string;
  sigla: string;
  partidos: string[];
  federacao: boolean;
  cadeiras: number;
  votos: number;
  pctVotos: number;
  ufsComCadeira: number;
  ufsAcimaDe1_5: number;
  clausula: "votos" | "cadeiras" | "nao";
};

export type Resultados = {
  atualizadoEm: string;
  presidente: { turno1: Rodada; turno2: Rodada };
  governadores: Governador[];
  senado: {
    vagas: number;
    eleitosTotal: number;
    pctApuracaoMinima: number;
    porPartido: { sigla: string; n: number }[];
    eleitos: SenadorEleito[];
  };
  camara: {
    vagas: number;
    eleitosTotal: number;
    pctApuracaoMinima: number;
    votosValidosNacional: number;
    porPartido: { sigla: string; n: number }[];
    agrupamentos: Agrupamento[];
    clausulaRegra: { pctVotos: number; pctPorUf: number; ufsMinimas: number; cadeirasMinimas: number; texto: string };
    porUf: { uf: string; vagas: number; eleitos: number }[];
  };
};

export type FonteLink = { rotulo: string; url: string };

export type CalendarioItem = {
  data: string;
  dataRotulo?: string;
  titulo: string;
  descricao: string;
  confirmada: boolean;
  fonte: FonteLink | null;
};

export type Meta = {
  eleicao: { ano: number; turno1: string; turno2: string; segundoTurnoGovernadores: string[]; fonteDatas: string };
  atualizadoEm: string;
  avisosColeta?: string[];
  fontesResultados: { rotulo: string; url: string; arquivoTse: TseStamp | null }[];
  calendario: CalendarioItem[];
  fontes: (FonteLink & { uso: string })[];
};

export type PesquisaBase = {
  id: string;
  instituto: string;
  rotulo: string;
  campoInicio: string;
  campoFim: string;
  amostra: number;
  margem: number;
  registro: string | null;
  publicadoEm: string | null;
  materia: { url: string; veiculo: string; titulo: string | null };
};

export type Pesquisa1 = PesquisaBase & {
  valores: Record<string, number>;
  outros: number | null;
  indecisos: number | null;
  completa?: boolean;
  base?: "validos" | "totais";
  observacao?: string;
};

export type Pesquisa2 = PesquisaBase & {
  lula: number | null;
  flavio: number | null;
  indecisos: number | null;
  base: "validos" | "totais";
};

export type Historico = {
  ano: number;
  dataVotacao: string;
  resultadoValidos: Record<string, number>;
  resultadoOutros?: number;
  principais: string[];
  nomes: Record<string, string>;
  fonteResultado: FonteLink;
  pesquisas: Pesquisa1[];
};

export type PesquisasFile = {
  coletadoEm: string;
  observacao: string;
  compilacao: FonteLink[];
  registroTse: FonteLink;
  primeiroTurno2026: Pesquisa1[];
  segundoTurno2026: Pesquisa2[];
  historico: Record<string, Historico>;
};

export type InstitutosFile = { observacao: string; institutos: { slug: string; nome: string; rotulos: string[] }[] };

/* ----------------------------------------------------------------- leitura */

let _res: Resultados | undefined;
let _meta: Meta | undefined;
let _pesq: PesquisasFile | undefined;
let _inst: InstitutosFile | undefined;

export const getResultados = (): Resultados => (_res ??= readJson<Resultados>("resultados.json"));
export const getMeta = (): Meta => (_meta ??= readJson<Meta>("meta.json"));
export const getPesquisas = (): PesquisasFile => (_pesq ??= readJson<PesquisasFile>("pesquisas.json"));
export const getInstitutos = (): InstitutosFile => (_inst ??= readJson<InstitutosFile>("institutos.json"));

/* ------------------------------------------------------------- formatação */

export const fmtInt = (n: number) => n.toLocaleString("pt-BR");
export const fmtPct = (n: number, digits = 2) =>
  `${n.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
export const fmtPp = (n: number, digits = 1) =>
  `${n.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits })} p.p.`;

/** "2026-10-04" -> "04/10/2026". */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${d}/${m}/${y}`;
}

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** Período de campo: "29 set a 3 out" ou "3 out". */
export function fmtCampo(ini: string, fim: string): string {
  const [, m1, d1] = ini.split("-").map(Number);
  const [, m2, d2] = fim.split("-").map(Number);
  if (ini === fim) return `${d2} ${MESES[m2 - 1]}`;
  if (m1 === m2) return `${d1} a ${d2} ${MESES[m2 - 1]}`;
  return `${d1} ${MESES[m1 - 1]} a ${d2} ${MESES[m2 - 1]}`;
}

/** ISO com offset -> "13/10/2026 às 18h50" (horário de Brasília). */
export function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")}/${get("month")}/${get("year")} às ${get("hour")}h${get("minute")}`;
}

export function diasEntre(aIso: string, bIso: string): number {
  return Math.round((Date.parse(`${bIso}T00:00:00Z`) - Date.parse(`${aIso}T00:00:00Z`)) / 86400000);
}

/* --------------------------------------------------------------- presidente */

/** Duas pessoas que disputam o 2º turno, em ordem alfabética do sobrenome (sem ordem política). */
export function finalistas(): Candidato[] {
  const c = getResultados().presidente.turno1.candidatos.filter((x) => x.situacao === "2º turno");
  return [...c].sort((a, b) => a.nome.split(" ").slice(-1)[0].localeCompare(b.nome.split(" ").slice(-1)[0], "pt-BR"));
}

export function segundoTurnoComecou(): boolean {
  return getResultados().presidente.turno2.apuracao.pctSecoesTotalizadas > 0;
}

/* ------------------------------------------------------ ranking de acerto */

export type AcertoLinha = {
  poll: Pesquisa1;
  /** Compartilhamento normalizado em votos válidos (pontos percentuais), por candidato principal. */
  parte: Record<string, number>;
  demais: number;
  /** Erro com sinal (pesquisa menos resultado), por candidato principal. */
  erro: Record<string, number>;
  erroDemais: number;
  erroMedio: number;
  erroMaximo: number;
  /** Diferença entre 1º e 2º do resultado: pesquisa menos resultado. */
  erroDiferenca: number;
  margemEfetiva: number;
  lideresNaMargem: number;
  acertouPrimeiro: boolean;
  acertouFinalistas: boolean;
  acertouOrdem: boolean;
  diasAteVotacao: number;
  somaPublicada: number;
};

export type AcertoConjunto = {
  ano: number;
  dataVotacao: string;
  nomes: Record<string, string>;
  principais: string[];
  resultado: Record<string, number>;
  resultadoDemais: number;
  lideres: [string, string];
  ordemResultado: string[];
  linhas: AcertoLinha[];
  excluidas: { poll: Pesquisa1; motivo: string }[];
  fonteResultado: FonteLink;
};

const r2 = (n: number) => Math.round(n * 100) / 100;

function calcLinha(poll: Pesquisa1, c: { principais: string[]; resultado: Record<string, number>; resultadoDemais: number; ordem: string[]; dataVotacao: string }): AcertoLinha {
  const v = (k: string) => poll.valores[k] ?? 0;
  const soma = Object.values(poll.valores).reduce((a, b) => a + b, 0) + (poll.outros ?? 0);
  const parte: Record<string, number> = {};
  for (const k of c.principais) parte[k] = (v(k) / soma) * 100;
  const demaisBruto = soma - c.principais.reduce((a, k) => a + v(k), 0);
  const demais = (demaisBruto / soma) * 100;
  const erro: Record<string, number> = {};
  for (const k of c.principais) erro[k] = parte[k] - c.resultado[k];
  const absErros = c.principais.map((k) => Math.abs(erro[k]));
  const [l1, l2] = c.ordem;
  const ordemPoll = [...c.principais].sort((a, b) => parte[b] - parte[a]);
  const margemEfetiva = poll.margem * (100 / soma);
  const lideres = [l1, l2];
  return {
    poll,
    parte,
    demais,
    erro,
    erroDemais: demais - c.resultadoDemais,
    erroMedio: absErros.reduce((a, b) => a + b, 0) / absErros.length,
    erroMaximo: Math.max(...absErros),
    erroDiferenca: parte[l1] - parte[l2] - (c.resultado[l1] - c.resultado[l2]),
    margemEfetiva,
    lideresNaMargem: lideres.filter((k) => Math.abs(erro[k]) <= margemEfetiva).length,
    acertouPrimeiro: ordemPoll[0] === l1,
    acertouFinalistas: new Set(ordemPoll.slice(0, 2)).size === 2 && ordemPoll.slice(0, 2).every((k) => lideres.includes(k)),
    acertouOrdem: ordemPoll.slice(0, 4).join() === c.ordem.slice(0, 4).join(),
    diasAteVotacao: diasEntre(poll.campoFim, c.dataVotacao),
    somaPublicada: soma,
  };
}

const KEY_BY_NAME_2026: Record<string, string> = {
  Lula: "lula",
  "Flávio Bolsonaro": "flavio",
  "Augusto Cury": "cury",
  "Ronaldo Caiado": "caiado",
  "Renan Santos": "renan",
  "Romeu Zema": "zema",
};
const NOMES_2026: Record<string, string> = {
  lula: "Lula",
  flavio: "Flávio Bolsonaro",
  cury: "Augusto Cury",
  caiado: "Ronaldo Caiado",
  renan: "Renan Santos",
  zema: "Romeu Zema",
};

function conjunto(
  ano: number,
  dataVotacao: string,
  nomes: Record<string, string>,
  principais: string[],
  resultado: Record<string, number>,
  fonteResultado: FonteLink,
  pesquisas: Pesquisa1[],
  exigidos: string[],
): AcertoConjunto {
  const ordem = [...principais].sort((a, b) => resultado[b] - resultado[a]);
  const resultadoDemais = r2(100 - principais.reduce((a, k) => a + resultado[k], 0));
  const excluidas: AcertoConjunto["excluidas"] = [];
  const boas: Pesquisa1[] = [];
  for (const p of pesquisas) {
    const faltam = exigidos.filter((k) => p.valores[k] === undefined);
    if (p.completa === false || faltam.length) {
      excluidas.push({ poll: p, motivo: "Só divulgou o percentual de parte dos candidatos, o que impede a comparação com o resultado completo." });
    } else boas.push(p);
  }
  // Uma linha por instituto: a pesquisa com campo mais recente.
  const ultimas = new Map<string, Pesquisa1>();
  for (const p of boas) {
    const atual = ultimas.get(p.instituto);
    if (!atual || p.campoFim > atual.campoFim) ultimas.set(p.instituto, p);
  }
  const linhas = [...ultimas.values()]
    .map((p) => calcLinha(p, { principais, resultado, resultadoDemais, ordem, dataVotacao }))
    .sort((a, b) => a.erroMedio - b.erroMedio || a.poll.instituto.localeCompare(b.poll.instituto, "pt-BR"));
  return {
    ano,
    dataVotacao,
    nomes,
    principais,
    resultado,
    resultadoDemais,
    lideres: [ordem[0], ordem[1]],
    ordemResultado: ordem,
    linhas,
    excluidas,
    fonteResultado,
  };
}

/** Acerto das últimas pesquisas de cada instituto contra o resultado apurado do 1º turno de 2026. */
export function acerto2026(): AcertoConjunto {
  const res = getResultados().presidente.turno1;
  const resultado: Record<string, number> = {};
  for (const c of res.candidatos) {
    const k = KEY_BY_NAME_2026[c.nome];
    if (k) resultado[k] = c.pct;
  }
  const principais = Object.keys(NOMES_2026);
  return conjunto(
    2026,
    getMeta().eleicao.turno1,
    NOMES_2026,
    principais,
    resultado,
    { rotulo: "TSE, resultados 2026 (presidente, 1º turno)", url: "https://resultados.tse.jus.br/" },
    getPesquisas().primeiroTurno2026,
    ["lula", "flavio", "cury", "caiado", "renan", "zema"],
  );
}

export function acertoHistorico(ano: 2022 | 2018): AcertoConjunto {
  const h = getPesquisas().historico[String(ano)];
  const principais = h.principais;
  return conjunto(h.ano, h.dataVotacao, h.nomes, principais, h.resultadoValidos, h.fonteResultado, h.pesquisas, principais);
}

export type QuadroGeralLinha = {
  slug: string;
  instituto: string;
  anos: { ano: number; erroMedio: number; erroDiferenca: number; posicao: number; de: number }[];
  mediaErroDiferenca: number;
};

/** Institutos que aparecem em duas ou mais eleições, com o erro na diferença entre 1º e 2º em cada uma. */
export function quadroGeral(conjuntos: AcertoConjunto[]): QuadroGeralLinha[] {
  const inst = getInstitutos().institutos;
  const slugDe = (nome: string) => inst.find((i) => i.nome === nome)?.slug ?? nome;
  const map = new Map<string, QuadroGeralLinha>();
  for (const c of conjuntos) {
    c.linhas.forEach((l, i) => {
      const slug = slugDe(l.poll.instituto);
      const row = map.get(slug) ?? { slug, instituto: l.poll.instituto, anos: [], mediaErroDiferenca: 0 };
      row.anos.push({ ano: c.ano, erroMedio: l.erroMedio, erroDiferenca: l.erroDiferenca, posicao: i + 1, de: c.linhas.length });
      map.set(slug, row);
    });
  }
  return [...map.values()]
    .filter((r) => r.anos.length >= 2)
    .map((r) => ({
      ...r,
      anos: r.anos.sort((a, b) => a.ano - b.ano),
      mediaErroDiferenca: r.anos.reduce((a, y) => a + Math.abs(y.erroDiferenca), 0) / r.anos.length,
    }))
    .sort((a, b) => a.mediaErroDiferenca - b.mediaErroDiferenca);
}

/* ---------------------------------------------------------- 2º turno (polls) */

export function pesquisasSegundoTurno(): Pesquisa2[] {
  return [...getPesquisas().segundoTurno2026].sort((a, b) => b.campoFim.localeCompare(a.campoFim) || a.instituto.localeCompare(b.instituto, "pt-BR"));
}

/* -------------------------------------------------------------- calendário */

export type CalendarioResolvido = CalendarioItem & { situacao: "concluido" | "proximo" | "futuro" };

export function calendario(hoje: string = new Date().toISOString().slice(0, 10)): CalendarioResolvido[] {
  const itens = getMeta().calendario;
  let achouProximo = false;
  return itens.map((i) => {
    const d = i.data.length === 7 ? `${i.data}-28` : i.data;
    if (d < hoje) return { ...i, situacao: "concluido" as const };
    if (!achouProximo) {
      achouProximo = true;
      return { ...i, situacao: "proximo" as const };
    }
    return { ...i, situacao: "futuro" as const };
  });
}

/* ------------------------------------------------------------------- sitemap */

export function eleicoesUrls(): { path: string; lastModified: string; priority: number }[] {
  const updated = getMeta().atualizadoEm;
  return [
    { path: "/eleicoes", lastModified: updated, priority: 0.9 },
    { path: "/eleicoes/pesquisas", lastModified: updated, priority: 0.8 },
    { path: "/eleicoes/dia-da-eleicao", lastModified: updated, priority: 0.9 },
  ];
}
