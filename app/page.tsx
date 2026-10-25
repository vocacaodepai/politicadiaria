import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryChips } from "@/components/CategoryChips";
import { Container } from "@/components/Container";
import { CongressPromo } from "@/components/CongressPromo";
import { ChecagemStrip } from "@/components/ChecagemStrip";
import { EleicoesStrip } from "@/components/EleicoesStrip";
import { CoverImage } from "@/components/CoverImage";
import { NewsList } from "@/components/NewsRow";
import { NewsTicker } from "@/components/NewsTicker";
import { ScoreScaleNote } from "@/components/ScoreScaleNote";
import { SectionHeading } from "@/components/SectionHeading";
import { FeaturedList, Sidebar } from "@/components/Sidebar";
import {
  type Article,
  type Category,
  articles,
  categories,
  getArticlesByCategory,
  site,
  sortedArticles,
} from "@/lib/articles";
import { news, newsImageSeed, sortedNews, splitHomeNews } from "@/lib/news";
import { absoluteUrl, formatDate, metaDescription, safeJsonLd, alternatesFor } from "@/lib/seo";

const HOME_TITLE = "Política Diária: notícias de política, Congresso por dentro e livros para entender o poder";
const HOME_DESCRIPTION = metaDescription(site.description);

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: alternatesFor("/"),
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

/** Títulos curtos das seções por categoria (a description completa é longa demais para um título). */
const CATEGORY_TITLES: Record<Category, string> = {
  "politica-brasileira": "Para entender o Brasil",
  "politica-internacional": "O mundo em disputa",
  "historia-politica": "A história por trás do poder",
  "ideias-politicas": "As ideias que movem a política",
  "economia-e-estado": "Economia, Estado e escolhas públicas",
  "democracia-e-instituicoes": "Como as democracias funcionam",
  biografias: "Líderes por dentro",
};

/** Quantos artigos por bloco de categoria e por seção de reviews. */
const PER_SECTION = 3;

function CategoryBlock({ category, items }: { category: (typeof categories)[number]; items: Article[] }) {
  return (
    <section aria-label={category.label}>
      <SectionHeading
        label={category.label}
        title={CATEGORY_TITLES[category.slug] ?? category.label}
        href={`/categoria/${category.slug}`}
        linkText="Ver categoria"
      />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const all = sortedArticles();
  const topBooks = all.slice(0, 3);
  const shown = new Set<string>(topBooks.map((a) => a.slug));

  const categoryBlocks = categories
    .map((c) => ({
      category: c,
      items: getArticlesByCategory(c.slug)
        .filter((a) => !shown.has(a.slug))
        .slice(0, PER_SECTION),
    }))
    .filter((b) => b.items.length > 0);

  // Foco no Brasil: a abertura é sempre uma notícia do Brasil, e o mundo vem depois, em menor espaço.
  const { lead: leadNews, brazil, world } = splitHomeNews(sortedNews());
  const todayNews = brazil.slice(0, 6);
  const moreNews = brazil.slice(6, 12);
  const worldNews = world.slice(0, 4);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Destaques da Política Diária",
    numberOfItems: topBooks.length,
    itemListElement: topBooks.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title,
      url: absoluteUrl(`/artigos/${a.slug}`),
    })),
  };

  return (
    <>
      <h1 className="sr-only">{HOME_TITLE}</h1>

      <NewsTicker />

      <Container className="mt-4">
        <Link
          href="/eleicoes/dia-da-eleicao"
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-2 border-accent px-4 py-3 hover:bg-surface-2"
        >
          <span className="font-display text-lg font-bold leading-tight">2º turno, domingo 25/10: como votar e acompanhar a apuração</span>
          <span className="label-mono text-accent">Dia da eleição, com dados do TSE</span>
        </Link>
      </Container>

      {/* Hero: notícia de abertura + últimas + Congresso */}
      <Container as="section" className="pt-6 sm:pt-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-8 lg:border-r lg:border-border lg:pr-8">
            {leadNews && (
              <article className="group border-b border-foreground pb-6">
                <p className="label-mono text-accent">Em destaque · {formatDate(leadNews.date, "short")}</p>
                <h2 className="mt-2 font-display text-[2rem] font-black leading-[1.08] tracking-tight sm:text-5xl">
                  <Link href={`/noticias/${leadNews.slug}`} className="transition group-hover:text-accent">
                    {leadNews.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-3xl font-serif text-lg leading-relaxed text-muted sm:text-xl">
                  {leadNews.summary}
                </p>
                {leadNews.imageQuery && (
                  <Link href={`/noticias/${leadNews.slug}`} className="mt-5 block aspect-[16/9] w-full overflow-hidden">
                    <CoverImage
                      query={leadNews.imageQuery}
                      seed={newsImageSeed(leadNews.slug)}
                      alt={leadNews.title}
                      priority
                      showCredit={false}
                      className="h-full w-full"
                    />
                  </Link>
                )}
              </article>
            )}
            {todayNews.length > 0 && (
              <div className="mt-2">
                <NewsList items={todayNews} columns={1} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6 lg:col-span-4 lg:pl-8">
            <CongressPromo />
            {topBooks[0] && <ArticleCard article={topBooks[0]} variant="horizontal" />}
            <FeaturedList title="Comece por estes livros" exclude={[]} />
          </div>
        </div>
      </Container>

      <EleicoesStrip />
      <ChecagemStrip />

      <Container className="mt-8">
        <CategoryChips />
      </Container>

      <Container className="mt-6">
        <AdSlot format="leaderboard" />
      </Container>

      {moreNews.length > 0 && (
        <Container as="section" className="mt-12">
          <SectionHeading label="Brasil" title="Mais notícias do Brasil" href="/noticias" linkText="Ver todas" />
          <NewsList items={moreNews} columns={2} />
        </Container>
      )}

      {worldNews.length > 0 && (
        <Container as="section" className="mt-12">
          <SectionHeading label="Mundo" title="Política internacional" href="/noticias" linkText="Ver mais" />
          <NewsList items={worldNews} columns={2} />
        </Container>
      )}

      {/* Grid principal: resenhas de livros + sidebar */}
      <Container className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div className="min-w-0 space-y-12">
          {all.length > 0 && (
            <section aria-label="Resenhas de livros">
              <SectionHeading
                label="Livros"
                title="Resenhas de livros de política"
                href="/artigos"
                linkText="Todas as resenhas"
              />
              <ScoreScaleNote />
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {topBooks.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}

          {categoryBlocks.map((b) => (
            <CategoryBlock key={b.category.slug} category={b.category} items={b.items} />
          ))}
        </div>

        <Sidebar exclude={[]} featuredTitle="Livros em destaque" />
      </Container>

      {/* Faixa final */}
      <section className="mt-16 border-t-[3px] border-double border-foreground bg-ink text-ink-foreground">
        <Container className="py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="label-mono text-ink-foreground/60">{site.name}</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Política com fato, dado e fonte
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-foreground/80 sm:text-lg">
                {site.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/congresso"
                  className="inline-flex h-11 items-center bg-accent px-5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                  Conheça o Congresso por dentro
                </Link>
                <Link
                  href="/artigos"
                  className="inline-flex h-11 items-center border border-white/40 px-5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  Ver resenhas de livros
                </Link>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-4 lg:col-span-4">
              <div className="border-l border-white/15 pl-4">
                <dt className="label-mono text-ink-foreground/60">Resenhas</dt>
                <dd className="mt-1 font-display text-3xl font-bold text-white">{articles.length}</dd>
              </div>
              <div className="border-l border-white/15 pl-4">
                <dt className="label-mono text-ink-foreground/60">Notícias</dt>
                <dd className="mt-1 font-display text-3xl font-bold text-white">{news.length}</dd>
              </div>
              <div className="border-l border-white/15 pl-4">
                <dt className="label-mono text-ink-foreground/60">Parlamentares</dt>
                <dd className="mt-1 font-display text-3xl font-bold text-white">594</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListJsonLd) }} />
    </>
  );
}
