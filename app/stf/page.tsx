import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { ParliamentarianPhoto } from "@/components/congresso/Photo";
import { StfNav } from "@/components/stf/StfNav";
import { CoverageBox } from "@/components/stf/SourceBox";
import { SigiloNote } from "@/components/stf/Sigilo";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { fmtDateBR, getJudgmentsFile, getMinistersFile, getStfMeta, hasStfData } from "@/lib/stf";

const PATH = "/stf";
const TITLE = "Supremo Tribunal Federal: quem são os ministros, turmas e julgamentos";
const DESC =
  "Composição atual do STF, com presidente, vice, turmas e uma página para cada ministro: posse, indicação, aposentadoria compulsória, relatorias e votos descritos pelas fontes oficiais.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESC, path: PATH });

export default function Page() {
  if (!hasStfData()) return null;
  const meta = getStfMeta();
  const file = getMinistersFile();
  const j = getJudgmentsFile();
  const ministros = [...file.ministros].sort((a, b) => (a.posse ?? "").localeCompare(b.posse ?? ""));
  const turmas = ["Primeira Turma", "Segunda Turma"].map((t) => ({ nome: t, membros: ministros.filter((m) => m.turma === t) }));
  const semTurma = ministros.filter((m) => !m.turma);
  const updated = fmtDateBR(meta.atualizadoEm);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: TITLE,
          description: DESC,
          url: absoluteUrl(PATH),
          inLanguage: "pt-BR",
          dateModified: meta.atualizadoEm,
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Supremo", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Supremo" }]} className="mb-6" />
        <ListingHeader
          label="Supremo Tribunal Federal"
          title="Quem decide no Supremo"
          description="A composição atual da Corte, ministro por ministro, com a data de posse, quem indicou, quando o ministro completa 75 anos e o que as fontes oficiais dizem sobre relatorias e votos."
          count={`${file.ministros.length} ministros em exercício${file.vagas ? ` · ${file.vagas} vaga em aberto` : ""} · dados coletados em ${updated}`}
        />
        <div className="mt-6">
          <StfNav current="composicao" />
        </div>

        <section aria-labelledby="direcao" className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-border border-t-[3px] border-t-foreground bg-surface p-4">
            <p className="label-mono text-muted">Presidente do STF</p>
            <p className="mt-1 font-display text-2xl font-bold">{file.presidente ?? "não coletado"}</p>
          </div>
          <div className="border border-border border-t-[3px] border-t-foreground bg-surface p-4">
            <p className="label-mono text-muted">Vice-presidente</p>
            <p className="mt-1 font-display text-2xl font-bold">{file.vicePresidente ?? "não coletado"}</p>
          </div>
          <h2 id="direcao" className="sr-only">
            Direção da Corte
          </h2>
        </section>

        <section aria-labelledby="ministros" className="mt-10">
          <h2 id="ministros" className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold">
            Os ministros, por ordem de antiguidade
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ministros.map((m) => (
              <li key={m.slug}>
                <Link href={`/stf/ministros/${m.slug}`} className="card-hover flex h-full gap-4 border border-border bg-surface p-4">
                  <ParliamentarianPhoto photo={m.foto} name={m.nome} size={72} />
                  <div className="min-w-0">
                    <p className="label-mono text-accent">{m.cargo}</p>
                    <h3 className="mt-0.5 font-display text-lg font-bold leading-tight">{m.nome}</h3>
                    <p className="mt-1 text-xs text-muted">
                      {m.turma ?? "Sem turma (presidência)"} · posse em {fmtDateBR(m.posse)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">Indicado por {m.indicadoPor}</p>
                  </div>
                </Link>
              </li>
            ))}
            {file.vagas > 0 && (
              <li>
                <div className="flex h-full flex-col justify-center border border-dashed border-border bg-surface p-4">
                  <p className="label-mono text-muted">Vaga em aberto</p>
                  <p className="mt-1 text-sm text-muted">A cadeira só é preenchida após indicação do presidente da República e aprovação do Senado.</p>
                </div>
              </li>
            )}
          </ul>
        </section>

        <section aria-labelledby="turmas" className="mt-10">
          <h2 id="turmas" className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold">
            Turmas
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            O Supremo julga em Plenário (todos os ministros) e em duas Turmas. A presidência do STF não integra Turma. Cada Turma é presidida pelo ministro mais antigo entre os seus membros, por um ano.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {turmas.map((t) => (
              <div key={t.nome} className="border border-border bg-surface p-4">
                <h3 className="font-display text-lg font-bold">{t.nome}</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {t.membros.map((m) => (
                    <li key={m.slug}>
                      <Link href={`/stf/ministros/${m.slug}`} className="text-accent underline">
                        {m.nome}
                      </Link>
                      {m.turmaPresidente ? " (presidente da Turma)" : ""}
                    </li>
                  ))}
                  {!t.membros.length && <li className="text-muted">não coletado</li>}
                </ul>
              </div>
            ))}
          </div>
          {semTurma.length > 0 && <p className="mt-2 text-xs text-muted">Sem Turma na fonte: {semTurma.map((m) => m.nome).join(", ")}.</p>}
        </section>

        <section aria-labelledby="historico" className="mt-10">
          <h2 id="historico" className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold">
            Julgamentos e agenda
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            Pesquise os julgamentos noticiados pelo tribunal por processo, tema, relator, órgão, resultado e sigilo, ou veja o que está na pauta.
          </p>
          <CoverageBox c={j.cobertura} className="mt-4" />
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/stf/julgamentos" className="inline-flex h-10 items-center bg-foreground px-4 font-mono text-xs font-semibold uppercase tracking-wide text-background">
              Pesquisar julgamentos
            </Link>
            <Link href="/stf/agenda" className="inline-flex h-10 items-center border border-foreground px-4 font-mono text-xs font-semibold uppercase tracking-wide">
              Agenda do STF
            </Link>
          </div>
        </section>

        <SigiloNote className="mt-10" />

        <section aria-labelledby="fontes" className="mt-10 border-t-[3px] border-foreground pt-4 text-sm leading-relaxed text-muted">
          <h2 id="fontes" className="font-display text-xl font-bold text-foreground">
            Fontes e método
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            {meta.fontes.map((f) => (
              <li key={f.id}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                  {f.nome}
                </a>
                : {f.uso} (acesso na coleta: {f.acesso}).
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Descrevemos votos e decisões como as fontes os descrevem, sem avaliar ministros nem rotulá-los. A data de aposentadoria compulsória é calculada pela data de nascimento publicada (75 anos). Os dados são regenerados por script e
            ficam abertos em <a className="text-accent underline" href="/data/stf/meta.json">/data/stf/</a>. Última coleta: {updated}.
          </p>
        </section>
      </Container>
    </>
  );
}
