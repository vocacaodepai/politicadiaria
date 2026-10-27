import { readFileSync } from "node:fs";
import { join } from "node:path";
import { sortedChecagens } from "@/lib/checagens";
import { sortedNews } from "@/lib/news";
import type { FactCheck, NewsItem } from "@/lib/types";

/**
 * Leitura (em tempo de build) do painel de promessas em data/promessas/:
 * meta.json (eleito, posse, planos, "não fará", checagens de agências) e um JSON por candidato.
 * Os arquivos são mantidos à mão ou pela rotina de promessas, sempre de fonte aberta conferida
 * (docs/rotinas/promessas.md). Nada aqui roda no navegador.
 */

const DIR = join(process.cwd(), "data", "promessas");

function readJson<T>(name: string): T {
  return JSON.parse(readFileSync(join(DIR, name), "utf8")) as T;
}

export const PROMESSAS_PATH = "/promessas";

/* ------------------------------------------------------------------ tipos */

export type CandidatoSlug = "lula" | "flavio";
export const candidatoSlugs: CandidatoSlug[] = ["lula", "flavio"];

export type PromessaStatus = "prometida" | "em tramitacao" | "em andamento" | "entregue" | "contrariada" | "sem dados";

export type PromessaFonte = { nome: string; url: string; pagina?: string; tipo: "plano" | "imprensa" | "oficial" };
export type PromessaIndicador = { nome: string; url: string; serie: string };
export type PromessaHistorico = {
  data: string;
  status: PromessaStatus;
  resumo: string;
  fonte: { nome: string; url: string };
};

export type Promessa = {
  id: string;
  area: string;
  titulo: string;
  texto: string;
  meta: string;
  prazo: string;
  origem: "plano" | "campanha";
  citacao: string;
  fonte: PromessaFonte;
  indicador?: PromessaIndicador;
  status: PromessaStatus;
  historico: PromessaHistorico[];
  notas: string;
};

type CandidatoFile = { candidato: CandidatoSlug; propostas: Promessa[] };

export type NaoFara = {
  texto: string;
  citacao: string;
  data: string;
  fonte: { nome: string; url: string; pagina?: string };
  contexto?: string;
};

export type PlanoInfo = {
  titulo: string;
  paginas: number;
  url: string;
  hospedadoPor: string;
  materia: string;
  divulgadoEm: string;
  sha256: string;
};

export type CandidatoInfo = {
  nome: string;
  nomeCompleto: string;
  partido: string;
  plano: PlanoInfo;
  naoFara: NaoFara[];
};

export type ChecagemAgencia = {
  candidato: CandidatoSlug;
  propostaId?: string;
  tema: string;
  alegacao: string;
  rotulo: string;
  agencia: string;
  data: string;
  resumo: string;
  fonte: { nome: string; url: string };
};

export type PromessasMeta = {
  eleito: CandidatoSlug | null;
  posse: string;
  atualizadoEm: string;
  segundoTurno: string;
  candidatos: Record<CandidatoSlug, CandidatoInfo>;
  checagensAgencias: ChecagemAgencia[];
  limitacoes: string[];
};

/* ------------------------------------------------------------- catálogos */

export const statusList: { slug: PromessaStatus; label: string; meaning: string }[] = [
  { slug: "prometida", label: "Prometida", meaning: "Consta no plano ou foi dita em campanha. Ainda sem acompanhamento." },
  { slug: "em tramitacao", label: "Em tramitação", meaning: "Há proposta formal em análise no Congresso ou em outro órgão, comprovada em fonte oficial." },
  { slug: "em andamento", label: "Em andamento", meaning: "Há ato oficial ou execução em curso, comprovados em fonte oficial." },
  { slug: "entregue", label: "Entregue", meaning: "A meta foi cumprida, segundo fonte oficial e o indicador da proposta." },
  { slug: "contrariada", label: "Contrariada", meaning: "Há ato oficial ou dado verificável que contraria a promessa. Sempre com fonte." },
  { slug: "sem dados", label: "Sem dados", meaning: "Não há fonte oficial aberta que permita medir a proposta." },
];

export function statusLabel(s: PromessaStatus): string {
  return statusList.find((x) => x.slug === s)?.label ?? s;
}

export const areas: { slug: string; label: string }[] = [
  { slug: "economia", label: "Economia" },
  { slug: "trabalho-e-previdencia", label: "Trabalho e Previdência" },
  { slug: "seguranca-publica", label: "Segurança pública" },
  { slug: "saude", label: "Saúde" },
  { slug: "educacao", label: "Educação" },
  { slug: "energia-e-infraestrutura", label: "Energia e infraestrutura" },
  { slug: "meio-ambiente-e-clima", label: "Meio ambiente e clima" },
  { slug: "protecao-social-e-moradia", label: "Proteção social e moradia" },
  { slug: "agropecuaria", label: "Agropecuária" },
  { slug: "estado-e-instituicoes", label: "Estado e instituições" },
  { slug: "politica-externa-e-defesa", label: "Política externa e defesa" },
  { slug: "costumes-e-direitos", label: "Costumes e direitos" },
  { slug: "cultura", label: "Cultura" },
];

export function areaLabel(slug: string): string {
  return areas.find((a) => a.slug === slug)?.label ?? slug;
}

/* ----------------------------------------------------------------- dados */

const meta = readJson<PromessasMeta>("meta.json");
const files: Record<CandidatoSlug, Promessa[]> = {
  lula: readJson<CandidatoFile>("lula.json").propostas,
  flavio: readJson<CandidatoFile>("flavio.json").propostas,
};

export function getMeta(): PromessasMeta {
  return meta;
}

export function isCandidato(s: string): s is CandidatoSlug {
  return s === "lula" || s === "flavio";
}

export function getPropostas(c: CandidatoSlug): Promessa[] {
  return files[c];
}

export function propostaSlug(id: string): string {
  return id.toLowerCase();
}

export function propostaPath(c: CandidatoSlug, id: string): string {
  return `${PROMESSAS_PATH}/${c}/${propostaSlug(id)}`;
}

export function candidatoPath(c: CandidatoSlug): string {
  return `${PROMESSAS_PATH}/${c}`;
}

export function getProposta(c: CandidatoSlug, slug: string): Promessa | undefined {
  return files[c].find((p) => propostaSlug(p.id) === slug.toLowerCase());
}

/* -------------------------------------------------------- modo do painel */

/**
 * "aguardando": eleito ainda não definido no arquivo; "acompanhando": candidato eleito;
 * "arquivo": candidato que não foi eleito (registro da campanha, sem acompanhamento).
 */
export type Modo = "aguardando" | "acompanhando" | "arquivo";

export function modoDe(c: CandidatoSlug): Modo {
  if (!meta.eleito) return "aguardando";
  return meta.eleito === c ? "acompanhando" : "arquivo";
}

/** Data de hoje no fuso editorial (AAAA-MM-DD). */
export function hojeBR(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

/** O acompanhamento real só começa na posse do eleito. */
export function acompanhamentoAtivo(c: CandidatoSlug): boolean {
  return modoDe(c) === "acompanhando" && hojeBR() >= meta.posse;
}

export function statusNota(c: CandidatoSlug): string {
  const modo = modoDe(c);
  if (modo === "arquivo") return "Arquivo da campanha, sem acompanhamento";
  if (modo === "aguardando") return "Sem acompanhamento ainda: o eleito será conhecido em 25/10/2026 e o acompanhamento começa na posse, em 05/01/2027";
  if (!acompanhamentoAtivo(c)) return "Sem acompanhamento ainda: começa na posse, em 05/01/2027";
  return "Em acompanhamento";
}

/** Rótulo curto que aparece no cartão: "Prometida, sem acompanhamento ainda" etc. */
export function statusBadgeText(c: CandidatoSlug, s: PromessaStatus): string {
  const base = statusLabel(s);
  if (s !== "prometida") return base;
  const modo = modoDe(c);
  if (modo === "arquivo") return "Arquivo da campanha";
  if (!acompanhamentoAtivo(c)) return "Prometida, sem acompanhamento ainda";
  return base;
}

export function statusCounts(c: CandidatoSlug): Record<PromessaStatus, number> {
  const counts = Object.fromEntries(statusList.map((s) => [s.slug, 0])) as Record<PromessaStatus, number>;
  for (const p of files[c]) counts[p.status]++;
  return counts;
}

export function areaCounts(c: CandidatoSlug): { slug: string; label: string; count: number }[] {
  return areas
    .map((a) => ({ ...a, count: files[c].filter((p) => p.area === a.slug).length }))
    .filter((a) => a.count > 0);
}

export function checagensDaProposta(p: Promessa, c: CandidatoSlug): ChecagemAgencia[] {
  return meta.checagensAgencias.filter((x) => x.candidato === c && x.propostaId === p.id);
}

/* ------------------------------------------------- conteúdo relacionado */

const STOP = new Set([
  "sobre", "entre", "ainda", "todos", "todas", "outras", "outros", "cerca", "pelos", "pelas", "dessa", "desse", "cada", "mais",
  "para", "como", "mesmo", "novos", "novas", "manter", "ampliar", "criar", "reduzir", "fortalecer", "aprofundar", "continuar",
  "nacional", "federal", "brasil", "brasileira", "brasileiro", "governo", "política", "politica", "plano", "programa",
]);

function norm(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function tokens(s: string): string[] {
  return [...new Set(norm(s).replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((t) => t.length >= 5 && !STOP.has(t)))];
}

/** Notícias e checagens do site que tratam do mesmo tema (casamento por palavras do título). */
export function conteudoRelacionado(p: Promessa): { noticias: NewsItem[]; checagens: FactCheck[] } {
  const toks = tokens(p.titulo);
  const min = toks.length <= 3 ? 1 : 2;
  const score = (text: string) => {
    const n = norm(text);
    return toks.filter((t) => n.includes(t.slice(0, Math.max(5, t.length - 2)))).length;
  };
  const noticias = sortedNews()
    .map((n) => ({ n, s: score(`${n.title} ${n.summary}`) }))
    .filter((x) => x.s >= min)
    .sort((a, b) => b.s - a.s || b.n.date.localeCompare(a.n.date))
    .slice(0, 3)
    .map((x) => x.n);
  const checagens = sortedChecagens()
    .map((c) => ({ c, s: score(`${c.title} ${c.summary}`) }))
    .filter((x) => x.s >= min)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map((x) => x.c);
  return { noticias, checagens };
}

export function promessasUrls(): { path: string; lastModified: string; priority: number }[] {
  const updated = meta.atualizadoEm;
  const urls = [{ path: PROMESSAS_PATH, lastModified: updated, priority: 0.8 }];
  for (const c of candidatoSlugs) {
    urls.push({ path: candidatoPath(c), lastModified: updated, priority: 0.6 });
    for (const p of files[c]) {
      const last = p.historico.at(-1)?.data ?? updated;
      urls.push({ path: propostaPath(c, p.id), lastModified: last, priority: 0.5 });
    }
  }
  return urls;
}
