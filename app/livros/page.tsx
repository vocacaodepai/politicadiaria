import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { BuyButton } from "@/components/article/BuyButton";
import { ReviewDisclosure } from "@/components/article/ReviewVerdict";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { countLabel } from "@/components/listing/paginate";
import { categories, getReviews, site, type Article } from "@/lib/articles";
import { reviewVerdict } from "@/lib/review";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/livros";
const TITLE = "Vitrine de livros de política";
const DESCRIPTION =
  "Os livros de política resenhados na Política Diária, organizados por tema e ordenados pela nota, com autor e link para ver cada obra na Amazon.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

/** Garante a tag de afiliado do site no link da Amazon (o check-content já barra link sem ela). */
function affiliateUrl(url: string): string {
  try {
    const u = new URL(url);
    if (/(^|\.)amazon\.com\.br$/i.test(u.hostname) && u.searchParams.get("tag") !== site.amazonTag) {
      u.searchParams.set("tag", site.amazonTag);
    }
    return u.toString();
  } catch {
    return url;
  }
}

function formatScore(score: number): string {
  return score.toFixed(1).replace(".", ",");
}

function scoreClass(score: number): string {
  if (score >= 7) return "text-success";
  if (score >= 5) return "text-warn";
  return "text-danger";
}

/** Resenhas por categoria, maior nota primeiro (desempate: mais recente). */
function shelves() {
  const reviews = getReviews().filter((a) => a.review);
  return categories
    .map((c) => ({
      ...c,
      books: reviews
        .filter((a) => a.category === c.slug)
        .sort((a, b) => (b.review!.score - a.review!.score) || b.date.localeCompare(a.date)),
    }))
    .filter((c) => c.books.length > 0);
}

/** Card tipográfico: sem capa de edição (direito de autor), só título, autor, nota e botões. */
function BookCard({ article }: { article: Article }) {
  const review = article.review!;
  const verdict = reviewVerdict(review.score);
  return (
    <li className="flex flex-col border border-border bg-surface">
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold leading-snug tracking-tight">
              <Link href={`/artigos/${article.slug}`} className="transition hover:text-accent">
                {review.tool}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted">{review.bookAuthor}</p>
          </div>
          <p className="shrink-0 text-right" aria-label={`Nota ${formatScore(review.score)} de 10`}>
            <span className={`font-mono text-3xl font-semibold leading-none tracking-tight ${scoreClass(review.score)}`}>
              {formatScore(review.score)}
            </span>
            <span className="font-mono text-xs text-muted">/10</span>
          </p>
        </div>
        <p className="label-mono mt-3 text-muted">{verdict.label}</p>
        <p className="mt-2 line-clamp-3 font-serif text-sm leading-relaxed text-foreground/90">{review.bestFor}</p>
        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <BuyButton href={affiliateUrl(review.url)} label="Ver na Amazon" />
          <Link
            href={`/artigos/${article.slug}`}
            className="text-center font-display text-sm font-semibold text-accent hover:underline sm:text-right"
          >
            Ler a resenha
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function LivrosPage() {
  const groups = shelves();
  const total = groups.reduce((n, g) => n + g.books.length, 0);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: total,
      itemListElement: groups
        .flatMap((g) => g.books)
        .map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: a.review!.tool,
          url: absoluteUrl(`/artigos/${a.slug}`),
        })),
    },
  };

  return (
    <>
      <JsonLd data={collection} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Vitrine de livros", path: PATH },
        ])}
      />
      <Container className="py-10 sm:py-14">
        <ListingHeader
          label="Livros"
          title={TITLE}
          description={DESCRIPTION}
          intro="A seleção segue a linha editorial declarada na política editorial. Dentro de cada tema, a ordem é a da nota final da resenha, que julga a qualidade da obra, nunca a posição política do autor."
          count={countLabel(total, "livro", "livros")}
        />

        <ReviewDisclosure affiliate plural className="mt-6 max-w-3xl" />

        {groups.length > 1 && (
          <nav aria-label="Temas da vitrine" className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.slug}
                href={`#${g.slug}`}
                className="label-mono border border-border px-3 py-2 text-foreground transition hover:border-accent hover:text-accent"
              >
                {g.label} <span className="text-muted">({g.books.length})</span>
              </a>
            ))}
          </nav>
        )}

        {groups.length === 0 ? (
          <p className="mt-10 rounded-xl border border-border bg-surface p-6 text-sm text-muted">
            As primeiras resenhas estão sendo preparadas.
          </p>
        ) : (
          groups.map((g) => (
            <section key={g.slug} id={g.slug} aria-labelledby={`titulo-${g.slug}`} className="mt-12 scroll-mt-20">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-foreground pb-2">
                <h2 id={`titulo-${g.slug}`} className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {g.label}
                </h2>
                <Link
                  href={`/categoria/${g.slug}`}
                  className="font-display text-sm font-semibold text-accent hover:underline"
                >
                  Todas as resenhas do tema
                </Link>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{g.description}</p>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.books.map((a) => (
                  <BookCard key={a.slug} article={a} />
                ))}
              </ul>
            </section>
          ))
        )}
      </Container>
    </>
  );
}
