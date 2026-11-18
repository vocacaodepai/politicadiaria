/**
 * Linha do tempo das publicações (notícias e checagens), usada em /hoje, no bloco
 * "Hoje no Política Diária" da home e no resumo diário (/resumo).
 *
 * O "dia" de uma publicação é a data, no fuso de Brasília, do horário em que ela
 * saiu (`publishedAt` da notícia, `checkedAt` da checagem). Item antigo sem
 * horário usa o campo `date`.
 */
import { checagemPath, sortedChecagens, verdictMeta } from "@/lib/checagens";
import { newsTopics, sortedNews, type NewsItem } from "@/lib/news";
import type { FactCheck, NewsTopic } from "@/lib/types";

export const TIMEZONE = "America/Sao_Paulo";

export type TimelineItem = {
  kind: "noticia" | "checagem";
  slug: string;
  href: string;
  title: string;
  /** Rótulo do tópico (ex.: "Congresso"); checagem leva "Checagem". */
  topicLabel: string;
  topic?: NewsTopic;
  /** Instante da publicação (ms), para ordenar. */
  at: number;
  /** Dia da publicação em Brasília (AAAA-MM-DD). */
  day: string;
  /** "14:32" em Brasília; vazio quando o item não tem horário. */
  time: string;
  /** Valor para o atributo dateTime. */
  dateTime: string;
};

const topicLabels = new Map<string, string>(newsTopics.map((t) => [t.slug, t.label]));

export function topicLabel(topic?: string): string {
  return (topic && topicLabels.get(topic)) || "Notícias";
}

/** Data AAAA-MM-DD em Brasília. */
export function brasiliaDay(d: Date | number = new Date()): string {
  return new Date(d).toLocaleDateString("en-CA", { timeZone: TIMEZONE });
}

function brasiliaTime(ms: number): string {
  return new Date(ms).toLocaleTimeString("pt-BR", { timeZone: TIMEZONE, hour: "2-digit", minute: "2-digit" });
}

/** Instante, dia e hora a partir de um ISO com horário; sem horário válido, cai no meio-dia de `date`. */
function when(iso: string | undefined, date: string): Pick<TimelineItem, "at" | "day" | "time" | "dateTime"> {
  const t = iso ? Date.parse(iso) : Number.NaN;
  if (!Number.isNaN(t)) return { at: t, day: brasiliaDay(t), time: brasiliaTime(t), dateTime: iso as string };
  return { at: Date.parse(`${date}T12:00:00-03:00`), day: date, time: "", dateTime: date };
}

export function newsToTimeline(n: NewsItem): TimelineItem {
  return {
    kind: "noticia",
    slug: n.slug,
    href: `/noticias/${n.slug}`,
    title: n.title,
    topicLabel: topicLabel(n.topic),
    topic: n.topic,
    ...when(n.publishedAt, n.date),
  };
}

export function checagemToTimeline(c: FactCheck): TimelineItem {
  return {
    kind: "checagem",
    slug: c.slug,
    href: checagemPath(c.slug),
    title: `${verdictMeta[c.verdict].label}: ${c.title}`,
    topicLabel: "Checagem",
    ...when(c.checkedAt, c.date),
  };
}

let cache: TimelineItem[] | null = null;

/** Todas as publicações, mais recentes primeiro. */
export function allTimeline(): TimelineItem[] {
  if (!cache) {
    cache = [...sortedNews().map(newsToTimeline), ...sortedChecagens().map(checagemToTimeline)].sort(
      (a, b) => b.at - a.at || a.slug.localeCompare(b.slug)
    );
  }
  return cache;
}

/** As n publicações mais recentes até agora (ignora horário futuro). */
export function latestTimeline(n: number, now = new Date()): TimelineItem[] {
  const limit = now.getTime();
  return allTimeline()
    .filter((i) => i.at <= limit)
    .slice(0, Math.max(0, n));
}

/** Publicações de um dia de Brasília, mais recentes primeiro. */
export function timelineForDay(day: string): TimelineItem[] {
  return allTimeline().filter((i) => i.day === day);
}

/**
 * O dia mostrado em /hoje: o dia corrente em Brasília; se ainda não houver nada
 * publicado nele, o dia mais recente que tenha publicação (com `isToday: false`).
 */
export function timelineToday(now = new Date()): { today: string; day: string; isToday: boolean; items: TimelineItem[] } {
  const today = brasiliaDay(now);
  const items = timelineForDay(today);
  if (items.length > 0) return { today, day: today, isToday: true, items };
  const previous = allTimeline().find((i) => i.day < today);
  if (!previous) return { today, day: today, isToday: true, items: [] };
  return { today, day: previous.day, isToday: false, items: timelineForDay(previous.day) };
}

/** Dias (AAAA-MM-DD) com pelo menos uma notícia, mais recentes primeiro. */
export function newsDays(): string[] {
  const days = new Set<string>();
  for (const i of allTimeline()) if (i.kind === "noticia") days.add(i.day);
  return [...days].sort((a, b) => b.localeCompare(a));
}

/** "12 de novembro de 2026" (ou "12 nov. 2026" no estilo curto), a partir de AAAA-MM-DD. */
export function dayLabel(day: string, style: "long" | "short" = "long"): string {
  return new Date(`${day}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    timeZone: TIMEZONE,
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
  });
}

/** "quinta-feira, 12 de novembro de 2026". */
export function dayLabelWithWeekday(day: string): string {
  return new Date(`${day}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    timeZone: TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "12/11", a partir de AAAA-MM-DD. */
export function shortDay(day: string): string {
  return `${day.slice(8, 10)}/${day.slice(5, 7)}`;
}
