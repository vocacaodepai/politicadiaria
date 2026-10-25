import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromessasPage, promessasMetadata } from "@/components/promessas/PromessasPage";
import { candidatoSlugs, isCandidato } from "@/lib/promessas";

type Params = Promise<{ candidato: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return candidatoSlugs.map((candidato) => ({ candidato }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { candidato } = await params;
  return isCandidato(candidato) ? promessasMetadata(candidato) : {};
}

export default async function Page({ params }: { params: Params }) {
  const { candidato } = await params;
  if (!isCandidato(candidato)) notFound();
  return <PromessasPage candidato={candidato} />;
}
