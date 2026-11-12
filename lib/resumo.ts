/**
 * Resumo diário (/resumo/AAAA-MM-DD e /resumo/feed.xml): as notícias de um dia
 * de Brasília agrupadas por tópico, mais as checagens do dia. É a base da futura
 * newsletter; o envio por e-mail ainda não existe.
 */
import { getNewsBySlug, newsTopics, type NewsItem } from "@/lib/news";
import { newsDays, timelineForDay, type TimelineItem } from "@/lib/timeline";

export const RESUMO_PATH = "/resumo";

export function resumoPath(day: string): string {
  return `${RESUMO_PATH}/${day}`;
}

export type ResumoEntry = { t: TimelineItem; news: NewsItem };
export type ResumoGroup = { slug: string; label: string; entries: ResumoEntry[] };

export type Resumo = {
  day: string;
  totalNoticias: number;
  groups: ResumoGroup[];
  checagens: TimelineItem[];
  /** Instante da última publicação do dia (ms). */
  updatedAt: number;
};

/** Dias com resumo, mais recentes primeiro. */
export function resumoDays(): string[] {
  return newsDays();
}

export function isResumoDay(day: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(day) && resumoDays().includes(day);
}

export function getResumo(day: string): Resumo | undefined {
  const items = timelineForDay(day);
  const noticias = items.filter((i) => i.kind === "noticia");
  if (noticias.length === 0) return undefined;

  const groups: ResumoGroup[] = [];
  const order = [...newsTopics.map((t) => ({ slug: t.slug as string, label: t.label })), { slug: "outros", label: "Outros assuntos" }];
  for (const topic of order) {
    const entries = noticias
      .filter((i) => (i.topic ?? "outros") === topic.slug)
      .map((t) => ({ t, news: getNewsBySlug(t.slug) as NewsItem }))
      .filter((e) => Boolean(e.news));
    if (entries.length) groups.push({ ...topic, entries });
  }

  return {
    day,
    totalNoticias: noticias.length,
    groups,
    checagens: items.filter((i) => i.kind === "checagem"),
    updatedAt: Math.max(...items.map((i) => i.at)),
  };
}

/** Dia anterior e seguinte que tenham resumo. */
export function resumoNeighbors(day: string): { prev?: string; next?: string } {
  const days = resumoDays();
  const i = days.indexOf(day);
  if (i < 0) return {};
  return { next: i > 0 ? days[i - 1] : undefined, prev: days[i + 1] };
}
