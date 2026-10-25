/**
 * API de leitura da seção História (/historia).
 *
 * Cada artigo é um arquivo em content/historia/<slug>.ts, reunido por
 * content/historia/index.ts (gerado por scripts/build-content-index.mjs).
 * Artigos de História nunca são apagados: correção entra no texto com
 * "Atualizado em dd/mm/aaaa" e o campo `updated`.
 */
import { historia as allHistoria } from "@/content/historia";
import {
  HISTORIA_MILESTONES,
  HISTORIA_PATH,
  historiaPath,
  historiaPeriodPath,
  historiaUpdated,
  type HistoriaMilestone,
} from "@/lib/historia-meta";
import type { HistoryArticle, HistoryPeriod } from "@/lib/types";

export type { HistoryArticle, HistoryPeriod, HistorySource } from "@/lib/types";
export { historyPeriods } from "@/lib/types";
export {
  HISTORIA_MILESTONES,
  HISTORIA_PATH,
  IMPERIO_NOTE,
  getPeriod,
  historiaPath,
  historiaPeriodPath,
  historiaUpdated,
} from "@/lib/historia-meta";
export type { HistoriaMilestone } from "@/lib/historia-meta";

/** Todos os artigos, do fato mais recente para o mais antigo (contada de trás para frente). */
export const historia: HistoryArticle[] = [...allHistoria].sort(
  (a, b) => b.eventDate.localeCompare(a.eventDate) || a.slug.localeCompare(b.slug)
);

const bySlug = new Map(historia.map((a) => [a.slug, a]));

export function getHistoriaBySlug(slug: string): HistoryArticle | undefined {
  return bySlug.get(slug);
}

export function sortedHistoria(): HistoryArticle[] {
  return historia;
}

export function getHistoriaByPeriod(period: HistoryPeriod): HistoryArticle[] {
  return historia.filter((a) => a.period === period);
}

/** Artigo da mesma lista que veio logo antes (mais antigo) e logo depois (mais novo) no tempo. */
export function getHistoriaNeighbors(current: HistoryArticle): { older?: HistoryArticle; newer?: HistoryArticle } {
  const i = historia.findIndex((a) => a.slug === current.slug);
  return { newer: i > 0 ? historia[i - 1] : undefined, older: i >= 0 ? historia[i + 1] : undefined };
}

export type TimelineEntry = HistoriaMilestone & { article?: HistoryArticle };

/** Linha do tempo: marcos da mais recente para a mais antiga, ligados ao artigo quando ele existe. */
export function timelineEntries(period?: HistoryPeriod): TimelineEntry[] {
  return HISTORIA_MILESTONES.filter((m) => !period || m.period === period).map((m) => ({
    ...m,
    article: historia.find((a) => a.year === m.year && a.period === m.period),
  }));
}

/** Quantidade de artigos publicados por período (para os filtros). */
export function periodCounts(): Record<HistoryPeriod, number> {
  const counts: Record<HistoryPeriod, number> = {
    "nova-republica": 0,
    "ditadura-militar": 0,
    "republica-1946": 0,
    "era-vargas": 0,
    "republica-velha": 0,
    imperio: 0,
  };
  for (const a of historia) counts[a.period]++;
  return counts;
}

/**
 * Páginas da seção para o sitemap: a listagem, cada período e cada artigo.
 * O consumidor (app/sitemap.ts) aplica `absoluteUrl(path)`.
 */
export function historiaUrls(
  periods: readonly { slug: HistoryPeriod }[]
): { path: string; lastModified: string; priority: number }[] {
  if (historia.length === 0) return [];
  const newest = historia.map(historiaUpdated).reduce((a, b) => (b > a ? b : a));
  return [
    { path: HISTORIA_PATH, lastModified: newest, priority: 0.8 },
    ...periods.map((p) => ({
      path: historiaPeriodPath(p.slug),
      lastModified: getHistoriaByPeriod(p.slug).map(historiaUpdated).reduce((a, b) => (b > a ? b : a), newest),
      priority: 0.6,
    })),
    ...historia.map((a) => ({ path: historiaPath(a.slug), lastModified: historiaUpdated(a), priority: 0.8 })),
  ];
}
