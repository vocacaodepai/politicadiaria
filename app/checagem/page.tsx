import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/article/JsonLd";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { FactCheckBrowser } from "@/components/checagem/FactCheckBrowser";
import { FactCheckCard, toCardData } from "@/components/checagem/FactCheckCard";
import { VerdictSeal } from "@/components/checagem/VerdictSeal";
import { listingMetadata } from "@/components/listing/metadata";
import { site } from "@/lib/articles";
import { CHECAGEM_PATH, checagemPath, sortedChecagens, verdictCounts, verdictMeta } from "@/lib/checagens";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { factCheckVerdicts } from "@/lib/types";

const TITLE = "Checagem de boatos e notícias falsas";
const DESCRIPTION =
  "Verificamos boatos políticos, principalmente em época de eleição, com a mesma régua para qualquer campo. Cada checagem lista as fontes, o veredito e a data.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESCRIPTION, path: CHECAGEM_PATH });

export default function ChecagemPage() {
  const all = sortedChecagens();
  const [latest] = all;
  const cards = all.map(toCardData);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(CHECAGEM_PATH),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: all.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.title,
        url: absoluteUrl(checagemPath(c.slug)),
      })),
    },
  };

  return (
    <>
      <JsonLd data={collection} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Checagem", path: CHECAGEM_PATH },
        ])}
      />

      <Container className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Checagem" }]} />
        <header className="mt-6 border-t-[3px] border-foreground pt-3">
          <p className="label-mono text-accent">Seção</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Checagem
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
            Boatos e notícias falsas verificados com fonte primária, principalmente em época de eleição. Boato contra ou
            a favor de qualquer candidato, partido ou governo recebe a mesma investigação. Sem fonte primária ou ao
            menos duas fontes independentes abertas e conferidas, não há veredito.
          </p>
        </header>

        {latest && (
          <section aria-labelledby="mais-recente" className="mt-10">
            <h2 id="mais-recente" className="label-mono mb-3 text-muted">
              Checagem mais recente
            </h2>
            <FactCheckCard item={toCardData(latest)} featured />
          </section>
        )}

        <section aria-labelledby="todas" className="mt-12">
          <div className="mb-5 border-t-[3px] border-foreground pt-2">
            <h2 id="todas" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Todas as checagens
            </h2>
          </div>
          {all.length > 0 ? (
            <FactCheckBrowser items={cards} counts={verdictCounts()} hideSlug={latest?.slug} />
          ) : (
            <p className="border border-dashed border-border p-6 text-center text-sm text-muted">
              Ainda não há checagens publicadas.
            </p>
          )}
        </section>

        <section aria-labelledby="como-checamos" className="mt-14 pb-20">
          <div className="mb-5 border-t-[3px] border-foreground pt-2">
            <h2 id="como-checamos" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Como checamos e o que significa cada selo
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <ol className="list-decimal space-y-2.5 pl-5 text-[0.97rem] leading-relaxed marker:font-bold">
              <li>Registramos a alegação como circulou, sem linkar o boato, e quando e onde apareceu.</li>
              <li>
                Buscamos a fonte primária: Diário Oficial, TSE, Câmara, Senado, STF, Planalto, o órgão ou a pessoa
                citados.
              </li>
              <li>Cruzamos com agências de checagem e imprensa identificada. Todo link é aberto e conferido antes de entrar.</li>
              <li>Separamos o que é verdade, o que não é e o que não conseguimos confirmar.</li>
              <li>
                Aplicamos a mesma régua a qualquer campo político. Correções entram com nota de atualização, e a checagem
                original continua no ar. Veja a <Link href="/politica-editorial" className="text-accent underline underline-offset-2">política editorial</Link>.
              </li>
            </ol>
            <dl className="space-y-3">
              {factCheckVerdicts.map((v) => (
                <div key={v.slug} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-4">
                  <dt className="sm:w-44 sm:shrink-0">
                    <VerdictSeal verdict={v.slug} />
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted">{verdictMeta[v.slug].meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </Container>
    </>
  );
}
