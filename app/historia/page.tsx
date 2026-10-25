import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/article/JsonLd";
import { HistoriaCard } from "@/components/historia/HistoriaCard";
import { PeriodChips } from "@/components/historia/PeriodChips";
import { Timeline } from "@/components/historia/Timeline";
import { listingMetadata } from "@/components/listing/metadata";
import { site } from "@/lib/articles";
import { HISTORIA_PATH, historiaPath, periodCounts, sortedHistoria, timelineEntries } from "@/lib/historia";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "História das eleições no Brasil, da mais recente à mais antiga";
const DESCRIPTION =
  "A história política e eleitoral do Brasil contada de trás para frente: candidatos, propostas, resultado oficial e o que veio depois, com fonte e data.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESCRIPTION, path: HISTORIA_PATH });

export default function HistoriaIndexPage() {
  const all = sortedHistoria();
  const [latest, ...rest] = all;

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(HISTORIA_PATH),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: all.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.title,
        url: absoluteUrl(historiaPath(a.slug)),
      })),
    },
  };

  return (
    <>
      <JsonLd data={collection} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "História", path: HISTORIA_PATH },
        ])}
      />

      <Container className="pb-20 pt-8 sm:pt-10">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "História" }]} />
        <header className="mt-6 border-t-[3px] border-foreground pt-3">
          <p className="label-mono text-accent">Seção</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            História
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
            A política e as eleições do Brasil contadas de trás para frente, da eleição mais recente para a mais antiga.
            Cada artigo traz o contexto, os candidatos, as propostas registradas, o resultado oficial e o que veio
            depois, com data e fonte. Onde historiadores e campos políticos divergem, mostramos primeiro os fatos
            verificáveis e atribuímos cada termo a quem o usa. A mesma régua vale para todos os lados.
          </p>
        </header>

        <div className="mt-8">
          <PeriodChips counts={periodCounts()} />
        </div>

        {latest && (
          <section aria-labelledby="mais-recente" className="mt-10">
            <h2 id="mais-recente" className="label-mono mb-3 text-muted">
              Mais recente na linha do tempo
            </h2>
            <HistoriaCard item={latest} featured />
          </section>
        )}

        {rest.length > 0 && (
          <section aria-labelledby="artigos" className="mt-12">
            <div className="mb-5 border-t-[3px] border-foreground pt-2">
              <h2 id="artigos" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                Artigos publicados
              </h2>
            </div>
            <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
              {rest.map((a) => (
                <HistoriaCard key={a.slug} item={a} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="linha-do-tempo" className="mt-14">
          <div className="mb-6 border-t-[3px] border-foreground pt-2">
            <h2 id="linha-do-tempo" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Linha do tempo das eleições presidenciais
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-muted">
              Da mais recente para a mais antiga. Os marcos com ponto cheio já têm artigo; os demais entram aos poucos,
              uma eleição ou um período por vez. Antes de 1930 só o ano é afirmado até o artigo conferir as datas.
            </p>
          </div>
          <Timeline items={timelineEntries()} showOngoing />
          <p className="mt-6 max-w-3xl text-sm text-muted">
            Para o período anterior a 1889 e a história do voto no Império, veja{" "}
            <Link href="/historia/periodo/imperio" className="text-accent underline underline-offset-2">
              Império
            </Link>
            .
          </p>
        </section>
      </Container>
    </>
  );
}
