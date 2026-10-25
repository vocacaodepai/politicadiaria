import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/article/JsonLd";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { listingMetadata } from "@/components/listing/metadata";
import {
  PROMESSAS_PATH,
  areaCounts,
  areaLabel,
  candidatoPath,
  candidatoSlugs,
  getMeta,
  getPropostas,
  modoDe,
  propostaPath,
  statusBadgeText,
  statusCounts,
  statusList,
  statusNota,
  type CandidatoSlug,
} from "@/lib/promessas";
import { absoluteUrl, breadcrumbJsonLd, formatDate } from "@/lib/seo";
import { site } from "@/lib/articles";
import { PromessasBrowser, type PromessaCardData } from "./PromessasBrowser";
import { StatusBadge } from "./StatusBadge";

const TITLE = "Promessas do presidente: o que prometeram e o que foi feito";
const DESCRIPTION =
  "Propostas de Lula e de Flávio Bolsonaro tiradas dos planos de governo de 2026, com fonte e página. Depois da posse, o painel acompanha o eleito com dados oficiais.";

export function promessasMetadata(c?: CandidatoSlug) {
  if (!c) return listingMetadata({ title: TITLE, description: DESCRIPTION, path: PROMESSAS_PATH });
  const nome = getMeta().candidatos[c].nome;
  return listingMetadata({
    title: `Promessas de ${nome}: ${getPropostas(c).length} propostas do plano de governo`,
    description: `As ${getPropostas(c).length} propostas de ${nome} nos planos de governo de 2026, por área e status, com citação, página do documento e indicador oficial para acompanhar.`,
    path: c ? candidatoPath(c) : PROMESSAS_PATH,
  });
}

function cardData(c: CandidatoSlug): PromessaCardData[] {
  return getPropostas(c).map((p) => ({
    id: p.id,
    href: propostaPath(c, p.id),
    titulo: p.titulo,
    texto: p.texto,
    area: p.area,
    areaLabel: areaLabel(p.area),
    status: p.status,
    statusText: statusBadgeText(c, p.status),
    prazo: p.prazo,
    origem: p.origem,
    pagina: p.fonte.pagina ?? "",
  }));
}

/** Aviso fixo do painel (mesma régua para qualquer eleito). */
export function AvisoFixo() {
  return (
    <aside aria-label="Como este painel funciona" className="border border-foreground bg-surface-2 p-4 text-sm leading-relaxed">
      <p className="label-mono text-accent">Aviso fixo</p>
      <p className="mt-1">
        Os dados vêm de fonte oficial ou de imprensa identificada, sempre com link. O tom é neutro e a régua é a mesma para
        qualquer eleito: o painel não dá nota nem usa adjetivo. Uma promessa só vira &quot;contrariada&quot; quando há fato
        verificável e fonte, como um ato oficial que a contraria.
      </p>
    </aside>
  );
}

export function PromessasPage({ candidato }: { candidato?: CandidatoSlug }) {
  const meta = getMeta();
  const current: CandidatoSlug = candidato ?? meta.eleito ?? "lula";
  const info = meta.candidatos[current];
  const counts = statusCounts(current);
  const items = cardData(current);
  const path = candidato ? candidatoPath(candidato) : PROMESSAS_PATH;
  const naoFara = info.naoFara;
  const checagens = meta.checagensAgencias.filter((x) => x.candidato === current);
  const total = items.length;

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: candidato ? `Promessas de ${info.nome}` : TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    dateModified: meta.atualizadoEm,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: total,
      itemListElement: items.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.titulo,
        url: absoluteUrl(p.href),
      })),
    },
  };

  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Promessas", path: PROMESSAS_PATH },
    ...(candidato ? [{ name: info.nome, path }] : []),
  ];

  return (
    <>
      <JsonLd data={collection} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <Container className="pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { name: "Início", href: "/" },
            candidato ? { name: "Promessas", href: PROMESSAS_PATH } : { name: "Promessas" },
            ...(candidato ? [{ name: info.nome }] : []),
          ]}
        />
        <header className="mt-6 border-t-[3px] border-foreground pt-3">
          <p className="label-mono text-accent">Painel</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            {candidato ? `Promessas de ${info.nome}` : "Promessas do presidente"}
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
            O que Lula e Flávio Bolsonaro propuseram nos planos de governo de 2026, proposta por proposta, com a citação e a
            página do documento. A partir da posse, em 01/01/2027, o painel mostra o que caminhou e o que não caminhou nas
            promessas de quem for eleito, com dados oficiais.
          </p>
        </header>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <AvisoFixo />
          <div className="border border-border p-4 text-sm leading-relaxed" role="status">
            <p className="label-mono text-accent">Situação</p>
            <p className="mt-1">
              {meta.eleito
                ? `Eleito: ${meta.candidatos[meta.eleito].nome}. As propostas de ${
                    meta.candidatos[meta.eleito === "lula" ? "flavio" : "lula"].nome
                  } ficam registradas como arquivo da campanha, sem acompanhamento.`
                : "O eleito ainda não está definido neste painel (2º turno em 25/10/2026). Todas as propostas aparecem como prometidas, sem acompanhamento ainda."}
            </p>
            <p className="mt-1 text-muted">
              Acompanhamento real começa na posse ({formatDate(meta.posse)}). Atualizado em {formatDate(meta.atualizadoEm)}.
            </p>
          </div>
        </div>

        <nav aria-label="Candidato" className="mt-8 grid gap-3 sm:grid-cols-2">
          {candidatoSlugs.map((c) => {
            const ci = meta.candidatos[c];
            const m = modoDe(c);
            const active = c === current;
            return (
              <Link
                key={c}
                href={candidatoPath(c)}
                aria-current={active ? "page" : undefined}
                className={`block border-2 p-4 transition ${active ? "border-foreground bg-surface-2" : "border-border hover:border-foreground"}`}
              >
                <span className="label-mono text-muted">{ci.partido}</span>
                <span className="mt-0.5 block font-display text-2xl font-extrabold">{ci.nome}</span>
                <span className="mt-1 block text-sm text-muted">
                  {getPropostas(c).length} propostas
                  {m === "acompanhando" && " | Eleito, em acompanhamento"}
                  {m === "arquivo" && " | Arquivo da campanha, sem acompanhamento"}
                </span>
              </Link>
            );
          })}
        </nav>

        <section aria-labelledby="contadores" className="mt-8">
          <h2 id="contadores" className="label-mono mb-3 text-muted">
            Propostas de {info.nome} por status
          </h2>
          <dl className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {statusList.map((s) => (
              <div key={s.slug} className="bg-background p-3">
                <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-muted">{s.label}</dt>
                <dd className="mt-1 font-display text-3xl font-extrabold">{counts[s.slug]}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-muted">{statusNota(current)}.</p>
        </section>

        <section aria-labelledby="propostas" className="mt-12">
          <div className="mb-5 border-t-[3px] border-foreground pt-2">
            <h2 id="propostas" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Todas as propostas de {info.nome}
            </h2>
          </div>
          <PromessasBrowser
            key={current}
            items={items}
            areas={areaCounts(current)}
            statuses={statusList.map((s) => ({ slug: s.slug, label: s.label }))}
            counts={counts}
          />
        </section>

        {naoFara.length > 0 && (
          <section aria-labelledby="nao-fara" className="mt-14">
            <div className="mb-5 border-t-[3px] border-foreground pt-2">
              <h2 id="nao-fara" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                O que {info.nome} disse que não fará ou que manterá
              </h2>
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {naoFara.map((n, i) => (
                <li key={i} className="border border-border p-4">
                  <p className="font-semibold">{n.texto}</p>
                  {n.citacao && <blockquote className="mt-2 border-l-4 border-accent pl-3 text-[0.95rem] italic">&quot;{n.citacao}&quot;</blockquote>}
                  <p className="mt-2 text-xs text-muted">
                    {formatDate(n.data)}. Fonte:{" "}
                    <a href={n.fonte.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                      {n.fonte.nome}
                    </a>
                    {n.fonte.pagina ? `, p. ${n.fonte.pagina}` : ""}
                  </p>
                  {n.contexto && <p className="mt-2 text-sm text-muted">Contexto: {n.contexto}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {checagens.length > 0 && (
          <section aria-labelledby="checagens-agencias" className="mt-14">
            <div className="mb-5 border-t-[3px] border-foreground pt-2">
              <h2 id="checagens-agencias" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                O que dizem as agências de checagem
              </h2>
              <p className="mt-1 text-sm text-muted">Falas de campanha de {info.nome} checadas por agências, com o rótulo da própria agência. Os dois candidatos têm a mesma seção.</p>
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {checagens.map((c, i) => (
                <li key={i} className="border border-border p-4">
                  <p className="label-mono text-muted">
                    {c.agencia} | {formatDate(c.data, "short")}
                  </p>
                  <p className="mt-1 font-semibold">{c.alegacao}</p>
                  <p className="mt-1 text-sm">
                    <span className="font-bold uppercase tracking-[0.04em]">Rótulo da agência: {c.rotulo}.</span> {c.resumo}
                  </p>
                  <p className="mt-2 text-xs">
                    <a href={c.fonte.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                      {c.fonte.nome}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="metodologia" className="mt-14 pb-20">
          <div className="mb-5 border-t-[3px] border-foreground pt-2">
            <h2 id="metodologia" className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Como o painel funciona
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <ol className="list-decimal space-y-2.5 pl-5 text-[0.97rem] leading-relaxed marker:font-bold">
              <li>
                Lemos o plano de governo de cada candidato e separamos as propostas que dá para acompanhar. Cada uma traz a
                citação literal (no máximo 25 palavras), a página e o link do documento.
              </li>
              <li>
                Medidas sem meta ou prazo no documento ficam registradas assim, sem que a gente invente número. Falas de
                campanha só entram com fonte aberta e aparecem marcadas.
              </li>
              <li>
                Até a posse, todas as propostas ficam como prometidas, sem acompanhamento. Depois dela, o painel acompanha o
                eleito com fontes oficiais (Diário Oficial, Câmara, Senado, IBGE, Banco Central e outras). As propostas do
                outro candidato ficam como arquivo da campanha.
              </li>
              <li>
                Toda mudança de status tem data, resumo factual e fonte. Sem fonte, sem mudança. Veja a{" "}
                <Link href="/politica-editorial" className="text-accent underline underline-offset-2">
                  política editorial
                </Link>
                .
              </li>
            </ol>
            <dl className="space-y-3">
              {statusList.map((s) => (
                <div key={s.slug} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-4">
                  <dt className="sm:w-44 sm:shrink-0">
                    <StatusBadge status={s.slug} label={s.label} />
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted">{s.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="border border-border p-4 text-sm leading-relaxed">
              <p className="label-mono text-muted">Plano usado</p>
              <p className="mt-1 font-semibold">{info.plano.titulo}</p>
              <p className="mt-1 text-muted">
                Plano de governo divulgado pela campanha, {info.plano.paginas} páginas, cópia hospedada por {info.plano.hospedadoPor}{" "}
                ({formatDate(info.plano.divulgadoEm)}).
              </p>
              <p className="mt-2">
                <a href={info.plano.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                  Abrir o PDF
                </a>{" "}
                |{" "}
                <a href={info.plano.materia} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                  Matéria que o publicou
                </a>
              </p>
            </div>
            <div className="border border-border p-4 text-sm leading-relaxed">
              <p className="label-mono text-muted">Limites deste levantamento</p>
              <ul className="mt-1 list-disc space-y-1.5 pl-5 text-muted">
                {meta.limitacoes.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
