import { articles } from "@/content/articles";
import { checagemPath, checagens } from "@/lib/checagens";
import { news } from "@/lib/news";

/**
 * Índice invertido parlamentar -> conteúdo do site que o cita, montado no build a partir dos links
 * internos /congresso/deputados/<slug> e /congresso/senadores/<slug> no corpo de notícias,
 * checagens e resenhas. Não altera nenhum conteúdo.
 */

export type Mention = {
  kind: "noticia" | "checagem" | "resenha";
  slug: string;
  title: string;
  date: string;
  /** Instante para ordenar (ISO). */
  at: string;
  href: string;
  summary: string;
};

const LINK = /href="(?:https:\/\/www\.politicadiaria\.com\.br)?\/congresso\/(?:deputados|senadores)\/([a-z0-9-]+)(?:[/?#][^"]*)?"/g;

let index: Map<string, Mention[]> | null = null;

function build(): Map<string, Mention[]> {
  const out = new Map<string, Mention[]>();
  const push = (html: string | undefined, m: Mention) => {
    if (!html) return;
    const seen = new Set<string>();
    for (const match of html.matchAll(LINK)) {
      const slug = match[1];
      if (seen.has(slug)) continue;
      seen.add(slug);
      (out.get(slug) ?? out.set(slug, []).get(slug)!).push(m);
    }
  };
  for (const n of news) push(n.content, { kind: "noticia", slug: n.slug, title: n.title, date: n.date, at: n.publishedAt ?? `${n.date}T12:00:00-03:00`, href: `/noticias/${n.slug}`, summary: n.summary });
  for (const c of checagens) push(c.content, { kind: "checagem", slug: c.slug, title: c.title, date: c.date, at: c.checkedAt ?? `${c.date}T12:00:00-03:00`, href: checagemPath(c.slug), summary: c.summary });
  for (const a of articles) push(a.content, { kind: "resenha", slug: a.slug, title: a.title, date: a.date, at: `${a.date}T12:00:00-03:00`, href: `/artigos/${a.slug}`, summary: a.excerpt });
  for (const list of out.values()) list.sort((a, b) => b.at.localeCompare(a.at));
  return out;
}

/** Conteúdo que cita o parlamentar (pelo slug da página dele), mais recente primeiro. */
export function getMentions(parlamentarSlug: string): Mention[] {
  index ??= build();
  return index.get(parlamentarSlug) ?? [];
}

export function getMentionsAll(): Map<string, Mention[]> {
  index ??= build();
  return index;
}
