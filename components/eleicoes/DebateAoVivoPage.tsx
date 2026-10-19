import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { getDebate } from "@/lib/debate-ao-vivo";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { DebateLive } from "./DebateLive";

const PATH = "/eleicoes/debate-ao-vivo";
const TITLE = "Debate do 2º turno na Band: cobertura e checagem";
const DESC =
  "Minuto a minuto do debate entre Flávio Bolsonaro e Lula na Band, com o que cada candidato disse, a fonte de cada trecho e a checagem das afirmações.";

export const debateMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

export function DebateAoVivoPage() {
  const data = getDebate();
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESC,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    dateModified: data.atualizadoEm,
    isPartOf: { "@type": "CollectionPage", name: "Eleições 2026", url: absoluteUrl("/eleicoes") },
  };
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Eleições 2026", path: "/eleicoes" }, { name: "Debate na Band", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Eleições 2026", href: "/eleicoes" }, { name: "Debate na Band" }]} className="mb-6" />
        <ListingHeader
          label="Eleições 2026"
          title="Debate do 2º turno na Band"
          description="Flávio Bolsonaro e Lula frente a frente em 18 de outubro. O que cada um disse, com fonte, e o que as checagens já confirmaram. Sem declarar vencedor."
          count="Domingo, 18/10/2026, a partir das 20h15"
        />
        <nav aria-label="Seções de Eleições 2026" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y-2 border-foreground/80 py-2">
          <Link href="/eleicoes" className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-muted hover:text-foreground">
            Painel e resultados
          </Link>
          <Link href="/eleicoes/pesquisas" className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-muted hover:text-foreground">
            Pesquisas e ranking de acerto
          </Link>
          <span aria-current="page" className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-accent underline decoration-2 underline-offset-8">
            Debate na Band
          </span>
        </nav>
        <DebateLive initial={data} />
      </Container>
    </>
  );
}
