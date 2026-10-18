import { isBrazilNews, sortedNews } from "@/lib/news";
import type { NewsItem } from "@/lib/types";

export function newsInstant(n: NewsItem): number {
  const t = n.publishedAt ? Date.parse(n.publishedAt) : NaN;
  return Number.isNaN(t) ? Date.parse(`${n.date}T12:00:00-03:00`) : t;
}

/**
 * As 5 principais notícias das últimas 24h: Brasil primeiro (até 4, mais recentes), depois mundo
 * para completar, e a lista final sai em ordem do mais recente. Sem nada nas últimas 24h, cai nas
 * 5 mais recentes e `fallback` fica true (a página avisa).
 */
export function morningTop(now: Date = new Date()): { items: NewsItem[]; fallback: boolean } {
  const all = [...sortedNews()].sort((a, b) => newsInstant(b) - newsInstant(a));
  const since = now.getTime() - 24 * 3600 * 1000;
  const recent = all.filter((n) => newsInstant(n) >= since && newsInstant(n) <= now.getTime() + 60000);
  const fallback = recent.length === 0;
  const pool = fallback ? all.slice(0, 5) : recent;
  const brazil = pool.filter(isBrazilNews).slice(0, 4);
  const world = pool.filter((n) => !isBrazilNews(n));
  const picked = [...brazil, ...world.slice(0, 5 - brazil.length)];
  if (picked.length < 5) for (const n of pool) if (picked.length < 5 && !picked.includes(n)) picked.push(n);
  return { items: picked.sort((a, b) => newsInstant(b) - newsInstant(a)), fallback };
}
