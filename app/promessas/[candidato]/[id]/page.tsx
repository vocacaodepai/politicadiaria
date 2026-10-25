import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { AvisoFixo } from "@/components/promessas/PromessasPage";
import { StatusBadge } from "@/components/promessas/StatusBadge";
import { PromessaTimeline } from "@/components/promessas/Timeline";
import { site } from "@/lib/articles";
import { checagemPath } from "@/lib/checagens-meta";
import {
  PROMESSAS_PATH,
  acompanhamentoAtivo,
  areaLabel,
  candidatoPath,
  candidatoSlugs,
  checagensDaProposta,
  conteudoRelacionado,
  getMeta,
  getProposta,
  getPropostas,
  hojeBR,
  modoDe,
  propostaPath,
  propostaSlug,
  statusBadgeText,
  statusNota,
  isCandidato,
} from "@/lib/promessas";
import { absoluteUrl, alternatesFor, breadcrumbJsonLd, formatDate, metaDescription } from "@/lib/seo";

type Params = Promise<{ candidato: string; id: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return candidatoSlugs.flatMap((candidato) => getPropostas(candidato).map((p) => ({ candidato, id: propostaSlug(p.id) })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { candidato, id } = await params;
  if (!isCandidato(candidato)) return {};
  const p = getProposta(candidato, id);
  if (!p) return {};
  const nome = getMeta().candidatos[candidato].nome;
  const path = propostaPath(candidato, p.id);
  const title = `${p.titulo} (promessa de ${nome})`;
  const description = metaDescription(`${p.texto} Fonte: plano de governo de ${nome}, com página e indicador para acompanhar.`);
  return {
    title,
    description,
    alternates: alternatesFor(path),
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      modifiedTime: getMeta().atualizadoEm,
      section: "Promessas",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Link do PDF na primeira página citada (#page=N abre na página em visualizadores de PDF). */
function pdfLink(url: string, pagina?: string): string {
  const first = /\d+/.exec(pagina ?? "")?.[0];
  return first ? `${url}#page=${first}` : url;
}

export default async function PromessaPage({ params }: { params: Params }) {
  const { candidato, id } = await params;
  if (!isCandidato(candidato)) notFound();
  const p = getProposta(candidato, id);
  if (!p) notFound();

  const meta = getMeta();
  const info = meta.candidatos[candidato];
  const modo = modoDe(candidato);
  const ativo = acompanhamentoAtivo(candidato);
  const path = propostaPath(candidato, p.id);
  const relacionadas = getPropostas(candidato)
    .filter((x) => x.area === p.area && x.id !== p.id)
    .slice(0, 4);
  const { noticias, checagens } = conteudoRelacionado(p);
  const agencias = checagensDaProposta(p, candidato);
  const isPlano = p.fonte.tipo === "plano";

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: p.titulo,
    description: p.texto,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    dateModified: p.historico.at(-1)?.data ?? meta.atualizadoEm,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <JsonLd data={page} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Promessas", path: PROMESSAS_PATH },
          { name: info.nome, path: candidatoPath(candidato) },
          { name: p.titulo, path },
        ])}
      />

      <Container className="pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { name: "Início", href: "/" },
            { name: "Promessas", href: PROMESSAS_PATH },
            { name: info.nome, href: candidatoPath(candidato) },
            { name: p.titulo },
          ]}
        />

        <article className="mt-6 max-w-4xl">
          <header className="border-t-[3px] border-foreground pt-3">
            <p className="label-mono text-accent">
              Promessa de {info.nome} | {areaLabel(p.area)} | {p.id}
            </p>
            <h1 className="mt-1 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">{p.titulo}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={p.status} label={statusBadgeText(candidato, p.status)} />
              {p.origem === "campanha" && (
                <span className="label-mono border border-border px-1.5 py-0.5 text-[10px] text-muted">Compromisso de campanha, fora do plano</span>
              )}
              <span className="text-sm text-muted">{statusNota(candidato)}</span>
            </div>
          </header>

          <section aria-labelledby="prometido" className="mt-8">
            <h2 id="prometido" className="font-display text-2xl font-extrabold tracking-tight">
              O que foi prometido
            </h2>
            <p className="mt-2 text-[1.05rem] leading-relaxed">{p.texto}</p>

            {p.citacao && (
              <figure className="mt-5 border-l-4 border-accent bg-surface-2 p-4">
                <blockquote className="font-display text-lg italic leading-snug">&quot;{p.citacao}&quot;</blockquote>
                <figcaption className="mt-2 text-sm text-muted">
                  {info.nome}, {p.fonte.nome}
                  {p.fonte.pagina ? `, p. ${p.fonte.pagina}` : ""}.{" "}
                  <a
                    href={pdfLink(p.fonte.url, p.fonte.pagina)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2"
                  >
                    {isPlano ? "Abrir o PDF na página citada" : "Abrir a matéria"}
                  </a>
                </figcaption>
              </figure>
            )}

            <dl className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2">
              <div className="bg-background p-4">
                <dt className="label-mono text-muted">Meta</dt>
                <dd className="mt-1 text-[0.97rem] leading-relaxed">{p.meta}</dd>
              </div>
              <div className="bg-background p-4">
                <dt className="label-mono text-muted">Prazo</dt>
                <dd className="mt-1 text-[0.97rem] leading-relaxed">{p.prazo}</dd>
              </div>
              <div className="bg-background p-4 sm:col-span-2">
                <dt className="label-mono text-muted">Fonte</dt>
                <dd className="mt-1 text-[0.97rem] leading-relaxed">
                  {p.fonte.nome}
                  {p.fonte.pagina ? `, página ${p.fonte.pagina}` : ""}.{" "}
                  {!p.citacao && (
                    <a href={pdfLink(p.fonte.url, p.fonte.pagina)} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                      Abrir
                    </a>
                  )}
                  {isPlano && (
                    <span className="block text-sm text-muted">
                      Plano de governo divulgado pela campanha, em cópia hospedada por {info.plano.hospedadoPor}. Não foi comparado com o arquivo do TSE.
                    </span>
                  )}
                </dd>
              </div>
            </dl>

            {p.notas && (
              <div className="mt-5 border border-border p-4 text-sm leading-relaxed">
                <p className="label-mono text-muted">Notas e divergências</p>
                <p className="mt-1">{p.notas}</p>
              </div>
            )}
          </section>

          <section aria-labelledby="como-medir" className="mt-10">
            <h2 id="como-medir" className="font-display text-2xl font-extrabold tracking-tight">
              Como acompanhar
            </h2>
            {p.indicador ? (
              <p className="mt-2 leading-relaxed">
                Indicador oficial:{" "}
                {p.indicador.url ? (
                  <a href={p.indicador.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                    {p.indicador.nome}
                  </a>
                ) : (
                  p.indicador.nome
                )}
                . Série: {p.indicador.serie}.
                {!p.indicador.url && " A página oficial ainda não foi conferida, por isso o link não aparece."}
              </p>
            ) : (
              <p className="mt-2 leading-relaxed text-muted">
                Ainda não há indicador oficial conferido para esta proposta. O status muda com base em ato oficial (Diário Oficial,
                Câmara, Senado) ou dado de órgão público, sempre com link.
              </p>
            )}
          </section>

          <section aria-labelledby="evolucao" className="mt-10">
            <h2 id="evolucao" className="font-display text-2xl font-extrabold tracking-tight">
              Evolução ao longo do mandato
            </h2>
            {modo === "arquivo" ? (
              <p className="mt-2 border border-dashed border-border p-4 text-sm leading-relaxed text-muted">
                Arquivo da campanha, sem acompanhamento: {info.nome} não foi eleito. A proposta fica registrada como foi apresentada.
              </p>
            ) : (
              <>
                {!ativo && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Prometida, sem acompanhamento ainda. O acompanhamento real começa na posse, em {formatDate(meta.posse)}.
                    {modo === "aguardando" && " O eleito será conhecido após o 2º turno."}
                  </p>
                )}
                <PromessaTimeline historico={p.historico} posse={meta.posse} today={hojeBR()} ativo={ativo} />
              </>
            )}
          </section>

          {agencias.length > 0 && (
            <section aria-labelledby="agencias" className="mt-10">
              <h2 id="agencias" className="font-display text-2xl font-extrabold tracking-tight">
                O que dizem as checagens
              </h2>
              <ul className="mt-3 space-y-4">
                {agencias.map((c, i) => (
                  <li key={i} className="border border-border p-4">
                    <p className="label-mono text-muted">
                      {c.agencia} | {formatDate(c.data, "short")}
                    </p>
                    <p className="mt-1 font-semibold">{c.alegacao}</p>
                    <p className="mt-1 text-sm">
                      <span className="font-bold uppercase tracking-[0.04em]">Rótulo da agência: {c.rotulo}.</span> {c.resumo}
                    </p>
                    <p className="mt-2 text-xs">
                      <a href={c.fonte.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                        {c.fonte.nome}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(noticias.length > 0 || checagens.length > 0) && (
            <section aria-labelledby="no-site" className="mt-10">
              <h2 id="no-site" className="font-display text-2xl font-extrabold tracking-tight">
                No Política Diária sobre o tema
              </h2>
              <ul className="mt-3 space-y-2 leading-snug">
                {noticias.map((n) => (
                  <li key={n.slug}>
                    <span className="label-mono mr-2 text-muted">Notícia</span>
                    <Link href={`/noticias/${n.slug}`} className="text-accent underline underline-offset-2">
                      {n.title}
                    </Link>
                  </li>
                ))}
                {checagens.map((c) => (
                  <li key={c.slug}>
                    <span className="label-mono mr-2 text-muted">Checagem</span>
                    <Link href={checagemPath(c.slug)} className="text-accent underline underline-offset-2">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relacionadas.length > 0 && (
            <section aria-labelledby="mesma-area" className="mt-10">
              <h2 id="mesma-area" className="font-display text-2xl font-extrabold tracking-tight">
                Outras propostas de {info.nome} em {areaLabel(p.area)}
              </h2>
              <ul className="mt-3 space-y-1.5">
                {relacionadas.map((r) => (
                  <li key={r.id}>
                    <Link href={propostaPath(candidato, r.id)} className="text-accent underline underline-offset-2">
                      {r.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 pb-20">
            <AvisoFixo />
            <p className="mt-4 text-sm">
              <Link href={candidatoPath(candidato)} className="text-accent underline underline-offset-2">
                Ver todas as propostas de {info.nome}
              </Link>{" "}
              |{" "}
              <Link href={PROMESSAS_PATH} className="text-accent underline underline-offset-2">
                Voltar ao painel de promessas
              </Link>
            </p>
          </div>
        </article>
      </Container>
    </>
  );
}
