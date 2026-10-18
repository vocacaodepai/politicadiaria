import { getDeputiesIndex, getSenatorsIndex, hasCongressData } from "@/lib/congress";
import { getMentionsAll } from "@/lib/congress-mentions";
import type { ParlamentarNews } from "@/components/ParlamentarNewsFilter";

/** Índice parlamentar -> notícias que o citam, para o filtro /noticias?parlamentar=<slug>. */
export function getParlamentarNewsIndex(): Record<string, ParlamentarNews> {
  const out: Record<string, ParlamentarNews> = {};
  if (!hasCongressData()) return out;
  const people = new Map<string, { nome: string; path: string }>();
  for (const d of getDeputiesIndex()) people.set(d.slug, { nome: d.nome, path: `/congresso/deputados/${d.slug}` });
  for (const s of getSenatorsIndex()) people.set(s.slug, { nome: s.nome, path: `/congresso/senadores/${s.slug}` });
  for (const [slug, list] of getMentionsAll()) {
    const who = people.get(slug);
    if (!who) continue;
    const items = list.filter((m) => m.kind === "noticia").map((m) => ({ slug: m.slug, title: m.title, date: m.date, summary: m.summary }));
    if (items.length) out[slug] = { ...who, items };
  }
  return out;
}
