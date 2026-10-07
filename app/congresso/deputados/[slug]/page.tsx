import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeputyProfile, deputyTitle } from "@/components/congresso/DeputyProfile";
import { listingMetadata } from "@/components/listing/metadata";
import { UF_NAMES, deputyParams, formatBRLShort, getDeputy, getMeta } from "@/lib/congress";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return deputyParams();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDeputy(slug);
  if (!d) return {};
  const updated = new Date(`${getMeta().atualizadoEm}T12:00:00-03:00`).toLocaleDateString("pt-BR");
  const gasto = d.despesas ? ` Gastou ${formatBRLShort(d.despesas.total)} da cota parlamentar no mandato.` : "";
  const meta = listingMetadata({
    title: `${d.nome} (${d.partido}-${d.uf}): votos, gastos e proposições`,
    description: `${deputyTitle(d)} por ${UF_NAMES[d.uf] ?? d.uf} (${d.partido}).${gasto} Veja votações, proposições, salário, contato e comissões. Dados oficiais da Câmara, atualizados em ${updated}.`,
    path: `/congresso/deputados/${d.slug}`,
    type: "profile",
  });
  return d.foto ? { ...meta, openGraph: { ...meta.openGraph, images: [{ url: d.foto.url }] } } : meta;
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const d = getDeputy(slug);
  if (!d) notFound();
  return <DeputyProfile d={d} />;
}
