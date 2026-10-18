import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { fmtDate, fmtDateTime, getMeta } from "@/lib/eleicoes";
import { apuracaoSnapshot } from "@/lib/eleicoes-extra";
import { ApuracaoLive } from "./ApuracaoLive";
import { ExternalLink, Panel, SubNav } from "./Shared";

const PATH = "/eleicoes/apuracao";
const TITLE = "Apuração ao vivo do 2º turno de 2026: presidente e governadores";
const DESC = "Apuração do segundo turno de 25 de outubro com dados do TSE: presidente e governadores, seções totalizadas, hora da coleta e comparação com a última rodada de pesquisas.";

export const apuracaoMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

export function ApuracaoPage() {
  const snap = apuracaoSnapshot();
  const meta = getMeta();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Eleições 2026", path: "/eleicoes" }, { name: "Apuração ao vivo", path: PATH }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: TITLE, description: DESC, url: absoluteUrl(PATH), inLanguage: "pt-BR", dateModified: meta.atualizadoEm }} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Eleições 2026", href: "/eleicoes" }, { name: "Apuração ao vivo" }]} className="mb-6" />
        <ListingHeader
          label="Apuração ao vivo"
          title="Apuração do segundo turno: presidente e governadores"
          description={`Votação em ${fmtDate(meta.eleicao.turno2)}. Os números vêm do portal de resultados do TSE e entram aqui com a hora do arquivo. Antes de o TSE publicar votos, o painel mostra “aguardando apuração”.`}
          count={`Atualizado em ${fmtDateTime(snap.atualizadoEm)} · fonte: TSE`}
        />
        <SubNav active="apuracao" />
        <div className="mt-6">
          <ApuracaoLive initial={snap} />
        </div>
        <div className="mt-10">
          <Panel title="Como ler esta página">
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
              <li>Vence quem tiver mais da metade dos votos válidos, sem contar brancos e nulos. A linha vertical marca 50%.</li>
              <li>Percentuais de apuração parcial mudam enquanto as seções são totalizadas. Só o TSE marca o candidato como eleito.</li>
              <li>A atualização automática lê um arquivo público com os dados já coletados. Se a checagem falhar, a página continua mostrando o último dado carregado, com a hora dele.</li>
              <li>
                Fonte dos votos: <ExternalLink href={snap.fonte.url}>{snap.fonte.rotulo}</ExternalLink>. O 1º turno e os demais cargos estão no <Link href="/eleicoes" className="text-accent underline underline-offset-2">painel das eleições</Link>.
              </li>
            </ul>
          </Panel>
        </div>
      </Container>
    </>
  );
}
