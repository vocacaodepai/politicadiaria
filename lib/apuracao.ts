import { getResultados, type Candidato, type Rodada } from "@/lib/eleicoes";

/**
 * Apuração ao vivo do 2º turno de 2026, lida no servidor dos arquivos JSON oficiais do TSE
 * (https://resultados.tse.jus.br/oficial/ele2026/...). A página que usa isto revalida a cada 30 s;
 * o TSE serve os arquivos com cache de 50 s. Qualquer falha (403, 5xx, timeout, JSON inesperado)
 * vira o estado "indisponivel" e a página cai para data/eleicoes/resultados.json. Nada aqui lança
 * erro para a página, nem no build.
 */

/** Sobrescrevível por TSE_BASE_URL só para testes locais com servidor falso. */
export const TSE_BASE = process.env.TSE_BASE_URL ?? "https://resultados.tse.jus.br/oficial/ele2026";
export const REVALIDATE_SEGUNDOS = 30;
const TIMEOUT_MS = 8000;

export type Corrida = {
  id: string;
  rotulo: string;
  cargo: "presidente" | "governador";
  uf: string;
  elecao: string;
  cargoCodigo: "0001" | "0003";
  /** Caminho no TSE, sem a base. */
  caminho: string;
};

const GOVERNADORES: { uf: string; estado: string }[] = [
  { uf: "AC", estado: "Acre" },
  { uf: "AM", estado: "Amazonas" },
  { uf: "DF", estado: "Distrito Federal" },
  { uf: "ES", estado: "Espírito Santo" },
  { uf: "RN", estado: "Rio Grande do Norte" },
  { uf: "TO", estado: "Tocantins" },
];

export function corridas(): Corrida[] {
  const pres: Corrida = {
    id: "presidente",
    rotulo: "Presidente da República",
    cargo: "presidente",
    uf: "BR",
    elecao: "6258",
    cargoCodigo: "0001",
    caminho: "6258/dados/br/br-c0001-e006258-u.json",
  };
  const govs: Corrida[] = GOVERNADORES.map((g) => {
    const u = g.uf.toLowerCase();
    return {
      id: `governador-${u}`,
      rotulo: `Governador: ${g.estado}`,
      cargo: "governador",
      uf: g.uf,
      elecao: "6260",
      cargoCodigo: "0003",
      caminho: `6260/dados/${u}/${u}-c0003-e006260-u.json`,
    };
  });
  return [pres, ...govs];
}

export type EstadoApuracao = "aguardando" | "apurando" | "concluida" | "indisponivel";

export type CandidatoVivo = {
  numero: string;
  nome: string;
  partido: string;
  votos: number;
  /** Percentual sobre os votos válidos, como o TSE calcula. */
  pct: number;
  /** Texto bruto do campo de situação do TSE ("Eleito", "Não eleito", "" ...). */
  situacao: string;
  /** Verdadeiro só se o TSE marcou o candidato como eleito. */
  eleitoSegundoTse: boolean;
};

export type ApuracaoViva = {
  corrida: Corrida;
  estado: EstadoApuracao;
  /** De onde vieram os números: arquivo ao vivo do TSE ou o último dado salvo no site. */
  origem: "tse" | "arquivo-do-site" | "nenhuma";
  pctSecoes: number;
  secoesTotalizadas: number;
  secoesTotal: number;
  votosValidos: number;
  brancos: number;
  nulos: number;
  comparecimento: number;
  candidatos: CandidatoVivo[];
  /** Carimbos do TSE, como vêm no arquivo (horário de Brasília). */
  geradoData: string | null;
  geradoHora: string | null;
  totalizacaoData: string | null;
  totalizacaoHora: string | null;
  motivoFalha?: string;
};

/* ------------------------------------------------------------------ parsing */

const num = (s: unknown): number => {
  const n = Number(String(s ?? "0").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};
const r2 = (n: number) => Math.round(n * 100) / 100;

const PARTICULAS = new Set(["de", "da", "do", "dos", "das", "e"]);
function titulo(s: string): string {
  return s
    .toLocaleLowerCase("pt-BR")
    .split(" ")
    .map((w, i) => (i > 0 && PARTICULAS.has(w) ? w : w.charAt(0).toLocaleUpperCase("pt-BR") + w.slice(1)))
    .join(" ");
}

type TseJson = {
  dg?: string;
  hg?: string;
  dt?: string;
  ht?: string;
  s?: Record<string, string>;
  v?: Record<string, string>;
  e?: Record<string, string>;
  carg?: { agr?: { par?: { sg?: string; cand?: { n?: string; nmu?: string; st?: string; vap?: string; pvap?: string; pvapn?: string }[] }[] }[] }[];
};

/** Candidatos conhecidos (nome com acento, partido) do arquivo local, por número. */
function rosterLocal(c: Corrida): Candidato[] {
  const r = getResultados();
  if (c.cargo === "presidente") return r.presidente.turno2.candidatos;
  return r.governadores.find((g) => g.uf === c.uf)?.turno2?.candidatos ?? [];
}

function sobrenome(nome: string): string {
  return nome.split(" ").slice(-1)[0];
}

/** Ordem fixa e igual para todos: alfabética pelo sobrenome. Nunca pela votação. */
export function ordemAlfabetica<T extends { nome: string }>(lista: T[]): T[] {
  return [...lista].sort((a, b) => sobrenome(a.nome).localeCompare(sobrenome(b.nome), "pt-BR") || a.nome.localeCompare(b.nome, "pt-BR"));
}

function parse(c: Corrida, j: TseJson): ApuracaoViva {
  const roster = rosterLocal(c);
  const lista: CandidatoVivo[] = [];
  for (const ag of j.carg?.[0]?.agr ?? []) {
    for (const p of ag.par ?? []) {
      for (const k of p.cand ?? []) {
        const numero = String(k.n ?? "");
        const conhecido = roster.find((x) => x.numero === numero);
        const st = (k.st ?? "").trim();
        lista.push({
          numero,
          nome: conhecido?.nome ?? titulo(k.nmu ?? "Candidato"),
          partido: conhecido?.partido ?? p.sg ?? "",
          votos: num(k.vap),
          pct: r2(num(k.pvapn ?? k.pvap)),
          situacao: st,
          eleitoSegundoTse: /^eleit[oa]$/i.test(st),
        });
      }
    }
  }
  if (lista.length === 0) throw new Error("arquivo sem candidatos");
  const s = j.s ?? {};
  const pct = num(s.pstn ?? s.pst);
  const votosTotais = num(j.v?.tv);
  const estado: EstadoApuracao = pct <= 0 || votosTotais <= 0 ? "aguardando" : pct >= 100 ? "concluida" : "apurando";
  return {
    corrida: c,
    estado,
    origem: "tse",
    pctSecoes: pct,
    secoesTotalizadas: num(s.st),
    secoesTotal: num(s.ts),
    votosValidos: num(j.v?.vvc),
    brancos: num(j.v?.vb),
    nulos: num(j.v?.tvn),
    comparecimento: num(j.e?.c),
    candidatos: ordemAlfabetica(lista),
    geradoData: j.dg || null,
    geradoHora: j.hg || null,
    totalizacaoData: j.dt || null,
    totalizacaoHora: j.ht || null,
  };
}

/* ------------------------------------------------------------------ fallback */

function doArquivoLocal(c: Corrida, motivo: string): ApuracaoViva {
  const base: ApuracaoViva = {
    corrida: c,
    estado: "indisponivel",
    origem: "nenhuma",
    pctSecoes: 0,
    secoesTotalizadas: 0,
    secoesTotal: 0,
    votosValidos: 0,
    brancos: 0,
    nulos: 0,
    comparecimento: 0,
    candidatos: ordemAlfabetica(
      rosterLocal(c).map((x) => ({ numero: x.numero, nome: x.nome, partido: x.partido, votos: 0, pct: 0, situacao: "", eleitoSegundoTse: false })),
    ),
    geradoData: null,
    geradoHora: null,
    totalizacaoData: null,
    totalizacaoHora: null,
    motivoFalha: motivo,
  };
  const r = getResultados();
  const rodada: Rodada | null = c.cargo === "presidente" ? r.presidente.turno2 : (r.governadores.find((g) => g.uf === c.uf)?.turno2 ?? null);
  if (!rodada || rodada.apuracao.pctSecoesTotalizadas <= 0 || rodada.votos.totais <= 0) return base;
  // O arquivo do site já tem votos do 2º turno: mostra, rotulado como dado salvo.
  return {
    ...base,
    origem: "arquivo-do-site",
    pctSecoes: rodada.apuracao.pctSecoesTotalizadas,
    secoesTotalizadas: rodada.apuracao.secoesTotalizadas,
    secoesTotal: rodada.apuracao.secoesTotal,
    votosValidos: rodada.votos.validos,
    brancos: rodada.votos.brancos,
    nulos: rodada.votos.nulos,
    comparecimento: rodada.eleitorado.comparecimento,
    candidatos: ordemAlfabetica(
      rodada.candidatos.map((x) => ({ numero: x.numero, nome: x.nome, partido: x.partido, votos: x.votos, pct: x.pct, situacao: x.situacao, eleitoSegundoTse: /^eleit[oa]$/i.test(x.situacao) })),
    ),
    geradoData: rodada.tse.data,
    geradoHora: rodada.tse.hora,
    totalizacaoData: rodada.tse.ultimaTotalizacao?.split(" ")[0] ?? null,
    totalizacaoHora: rodada.tse.ultimaTotalizacao?.split(" ")[1] ?? null,
  };
}

/* ------------------------------------------------------------------- fetch */

async function lerCorrida(c: Corrida): Promise<ApuracaoViva> {
  try {
    const res = await fetch(`${TSE_BASE}/${c.caminho}`, {
      headers: { "user-agent": "politicadiaria-eleicoes/1.0 (+https://www.politicadiaria.com.br)", accept: "application/json" },
      next: { revalidate: REVALIDATE_SEGUNDOS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return doArquivoLocal(c, `HTTP ${res.status}`);
    const json = (await res.json()) as TseJson;
    return parse(c, json);
  } catch (e) {
    return doArquivoLocal(c, e instanceof Error ? e.message : "falha desconhecida");
  }
}

/** Lê as sete corridas em paralelo. Nunca lança. */
export async function apuracaoAoVivo(): Promise<ApuracaoViva[]> {
  return Promise.all(corridas().map(lerCorrida));
}

export function algumaApuracaoComecou(a: ApuracaoViva[]): boolean {
  return a.some((x) => x.estado === "apurando" || x.estado === "concluida" || x.origem === "arquivo-do-site");
}
