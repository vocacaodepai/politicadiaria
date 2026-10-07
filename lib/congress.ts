import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Leitura (em tempo de build) dos dados abertos do Congresso Nacional gerados por
 * scripts/build-congress-data.mjs em data/congresso/. Nada aqui roda no navegador.
 */

const DIR = join(process.cwd(), "data", "congresso");

/* ------------------------------------------------------------------ tipos */

export type Photo = {
  url: string;
  credito: string;
  creditoUrl: string;
  licenca: string;
  fonte: "oficial" | "wikimedia";
} | null;

export type SourceLink = { rotulo: string; url: string };

export type ExpenseYear = { ano: number; total: number; categorias: { categoria: string; total: number }[] };
export type Expenses = {
  total: number;
  documentos: number;
  porAno: ExpenseYear[];
  porCategoria: { categoria: string; total: number }[];
  porMes: { mes: string; total: number }[];
  fornecedores: { nome: string; cnpj: string; total: number }[];
} | null;

export type Propositions = {
  total: number;
  primeiroAutor: number;
  porTipo: Record<string, number>;
  recentes: { id: number; titulo: string; data: string; ementa: string; situacao?: string | null; primeiro: boolean }[];
};

export type VoteRow = [number, string];

export type Deputy = {
  id: number;
  slug: string;
  nome: string;
  nomeEleitoral: string | null;
  nomeCivil: string | null;
  partido: string;
  uf: string;
  sexo: string | null;
  nascimento: string | null;
  idade: number | null;
  naturalidade: string | null;
  escolaridade: string | null;
  profissoes: string[];
  situacao: string | null;
  condicao: string | null;
  descricaoStatus: string | null;
  legislatura: number;
  inicioExercicio: string | null;
  foto: Photo;
  email: string | null;
  gabinete: { sala: string; predio: string | null; andar: string | null; telefone: string | null } | null;
  site: string | null;
  redes: string[];
  perfil: string;
  trocasDePartido: { data: string; de: string; para: string }[];
  historicoSituacao: { data: string; situacao: string; condicao: string | null; descricao: string | null }[];
  orgaos: { sigla: string; nome: string; cargo: string; inicio: string | null; fim: string | null; id: number }[];
  frentes: { id: number; titulo: string }[];
  votacoes: {
    total: number;
    elegiveis: number;
    registradas: number;
    contagem: { sim: number; nao: number; abstencao: number; obstrucao: number; art17: number; ausencias: number };
    lista: VoteRow[];
  };
  despesas: Expenses;
  proposicoes: Propositions;
};

export type Senator = {
  id: number;
  slug: string;
  nome: string;
  nomeCivil: string | null;
  partido: string;
  uf: string;
  bloco: string | null;
  sexo: string;
  nascimento: string | null;
  idade: number | null;
  naturalidade: string | null;
  situacao: string;
  condicao: string | null;
  mandato: { participacao: string | null; legislaturaInicio: string | null; fim: string | null; exercicioInicio: string | null };
  suplentes: { ordem: string; nome: string }[];
  membroMesa: boolean;
  lideranca: boolean;
  foto: Photo;
  email: string | null;
  telefones: string[];
  gabinete: string | null;
  perfil: string;
  partidos: { sigla: string; filiacao: string | null; desfiliacao: string | null }[];
  comissoes: { sigla: string; nome: string; casa: string; cargo: string; inicio: string | null; fim: string | null; id: string }[];
  cargos: { sigla: string; nome: string; cargo: string; inicio: string | null; fim: string | null }[];
  votacoes: {
    total: number;
    registradas: number;
    contagem: {
      sim: number;
      nao: number;
      abstencao: number;
      obstrucao: number;
      secreto: number;
      presidente: number;
      presenteSemVoto: number;
      naoCompareceu: number;
      atividadeParlamentar: number;
      missao: number;
      licenca: number;
      naoCitado: number;
    };
    lista: VoteRow[];
  };
  despesas: Expenses;
  proposicoes: Propositions;
};

export type IndexEntry = {
  id: number;
  slug: string;
  nome: string;
  partido: string;
  uf: string;
  sexo: string | null;
  condicao: string | null;
  situacao: string | null;
  foto: { url: string } | null;
  gasto: number;
  ausencias: number;
  presenca: number | null;
  proposicoes: number;
};

export type CamaraVote = { id: string; d: string; m: string | null; e: string | null; t: string; a: number | null; s: number | null; n: number | null; o: number | null };
export type SenadoVote = { id: string; d: string; m: string | null; e: string | null; t: string; r: string | null; sec: boolean; s: number | null; n: number | null; ab: number | null };

type Tally<K extends string> = ({ n: number } & Record<K, string>)[];
type Aggregate = {
  total: number;
  porPartido: { sigla: string; n: number }[];
  porUf: { uf: string; n: number }[];
  porSexo: { rotulo: string; n: number }[];
  faixasEtarias: { rotulo: string; n: number }[];
  idadeMedia: number;
  condicao: { rotulo: string; n: number }[];
  despesas: { total: number; porAno: { ano: number; total: number }[]; porCategoria: { categoria: string; total: number }[] };
  escolaridade?: { rotulo: string; n: number }[];
  porBloco?: { rotulo: string; n: number }[];
};
export type Summary = {
  atualizadoEm: string;
  legislatura: number;
  totalParlamentares: number;
  camara: Aggregate;
  senado: Aggregate;
  partidosCongresso: { sigla: string; n: number; deputados: number; senadores: number }[];
};
export type { Tally };

export type Meta = {
  atualizadoEm: string;
  geradoEm: string;
  legislatura: number;
  inicioLegislatura: string;
  fontes: Record<string, string>;
};

export type Remuneracao = {
  verificadoEm: string;
  aviso: string;
  subsidio: { valor: number; descricao: string; fonte: SourceLink; fonteSenado: SourceLink };
  camara: {
    verbaGabinete: { tetoMensal: number; maxSecretarios: number; salarioMinimoSecretario: number; salarioMaximoSecretario: number; descricao: string; fonte: SourceLink };
    cota: { nome: string; minimoMensal: number; minimoUf: string; maximoMensal: number; maximoUf: string; descricao: string; observacao: string; fonte: SourceLink; fonteOficial: SourceLink };
    auxilioMoradia: { valorMensal: number; apartamentosFuncionais: number; descricao: string; fonte: SourceLink };
    diarias: { nacionalPorDia: number; descricao: string; fonte: SourceLink };
  };
  senado: {
    cota: { nome: string; descricao: string; fonte: SourceLink };
    verbaGabinete: { descricao: string; fonte: SourceLink };
    auxilioMoradia: { descricao: string; fonte: SourceLink };
  };
};

/* ---------------------------------------------------------------- leitores */

const cache = new Map<string, unknown>();
function readJson<T>(rel: string): T {
  let v = cache.get(rel);
  if (v === undefined) {
    v = JSON.parse(readFileSync(join(DIR, rel), "utf8"));
    cache.set(rel, v);
  }
  return v as T;
}

/** Os dados já foram gerados? (o coletor ainda não rodou em um clone novo) */
export function hasCongressData(): boolean {
  return existsSync(join(DIR, "resumo.json")) && existsSync(join(DIR, "deputados", "index.json"));
}

export const getMeta = () => readJson<Meta>("meta.json");
export const getSummary = () => readJson<Summary>("resumo.json");
export const getRemuneracao = () => readJson<Remuneracao>("remuneracao.json");
export const getDeputiesIndex = () => readJson<IndexEntry[]>("deputados/index.json");
export const getSenatorsIndex = () => readJson<IndexEntry[]>("senadores/index.json");
export const getCamaraVotes = () => readJson<{ atualizadoEm: string; votacoes: CamaraVote[] }>("votacoes-camara.json").votacoes;
export const getSenadoVotes = () => readJson<{ atualizadoEm: string; votacoes: SenadoVote[] }>("votacoes-senado.json").votacoes;

/** O id é o trecho numérico final do slug ("nikolas-ferreira-209787"). */
export function idFromSlug(slug: string): number | null {
  const m = /-(\d+)$/.exec(slug);
  return m ? Number(m[1]) : null;
}

export function getDeputy(slug: string): Deputy | null {
  const id = idFromSlug(slug);
  if (id === null || !getDeputiesIndex().some((d) => d.id === id && d.slug === slug)) return null;
  return readJson<Deputy>(`deputados/${id}.json`);
}

export function getSenator(slug: string): Senator | null {
  const id = idFromSlug(slug);
  if (id === null || !getSenatorsIndex().some((d) => d.id === id && d.slug === slug)) return null;
  return readJson<Senator>(`senadores/${id}.json`);
}

export const deputyParams = () => getDeputiesIndex().map((d) => ({ slug: d.slug }));
export const senatorParams = () => getSenatorsIndex().map((d) => ({ slug: d.slug }));

/* ----------------------------------------------------------------- partidos */

export function partySlug(sigla: string): string {
  return sigla
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const partyParams = () => getSummary().partidosCongresso.map((p) => ({ sigla: partySlug(p.sigla) }));

export function getParty(slugOrSigla: string) {
  const info = getSummary().partidosCongresso.find((p) => partySlug(p.sigla) === slugOrSigla);
  if (!info) return null;
  return {
    sigla: info.sigla,
    slug: partySlug(info.sigla),
    deputados: getDeputiesIndex().filter((d) => d.partido === info.sigla),
    senadores: getSenatorsIndex().filter((d) => d.partido === info.sigla),
  };
}

/* ------------------------------------------------------------ sitemap/nav */

export const CONGRESS_PATHS = {
  home: "/congresso",
  deputados: "/congresso/deputados",
  senadores: "/congresso/senadores",
} as const;

/** Todos os caminhos públicos da seção (para app/sitemap.ts). lastModified = data da coleta. */
export function congressUrls(): { path: string; lastModified: string; priority: number }[] {
  if (!hasCongressData()) return [];
  const updated = getMeta().atualizadoEm;
  return [
    { path: "/congresso", lastModified: updated, priority: 0.8 },
    { path: "/congresso/deputados", lastModified: updated, priority: 0.7 },
    { path: "/congresso/senadores", lastModified: updated, priority: 0.7 },
    ...partyParams().map((p) => ({ path: `/congresso/partidos/${p.sigla}`, lastModified: updated, priority: 0.5 })),
    ...getDeputiesIndex().map((d) => ({ path: `/congresso/deputados/${d.slug}`, lastModified: updated, priority: 0.4 })),
    ...getSenatorsIndex().map((d) => ({ path: `/congresso/senadores/${d.slug}`, lastModified: updated, priority: 0.5 })),
  ];
}

/* ---------------------------------------------------------------- formatos */

export const UF_NAMES: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará", DF: "Distrito Federal",
  ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais",
  PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
};

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const brl0 = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const formatBRL = (v: number) => brl.format(v);
export const formatBRLShort = (v: number) => brl0.format(v);
export const formatInt = (v: number) => v.toLocaleString("pt-BR");
export const formatPct = (v: number, digits = 1) => `${v.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
export const pct = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0);

export function formatBirth(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "long", year: "numeric" });
}

export function initials(name: string): string {
  const parts = name.split(/\s+/).filter((p) => p.length > 2 || /^[A-ZÀ-Ú]/.test(p));
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  return `${m}/${y}`;
}

/** Rede social a partir da URL (rótulo neutro). */
export function socialLabel(url: string): string {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("twitter") || h === "x.com") return "X (Twitter)";
    if (h.includes("facebook")) return "Facebook";
    if (h.includes("youtube")) return "YouTube";
    if (h.includes("tiktok")) return "TikTok";
    if (h.includes("linkedin")) return "LinkedIn";
    if (h.includes("kwai")) return "Kwai";
    if (h.includes("t.me") || h.includes("telegram")) return "Telegram";
    return h;
  } catch {
    return "Link";
  }
}

export function safeExternalUrl(url: string): string | null {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}
