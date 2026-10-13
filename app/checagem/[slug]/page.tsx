import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SectionHeading } from "@/components/SectionHeading";
import { AuthorAvatar } from "@/components/article/AuthorAvatar";
import { AuthorBox } from "@/components/article/AuthorBox";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { ShareBar } from "@/components/article/ShareBar";
import { FactCheckCard, toCardData } from "@/components/checagem/FactCheckCard";
import { Points } from "@/components/checagem/Points";
import { SourceList } from "@/components/checagem/SourceList";
import { Timeline } from "@/components/checagem/Timeline";
import { VerdictSeal } from "@/components/checagem/VerdictSeal";
import { claimReviewJsonLd } from "@/components/checagem/schema";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";
import {
  CHECAGEM_PATH,
  checagemPath,
  checagemUpdated,
  checagens,
  getChecagemBySlug,
  getRelatedChecagens,
  verdictMeta,
} from "@/lib/checagens";
import { prepareArticleHtml } from "@/lib/html";
import { absoluteUrl, alternatesFor, breadcrumbJsonLd, formatDate, formatTime, metaDescription } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return checagens.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const c = getChecagemBySlug(slug);
  if (!c) return {};
  const path = checagemPath(c.slug);
  const label = verdictMeta[c.verdict].label;
  const title = c.title;
  const description = metaDescription(c.summary);
  return {
    title,
    description,
    alternates: alternatesFor(path),
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      publishedTime: c.checkedAt,
      modifiedTime: checagemUpdated(c),
      authors: [absoluteUrl(author.url)],
      section: "Checagem",
      tags: ["Checagem", label, c.topic],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ChecagemDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const c = getChecagemBySlug(slug);
  if (!c) notFound();

  const path = checagemPath(c.slug);
  const url = absoluteUrl(path);
  const meta = verdictMeta[c.verdict];
  const updated = checagemUpdated(c);
  const wasUpdated = updated !== c.date;
  const timeLabel = formatTime(c.checkedAt);
  const prepared = prepareArticleHtml(c.content, { adBreaks: [] });
  const related = getRelatedChecagens(c, 2);

  return (
    <>
      <ReadingProgress />
      <JsonLd data={claimReviewJsonLd(c)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Checagem", path: CHECAGEM_PATH },
          { name: c.title, path },
        ])}
      />

      <article>
        <Container className="pt-8 sm:pt-10">
          <div className="mx-auto max-w-3xl">
            <header>
              <Breadcrumbs
                items={[{ name: "Início", href: "/" }, { name: "Checagem", href: CHECAGEM_PATH }, { name: c.title }]}
              />
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                <VerdictSeal verdict={c.verdict} size="lg" />
              </div>
              <p className="mt-3 max-w-xl text-sm text-muted">{meta.meaning}</p>
              <h1 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                {c.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{c.summary}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-y border-border py-4 text-xs text-muted">
                <span className="flex items-center gap-2">
                  <AuthorAvatar name={c.author} />
                  <Link href={author.url} className="font-medium text-foreground transition hover:text-accent">
                    {author.name}
                  </Link>
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={c.checkedAt}>
                  Checado em {formatDate(c.date)}
                  {timeLabel && ` · ${timeLabel}`}
                </time>
                <span aria-hidden="true">·</span>
                <time dateTime={updated}>Atualizado em {formatDate(updated)}</time>
                <span aria-hidden="true">·</span>
                <a href="#fontes" className="font-semibold text-foreground underline-offset-2 hover:underline">
                  Checado em {c.sources.length} {c.sources.length === 1 ? "fonte" : "fontes"}
                </a>
              </div>
            </header>

            <section
              aria-labelledby="em-20-segundos"
              className="mt-8 border-l-4 border-foreground bg-surface-2 px-5 py-4 sm:px-6"
            >
              <h2 id="em-20-segundos" className="label-mono text-muted">
                Em 20 segundos
              </h2>
              <p className="mt-1.5 font-display text-xl font-semibold leading-snug sm:text-2xl">{c.quick}</p>
            </section>

            <section aria-labelledby="alegacao" className="mt-10">
              <h2 id="alegacao" className="label-mono text-muted">
                A alegação
              </h2>
              <blockquote className="mt-2 border-l-2 border-border pl-4 font-display text-xl leading-snug sm:text-2xl">
                “{c.claim.text}”
              </blockquote>
              <p className="mt-3 text-sm text-muted">
                {c.claim.origin}
                {c.claim.firstSeen && (
                  <>
                    {" "}
                    Primeira circulação registrada: <time dateTime={c.claim.firstSeen}>{formatDate(c.claim.firstSeen)}</time>.
                  </>
                )}{" "}
                Não linkamos o boato para não ampliá-lo.
              </p>
            </section>

            <section aria-labelledby="verdade-e-nao" className="mt-10">
              <h2 id="verdade-e-nao" className="mb-3 font-display text-2xl font-bold tracking-tight">
                O que é verdade e o que não é
              </h2>
              <Points items={c.points} />
            </section>

            <div className="prose-article mt-10 max-w-[68ch]" dangerouslySetInnerHTML={{ __html: prepared.parts.join("") }} />

            {c.corrections && c.corrections.length > 0 && (
              <section aria-labelledby="correcoes" className="mt-10 border border-warn/60 p-4">
                <h2 id="correcoes" className="label-mono text-warn">
                  Correções
                </h2>
                <ul className="mt-2 space-y-2 text-sm">
                  {c.corrections.map((n) => (
                    <li key={n.date + n.text}>
                      <strong>Atualizado em {formatDate(n.date)}:</strong> {n.text}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="fontes" className="mt-12 scroll-mt-24">
              <h2 id="fontes" className="font-display text-2xl font-bold tracking-tight">
                Checado em {c.sources.length} {c.sources.length === 1 ? "fonte" : "fontes"}
              </h2>
              <p className="mb-3 mt-1 text-sm text-muted">
                Todos os links foram abertos e conferidos antes da publicação. Ordem: fontes primárias primeiro, depois
                agências de checagem, imprensa e referências.
              </p>
              <SourceList sources={orderSources(c.sources)} />
            </section>

            <section aria-labelledby="linha-do-tempo" className="mt-12">
              <h2 id="linha-do-tempo" className="mb-4 font-display text-2xl font-bold tracking-tight">
                Linha do tempo
              </h2>
              <Timeline items={c.timeline} />
            </section>

            <p className="mt-10 border-t border-border pt-4 text-xs leading-relaxed text-muted">
              Checagem publicada em {formatDate(c.date)}
              {wasUpdated ? ` e atualizada em ${formatDate(updated)}` : ""}. Se você tiver uma fonte que mude este
              veredito, escreva para{" "}
              <a href={`mailto:${author.email}`} className="text-accent underline underline-offset-2">
                {author.email}
              </a>
              . Aplicamos a mesma régua a qualquer campo político.
            </p>

            <ShareBar url={url} title={c.title} className="mt-6" />

            <AuthorBox className="mt-10" />
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Container className="mt-14 pb-20">
          <section aria-label="Mais checagens" className="mx-auto max-w-3xl">
            <SectionHeading label="Checagem" title="Mais checagens" href={CHECAGEM_PATH} linkText="Todas as checagens" />
            <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
              {related.map((r) => (
                <FactCheckCard key={r.slug} item={toCardData(r)} />
              ))}
            </div>
          </section>
        </Container>
      )}
    </>
  );
}

const KIND_ORDER = { primaria: 0, agencia: 1, imprensa: 2, referencia: 3 } as const;

/** Primárias primeiro, mantendo a ordem original dentro de cada tipo. */
function orderSources<T extends { kind: keyof typeof KIND_ORDER }>(sources: T[]): T[] {
  return sources
    .map((s, i) => ({ s, i }))
    .sort((a, b) => KIND_ORDER[a.s.kind] - KIND_ORDER[b.s.kind] || a.i - b.i)
    .map((x) => x.s);
}
