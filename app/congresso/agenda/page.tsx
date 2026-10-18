import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { AgendaExplorer } from "@/components/congresso/AgendaExplorer";
import { LegislatureNotice } from "@/components/congresso/LegislatureNotice";
import { getAgendaEvents, getAgendaMeta, hasAgenda } from "@/lib/congress-agenda";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";

const PATH = "/congresso/agenda";
const TITLE = "Agenda do Congresso: sessões, comissões e audiências";
const DESC =
  "Agenda de todos os deputados e senadores: sessões do Plenário, reuniões de comissões e audiências dos próximos 14 dias e dos últimos 7, com local, situação e link oficial. Dados abertos da Câmara e do Senado.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESC, path: PATH });

const dateBR = (iso: string) => iso.split("-").reverse().join("/");

export default function Page() {
  if (!hasAgenda()) notFound();
  const meta = getAgendaMeta()!;
  const events = getAgendaEvents();
  const partidos = [...new Set(events.flatMap((e) => e.partidos))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const ufs = [...new Set(events.flatMap((e) => e.ufs))].sort();
  const orgaos = [...new Map(events.filter((e) => e.orgao).map((e) => [e.orgao!.sigla, { sigla: e.orgao!.sigla, nome: e.orgao!.nome }])).values()].sort((a, b) => a.sigla.localeCompare(b.sigla, "pt-BR"));
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESC,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    dateModified: meta.atualizadoEm,
  };
  const t = meta.totais;
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Congresso Nacional", path: "/congresso" },
          { name: "Agenda", path: PATH },
        ])}
      />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Congresso", href: "/congresso" }, { name: "Agenda" }]} className="mb-6" />
        <ListingHeader
          label="Congresso Nacional"
          title="Agenda do Congresso"
          description="O que está marcado e o que aconteceu nos últimos dias na Câmara, no Senado e nas sessões conjuntas. Filtre por casa, partido, estado, comissão e tipo; cada item traz o local, a situação e o link oficial."
          count={`${t.eventos} eventos · de ${dateBR(meta.janela.de)} a ${dateBR(meta.janela.ate)} · coletado em ${dateBR(meta.atualizadoEm)}`}
        />
        <p className="mt-4 max-w-3xl border-l-[3px] border-foreground pl-3 text-sm text-muted">
          Horários de Brasília (UTC-03:00). Convocação não é presença: a página mostra o que a fonte oficial publica e vincula cada parlamentar ao evento quando a própria fonte o registra
          ou quando ele integra o órgão (comissão ou Plenário). Em campanha eleitoral e recesso, as Casas marcam menos reuniões. Cada parlamentar também tem o bloco &quot;Agenda&quot; na sua
          página, em <Link className="text-accent underline" href="/congresso/deputados">deputados</Link> e <Link className="text-accent underline" href="/congresso/senadores">senadores</Link>.
        </p>
        <div className="mt-6">
          <noscript>
            <p className="mb-4 border border-border bg-surface p-4 text-sm">Sem JavaScript os filtros ficam desligados e todos os eventos da janela aparecem em ordem cronológica.</p>
          </noscript>
          <AgendaExplorer events={events} partidos={partidos} ufs={ufs} orgaos={orgaos} janela={meta.janela} />
        </div>

        <section aria-labelledby="fontes-agenda" className="mt-10 border-t-[3px] border-foreground pt-4 text-sm leading-relaxed text-muted">
          <h2 id="fontes-agenda" className="font-display text-xl font-bold text-foreground">
            Fontes e limites
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>
              Câmara:{" "}
              <a className="text-accent underline" href="https://dadosabertos.camara.leg.br/api/v2/eventos" target="_blank" rel="noopener noreferrer">
                API de eventos
              </a>{" "}
              e eventos de cada deputado. A API não traz o campo &quot;reunião reservada&quot;: nesses casos a página diz &quot;não informado pela fonte&quot;.
            </li>
            <li>
              Senado:{" "}
              <a className="text-accent underline" href={`https://legis.senado.leg.br/dadosabertos/comissao/agenda/${meta.janela.de.replaceAll("-", "")}/${meta.janela.ate.replaceAll("-", "")}`} target="_blank" rel="noopener noreferrer">
                agenda de comissões
              </a>{" "}
              (traz o campo &quot;secreta&quot;), sessões do Plenário e do Congresso Nacional.
            </li>
            <li>Comissões mistas e eventos sem composição publicada aparecem sem parlamentares vinculados.</li>
            <li>Última coleta: {dateBR(meta.atualizadoEm)}. Mudanças de pauta, cancelamentos e suspensões acontecem durante o dia: confira no link oficial.</li>
          </ul>
        </section>
        <LegislatureNotice className="mt-10" />
      </Container>
    </>
  );
}
