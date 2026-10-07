import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Container } from "@/components/Container";
import { Sidebar } from "@/components/Sidebar";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { ReviewCriteria } from "@/components/listing/ReviewCriteria";
import { listingMetadata } from "@/components/listing/metadata";
import { countLabel } from "@/components/listing/paginate";
import { getReviews, site } from "@/lib/articles";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/reviews";
const TITLE = "Livros de política mais bem avaliados";
const DESCRIPTION =
  "Ranking dos livros de política resenhados aqui, da maior para a menor nota, com critérios públicos: clareza, profundidade, rigor das fontes, atualidade e leitura.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

/** Resenhas ordenadas pela nota (desempate pela data, mais recente primeiro). */
function rankedReviews() {
  return [...getReviews()].sort(
    (a, b) => (b.review?.score ?? 0) - (a.review?.score ?? 0) || b.date.localeCompare(a.date)
  );
}

export default function ReviewsPage() {
  const reviews = rankedReviews();

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
      numberOfItems: reviews.length,
      itemListElement: reviews.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.title,
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
          { name: "Mais bem avaliados", path: PATH },
        ])}
      />
      <Container className="py-10 sm:py-14">
        <ListingHeader
          label="Ranking"
          title={TITLE}
          description={DESCRIPTION}
          intro="A ordem aqui é a da nota final de cada resenha. A nota julga a qualidade da obra, nunca a posição política do autor: livros de todos os campos passam pela mesma régua."
          count={countLabel(reviews.length, "resenha", "resenhas")}
        />
        <ReviewCriteria />
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            {reviews.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {reviews.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} headingLevel="h2" priority={i < 3} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
                As primeiras resenhas estão sendo preparadas. Assine o feed RSS para ser avisado quando saírem.
              </p>
            )}
          </div>
          <Sidebar />
        </div>
      </Container>
    </>
  );
}
