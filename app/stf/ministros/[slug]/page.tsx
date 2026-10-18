import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { listingMetadata } from "@/components/listing/metadata";
import { ParliamentarianPhoto } from "@/components/congresso/Photo";
import { Card, Field, StatTile } from "@/components/congresso/Stat";
import { JulgamentosExplorer } from "@/components/stf/JulgamentosExplorer";
import { CoverageBox } from "@/components/stf/SourceBox";
import { SigiloNote } from "@/components/stf/Sigilo";
import { StfNav } from "@/components/stf/StfNav";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { ageOn, fmtDateBR, getJudgmentsFile, getMinister, getMinisters, getStfMeta, judgmentsOfMinister, ministerParams } from "@/lib/stf";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return ministerParams();
}

const title = (cargo: string, nome: string) => (cargo === "Ministro" ? (/^(Cármen|Carmen)/.test(nome) ? "Ministra" : "Ministro") : cargo);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const m = getMinister(slug);
  if (!m) return {};
  const meta = listingMetadata({
    title: `${m.nome}, ministro do STF: posse, indicação e votos`,
    description: `${m.nome}, ${m.cargo.toLowerCase()} do STF desde ${fmtDateBR(m.posse)}, indicado por ${m.indicadoPor}. Veja relatorias, votos descritos pelas fontes oficiais, turma e data de aposentadoria compulsória.`,
    path: `/stf/ministros/${m.slug}`,
    type: "profile",
  });
  return m.foto ? { ...meta, openGraph: { ...meta.openGraph, images: [{ url: m.foto.url }] } } : meta;
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const m = getMinister(slug);
  if (!m) notFound();
  const meta = getStfMeta();
  const j = getJudgmentsFile();
  const mine = judgmentsOfMinister(m.slug);
  const st = m.estatisticas;
  const path = `/stf/ministros/${m.slug}`;
  const age = ageOn(m.nascimento);
  const ministers = getMinisters().map((x) => ({ slug: x.slug, nome: x.nome }));
  const tipos = Object.entries(st.votosPorTipo);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: absoluteUrl(path),
          dateModified: meta.atualizadoEm,
          inLanguage: "pt-BR",
          mainEntity: {
            "@type": "Person",
            name: m.nomeCompleto,
            alternateName: m.nome,
            jobTitle: "Ministro do Supremo Tribunal Federal",
            ...(m.foto ? { image: m.foto.url } : {}),
            ...(m.nascimento ? { birthDate: m.nascimento } : {}),
            worksFor: { "@type": "GovernmentOrganization", name: "Supremo Tribunal Federal", url: "https://portal.stf.jus.br" },
          },
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Supremo", path: "/stf" }, { name: m.nome, path }])} />
      <Container className="py-8 sm:py-10">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Supremo", href: "/stf" }, { name: m.nome }]} />

        <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <ParliamentarianPhoto photo={m.foto} name={m.nome} size={144} showCredit priority />
          <div className="min-w-0">
            <p className="label-mono text-accent">{title(m.cargo, m.nome)} do Supremo Tribunal Federal</p>
            <h1 className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{m.nome}</h1>
            {m.nomeCompleto.toLowerCase() !== m.nome.toLowerCase() && <p className="mt-1 text-sm text-muted">Nome completo: {m.nomeCompleto}</p>}
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {m.cargo !== "Ministro" ? `${m.cargo}. ` : ""}
              {m.turma ? `Integra a ${m.turma}${m.turmaPresidente ? ", que preside" : ""}. ` : "Não integra Turma. "}
              Em exercício desde {fmtDateBR(m.posse)}, indicado por {m.indicadoPor}.
            </p>
            <div className="mt-4">
              <StfNav current="composicao" />
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatTile label="Relatorias na cobertura" value={String(st.relatoriasEmJulgamentos + st.relatoriasNaPauta)} hint={`${st.relatoriasEmJulgamentos} em julgamentos noticiados e ${st.relatoriasNaPauta} em pautas`} />
          <StatTile label="Votos descritos pela fonte" value={String(st.votosRegistrados)} hint="Só os que a notícia oficial descreve em frase explícita" />
          <StatTile label="Aposentadoria compulsória" value={fmtDateBR(m.aposentadoriaCompulsoria)} hint="Data em que completa 75 anos, calculada pela data de nascimento publicada" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card title="Posse e indicação" id="posse">
            <dl className="grid gap-3 sm:grid-cols-2">
              <Field label="Data de posse">{fmtDateBR(m.posse)}</Field>
              <Field label="Indicado por">{m.indicadoPor} (presidente da República à época)</Field>
              <Field label="Aprovação no Senado">
                {m.senado ? (
                  <>
                    {m.senado.data ? `${fmtDateBR(m.senado.data)}: ` : ""}
                    {m.senado.favoraveis} votos favoráveis e {m.senado.contrarios} contrários.{" "}
                    <a href={m.senado.fonteUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
                      Fonte: {m.senado.fonte}
                    </a>
                  </>
                ) : (
                  "não coletado (a data e a votação constam das atas do Senado Federal)"
                )}
              </Field>
              <Field label="Turma">{m.turma ?? "não integra Turma"}</Field>
            </dl>
          </Card>
          <Card title="Quem é" id="perfil">
            <dl className="grid gap-3 sm:grid-cols-2">
              <Field label="Nascimento">
                {fmtDateBR(m.nascimento)}
                {age !== null ? ` (${age} anos)` : ""}
                {m.nascimentoLocal ? `, ${m.nascimentoLocal}` : ""}
              </Field>
              <Field label="Formação">{m.formacao || "não coletado"}</Field>
              <Field label="Carreira antes e durante o cargo">{m.carreira || "não coletado"}</Field>
              <Field label="Aposentadoria compulsória">
                {fmtDateBR(m.aposentadoriaCompulsoria)}
                <span className="block text-xs text-muted">Aos 75 anos, conforme a Constituição (art. 40, II, aplicado aos ministros pelo art. 101).</span>
              </Field>
            </dl>
            <p className="mt-3 text-xs text-muted">
              Fonte dos dados pessoais e de carreira:{" "}
              <a href={`https://pt.wikipedia.org/wiki/${m.wikipedia}`} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
                Wikipédia
              </a>{" "}
              (secundária). Referência oficial:{" "}
              <a href="https://portal.stf.jus.br/ministros/" target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
                portal do STF
              </a>
              .
            </p>
          </Card>
        </div>

        <Card title="Estatísticas" id="estatisticas" className="mt-6" note={st.nota}>
          <dl className="grid gap-3 sm:grid-cols-4">
            <Field label="Relatorias em julgamentos">{st.relatoriasEmJulgamentos}</Field>
            <Field label="Relatorias em pautas">{st.relatoriasNaPauta}</Field>
            <Field label="Tempo médio de pedido de vista">{st.tempoMedioPedidoVista ?? "não coletado"}</Field>
            <Field label="Decisões monocráticas por ano">{st.decisoesMonocraticasPorAno ? "ver dados" : "não coletado"}</Field>
          </dl>
          {tipos.length > 0 && (
            <p className="mt-3 text-sm">
              Votos descritos por tipo:{" "}
              {tipos.map(([k, v], i) => (
                <span key={k}>
                  {i ? "; " : ""}
                  {k}: {v}
                </span>
              ))}
              .
            </p>
          )}
          <p className="mt-2 text-xs text-muted">Sem ranking e sem juízo de valor: os números só contam o que as fontes registram na janela de cobertura.</p>
        </Card>

        <section aria-labelledby="julgamentos" className="mt-10">
          <h2 id="julgamentos" className="border-t-[3px] border-foreground pt-3 font-display text-2xl font-bold">
            Julgamentos em que {m.nome} aparece
          </h2>
          <CoverageBox c={j.cobertura} className="mt-4" />
          <div className="mt-5">
            <JulgamentosExplorer items={mine} ministers={ministers} focus={m.slug} />
          </div>
          <p className="mt-4 text-sm">
            <Link href="/stf/julgamentos" className="text-accent underline">
              Pesquisar todos os julgamentos coletados
            </Link>
          </p>
        </section>

        <SigiloNote className="mt-10" />
      </Container>
    </>
  );
}
