import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ArtigosPage, artigosMetadata, artigosTotalPages } from "@/components/listing/ArtigosPage";
import { pageParams, parsePage } from "@/components/listing/paginate";

type Params = Promise<{ page: string }>;

export function generateStaticParams() {
  return pageParams(artigosTotalPages());
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const page = parsePage((await params).page);
  if (!page || page > artigosTotalPages()) return {};
  return artigosMetadata(page);
}

export default async function Page({ params }: { params: Params }) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/artigos");
  return <ArtigosPage page={page} />;
}
