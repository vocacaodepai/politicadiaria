import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { LegislatureNotice } from "@/components/congresso/LegislatureNotice";
import { PlenaryExplorer } from "@/components/congresso/PlenaryExplorer";
import { ViewSwitch } from "@/components/congresso/ViewSwitch";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { getMeta } from "@/lib/congress";

const PATH = "/congresso/plenario";
const TITLE = "Plenário do Congresso: os 513 deputados e 81 senadores em um mapa";
const DESC =
  "Hemiciclo interativo com um ponto por parlamentar, agrupado por partido. Passe o mouse ou toque para ver foto, nome, partido e estado, filtre por partido, UF e bloco e abra a ficha. Dados oficiais.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESC, path: PATH });

export default function Page() {
  const meta = getMeta();
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESC,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    dateModified: meta.atualizadoEm,
  };
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Congresso Nacional", path: "/congresso" },
          { name: "Plenário", path: PATH },
        ])}
      />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Congresso", href: "/congresso" }, { name: "Plenário" }]} className="mb-6" />
        <ListingHeader
          label="Congresso Nacional"
          title="O plenário em um mapa"
          description="Um ponto por parlamentar em exercício, agrupado por partido. Aproxime o mouse ou toque para ver quem é, filtre por partido, estado e bloco e clique para abrir a ficha com votos, gastos e proposições."
          count={`${meta.legislatura}ª legislatura · dados coletados em ${new Date(`${meta.atualizadoEm}T12:00:00-03:00`).toLocaleDateString("pt-BR")}`}
        />
        <div className="mt-6">
          <ViewSwitch current="plenario" />
        </div>
        <p className="mt-4 max-w-3xl border-l-[3px] border-foreground pl-3 text-sm text-muted">
          Mostra quem está em exercício hoje na {meta.legislatura}ª legislatura. Os eleitos em outubro de 2026 só tomam posse em 1º de fevereiro de 2027.{" "}
          <a href="#aviso-legislatura" className="text-accent underline">
            Detalhes e fonte
          </a>
        </p>
        <div className="mt-6">
          <noscript>
            <p className="border border-border bg-surface p-4 text-sm">
              O mapa precisa de JavaScript. Use as listas: <Link className="text-accent underline" href="/congresso/deputados">deputados</Link> e <Link className="text-accent underline" href="/congresso/senadores">senadores</Link>.
            </p>
          </noscript>
          <PlenaryExplorer />
        </div>
        <LegislatureNotice className="mt-10" />
        <section aria-labelledby="como-ler" className="mt-10 border-t-[3px] border-foreground pt-4 text-sm leading-relaxed text-muted">
          <h2 id="como-ler" className="font-display text-xl font-bold text-foreground">
            Como ler o mapa
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-foreground">Um ponto, um parlamentar em exercício.</strong> Suplentes que já assumiram aparecem no lugar de quem se licenciou; quem saiu do cargo não entra.
            </li>
            <li>
              <strong className="text-foreground">Ordem e cores sem sentido político.</strong> Os partidos aparecem do maior para o menor, e as cores são apenas para distinguir as fatias. A posição no desenho não é a das cadeiras reais do plenário e não indica posição ideológica.
            </li>
            <li>
              <strong className="text-foreground">Partido atual.</strong> É a sigla registrada pela Casa na data da coleta. Trocas de partido, fusões e federações mudam a conta ao longo do tempo; veja a <Link className="text-accent underline" href="/congresso/evolucao">evolução das bancadas</Link>.
            </li>
            <li>
              <strong className="text-foreground">Blocos e federações.</strong> No Senado, o filtro usa o bloco parlamentar informado pela Casa. Na Câmara, usa as federações partidárias registradas.
            </li>
            <li>
              <strong className="text-foreground">Teclado e leitores de tela.</strong> Foque o gráfico e use as setas e Enter, ou escolha &quot;Lista acessível&quot; para ver todos os nomes agrupados por partido, com link para a ficha.
            </li>
          </ul>
          <p className="mt-3">
            Fontes: <a className="text-accent underline" href="https://dadosabertos.camara.leg.br" target="_blank" rel="noopener noreferrer">dados abertos da Câmara</a> e <a className="text-accent underline" href="https://www12.senado.leg.br/dados-abertos" target="_blank" rel="noopener noreferrer">dados abertos do Senado</a>. Fotos oficiais de cada Casa.
          </p>
        </section>
      </Container>
    </>
  );
}
