import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { JulgamentosExplorer } from "@/components/stf/JulgamentosExplorer";
import { CoverageBox } from "@/components/stf/SourceBox";
import { SigiloNote } from "@/components/stf/Sigilo";
import { StfNav } from "@/components/stf/StfNav";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { fmtDateBR, getJudgmentsFile, getMinisters, hasStfData } from "@/lib/stf";

const PATH = "/stf/julgamentos";
const TITLE = "Julgamentos do STF: pesquise por processo, ministro e resultado";
const DESC =
  "Lista pesquisável dos julgamentos noticiados pelo Supremo, com classe e número do processo, relator, resultado, voto dos ministros quando a fonte descreve e marca de sigilo. Cobertura declarada.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESC, path: PATH });

export default function Page() {
  if (!hasStfData()) return null;
  const j = getJudgmentsFile();
  const ministers = getMinisters().map((m) => ({ slug: m.slug, nome: m.nome }));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: TITLE, description: DESC, url: absoluteUrl(PATH), inLanguage: "pt-BR", dateModified: j.atualizadoEm }} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Supremo", path: "/stf" }, { name: "Julgamentos", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Supremo", href: "/stf" }, { name: "Julgamentos" }]} className="mb-6" />
        <ListingHeader
          label="Supremo Tribunal Federal"
          title="Julgamentos do Supremo"
          description="Cada linha traz o processo, o relator, o resultado e, quando a notícia oficial descreve, o voto de cada ministro, com o trecho que sustenta a informação e o link para a fonte."
          count={`${j.itens.length} julgamentos · coleta de ${fmtDateBR(j.atualizadoEm)}`}
        />
        <div className="mt-6">
          <StfNav current="julgamentos" />
        </div>
        <CoverageBox c={j.cobertura} className="mt-6" />
        <div className="mt-8">
          <JulgamentosExplorer items={j.itens} ministers={ministers} />
        </div>
        <SigiloNote className="mt-10" />
        <p className="mt-6 text-xs text-muted">
          Dados abertos: <a className="text-accent underline" href="/data/stf/julgamentos.json">julgamentos.json</a>.
        </p>
      </Container>
    </>
  );
}
