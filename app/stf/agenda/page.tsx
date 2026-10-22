import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { SessionsView } from "@/components/stf/SessionsView";
import { SigiloBadge, SigiloNote } from "@/components/stf/Sigilo";
import { StfNav } from "@/components/stf/StfNav";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { fmtDateBR, getAgenda, hasStfData, type AgendaItem, type Pauta } from "@/lib/stf";

const PATH = "/stf/agenda";
const TITLE = "Agenda do STF: sessões, pauta da semana e Plenário Virtual";
const DESC = "Sessões do Plenário e das Turmas, pautas publicadas pelo Supremo com processo, relator e link oficial, Plenário Virtual e itens ligados às eleições quando constam da pauta oficial.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESC, path: PATH });

const ELEITORAL = /(eleit|elei[çc][õo]es|candidat|partid[oa]s? pol|TSE|propaganda|voto)/i;

function Item({ it }: { it: AgendaItem }) {
  return (
    <li className="py-3">
      <p className="font-display text-base font-bold">
        {it.url ? (
          <a href={it.url} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-accent">
            {it.rotulo}
          </a>
        ) : (
          it.rotulo
        )}
        {it.tema ? <span className="font-normal text-muted"> ({it.tema})</span> : null} <SigiloBadge value={it.sigilo} />
      </p>
      <p className="mt-1 text-sm">
        Relator:{" "}
        {it.relator ? it.relatorSlug ? <Link href={`/stf/ministros/${it.relatorSlug}`} className="text-accent underline">{it.relator}</Link> : it.relator : "não informado pela fonte"}
        {it.etapa ? ` · Etapa: ${it.etapa}` : ""}
      </p>
      {it.partes && <p className="mt-0.5 text-xs text-muted">{it.partes}</p>}
      {it.resumo && <p className="mt-1 text-sm text-muted">{it.resumo}</p>}
    </li>
  );
}

function PautaBlock({ p }: { p: Pauta }) {
  return (
    <article className="border border-border bg-surface p-4">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
        {p.orgao} · {fmtDateBR(p.data)}
        {p.horario ? ` · ${p.horario}` : ""}
        {p.periodoVirtual ? ` · sessão virtual de ${p.periodoVirtual}` : ""}
      </p>
      <h3 className="mt-1 font-display text-lg font-bold">{p.titulo}</h3>
      <ul className="mt-2 divide-y divide-border">
        {p.itens.map((it) => (
          <Item key={`${it.classe}${it.numero}`} it={it} />
        ))}
      </ul>
      <p className="mt-2 text-xs">
        <a href={p.fonteUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
          Pauta oficial no Portal de Notícias do STF
        </a>
      </p>
    </article>
  );
}

export default function Page() {
  if (!hasStfData()) return null;
  const ag = getAgenda();
  const plenarias = ag.pautas.filter((p) => p.orgao !== "Plenário Virtual").slice(0, 8);
  const virtuais = ag.pautas.filter((p) => p.orgao === "Plenário Virtual").slice(0, 6);
  const eleitorais = ag.pautas.flatMap((p) => p.itens.filter((i) => ELEITORAL.test(`${i.resumo ?? ""} ${i.partes ?? ""} ${i.tema ?? ""}`)).map((i) => ({ i, p }))).slice(0, 10);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: TITLE, description: DESC, url: absoluteUrl(PATH), inLanguage: "pt-BR", dateModified: ag.atualizadoEm }} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Supremo", path: "/stf" }, { name: "Agenda", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Supremo", href: "/stf" }, { name: "Agenda" }]} className="mb-6" />
        <ListingHeader
          label="Supremo Tribunal Federal"
          title="Agenda do Supremo"
          description="Sessões do Plenário e das Turmas no calendário do tribunal e as pautas que o STF divulgou, com processo, relator e link oficial para cada item."
          count={`${ag.sessoes.length} sessões no calendário · ${ag.pautas.length} pautas publicadas · coleta de ${fmtDateBR(ag.atualizadoEm)}`}
        />
        <div className="mt-6">
          <StfNav current="agenda" />
        </div>

        <section aria-labelledby="sessoes" className="mt-10">
          <h2 id="sessoes" className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold">
            Sessões
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted">Sessões ordinárias e extraordinárias registradas no calendário do STF. O período usa a data de hoje em Brasília.</p>
          <div className="mt-4">
            <SessionsView sessions={ag.sessoes} />
          </div>
        </section>

        <section aria-labelledby="pautas" className="mt-10">
          <h2 id="pautas" className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold">
            Pautas publicadas
          </h2>
          {plenarias.length ? (
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {plenarias.map((p) => (
                <PautaBlock key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <p className="mt-4 border border-border bg-surface p-4 text-sm text-muted">Nenhuma pauta coletada na janela desta rodada.</p>
          )}
        </section>

        <section aria-labelledby="virtual" className="mt-10">
          <h2 id="virtual" className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold">
            Plenário Virtual
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            No Plenário Virtual os ministros depositam os votos no sistema eletrônico durante um período de dias, sem reunião presencial. O início e o fim de cada sessão aparecem quando o texto do STF os informa; o calendário completo fica no portal do tribunal.
          </p>
          {virtuais.length ? (
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {virtuais.map((p) => (
                <PautaBlock key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <p className="mt-4 border border-border bg-surface p-4 text-sm text-muted">Nenhum destaque do Plenário Virtual coletado nesta rodada. Início e fim das sessões: não coletado.</p>
          )}
        </section>

        <section aria-labelledby="eleitoral" className="mt-10">
          <h2 id="eleitoral" className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold">
            Na pauta e ligados às eleições
          </h2>
          {eleitorais.length ? (
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {eleitorais.map(({ i, p }) => (
                <div key={`${p.id}${i.classe}${i.numero}`}>
                  <Item it={i} />
                  <p className="pb-3 text-xs text-muted">Pauta de {fmtDateBR(p.data)} ({p.orgao})</p>
                </div>
              ))}
            </ul>
          ) : (
            <p className="mt-4 border border-border bg-surface p-4 text-sm text-muted">Nenhum item da pauta oficial coletada trata de eleições. Só entram aqui itens que constam da pauta divulgada pelo STF.</p>
          )}
          <p className="mt-3 text-sm">
            Resultados e calendário da votação estão no <Link href="/eleicoes" className="text-accent underline">painel das eleições</Link>.
          </p>
        </section>

        <section aria-labelledby="recesso" className="mt-10">
          <h2 id="recesso" className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold">
            Recesso e feriados forenses
          </h2>
          <p className="mt-3 border border-border bg-surface p-4 text-sm text-muted">
            {ag.recesso ? (
              <a href={ag.recesso.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                {ag.recesso.rotulo}
              </a>
            ) : (
              <>
                O calendário de recesso e feriados forenses não foi coletado de fonte oficial nesta rodada. Consulte o{" "}
                <a href="https://portal.stf.jus.br/" target="_blank" rel="noopener noreferrer" className="text-accent underline">
                  portal do STF
                </a>
                . Dias sem sessão aparecem aqui apenas quando o calendário do tribunal os registra.
              </>
            )}
          </p>
        </section>

        <SigiloNote className="mt-10" />

        <section aria-labelledby="fontes-agenda" className="mt-10 border-t-[3px] border-foreground pt-4 text-sm text-muted">
          <h2 id="fontes-agenda" className="font-display text-xl font-bold text-foreground">
            Fontes
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            {ag.fontes.map((f) => (
              <li key={f.url + f.rotulo}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                  {f.rotulo}
                </a>
                {f.obs ? ` (${f.obs})` : ""}
              </li>
            ))}
          </ul>
          {ag.avisos.map((a) => (
            <p key={a} className="mt-2">
              Aviso da coleta: {a}
            </p>
          ))}
        </section>
      </Container>
    </>
  );
}
