import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Container } from "@/components/Container";
import { CoverImage } from "@/components/CoverImage";
import { FaqAccordion } from "@/components/FaqAccordion";
import { NewsList } from "@/components/NewsRow";
import { QuizWidget } from "@/components/QuizWidget";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SectionHeading } from "@/components/SectionHeading";
import { AuthorAvatar } from "@/components/article/AuthorAvatar";
import { AuthorBox } from "@/components/article/AuthorBox";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { faqJsonLd } from "@/components/article/schema";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";
import { prepareArticleHtml } from "@/lib/html";
import { getNewsBySlug, getRelatedNews, news, newsImageSeed } from "@/lib/news";
import { absoluteUrl, breadcrumbJsonLd, formatDate, formatTime, metaDescription, relativeDay, alternatesFor } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return {};

  const path = `/noticias/${item.slug}`;
  const description = metaDescription(item.summary);

  return {
    title: item.title,
    description,
    alternates: alternatesFor(path),
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: item.title,
      description,
      siteName: site.name,
      locale: site.locale,
      publishedTime: item.date,
      modifiedTime: item.date,
      authors: item.author === author.name ? [absoluteUrl(author.url)] : undefined,
      section: "Notícias",
      tags: ["Notícias", item.sourceName],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
    },
  };
}

function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default async function NewsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const path = `/noticias/${item.slug}`;
  const url = absoluteUrl(path);
  const isHouseAuthor = item.author === author.name;
  const timeLabel = formatTime(item.publishedAt);
  // Notícia não tem anúncio no meio do texto: o corpo vem inteiro (adBreaks vazio).
  const prepared = item.content ? prepareArticleHtml(item.content, { adBreaks: [] }) : null;
  const body = prepared?.parts.join("") ?? "";
  const showAd = (prepared?.words ?? 0) >= 250;
  const related = getRelatedNews(item, 6);
  const host = sourceHost(item.sourceUrl);

  const authorLd = isHouseAuthor
    ? { "@type": "Person", name: author.name, url: absoluteUrl(author.url), image: absoluteUrl(author.image) }
    : { "@type": "Person", name: item.author };

  const newsArticle = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    headline: item.title,
    description: metaDescription(item.summary),
    image: [absoluteUrl(`${path}/opengraph-image`)],
    datePublished: item.date,
    dateModified: item.date,
    author: authorLd,
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${site.url}/#website` },
    isBasedOn: item.sourceUrl,
    articleSection: "Notícias",
    keywords: item.sourceName,
    ...(prepared ? { wordCount: prepared.words } : {}),
    inLanguage: "pt-BR",
    url,
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Notícias", path: "/noticias" },
    { name: item.title, path },
  ]);

  const faqLd = faqJsonLd(item.faq);

  return (
    <>
      <ReadingProgress />
      <JsonLd data={newsArticle} />
      <JsonLd data={breadcrumbs} />
      {faqLd && <JsonLd data={faqLd} />}

      <article>
        <Container className="pt-8 sm:pt-10">
          <div className="mx-auto max-w-3xl">
            <header>
              <Breadcrumbs
                items={[
                  { name: "Início", href: "/" },
                  { name: "Notícias", href: "/noticias" },
                  { name: item.title },
                ]}
              />
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/noticias"
                  className="label-mono rounded-lg bg-ink px-2.5 py-1 text-ink-foreground transition hover:opacity-90"
                >
                  Notícia
                </Link>
                <time dateTime={item.date} className="font-mono text-xs text-muted">
                  {relativeDay(item.date)}
                </time>
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                {item.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{item.summary}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-y border-border py-4 font-mono text-xs text-muted">
                <span className="flex items-center gap-2">
                  <AuthorAvatar name={item.author} />
                  {isHouseAuthor ? (
                    <Link href={author.url} className="font-medium text-foreground transition hover:text-accent">
                      {author.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-foreground">{item.author}</span>
                  )}
                </span>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <time dateTime={item.publishedAt ?? item.date}>
                  {formatDate(item.date)}
                  {timeLabel && ` · ${timeLabel}`}
                </time>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <span>
                  via <span className="font-medium text-foreground">{site.name}</span>
                </span>
              </div>
            </header>

            {item.imageQuery && (
              <CoverImage
                query={item.imageQuery}
                seed={newsImageSeed(item.slug)}
                alt={item.title}
                priority
                className="mt-6"
                creditPlacement="below"
              />
            )}

            {prepared ? (
              <div className="prose-article mt-8 max-w-[68ch]" dangerouslySetInnerHTML={{ __html: body }} />
            ) : (
              <div className="prose-article mt-8 max-w-[68ch]">
                <p>{item.summary}</p>
              </div>
            )}

            <section
              aria-labelledby="fonte-original"
              className="mt-10 flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="min-w-0">
                <p className="label-mono text-muted">Fonte original</p>
                <h2 id="fonte-original" className="mt-1 font-display text-lg font-bold tracking-tight">
                  {item.sourceName}
                </h2>
                {host && <p className="mt-0.5 font-mono text-xs text-muted">{host}</p>}
              </div>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 font-display text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                Ler na fonte original <span aria-hidden="true">↗</span>
              </a>
            </section>

            {showAd && <AdSlot format="in-article" className="ad-in-article mt-10" />}

            {item.faq && <FaqAccordion items={item.faq} />}
            {item.quiz && <QuizWidget questions={item.quiz} />}

            <AuthorBox className="mt-10" />
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Container className="mt-14 pb-20">
          <section aria-label="Mais notícias" className="mx-auto max-w-3xl">
            <SectionHeading label="Últimas" title="Mais notícias" href="/noticias" linkText="Todas as notícias" />
            <NewsList items={related} />
          </section>
        </Container>
      )}
    </>
  );
}
