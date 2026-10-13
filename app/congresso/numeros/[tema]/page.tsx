import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NumeroPage, numeroMetadata, numeroParams } from "@/components/congresso/NumerosPage";
import { NUMERO_SLUGS, type NumeroSlug } from "@/lib/congress-extra";

type Params = Promise<{ tema: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return numeroParams();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tema } = await params;
  return numeroMetadata(tema);
}

export default async function Page({ params }: { params: Params }) {
  const { tema } = await params;
  if (!(NUMERO_SLUGS as readonly string[]).includes(tema)) notFound();
  return <NumeroPage slug={tema as NumeroSlug} />;
}
