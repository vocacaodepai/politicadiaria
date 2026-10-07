import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  CategoriaPage,
  categoriaBase,
  categoriaMetadata,
  categoriaParams,
  categoriaTotalPages,
} from "@/components/listing/CategoriaPage";
import { pageParams, parsePage } from "@/components/listing/paginate";
import { isCategory } from "@/lib/articles";

type Params = Promise<{ slug: string; page: string }>;

export function generateStaticParams() {
  return categoriaParams().flatMap(({ slug }) =>
    pageParams(categoriaTotalPages(slug)).map(({ page }) => ({ slug, page }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, page: raw } = await params;
  const page = parsePage(raw);
  if (!page || !isCategory(slug) || page > categoriaTotalPages(slug)) return {};
  return categoriaMetadata(slug, page);
}

export default async function Page({ params }: { params: Params }) {
  const { slug, page: raw } = await params;
  if (!isCategory(slug)) notFound();
  const page = parsePage(raw);
  if (!page) notFound();
  if (page === 1) permanentRedirect(categoriaBase(slug));
  return <CategoriaPage slug={slug} page={page} />;
}
