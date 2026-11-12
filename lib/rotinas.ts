import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Leitura (em tempo de build) da fila de pautas (content/pautas/fila.json) e do registro das
 * rodadas das rotinas (content/rotinas/registro/*.json, um arquivo por rodada). Uso exclusivo do
 * painel interno /interno/rotinas: nada disso é conteúdo para o leitor. O schema é validado por
 * scripts/lib/check-rotinas.mjs (npm run check:content).
 */

export const ROTINAS_PATH = "/interno/rotinas";
export const REPO_URL = "https://github.com/vocacaodepai/politicadiaria";

export type RotinaSlug = "noticias" | "checagem" | "eleicoes" | "congresso" | "livros" | "historia" | "promessas";

export const rotinaLabels: Record<RotinaSlug, string> = {
  noticias: "Notícias",
  checagem: "Checagem",
  eleicoes: "Eleições",
  congresso: "Congresso",
  livros: "Resenhas de livros",
  historia: "História",
  promessas: "Promessas",
};
export const rotinaSlugs = Object.keys(rotinaLabels) as RotinaSlug[];

export type Motivo =
  | "fonte-unica"
  | "aguardando-fato"
  | "sem-angulo"
  | "numeros-divergentes"
  | "sem-fonte-primaria"
  | "fonte-bloqueada"
  | "ja-publicado"
  | "fora-do-escopo";

export const motivoLabels: Record<Motivo, string> = {
  "fonte-unica": "Fonte única",
  "aguardando-fato": "Aguardando fato",
  "sem-angulo": "Sem ângulo",
  "numeros-divergentes": "Números divergentes",
  "sem-fonte-primaria": "Sem fonte primária",
  "fonte-bloqueada": "Fonte bloqueada",
  "ja-publicado": "Já publicado",
  "fora-do-escopo": "Fora do escopo",
};

export type PautaStatus = "aberta" | "publicada" | "descartada";

export type Pauta = {
  id: string;
  rotina?: RotinaSlug;
  tema: string;
  motivo: Motivo;
  /** O que falta para a pauta virar publicação (fato, documento, segunda fonte). */
  falta?: string;
  fontesAbertas: string[];
  primeiraVezVisto: string;
  ultimaRevisao: string;
  status: PautaStatus;
  /** Slug do conteúdo publicado, quando status = "publicada". */
  slug?: string;
};

export type Fila = { atualizadoEm: string; pautas: Pauta[] };

export type Bloqueio = { host: string; erro: string; detalhe?: string };
export type Descarte = { tema: string; motivo: Motivo; pauta?: string };

export type Rodada = {
  rotina: RotinaSlug;
  inicio: string;
  fim: string;
  branch?: string;
  publicou: string[];
  descartou: Descarte[];
  bloqueios: Bloqueio[];
  pr?: number | null;
  /** Nome do arquivo de origem (para chave estável na tela). */
  arquivo: string;
};

const ROOT = process.cwd();

export function getFila(): Fila {
  const path = join(ROOT, "content", "pautas", "fila.json");
  if (!existsSync(path)) return { atualizadoEm: "", pautas: [] };
  return JSON.parse(readFileSync(path, "utf8")) as Fila;
}

/** Todas as rodadas registradas, da mais recente para a mais antiga. */
export function getRodadas(): Rodada[] {
  const dir = join(ROOT, "content", "rotinas", "registro");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((arquivo) => ({ ...(JSON.parse(readFileSync(join(dir, arquivo), "utf8")) as Omit<Rodada, "arquivo">), arquivo }))
    .sort((a, b) => Date.parse(b.inicio) - Date.parse(a.inicio));
}

export type Contagem = { chave: string; total: number };

function contar(chaves: string[]): Contagem[] {
  const m = new Map<string, number>();
  for (const c of chaves) m.set(c, (m.get(c) ?? 0) + 1);
  return [...m.entries()]
    .map(([chave, total]) => ({ chave, total }))
    .sort((a, b) => b.total - a.total || a.chave.localeCompare(b.chave));
}

export type ResumoRotina = {
  rotina: RotinaSlug;
  rodadas: Rodada[];
  total: number;
  comPublicacao: number;
  itensPublicados: number;
  motivos: Contagem[];
  bloqueios: Contagem[];
  ultima?: Rodada;
};

export function resumoPorRotina(rodadas: Rodada[]): ResumoRotina[] {
  return rotinaSlugs.map((rotina) => {
    const rs = rodadas.filter((r) => r.rotina === rotina);
    return {
      rotina,
      rodadas: rs,
      total: rs.length,
      comPublicacao: rs.filter((r) => r.publicou.length > 0).length,
      itensPublicados: rs.reduce((n, r) => n + r.publicou.length, 0),
      motivos: contar(rs.flatMap((r) => r.descartou.map((d) => d.motivo))),
      bloqueios: contar(rs.flatMap((r) => r.bloqueios.map((b) => `${b.host} · ${b.erro}`))),
      ultima: rs[0],
    };
  });
}

/** Bloqueios mais frequentes em todas as rotinas (host e erro). */
export function bloqueiosGerais(rodadas: Rodada[]): Contagem[] {
  return contar(rodadas.flatMap((r) => r.bloqueios.map((b) => `${b.host} · ${b.erro}`)));
}

const fmt = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDataHora(iso: string): string {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? iso : fmt.format(new Date(t));
}

export function duracaoMin(r: Pick<Rodada, "inicio" | "fim">): number {
  return Math.max(0, Math.round((Date.parse(r.fim) - Date.parse(r.inicio)) / 60000));
}

/** Dias inteiros entre a primeira vez que a pauta foi vista e a referência. */
export function diasEmAberto(p: Pauta, referencia: number): number {
  return Math.max(0, Math.floor((referencia - Date.parse(p.primeiraVezVisto)) / 86400000));
}

export function prUrl(r: Rodada): string | undefined {
  if (r.pr) return `${REPO_URL}/pull/${r.pr}`;
  if (r.branch) return `${REPO_URL}/pulls?q=${encodeURIComponent(`is:pr head:${r.branch}`)}`;
  return undefined;
}
