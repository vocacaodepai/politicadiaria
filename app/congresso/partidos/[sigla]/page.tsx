import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { Directory } from "@/components/congresso/Directory";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { UF_NAMES, getMeta, getParty, partyParams } from "@/lib/congress";
import Link from "next/link";

type Params = Promise<{ sigla: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return partyParams();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { sigla } = await params;
  const p = getParty(sigla);
  if (!p) return {};
  return listingMetadata({
    title: `${p.sigla} no Congresso: ${p.deputados.length} deputados e ${p.senadores.length} senadores`,
    description: `Quem são os parlamentares do ${p.sigla} hoje no Congresso Nacional: ${p.deputados.length} deputados federais e ${p.senadores.length} senadores, com estado, votações e gastos. Dados oficiais.`,
    path: `/congresso/partidos/${p.slug}`,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { sigla } = await params;
  const p = getParty(sigla);
  if (!p) notFound();
  const path = `/congresso/partidos/${p.slug}`;
  const updated = new Date(`${getMeta().atualizadoEm}T12:00:00-03:00`).toLocaleDateString("pt-BR");
  const toEntry = (e: (typeof p.deputados)[number]) => ({ ...e });
  const ufsOf = (list: { uf: string }[]) => Object.keys(UF_NAMES).filter((u) => list.some((e) => e.uf === u));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${p.sigla} no Congresso Nacional`,
          url: absoluteUrl(path),
          inLanguage: "pt-BR",
          dateModified: getMeta().atualizadoEm,
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Congresso Nacional", path: "/congresso" },
          { name: p.sigla, path },
        ])}
      />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Congresso", href: "/congresso" }, { name: p.sigla }]} className="mb-6" />
        <ListingHeader
          label="Bancada"
          title={`${p.sigla} no Congresso Nacional`}
          description={`Parlamentares do ${p.sigla} em exercício hoje: ${p.deputados.length} na Câmara dos Deputados e ${p.senadores.length} no Senado. Lista descritiva, com dados oficiais atualizados em ${updated}.`}
          count={`${p.deputados.length + p.senadores.length} parlamentares`}
        />
        {p.deputados.length > 0 && (
          <section className="mt-10" aria-labelledby="deps">
            <h2 id="deps" className="mb-4 font-display text-xl font-bold">
              Deputados federais ({p.deputados.length})
            </h2>
            <Directory entries={p.deputados.map(toEntry)} basePath="/congresso/deputados" parties={[p.sigla]} ufs={ufsOf(p.deputados)} initialParty={p.sigla} gastoLabel="Cota usada no mandato" />
          </section>
        )}
        {p.senadores.length > 0 && (
          <section className="mt-12" aria-labelledby="sens">
            <h2 id="sens" className="mb-4 font-display text-xl font-bold">
              Senadores ({p.senadores.length})
            </h2>
            <Directory entries={p.senadores.map(toEntry)} basePath="/congresso/senadores" parties={[p.sigla]} ufs={ufsOf(p.senadores)} initialParty={p.sigla} gastoLabel="CEAPS no mandato" />
          </section>
        )}
        <p className="mt-10 text-sm text-muted">
          <Link href="/congresso" className="text-accent underline">
            Voltar à visão geral do Congresso
          </Link>
          . Os dados refletem o partido atual de cada parlamentar; mudanças de partido aparecem no perfil individual.
        </p>
      </Container>
    </>
  );
}
