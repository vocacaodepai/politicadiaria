import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { UF_NAMES, formatBRLShort, getDeputiesIndex, getMeta, getSenatorsIndex, type IndexEntry } from "@/lib/congress";
import { Directory } from "./Directory";
import { Methodology } from "./ProfileSections";

type Casa = "camara" | "senado";

const CFG = {
  camara: {
    path: "/congresso/deputados",
    label: "Congresso Nacional",
    title: "Deputados federais em exercício",
    desc: "Lista dos deputados federais em exercício na 57ª legislatura, com partido, estado, votações, gastos da cota parlamentar e proposições. Dados oficiais da Câmara.",
    crumb: "Deputados",
    gasto: "Cota usada no mandato",
    noun: "deputados federais",
  },
  senado: {
    path: "/congresso/senadores",
    label: "Congresso Nacional",
    title: "Senadores em exercício",
    desc: "Lista dos 81 senadores em exercício, com partido, estado, votações, despesas da CEAPS e proposições. Dados oficiais do Senado Federal.",
    crumb: "Senadores",
    gasto: "CEAPS no mandato",
    noun: "senadores",
  },
} as const;

export function directoryMetadata(casa: Casa): Metadata {
  const c = CFG[casa];
  return listingMetadata({ title: c.title, description: c.desc, path: c.path });
}

export function DirectoryPage({ casa }: { casa: Casa }) {
  const c = CFG[casa];
  const entries: IndexEntry[] = casa === "camara" ? getDeputiesIndex() : getSenatorsIndex();
  const parties = [...new Set(entries.map((e) => e.partido))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const ufs = Object.keys(UF_NAMES).filter((u) => entries.some((e) => e.uf === u));
  const meta = getMeta();
  const updated = new Date(`${meta.atualizadoEm}T12:00:00-03:00`).toLocaleDateString("pt-BR");
  const total = entries.reduce((a, e) => a + e.gasto, 0);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.title,
    description: c.desc,
    url: absoluteUrl(c.path),
    inLanguage: "pt-BR",
    dateModified: meta.atualizadoEm,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entries.length,
      itemListElement: entries.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.nome, url: absoluteUrl(`${c.path}/${e.slug}`) })),
    },
  };

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Congresso Nacional", path: "/congresso" },
          { name: c.crumb, path: c.path },
        ])}
      />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Congresso", href: "/congresso" }, { name: c.crumb }]} className="mb-6" />
        <ListingHeader
          label={c.label}
          title={c.title}
          description={c.desc}
          intro={`Somados, os ${entries.length} ${c.noun} usaram ${formatBRLShort(total)} em ${casa === "camara" ? "cota parlamentar" : "CEAPS"} neste mandato. Dados atualizados em ${updated}.`}
          count={`${entries.length} ${c.noun}`}
        />
        <div className="mt-8">
          <Directory
            entries={entries.map((e) => ({
              id: e.id,
              slug: e.slug,
              nome: e.nome,
              partido: e.partido,
              uf: e.uf,
              condicao: e.condicao,
              foto: e.foto,
              gasto: e.gasto,
              presenca: e.presenca,
              ausencias: e.ausencias,
              proposicoes: e.proposicoes,
            }))}
            basePath={c.path}
            parties={parties}
            ufs={ufs}
            gastoLabel={c.gasto}
          />
        </div>
        <div className="mt-12">
          <Methodology casa={casa} updated={updated} />
        </div>
      </Container>
    </>
  );
}
