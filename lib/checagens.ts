/**
 * API de leitura da seção Checagem (/checagem).
 *
 * Cada checagem é um arquivo em content/checagens/<slug>.ts, reunido por
 * content/checagens/index.ts (gerado por scripts/build-content-index.mjs).
 * Checagens nunca são apagadas: correção entra como nota "Atualizado em".
 */
import { checagens as allChecagens } from "@/content/checagens";
import { CHECAGEM_PATH, checagemPath, checagemUpdated } from "@/lib/checagens-meta";
import type { FactCheck, FactCheckVerdict } from "@/lib/types";

export type { FactCheck, FactCheckPoint, FactCheckSource, FactCheckVerdict } from "@/lib/types";
export { factCheckVerdicts } from "@/lib/types";

export { CHECAGEM_PATH, checagemPath, checagemUpdated, sourceKindLabel, verdictMeta } from "@/lib/checagens-meta";
export type { VerdictMeta } from "@/lib/checagens-meta";

/** Instante usado para ordenar: o horário da checagem, ou o meio-dia da data. */
function sortKey(c: FactCheck): number {
  const t = Date.parse(c.checkedAt);
  return Number.isNaN(t) ? Date.parse(`${c.date}T12:00:00-03:00`) : t;
}

/** Todas as checagens, mais recentes primeiro. */
export const checagens: FactCheck[] = [...allChecagens].sort(
  (a, b) => sortKey(b) - sortKey(a) || a.slug.localeCompare(b.slug)
);

const bySlug = new Map(checagens.map((c) => [c.slug, c]));

export function getChecagemBySlug(slug: string): FactCheck | undefined {
  return bySlug.get(slug);
}

export function sortedChecagens(): FactCheck[] {
  return checagens;
}

/** As n checagens mais recentes (para a home). */
export function latestChecagens(n: number): FactCheck[] {
  return checagens.slice(0, Math.max(0, n));
}

/** Quantidade de checagens por veredito, na ordem dos filtros. */
export function verdictCounts(): Record<FactCheckVerdict, number> {
  const counts: Record<FactCheckVerdict, number> = {
    falso: 0,
    enganoso: 0,
    "fora-de-contexto": 0,
    "sem-provas": 0,
    verdadeiro: 0,
  };
  for (const c of checagens) counts[c.verdict]++;
  return counts;
}

/** Outras checagens, mais recentes primeiro (para "Mais checagens"). */
export function getRelatedChecagens(current: FactCheck, limit = 3): FactCheck[] {
  return checagens.filter((c) => c.slug !== current.slug).slice(0, limit);
}

/**
 * Páginas da seção para o sitemap: a listagem e cada checagem. O consumidor
 * (app/sitemap.ts) aplica `absoluteUrl(path)`, como faz com congressUrls().
 */
export function checagemUrls(): { path: string; lastModified: string; priority: number }[] {
  const newest = checagens.length ? checagens.map(checagemUpdated).reduce((a, b) => (b > a ? b : a)) : undefined;
  return [
    ...(newest ? [{ path: CHECAGEM_PATH, lastModified: newest, priority: 0.8 }] : []),
    ...checagens.map((c) => ({ path: checagemPath(c.slug), lastModified: checagemUpdated(c), priority: 0.7 })),
  ];
}
