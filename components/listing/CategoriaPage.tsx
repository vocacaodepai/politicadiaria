import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getArticlesByCategory, getCategory, isCategory, site } from "@/lib/articles";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { ArticleListing } from "./ArticleListing";
import { JsonLd } from "./JsonLd";
import { categoryIntros } from "./categoryIntros";
import { listingMetadata, pagedTitle } from "./metadata";
import { ARTICLES_PER_PAGE, countPages, slicePage } from "./paginate";
import { pageHref } from "@/components/Pagination";

export function categoriaBase(slug: string): string {
  return `/categoria/${slug}`;
}

export function categoriaTotalPages(slug: string): number {
  return countPages(getArticlesByCategory(slug).length, ARTICLES_PER_PAGE);
}

/** Params de todas as categorias (para a rota raiz). */
export function categoriaParams(): { slug: string }[] {
  return categories.map((c) => ({ slug: c.slug }));
}

export function categoriaMetadata(slug: string, page: number): Metadata {
  const category = getCategory(slug);
  if (!category) return {};
  return listingMetadata({
    title: pagedTitle(category.label, page),
    description: category.description,
    path: pageHref(categoriaBase(slug), page),
  });
}

export function CategoriaPage({ slug, page }: { slug: string; page: number }) {
  if (!isCategory(slug)) notFound();
  const category = getCategory(slug);
  if (!category) notFound();

  const all = getArticlesByCategory(slug);
  const totalPages = countPages(all.length, ARTICLES_PER_PAGE);
  if (page > totalPages) notFound();
  const items = slicePage(all, page, ARTICLES_PER_PAGE);
  const base = categoriaBase(slug);
  const path = pageHref(base, page);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pagedTitle(category.label, page),
    description: category.description,
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
          { name: category.label, path: base },
        ])}
      />
      <ArticleListing
        label="Categoria"
        title={category.label}
        description={category.description}
        intro={categoryIntros[slug]}
        items={items}
        total={all.length}
        page={page}
        totalPages={totalPages}
        basePath={base}
        active={slug}
        emptyTitle="Os primeiros artigos desta categoria estão a caminho"
        emptyText="Publicamos conteúdo novo todos os dias. Enquanto isso, veja o que já está no ar nas outras categorias."
      />
    </>
  );
}
