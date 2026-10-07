import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/articles";
import { groupNewsByDay, sortedNews } from "@/lib/news";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { NEWS_DESCRIPTION, NEWS_TITLE, NewsListing } from "./NewsListing";
import { listingMetadata, pagedTitle } from "./metadata";
import { NEWS_PER_PAGE, countPages, slicePage } from "./paginate";
import { pageHref } from "@/components/Pagination";

const BASE = "/noticias";

export function noticiasTotalPages(): number {
  return countPages(sortedNews().length, NEWS_PER_PAGE);
}

export function noticiasMetadata(page: number): Metadata {
  return listingMetadata({
    title: pagedTitle(NEWS_TITLE, page),
    description: NEWS_DESCRIPTION,
    path: pageHref(BASE, page),
  });
}

export function NoticiasPage({ page }: { page: number }) {
  const all = sortedNews();
  const totalPages = countPages(all.length, NEWS_PER_PAGE);
  if (page > totalPages) notFound();
  const items = slicePage(all, page, NEWS_PER_PAGE);
  const groups = groupNewsByDay(items);
  const path = pageHref(BASE, page);
  const availableTopics: string[] = [...new Set(all.flatMap((n) => (n.topic ? [n.topic] : [])))];

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pagedTitle(NEWS_TITLE, page),
    description: NEWS_DESCRIPTION,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: items.map((n, i) => ({
        "@type": "ListItem",
        position: (page - 1) * NEWS_PER_PAGE + i + 1,
        name: n.title,
        url: absoluteUrl(`/noticias/${n.slug}`),
      })),
    },
  };

  return (
    <>
      <JsonLd data={collection} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Notícias", path: BASE },
        ])}
      />
      <NewsListing
        groups={groups}
        total={all.length}
        page={page}
        totalPages={totalPages}
        basePath={BASE}
        availableTopics={availableTopics}
      />
    </>
  );
}
