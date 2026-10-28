import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryChips } from "@/components/CategoryChips";
import { Container } from "@/components/Container";
import { ChecagemStrip } from "@/components/ChecagemStrip";
import { FerramentasGrid } from "@/components/FerramentasGrid";
import { NewsCard } from "@/components/NewsCard";
import { NewsTicker } from "@/components/NewsTicker";
import { ScoreScaleNote } from "@/components/ScoreScaleNote";
import { SectionHeading } from "@/components/SectionHeading";
import { Sidebar } from "@/components/Sidebar";
import {
  type Article,
  type Category,
  articles,
  categories,
  getArticlesByCategory,
  site,
  sortedArticles,
} from "@/lib/articles";
import { news, sortedNews, splitHomeNews } from "@/lib/news";
import { absoluteUrl, metaDescription, safeJsonLd, alternatesFor } from "@/lib/seo";

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
  const heroCards = brazil.slice(0, 3);
  const sideNews = brazil.slice(3, 9);
  const moreNews = brazil.slice(9, 15);
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
          href="/eleicoes"
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-y-2 border-foreground py-2 hover:text-accent"
        >
          <span className="label-mono">Eleições 2026</span>
          <span className="text-sm font-semibold">Resultados do TSE, pesquisas e ranking de acerto dos institutos →</span>
        </Link>
      </Container>

      {/* Hero no estilo de jornal: abertura com foto, secundárias com foto e coluna de últimas */}
      <Container as="section" className="pt-6 sm:pt-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-8 lg:border-r lg:border-border lg:pr-8">
            {leadNews && <NewsCard item={leadNews} variant="lead" priority />}
            {heroCards.length > 0 && (
              <div className="mt-8 grid gap-6 border-t border-foreground pt-6 sm:grid-cols-3">
                {heroCards.map((n) => (
                  <NewsCard key={n.slug} item={n} />
                ))}
              </div>
            )}
          </div>
          <aside className="lg:col-span-4 lg:pl-8" aria-label="Últimas notícias">
            <p className="label-mono border-b-[3px] border-foreground pb-2">Últimas</p>
            {sideNews.map((n) => (
              <NewsCard key={n.slug} item={n} variant="side" />
            ))}
            <Link href="/noticias" className="mt-3 inline-block text-sm font-bold text-accent hover:underline">
              Todas as notícias →
            </Link>
          </aside>
        </div>
      </Container>

      {/* Ferramentas políticas */}
      <Container as="section" className="mt-12" aria-label="Ferramentas políticas">
        <SectionHeading label="Ferramentas" title="Ferramentas políticas" href="/ferramentas" linkText="Ver todas" />
        <FerramentasGrid />
      </Container>

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {moreNews.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        </Container>
      )}

      {worldNews.length > 0 && (
        <Container as="section" className="mt-12">
          <SectionHeading label="Mundo" title="Política internacional" href="/noticias" linkText="Ver mais" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {worldNews.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
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
