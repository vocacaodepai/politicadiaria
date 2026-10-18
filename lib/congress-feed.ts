import { site } from "@/lib/articles";
import { author } from "@/lib/author";
import { getCamaraVotes, getSenadoVotes, type Deputy, type Senator } from "@/lib/congress";
import { getAgendaMeta, getParliamentarianAgenda, hasAgenda } from "@/lib/congress-agenda";
import { formatAgendaWhen } from "@/lib/congress-agenda-format";
import { getMentions } from "@/lib/congress-mentions";

/**
 * Feed RSS por parlamentar (/congresso/deputados/<slug>/feed.xml e /congresso/senadores/<slug>/feed.xml),
 * gerado estaticamente no build. Reúne: votos recentes em votação nominal, ausências em votação nominal
 * (não são faltas em sessão), notícias/checagens/resenhas do site que citam o parlamentar e a agenda
 * dos próximos dias. Alerta por e-mail fica para uma etapa futura.
 */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const rfc = (iso: string) => new Date(iso).toUTCString();
const noon = (day: string) => `${day.slice(0, 10)}T12:00:00-03:00`;
const trunc = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).replace(/\s\S*$/, "")}…` : s);

type Item = { title: string; link: string; guid: string; at: string; category: string; description: string };

const LABEL_CAMARA: Record<string, string> = { S: "Sim", N: "Não", A: "Abstenção", O: "Obstrução", "17": "Art. 17 (presidiu)" };
const LABEL_SENADO: Record<string, string> = { S: "Sim", N: "Não", A: "Abstenção", O: "Obstrução", V: "Voto secreto", P: "Presidiu a sessão", R: "Presente, sem voto", AP: "Atividade parlamentar", M: "Missão oficial", L: "Licença", NA: "Não aplicável" };

function voteItems(casa: "camara" | "senado", path: string, rows: [number, string][]): Item[] {
  const dict = casa === "camara" ? getCamaraVotes() : getSenadoVotes();
  const out: Item[] = [];
  for (const [idx, code] of rows.slice(0, 20)) {
    const v = dict[idx];
    if (!v) continue;
    const absent = code === "F";
    const label = casa === "camara" ? LABEL_CAMARA[code] : LABEL_SENADO[code];
    const subject = v.m ?? "Matéria não identificada";
    out.push({
      title: absent ? `${casa === "camara" ? "Sem voto registrado" : "Não compareceu"} em votação nominal: ${subject}` : `Voto ${label ?? code}: ${subject}`,
      link: `${site.url}${path}#votos`,
      guid: `${site.url}${path}#voto-${v.id}`,
      at: noon(v.d),
      category: absent ? "Ausência em votação nominal" : "Voto",
      description: `${trunc(v.e ?? v.t, 260)}${absent ? " Ausência em votação nominal não equivale a falta em sessão: pode haver licença ou missão oficial." : ""}`,
    });
  }
  return out;
}

function build(p: { kind: "camara" | "senado"; id: number; slug: string; nome: string; partido: string; uf: string; rows: [number, string][] }): string {
  const path = `/congresso/${p.kind === "camara" ? "deputados" : "senadores"}/${p.slug}`;
  const items: Item[] = [...voteItems(p.kind, path, p.rows)];
  for (const m of getMentions(p.slug)) {
    items.push({ title: m.title, link: `${site.url}${m.href}`, guid: `${site.url}${m.href}`, at: m.at, category: m.kind === "noticia" ? "Notícia" : m.kind === "checagem" ? "Checagem" : "Resenha", description: m.summary });
  }
  if (hasAgenda()) {
    const meta = getAgendaMeta();
    const collected = meta ? Date.parse(meta.geradoEm) : 0;
    for (const x of (getParliamentarianAgenda(p.kind, p.id) ?? []).filter((x) => Date.parse(x.evento.inicio) >= collected).slice(0, 8)) {
      const e = x.evento;
      items.push({
        title: `Agenda: ${trunc(e.titulo, 120)}`,
        link: e.url,
        guid: `${site.url}${path}#agenda-${e.id}-${e.inicio}`,
        at: meta!.geradoEm,
        category: "Agenda",
        description: `${formatAgendaWhen(e.inicio)}. ${e.tipo}${e.orgao ? `, ${e.orgao.sigla}` : ""}. Local: ${e.local ?? "não informado pela fonte"}. Situação: ${e.situacao}.`,
      });
    }
  }
  items.sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
  const last = items[0]?.at ?? new Date().toISOString();
  const body = items
    .slice(0, 50)
    .map(
      (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${esc(i.link)}</link>
      <guid isPermaLink="false">${esc(i.guid)}</guid>
      <pubDate>${rfc(i.at)}</pubDate>
      <category>${esc(i.category)}</category>
      <dc:creator>${esc(author.name)}</dc:creator>
      <description>${esc(i.description)}</description>
    </item>`,
    )
    .join("\n");
  const who = `${p.nome} (${p.partido}-${p.uf})`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(`${who}: votos, ausências e notícias | ${site.name}`)}</title>
    <link>${site.url}${path}</link>
    <description>${esc(`Votos recentes em votação nominal, ausências em votação nominal, notícias e checagens que citam ${p.nome} e a agenda dos próximos dias. Dados oficiais da ${p.kind === "camara" ? "Câmara dos Deputados" : "Senado Federal"}.`)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${rfc(last)}</lastBuildDate>
    <atom:link href="${site.url}${path}/feed.xml" rel="self" type="application/rss+xml"/>
${body}
  </channel>
</rss>
`;
}

export const deputyFeed = (d: Deputy) => build({ kind: "camara", id: d.id, slug: d.slug, nome: d.nome, partido: d.partido, uf: d.uf, rows: d.votacoes.lista });
export const senatorFeed = (s: Senator) => build({ kind: "senado", id: s.id, slug: s.slug, nome: s.nome, partido: s.partido, uf: s.uf, rows: s.votacoes.lista });

export const FEED_HEADERS = {
  "Content-Type": "application/rss+xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=3600",
};
