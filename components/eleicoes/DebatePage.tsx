import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";
import { fmtDate, fmtDateTime } from "@/lib/eleicoes";
import { getDebates } from "@/lib/eleicoes-extra";
import { Badge, ExternalLink, Panel, Section, SubNav } from "./Shared";

const PATH = "/eleicoes/debate-band";
const TITLE = "Debate da Band: o que foi dito por Lula e Flávio Bolsonaro";
const DESC = "Regras, horário, mediadores, falas verificadas por tema e checagens do debate da Band entre Lula e Flávio Bolsonaro no segundo turno de 2026.";

export const debateMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

const STATUS = { agendado: "Agendado", realizado: "Realizado", cancelado: "Cancelado" } as const;

function Vazio({ children }: { children: React.ReactNode }) {
  return <p className="border border-dashed border-border bg-surface-2 p-4 text-sm leading-relaxed text-muted">{children}</p>;
}

export function DebatePage() {
  const arq = getDebates();
  const d = arq.debates[0];
  const realizado = d.status === "realizado";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Eleições 2026", path: "/eleicoes" }, { name: "Debate da Band", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Eleições 2026", href: "/eleicoes" }, { name: "Debate da Band" }]} className="mb-6" />
        <ListingHeader
          label="Debate"
          title="Debate da Band: o que foi dito"
          description={`${d.titulo}, em ${fmtDate(d.data)}, às ${d.horaInicio.replace(":", "h")} (horário de Brasília). Esta página reúne regras, falas verificadas por tema e checagens. Cada fala só entra com fonte e hora de verificação.`}
          count={`Atualizado em ${fmtDateTime(arq.atualizadoEm)}`}
        />
        <SubNav active="debate" />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge tone={realizado ? "strong" : "soft"}>{STATUS[d.status]}</Badge>
          <span className="text-sm text-muted">
            {realizado ? "O debate já ocorreu: as falas abaixo foram conferidas contra a transmissão ou a transcrição." : "O debate ainda não terminou ou as falas ainda não foram conferidas. Nenhuma fala é publicada antes de verificada."}
          </span>
        </div>

        <Section id="regras" kicker="Antes do debate" title="Regras, horário e mediadores">
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Ficha do debate">
              <dl className="grid grid-cols-[8rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm">
                <dt className="text-muted">Data e hora</dt>
                <dd>{fmtDate(d.data)}, {d.horaInicio.replace(":", "h")}{d.horaFimPrevista ? ` (fim previsto: ${d.horaFimPrevista.replace(":", "h")})` : ""}</dd>
                <dt className="text-muted">Emissora</dt>
                <dd>{d.emissora}, em pool com {d.pool.filter((p) => p !== "Band TV").join(", ")}</dd>
                <dt className="text-muted">Local</dt>
                <dd>{d.local}</dd>
                <dt className="text-muted">Candidatos</dt>
                <dd>{d.participantes.join(" e ")}</dd>
                <dt className="text-muted">Mediadores</dt>
                <dd>{d.mediadores.join(" e ")}</dd>
              </dl>
              {d.noticiaRegras && (
                <p className="mt-3 text-sm">
                  Detalhes na notícia: <Link href={`/noticias/${d.noticiaRegras}`} className="text-accent underline underline-offset-2">regras do debate da Band</Link>.
                </p>
              )}
            </Panel>
            <Panel title="Formato" note="Regras descritas pela imprensa na véspera. A emissora é a fonte primária para qualquer ajuste de última hora.">
              <ol className="space-y-2 text-sm leading-relaxed">
                {d.formato.map((f) => (
                  <li key={f.bloco}>
                    <strong>{f.bloco}.</strong> {f.descricao}
                  </li>
                ))}
              </ol>
              {d.regras.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                  {d.regras.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
          <p className="mt-3 text-xs text-muted">
            Fontes:{" "}
            {d.fontes.map((f, i) => (
              <span key={f.url}>
                {i > 0 && "; "}
                <ExternalLink href={f.url}>{f.rotulo}</ExternalLink>
                {f.verificadoEm ? ` (verificado em ${fmtDate(f.verificadoEm)})` : ""}
              </span>
            ))}
            .
          </p>
        </Section>

        <Section id="falas" kicker="Falas verificadas" title="O que foi dito, por tema" lead="Cada fala entra com o candidato, o trecho conferido, o minuto da transmissão quando houver e o link da fonte. Sem fonte e hora de verificação, não entra.">
          {d.temas.length === 0 ? (
            <Vazio>Nenhuma fala verificada ainda. Os blocos por tema são abertos depois do debate, a partir da transmissão ou de transcrição da emissora ou de veículo identificado.</Vazio>
          ) : (
            <div className="space-y-6">
              {d.temas.map((t) => (
                <Panel key={t.id} title={t.titulo}>
                  {t.falas.length === 0 ? (
                    <Vazio>Sem falas verificadas neste tema.</Vazio>
                  ) : (
                    <ul className="space-y-4">
                      {t.falas.map((f, i) => (
                        <li key={i} className="border-l-4 border-border pl-3 text-sm leading-relaxed">
                          <p className="font-sans text-xs font-bold uppercase tracking-[0.08em] text-muted">{f.candidato}{f.minuto ? ` · ${f.minuto}` : ""}</p>
                          <p className="mt-1">{f.texto}</p>
                          <p className="mt-1 text-xs text-muted">
                            Fonte: <ExternalLink href={f.fonte.url}>{f.fonte.rotulo}</ExternalLink>
                            {f.fonte.verificadoEm ? `, verificado em ${fmtDate(f.fonte.verificadoEm)}` : ""}.{" "}
                            {f.checagem && <Link href={`/checagem/${f.checagem}`} className="text-accent underline underline-offset-2">Ver checagem</Link>}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </Panel>
              ))}
            </div>
          )}
        </Section>

        <Section id="checagens" kicker="Checagem" title="Afirmações em checagem" lead="Afirmações de fato feitas no debate, com a mesma régua para os dois candidatos. O veredito e as fontes numeradas ficam na página de cada checagem.">
          {d.checagens.length === 0 ? (
            <Vazio>
              Nenhuma afirmação checada ainda. Quando houver, cada item liga para a página em <Link href="/checagem" className="text-accent underline underline-offset-2">Checagem</Link>.
            </Vazio>
          ) : (
            <ul className="space-y-3">
              {d.checagens.map((c, i) => (
                <li key={i} className="border border-border bg-surface p-3 text-sm leading-relaxed">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">{c.candidato} · {c.situacao === "checada" ? "Checada" : "Em checagem"}</p>
                  <p className="mt-1">{c.afirmacao}</p>
                  <p className="mt-1 text-xs">
                    {c.checagem ? <Link href={`/checagem/${c.checagem}`} className="text-accent underline underline-offset-2">Ler a checagem</Link> : "Checagem em andamento."}{" "}
                    <span className="text-muted">Origem: <ExternalLink href={c.fonte.url}>{c.fonte.rotulo}</ExternalLink></span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section id="tempo" kicker="Tempo" title="Tempo de fala" lead="Somatório divulgado pela emissora ou medido na transmissão, com fonte.">
          {d.tempoDeFala.length === 0 ? (
            <Vazio>O tempo de cada candidato entra depois do debate, quando houver contagem oficial ou medição com fonte.</Vazio>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {d.tempoDeFala.map((t) => (
                <li key={t.candidato} className="border border-border bg-surface p-3 text-sm">
                  <p className="font-display text-lg font-bold">{t.candidato}</p>
                  <p className="font-mono">{Math.floor(t.segundos / 60)} min {String(t.segundos % 60).padStart(2, "0")} s</p>
                  <p className="text-xs text-muted">Fonte: <ExternalLink href={t.fonte.url}>{t.fonte.rotulo}</ExternalLink></p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted">
          Declarações dos candidatos são registradas como declarações de cada um, sem juízo. Afirmações verificáveis seguem para a <Link href="/checagem" className="text-accent underline underline-offset-2">Checagem</Link>.
        </p>
      </Container>
    </>
  );
}
