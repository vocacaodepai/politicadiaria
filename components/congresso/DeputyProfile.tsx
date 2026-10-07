import Link from "next/link";
import type { Deputy } from "@/lib/congress";
import {
  UF_NAMES,
  formatBRL,
  formatBRLShort,
  formatBirth,
  formatInt,
  getCamaraVotes,
  getMeta,
  getRemuneracao,
  partySlug,
  safeExternalUrl,
  socialLabel,
} from "@/lib/congress";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/listing/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { ParliamentarianPhoto } from "./Photo";
import { Card, Field, StatTile } from "./Stat";
import { CostSection, ExpensesSection, Methodology, PropositionsSection, VotesSection } from "./ProfileSections";
import { PersonLinks } from "./PersonLinks";

const fmtDate = (iso: string | null) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : "não informado");

export function deputyTitle(d: Deputy) {
  return d.sexo === "F" ? "Deputada federal" : "Deputado federal";
}

export function deputyJsonLd(d: Deputy, path: string) {
  const sameAs = [d.perfil, ...d.redes, d.site].filter((u): u is string => !!u && !!safeExternalUrl(u));
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(path),
    dateModified: getMeta().atualizadoEm,
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "Person",
      name: d.nomeCivil ?? d.nome,
      alternateName: d.nome,
      jobTitle: deputyTitle(d),
      ...(d.foto ? { image: d.foto.url } : {}),
      ...(d.nascimento ? { birthDate: d.nascimento } : {}),
      ...(d.naturalidade ? { birthPlace: d.naturalidade } : {}),
      ...(d.email ? { email: d.email } : {}),
      affiliation: { "@type": "Organization", name: d.partido },
      worksFor: { "@type": "GovernmentOrganization", name: "Câmara dos Deputados", url: "https://www.camara.leg.br" },
      homeLocation: { "@type": "AdministrativeArea", name: UF_NAMES[d.uf] ?? d.uf },
      sameAs,
    },
  };
}

export function DeputyProfile({ d }: { d: Deputy }) {
  const meta = getMeta();
  const rem = getRemuneracao();
  const dict = getCamaraVotes();
  const updated = fmtDate(meta.atualizadoEm);
  const path = `/congresso/deputados/${d.slug}`;
  const c = d.votacoes.contagem;
  const activeOrgaos = d.orgaos.filter((o) => !o.fim);
  const pastOrgaos = d.orgaos.filter((o) => o.fim);
  const social = d.redes.map((u) => ({ url: safeExternalUrl(u), label: socialLabel(u) })).filter((s): s is { url: string; label: string } => !!s.url);
  const site = d.site ? safeExternalUrl(d.site) : null;
  const inOffice = d.situacao === "Exercício";

  return (
    <>
      <JsonLd data={deputyJsonLd(d, path)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Congresso Nacional", path: "/congresso" },
          { name: "Deputados federais", path: "/congresso/deputados" },
          { name: d.nome, path },
        ])}
      />
      <Container className="py-8 sm:py-10">
        <Breadcrumbs
          items={[
            { name: "Início", href: "/" },
            { name: "Congresso", href: "/congresso" },
            { name: "Deputados", href: "/congresso/deputados" },
            { name: d.nome },
          ]}
        />

        <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <ParliamentarianPhoto photo={d.foto} name={d.nome} size={144} showCredit priority />
          <div className="min-w-0">
            <p className="label-mono text-accent">{deputyTitle(d)}</p>
            <h1 className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{d.nome}</h1>
            {d.nomeCivil && d.nomeCivil.toLowerCase() !== d.nome.toLowerCase() && <p className="mt-1 text-sm text-muted">Nome civil: {d.nomeCivil}</p>}
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <Link href={`/congresso/partidos/${d.partido.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`} className="rounded-full border border-border bg-surface px-3 py-1 font-medium hover:border-accent/50">
                {d.partido}
              </Link>
              <span className="rounded-full border border-border bg-surface px-3 py-1 font-medium">
                {UF_NAMES[d.uf] ?? d.uf} ({d.uf})
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1">{inOffice ? "Em exercício" : (d.situacao ?? "Situação não informada")}</span>
              {d.condicao && <span className="rounded-full border border-border bg-surface px-3 py-1">{d.condicao}</span>}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              Esta página reúne, com dados abertos oficiais da Câmara dos Deputados, o perfil, as votações nominais, os gastos da cota parlamentar, as proposições e o custo do mandato de {d.nome}. Dados oficiais, atualizados em {updated}.
            </p>
            <PersonLinks
              links={[
                { label: "Perfil oficial na Câmara", url: d.perfil },
                { label: "Gastos parlamentares na Câmara", url: "https://www.camara.leg.br/transparencia/gastos-parlamentares" },
                { label: "Dados abertos deste deputado (API)", url: `https://dadosabertos.camara.leg.br/api/v2/deputados/${d.id}` },
              ]}
            />
          </div>
        </header>

        <nav aria-label="Seções desta página" className="no-scrollbar mt-8 flex gap-2 overflow-x-auto font-mono text-xs">
          {[
            ["sobre", "Perfil"],
            ["custo", "Custo"],
            ["despesas", "Despesas"],
            ["votos", "Votos"],
            ["proposicoes", "Proposições"],
            ["comissoes", "Comissões"],
            ["metodologia", "Metodologia"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-border bg-surface px-3 py-1.5 text-muted transition hover:border-accent/50 hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Cota usada no mandato" value={d.despesas ? formatBRLShort(d.despesas.total) : "n/d"} hint="CEAP, valores líquidos desde fev/2023" />
          <StatTile
            label="Votos registrados"
            value={d.votacoes.elegiveis ? `${formatInt(d.votacoes.registradas)} de ${formatInt(d.votacoes.elegiveis)}` : "n/d"}
            hint="votações nominais do Plenário em que estava em exercício"
          />
          <StatTile label="Proposições" value={formatInt(d.proposicoes.total)} hint={`${formatInt(d.proposicoes.primeiroAutor)} como primeiro signatário`} />
          <StatTile label="Subsídio mensal bruto" value={formatBRL(rem.subsidio.valor)} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6">
            <Card id="sobre" title="Perfil">
              <dl className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome civil">{d.nomeCivil ?? "não informado"}</Field>
                <Field label="Nascimento">
                  {d.nascimento ? `${formatBirth(d.nascimento)}${d.idade !== null ? ` (${d.idade} anos)` : ""}` : "não informado"}
                </Field>
                <Field label="Naturalidade">{d.naturalidade ?? "não informado"}</Field>
                <Field label="Escolaridade">{d.escolaridade ?? "não informado"}</Field>
                <Field label="Profissão declarada">{d.profissoes.length ? d.profissoes.join(", ") : "não informado"}</Field>
                <Field label="Partido atual">{d.partido}</Field>
              </dl>
              {d.trocasDePartido.length > 0 && (
                <div className="mt-4 border-t border-border pt-4">
                  <p className="label-mono text-muted">Mudanças de partido neste mandato</p>
                  <ul className="mt-1 space-y-0.5 text-sm">
                    {d.trocasDePartido.map((t) => (
                      <li key={t.data + t.para}>
                        {fmtDate(t.data)}: de {t.de} para {t.para}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            <CostSection casa="camara" rem={rem} expenses={d.despesas} since={d.inicioExercicio} />
            <ExpensesSection expenses={d.despesas} casa="camara" updated={updated} />

            <VotesSection
              casa="camara"
              total={d.votacoes.elegiveis}
              rows={d.votacoes.lista}
              dict={dict}
              updated={updated}
              counts={[
                { label: "Sim", value: c.sim, tone: "a" },
                { label: "Não", value: c.nao, tone: "b" },
                { label: "Abstenção", value: c.abstencao, tone: "c" },
                { label: "Obstrução", value: c.obstrucao, tone: "d" },
                { label: "Art. 17 (presidiu)", value: c.art17, tone: "e" },
                { label: "Sem voto registrado", value: c.ausencias, tone: "f" },
              ]}
              extraNote={<>&quot;Sem voto registrado&quot; não equivale a falta em sessão: veja a metodologia abaixo.</>}
            />

            <PropositionsSection props={d.proposicoes} casa="camara" />

            <Card id="comissoes" title="Comissões, órgãos e frentes parlamentares">
              {activeOrgaos.length > 0 ? (
                <>
                  <p className="label-mono text-muted">Atuais</p>
                  <ul className="mt-1 divide-y divide-border text-sm">
                    {activeOrgaos.map((o) => (
                      <li key={`${o.id}-${o.inicio}`} className="py-1.5">
                        <span className="font-medium">{o.sigla}</span> · {o.nome} <span className="text-muted">({o.cargo}, desde {fmtDate(o.inicio)})</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-muted">Nenhuma participação atual em comissões nos dados abertos.</p>
              )}
              {pastOrgaos.length > 0 && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium">Participações anteriores ({pastOrgaos.length})</summary>
                  <ul className="mt-2 divide-y divide-border text-sm">
                    {pastOrgaos.map((o) => (
                      <li key={`${o.id}-${o.inicio}-${o.fim}`} className="py-1.5">
                        <span className="font-medium">{o.sigla}</span> · {o.nome} <span className="text-muted">({o.cargo}, {fmtDate(o.inicio)} a {fmtDate(o.fim)})</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              {d.frentes.length > 0 && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium">Frentes parlamentares ({d.frentes.length})</summary>
                  <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm">
                    {d.frentes.map((f) => (
                      <li key={f.id}>{f.titulo}</li>
                    ))}
                  </ul>
                </details>
              )}
            </Card>

            <Methodology casa="camara" updated={updated} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Card title="Contato oficial">
              <dl className="space-y-3">
                {d.email && (
                  <Field label="E-mail">
                    <a className="break-all text-accent hover:underline" href={`mailto:${d.email}`}>
                      {d.email}
                    </a>
                  </Field>
                )}
                {d.gabinete && (
                  <Field label="Gabinete">
                    Anexo {d.gabinete.predio ?? "?"}, sala {d.gabinete.sala}
                    {d.gabinete.andar ? `, ${d.gabinete.andar}º andar` : ""}
                    {d.gabinete.telefone && <span className="block text-muted">Tel.: (61) {d.gabinete.telefone}</span>}
                  </Field>
                )}
                {site && (
                  <Field label="Site">
                    <a className="break-all text-accent hover:underline" href={site} target="_blank" rel="noopener noreferrer nofollow">
                      {site.replace(/^https?:\/\//, "")}
                    </a>
                  </Field>
                )}
                {social.length > 0 && (
                  <Field label="Redes sociais (informadas à Câmara)">
                    <ul className="space-y-0.5">
                      {social.map((s) => (
                        <li key={s.url}>
                          <a className="text-accent hover:underline" href={s.url} target="_blank" rel="noopener noreferrer nofollow">
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Field>
                )}
                {!d.email && !d.gabinete && !site && social.length === 0 && <p className="text-sm text-muted">Contato não informado.</p>}
              </dl>
            </Card>

            <Card title="Mandato">
              <dl className="space-y-3">
                <Field label="Legislatura">57ª (01/02/2023 a 31/01/2027)</Field>
                <Field label="Situação atual">{inOffice ? "Em exercício" : (d.situacao ?? "não informada")}</Field>
                <Field label="Condição eleitoral">{d.condicao ?? "não informada"}</Field>
                <Field label="Início do exercício">{fmtDate(d.inicioExercicio)}</Field>
                <Field label="Representa">{UF_NAMES[d.uf] ?? d.uf}</Field>
              </dl>
              {d.historicoSituacao.length > 1 && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium">Histórico de situação</summary>
                  <ul className="mt-2 space-y-1 text-xs text-muted">
                    {d.historicoSituacao.map((h) => (
                      <li key={h.data + h.situacao}>
                        {fmtDate(h.data)}: {h.situacao}
                        {h.condicao ? ` (${h.condicao})` : ""}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </Card>
          </aside>
        </div>
      </Container>
    </>
  );
}
