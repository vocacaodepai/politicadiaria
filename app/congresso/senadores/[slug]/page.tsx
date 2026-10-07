import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SenatorProfile, senatorTitle } from "@/components/congresso/SenatorProfile";
import { listingMetadata } from "@/components/listing/metadata";
import { UF_NAMES, formatBRLShort, getMeta, getSenator, senatorParams } from "@/lib/congress";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return senatorParams();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSenator(slug);
  if (!s) return {};
  const updated = new Date(`${getMeta().atualizadoEm}T12:00:00-03:00`).toLocaleDateString("pt-BR");
  const gasto = s.despesas ? ` Teve ${formatBRLShort(s.despesas.total)} reembolsados pela CEAPS no mandato.` : "";
  const meta = listingMetadata({
    title: `${s.nome} (${s.partido}-${s.uf}): votos, gastos e proposições`,
    description: `${senatorTitle(s)} por ${UF_NAMES[s.uf] ?? s.uf} (${s.partido}).${gasto} Veja votações, proposições, salário, contato e comissões. Dados oficiais do Senado, atualizados em ${updated}.`,
    path: `/congresso/senadores/${s.slug}`,
    type: "profile",
  });
  return s.foto ? { ...meta, openGraph: { ...meta.openGraph, images: [{ url: s.foto.url }] } } : meta;
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const s = getSenator(slug);
  if (!s) notFound();
  return <SenatorProfile s={s} />;
}
