import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { NoticiasPage, noticiasMetadata, noticiasTotalPages } from "@/components/listing/NoticiasPage";
import { pageParams, parsePage } from "@/components/listing/paginate";

type Params = Promise<{ page: string }>;

export function generateStaticParams() {
  return pageParams(noticiasTotalPages());
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const page = parsePage((await params).page);
  if (!page || page > noticiasTotalPages()) return {};
  return noticiasMetadata(page);
}

export default async function Page({ params }: { params: Params }) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/noticias");
  return <NoticiasPage page={page} />;
}
