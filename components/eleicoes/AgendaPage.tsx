import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";
import { fmtDate, fmtDateTime } from "@/lib/eleicoes";
import { agoraMs, getAgenda, type EventoAgenda } from "@/lib/eleicoes-extra";
import { Badge, ExternalLink, Panel, Section, SubNav } from "./Shared";

const PATH = "/eleicoes/agenda";
const TITLE = "Agenda dos candidatos no 2º turno de 2026";
const DESC = "Compromissos de Lula e Flávio Bolsonaro e dos candidatos a governador em segundo turno, só com fonte aberta e data de verificação.";

export const agendaMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

function dia(iso: string) {
  return iso.slice(0, 10);
}

function Evento({ e, agora }: { e: EventoAgenda; agora: number }) {
  const futuro = Date.parse(e.dataHora) > agora;
  return (
    <li className="border border-border bg-surface p-4">
      <p className="font-mono text-xs text-muted">
        {fmtDateTime(e.dataHora)} {futuro ? <Badge tone="soft">Previsto</Badge> : <Badge>Horário já passou</Badge>}
      </p>
      <h4 className="mt-1 font-display text-lg font-bold leading-tight">
        {e.candidato}: {e.tipo}
      </h4>
      <p className="mt-1 text-sm leading-relaxed">{e.descricao}</p>
      <p className="mt-1 text-xs text-muted">
        {e.cidade}/{e.uf}. {futuro ? "Previsto, segundo " : "Registrado, segundo "}
        <ExternalLink href={e.fonte.url}>{e.fonte.rotulo}</ExternalLink>. Verificado em {fmtDate(e.verificadoEm)}.
      </p>
    </li>
  );
}

export function AgendaPage() {
  const ag = getAgenda();
  const agora = agoraMs();
  const eventos = [...ag.eventos].sort((a, b) => a.dataHora.localeCompare(b.dataHora));
  const pres = eventos.filter((e) => e.cargo === "Presidente");
  const gov = eventos.filter((e) => e.cargo === "Governador");
  const dias = [...new Set(pres.map((e) => dia(e.dataHora)))];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Eleições 2026", path: "/eleicoes" }, { name: "Agenda", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Eleições 2026", href: "/eleicoes" }, { name: "Agenda" }]} className="mb-6" />
        <ListingHeader label="Agenda" title="Agenda dos candidatos no segundo turno" description={DESC} count={`Atualizado em ${fmtDateTime(ag.atualizadoEm)} · fontes abertas`} />
        <SubNav active="agenda" />
        <p className="mt-6 max-w-3xl border-l-4 border-accent-2 bg-surface-2 p-3 text-sm leading-relaxed">{ag.observacao}</p>

        <Section id="presidente" kicker="Presidência" title="Lula e Flávio Bolsonaro" lead="Eventos em ordem de data, com a mesma régua para os dois candidatos. Eventos futuros são previsões da fonte citada e podem mudar.">
          {pres.length === 0 ? (
            <Panel><p className="text-sm">Nenhum evento verificado até agora.</p></Panel>
          ) : (
            dias.map((d) => (
              <div key={d} className="mb-6">
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-muted">{fmtDate(d)}</h3>
                <ul className="mt-2 grid gap-3 md:grid-cols-2">
                  {pres.filter((e) => dia(e.dataHora) === d).map((e) => (
                    <Evento key={e.id} e={e} agora={agora} />
                  ))}
                </ul>
              </div>
            ))
          )}
        </Section>

        <Section id="governadores" kicker="Governadores" title="Candidatos em segundo turno (AC, AM, DF, ES, RN, TO)">
          {gov.length === 0 ? (
            <Panel><p className="text-sm">Ainda não há evento verificado com fonte aberta para os candidatos a governador em segundo turno. A lista entra aqui assim que houver.</p></Panel>
          ) : (
            <ul className="grid gap-3 md:grid-cols-2">
              {gov.map((e) => (
                <Evento key={e.id} e={e} agora={agora} />
              ))}
            </ul>
          )}
        </Section>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted">
          Critério: só entram eventos publicados por imprensa identificada ou pelo perfil oficial da campanha, com link aberto e conferido. Agenda privada ou não divulgada não aparece. Veja também o <Link href="/eleicoes/debate-band" className="text-accent underline underline-offset-2">debate da Band</Link> e a <Link href="/eleicoes/apuracao" className="text-accent underline underline-offset-2">apuração ao vivo</Link>.
        </p>
      </Container>
    </>
  );
}
