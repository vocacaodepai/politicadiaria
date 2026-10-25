import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Container } from "@/components/Container";
import { CoverImage } from "@/components/CoverImage";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SectionHeading } from "@/components/SectionHeading";
import { AuthorAvatar } from "@/components/article/AuthorAvatar";
import { AuthorBox } from "@/components/article/AuthorBox";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { ShareBar } from "@/components/article/ShareBar";
import { faqJsonLd } from "@/components/article/schema";
import { site, getArticleBySlug } from "@/lib/articles";
import { author } from "@/lib/author";
import {
  HISTORIA_PATH,
  getHistoriaBySlug,
  getHistoriaNeighbors,
  getPeriod,
  historia,
  historiaPath,
  historiaPeriodPath,
  historiaUpdated,
} from "@/lib/historia";
import { prepareArticleHtml, tocH2 } from "@/lib/html";
import { newsImageSeed } from "@/lib/news";
import { absoluteUrl, alternatesFor, breadcrumbJsonLd, formatDate, metaDescription } from "@/lib/seo";
import type { Article, HistorySource } from "@/lib/types";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return historia.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = getHistoriaBySlug(slug);
  if (!a) return {};
  const path = historiaPath(a.slug);
  const description = metaDescription(a.summary);
  const period = getPeriod(a.period);
  return {
    title: a.title,
    description,
    alternates: alternatesFor(path),
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: a.title,
      description,
      siteName: site.name,
      locale: site.locale,
      publishedTime: a.date,
      modifiedTime: historiaUpdated(a),
      authors: a.author === author.name ? [absoluteUrl(author.url)] : undefined,
      section: "História",
      tags: ["História", period?.label ?? "", `Eleição de ${a.year}`].filter(Boolean),
    },
    twitter: { card: "summary_large_image", title: a.title, description },
  };
}

const KIND_LABEL: Record<HistorySource["kind"], string> = {
  primaria: "Fonte primária",
  imprensa: "Imprensa",
  referencia: "Referência",
};
const KIND_ORDER = { primaria: 0, imprensa: 1, referencia: 2 } as const;

export default async function HistoriaPage({ params }: { params: Params }) {
  const { slug } = await params;
  const a = getHistoriaBySlug(slug);
  if (!a) notFound();

  const path = historiaPath(a.slug);
  const url = absoluteUrl(path);
  const period = getPeriod(a.period);
  const updated = historiaUpdated(a);
  const isHouseAuthor = a.author === author.name;
  const prepared = prepareArticleHtml(a.content, { adBreaks: [] });
  const body = prepared.parts.join("");
  const toc = tocH2(prepared.toc);
  const minutes = Math.max(1, Math.round(prepared.words / 200));
  const { older, newer } = getHistoriaNeighbors(a);
  const books = (a.relatedBooks ?? []).map((s) => getArticleBySlug(s)).filter((b): b is Article => Boolean(b));
  const sources = [...a.sources].sort((x, y) => KIND_ORDER[x.kind] - KIND_ORDER[y.kind]);

  const authorLd = isHouseAuthor
    ? { "@type": "Person", name: author.name, url: absoluteUrl(author.url), image: absoluteUrl(author.image) }
    : { "@type": "Person", name: a.author };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: a.title,
    description: metaDescription(a.summary),
    image: [absoluteUrl(`${path}/opengraph-image`)],
    datePublished: a.date,
    dateModified: updated,
    author: authorLd,
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${site.url}/#website` },
    articleSection: "História",
    keywords: [`Eleição de ${a.year}`, period?.label, "eleições no Brasil", "história política"].filter(Boolean).join(", "),
    wordCount: prepared.words,
    inLanguage: "pt-BR",
    url,
    citation: a.sources.map((s) => s.url),
  };
  const faqLd = faqJsonLd(a.faq);

  return (
    <>
      <ReadingProgress />
      <JsonLd data={articleLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "História", path: HISTORIA_PATH },
          ...(period ? [{ name: period.label, path: historiaPeriodPath(period.slug) }] : []),
          { name: a.title, path },
        ])}
      />
      {faqLd && <JsonLd data={faqLd} />}

      <article>
        <Container className="pt-8 sm:pt-10">
          <div className="mx-auto max-w-3xl">
            <header>
              <Breadcrumbs
                items={[
                  { name: "Início", href: "/" },
                  { name: "História", href: HISTORIA_PATH },
                  ...(period ? [{ name: period.label, href: historiaPeriodPath(period.slug) }] : []),
                  { name: a.title },
                ]}
              />
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                <Link
                  href={HISTORIA_PATH}
                  className="label-mono bg-ink px-2.5 py-1 text-ink-foreground transition hover:opacity-90"
                >
                  História
                </Link>
                {period && (
                  <Link href={historiaPeriodPath(period.slug)} className="label-mono text-accent hover:underline">
                    {period.label} · {period.years}
                  </Link>
                )}
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                {a.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{a.summary}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-y border-border py-4 text-xs text-muted">
                <span className="flex items-center gap-2">
                  <AuthorAvatar name={a.author} />
                  {isHouseAuthor ? (
                    <Link href={author.url} className="font-medium text-foreground transition hover:text-accent">
                      {author.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-foreground">{a.author}</span>
                  )}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={a.date}>Publicado em {formatDate(a.date)}</time>
                {updated !== a.date && (
                  <>
                    <span aria-hidden="true">·</span>
                    <time dateTime={updated}>Atualizado em {formatDate(updated)}</time>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{minutes} min de leitura</span>
                <span aria-hidden="true">·</span>
                <a href="#fontes" className="font-semibold text-foreground underline-offset-2 hover:underline">
                  {a.sources.length} {a.sources.length === 1 ? "fonte" : "fontes"}
                </a>
              </div>
            </header>

            <CoverImage
              query={a.imageQuery}
              seed={newsImageSeed(a.slug)}
              alt={a.title}
              priority
              label={String(a.year)}
              className="mt-6 aspect-[16/9] w-full"
              creditPlacement="below"
            />

            <section
              aria-labelledby="em-resumo-historia"
              className="mt-8 border-l-4 border-foreground bg-surface-2 px-5 py-4 sm:px-6"
            >
              <h2 id="em-resumo-historia" className="label-mono text-muted">
                O essencial
              </h2>
              <ul className="mt-2 space-y-2 font-display text-lg leading-snug">
                {a.keyPoints.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </section>

            {toc.length > 2 && (
              <nav aria-label="Neste artigo" className="mt-8 border border-border p-4 text-sm">
                <p className="label-mono text-muted">Neste artigo</p>
                <ol className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="text-foreground/90 transition hover:text-accent">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="prose-article mt-8 max-w-[68ch]" dangerouslySetInnerHTML={{ __html: body }} />

            <aside className="mt-10 border border-border p-4 text-sm leading-relaxed text-muted">
              <p className="label-mono">Como contamos esta história</p>
              <p className="mt-1.5">
                Primeiro os fatos que podem ser conferidos: quem fez o quê, quando, com que resultado oficial. Termos e
                interpretações em disputa aparecem sempre atribuídos a quem os usa. Todos os campos políticos passam pela
                mesma régua. Se você tiver uma fonte que corrija algo aqui, escreva para{" "}
                <a href={`mailto:${author.email}`} className="text-accent underline underline-offset-2">
                  {author.email}
                </a>
                . Veja a{" "}
                <Link href="/politica-editorial" className="text-accent underline underline-offset-2">
                  política editorial
                </Link>
                .
              </p>
            </aside>

            <section aria-labelledby="fontes" className="mt-12 scroll-mt-24">
              <h2 id="fontes" className="font-display text-2xl font-bold tracking-tight">
                Fontes consultadas
              </h2>
              <p className="mb-3 mt-1 text-sm text-muted">
                Todos os links foram abertos e conferidos antes da publicação. Primeiro as fontes primárias, depois a
                imprensa identificada.
              </p>
              <ol className="divide-y divide-border border-y border-border">
                {sources.map((s) => (
                  <li key={s.url} className="py-3 text-sm">
                    <p className="label-mono text-muted">
                      {KIND_LABEL[s.kind]} · {s.publisher}
                    </p>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="mt-0.5 block font-semibold text-foreground underline-offset-2 hover:text-accent hover:underline"
                    >
                      {s.label} <span aria-hidden="true">↗</span>
                    </a>
                    <p className="mt-0.5 text-muted">{s.note}</p>
                  </li>
                ))}
              </ol>
            </section>

            <FaqAccordion items={a.faq} />

            <ShareBar url={url} title={a.title} className="mt-8" />

            <section aria-labelledby="continue" className="mt-10 border-t-[3px] border-foreground pt-3">
              <h2 id="continue" className="font-display text-xl font-bold tracking-tight">
                Continue explorando
              </h2>
              <ul className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                <li>
                  <Link href="/eleicoes" className="font-semibold text-accent hover:underline">
                    Painel das Eleições 2026
                  </Link>
                  <span className="text-muted"> com os resultados do TSE</span>
                </li>
                <li>
                  <Link href="/congresso" className="font-semibold text-accent hover:underline">
                    Congresso por dentro
                  </Link>
                  <span className="text-muted"> com as fichas dos 513 deputados e 81 senadores</span>
                </li>
                <li>
                  <Link href="/checagem" className="font-semibold text-accent hover:underline">
                    Checagem de boatos
                  </Link>
                  <span className="text-muted"> com a mesma régua para todos os campos</span>
                </li>
                <li>
                  <Link href={HISTORIA_PATH} className="font-semibold text-accent hover:underline">
                    Todas as eleições na linha do tempo
                  </Link>
                </li>
              </ul>
              {(newer || older) && (
                <nav aria-label="Eleições vizinhas" className="mt-5 grid gap-3 sm:grid-cols-2">
                  {older ? (
                    <Link href={historiaPath(older.slug)} className="border border-border p-3 transition hover:border-accent">
                      <span className="label-mono text-muted">← Antes no tempo</span>
                      <span className="mt-1 block font-display font-bold leading-snug">{older.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {newer && (
                    <Link
                      href={historiaPath(newer.slug)}
                      className="border border-border p-3 text-left transition hover:border-accent sm:text-right"
                    >
                      <span className="label-mono text-muted">Depois no tempo →</span>
                      <span className="mt-1 block font-display font-bold leading-snug">{newer.title}</span>
                    </Link>
                  )}
                </nav>
              )}
            </section>

            <AuthorBox className="mt-10" />
          </div>
        </Container>
      </article>

      {books.length > 0 && (
        <Container className="mt-14 pb-20">
          <section aria-label="Livros relacionados" className="mx-auto max-w-3xl">
            <SectionHeading label="Livros" title="Para ler depois" href="/artigos" linkText="Todas as resenhas" />
            <div className="grid gap-6 sm:grid-cols-2">
              {books.map((b) => (
                <ArticleCard key={b.slug} article={b} variant="default" />
              ))}
            </div>
          </section>
        </Container>
      )}
      {books.length === 0 && <div className="pb-20" />}
    </>
  );
}
