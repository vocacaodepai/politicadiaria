import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site, sortedArticles } from "@/lib/articles";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { ArticleListing } from "./ArticleListing";
import { JsonLd } from "./JsonLd";
import { listingMetadata, pagedTitle } from "./metadata";
import { ARTICLES_PER_PAGE, countPages, slicePage } from "./paginate";
import { pageHref } from "@/components/Pagination";

const BASE = "/artigos";
const TITLE = "Resenhas de livros de política";
const DESCRIPTION =
  "Resenhas independentes dos melhores livros de política brasileira e internacional, com nota de 0 a 10: o que o livro entrega, para quem serve e se vale o preço.";

function nonProductArticles() {
  return sortedArticles();
}

export function artigosTotalPages(): number {
  return countPages(nonProductArticles().length, ARTICLES_PER_PAGE);
}

export function artigosMetadata(page: number): Metadata {
  return listingMetadata({
    title: pagedTitle(TITLE, page),
    description: DESCRIPTION,
    path: pageHref(BASE, page),
  });
}

export function ArtigosPage({ page }: { page: number }) {
  const all = nonProductArticles();
  const totalPages = countPages(all.length, ARTICLES_PER_PAGE);
  if (page > totalPages) notFound();
  const items = slicePage(all, page, ARTICLES_PER_PAGE);
  const path = pageHref(BASE, page);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pagedTitle(TITLE, page),
    description: DESCRIPTION,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: items.map((a, i) => ({
        "@type": "ListItem",
        position: (page - 1) * ARTICLES_PER_PAGE + i + 1,
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
          { name: TITLE, path: BASE },
        ])}
      />
      <ArticleListing
        label="Arquivo"
        title={TITLE}
        description={DESCRIPTION}
        items={items}
        total={all.length}
        page={page}
        totalPages={totalPages}
        basePath={BASE}
        active="todos"
      />
    </>
  );
}
