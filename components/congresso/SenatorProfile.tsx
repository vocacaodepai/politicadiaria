import Link from "next/link";
import type { Senator } from "@/lib/congress";
import { UF_NAMES, formatBRL, formatBRLShort, formatBirth, formatInt, getMeta, getRemuneracao, getSenadoVotes, partySlug } from "@/lib/congress";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/listing/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { ParliamentarianPhoto } from "./Photo";
import { Card, Field, StatTile } from "./Stat";
import { CostSection, ExpensesSection, Methodology, PropositionsSection, VotesSection } from "./ProfileSections";
import { PersonLinks } from "./PersonLinks";
import { LazyList } from "./MoreVotes";

const fmtDate = (iso: string | null) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : "não informado");

export const senatorTitle = (s: Senator) => (s.sexo === "F" ? "Senadora" : "Senador");

export function senatorJsonLd(s: Senator, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(path),
    dateModified: getMeta().atualizadoEm,
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "Person",
      name: s.nomeCivil ?? s.nome,
      alternateName: s.nome,
      jobTitle: senatorTitle(s),
      ...(s.foto ? { image: s.foto.url } : {}),
      ...(s.nascimento ? { birthDate: s.nascimento } : {}),
      ...(s.naturalidade ? { birthPlace: s.naturalidade } : {}),
      ...(s.email ? { email: s.email } : {}),
      affiliation: { "@type": "Organization", name: s.partido },
      worksFor: { "@type": "GovernmentOrganization", name: "Senado Federal", url: "https://www12.senado.leg.br" },
      homeLocation: { "@type": "AdministrativeArea", name: UF_NAMES[s.uf] ?? s.uf },
      sameAs: [s.perfil],
    },
  };
}

export function SenatorProfile({ s }: { s: Senator }) {
  const meta = getMeta();
  const rem = getRemuneracao();
  const dict = getSenadoVotes();
  const updated = fmtDate(meta.atualizadoEm);
  const path = `/congresso/senadores/${s.slug}`;
  const c = s.votacoes.contagem;
  const total = s.votacoes.linhas;
  const activeCom = s.comissoes;
  const absences = c.naoCompareceu + c.presenteSemVoto;
  const justified = c.licenca + c.missao + c.atividadeParlamentar;

  return (
    <>
      <JsonLd data={senatorJsonLd(s, path)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Congresso Nacional", path: "/congresso" },
          { name: "Senadores", path: "/congresso/senadores" },
          { name: s.nome, path },
        ])}
      />
      <Container className="py-8 sm:py-10">
        <Breadcrumbs
          items={[
            { name: "Início", href: "/" },
            { name: "Congresso", href: "/congresso" },
            { name: "Senadores", href: "/congresso/senadores" },
            { name: s.nome },
          ]}
        />

        <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <ParliamentarianPhoto photo={s.foto} name={s.nome} size={144} showCredit priority />
          <div className="min-w-0">
            <p className="label-mono text-accent">{senatorTitle(s)}</p>
            <h1 className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{s.nome}</h1>
            {s.nomeCivil && s.nomeCivil.toLowerCase() !== s.nome.toLowerCase() && <p className="mt-1 text-sm text-muted">Nome civil: {s.nomeCivil}</p>}
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <Link href={`/congresso/partidos/${partySlug(s.partido)}`} className="rounded-full border border-border bg-surface px-3 py-1 font-medium hover:border-accent/50">
                {s.partido}
              </Link>
              <span className="rounded-full border border-border bg-surface px-3 py-1 font-medium">
                {UF_NAMES[s.uf] ?? s.uf} ({s.uf})
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1">{s.situacao}</span>
              {s.condicao && <span className="rounded-full border border-border bg-surface px-3 py-1">{s.condicao}</span>}
              {s.membroMesa && <span className="rounded-full border border-border bg-surface px-3 py-1">Membro da Mesa</span>}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              Esta página reúne, com dados abertos oficiais do Senado Federal, o perfil, as votações nominais, as despesas da cota (CEAPS), as proposições e o custo do mandato de {s.nome}. Dados oficiais, atualizados em {updated}.
            </p>
            <PersonLinks
              links={[
                { label: "Perfil oficial no Senado", url: s.perfil },
                { label: "Transparência do Senado", url: "https://www12.senado.leg.br/transparencia" },
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
          <StatTile label="CEAPS no mandato" value={s.despesas ? formatBRLShort(s.despesas.total) : "n/d"} hint="valores reembolsados desde fev/2023" />
          <StatTile label="Votos registrados" value={total ? `${formatInt(s.votacoes.registradas)} de ${formatInt(total)}` : "n/d"} hint="votações nominais do Plenário em que consta" />
          <StatTile label="Proposições" value={formatInt(s.proposicoes.total)} hint={`${formatInt(s.proposicoes.primeiroAutor)} como autor principal`} />
          <StatTile label="Subsídio mensal bruto" value={formatBRL(rem.subsidio.valor)} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6">
            <Card id="sobre" title="Perfil">
              <dl className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome civil">{s.nomeCivil ?? "não informado"}</Field>
                <Field label="Nascimento">{s.nascimento ? `${formatBirth(s.nascimento)}${s.idade !== null ? ` (${s.idade} anos)` : ""}` : "não informado"}</Field>
                <Field label="Naturalidade">{s.naturalidade ?? "não informado"}</Field>
                <Field label="Partido atual">{s.partido}</Field>
                {s.bloco && <Field label="Bloco parlamentar">{s.bloco}</Field>}
                <Field label="Liderança">{s.lideranca ? "Membro de liderança" : "Não"}</Field>
              </dl>
              {s.partidos.length > 1 && (
                <div className="mt-4 border-t border-border pt-4">
                  <p className="label-mono text-muted">Filiações partidárias no mandato</p>
                  <ul className="mt-1 space-y-0.5 text-sm">
                    {s.partidos.map((p) => (
                      <li key={p.sigla + p.filiacao}>
                        {p.sigla}: filiado em {fmtDate(p.filiacao)}
                        {p.desfiliacao ? `, desfiliado em ${fmtDate(p.desfiliacao)}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            <CostSection casa="senado" rem={rem} expenses={s.despesas} since={s.mandato.exercicioInicio} />
            <ExpensesSection expenses={s.despesas} casa="senado" updated={updated} />

            <VotesSection
              casa="senado"
              id={s.id}
              lines={s.votacoes.linhas}
              total={total}
              rows={s.votacoes.lista}
              dict={dict}
              updated={updated}
              counts={[
                { label: "Sim", value: c.sim, tone: "a" },
                { label: "Não", value: c.nao, tone: "b" },
                { label: "Abstenção", value: c.abstencao, tone: "c" },
                { label: "Voto secreto", value: c.secreto, tone: "d" },
                { label: "Presidiu a sessão", value: c.presidente, tone: "e" },
                { label: "Presente, sem voto", value: c.presenteSemVoto, tone: "f" },
                { label: "Não compareceu", value: c.naoCompareceu, tone: "f" },
                { label: "Licença", value: c.licenca, tone: "f" },
                { label: "Missão oficial", value: c.missao, tone: "f" },
                { label: "Atividade parlamentar", value: c.atividadeParlamentar, tone: "f" },
              ]
                .map((x) => x as { label: string; value: number; tone: "a" | "b" | "c" | "d" | "e" | "f" })
                .filter((x, i) => i < 4 || x.value > 0)}
              extraNote={
                <>
                  Registros sem voto: {formatInt(absences)} (não compareceu ou presente sem registrar voto) e {formatInt(justified)} com motivo registrado (licença, missão ou atividade parlamentar). Veja a metodologia abaixo.
                </>
              }
            />

            <PropositionsSection props={s.proposicoes} casa="senado" id={s.id} />

            <Card id="comissoes" title="Comissões e cargos">
              {activeCom.length > 0 ? (
                <ul className="divide-y divide-border text-sm">
                  {activeCom.map((o) => (
                    <li key={`${o.id}-${o.inicio}-${o.cargo}`} className="py-1.5">
                      <span className="font-medium">{o.sigla}</span> · {o.nome} <span className="text-muted">({o.cargo}, desde {fmtDate(o.inicio)})</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">Nenhuma participação atual em comissões nos dados abertos.</p>
              )}
              {s.cargos.length > 0 && (
                <>
                  <p className="mt-4 label-mono text-muted">Cargos atuais em colegiados</p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
                    {s.cargos.map((o) => (
                      <li key={`${o.sigla}-${o.cargo}-${o.inicio}`}>
                        {o.cargo} · {o.nome ?? o.sigla}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {s.comissoesAnteriores > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Participações anteriores ({s.comissoesAnteriores})</p>
                  <LazyList casa="senado" id={s.id} kind="op" label="Ver participações anteriores" />
                </div>
              )}
            </Card>

            <Methodology casa="senado" updated={updated} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Card title="Contato oficial">
              <dl className="space-y-3">
                {s.email && (
                  <Field label="E-mail">
                    <a className="break-all text-accent hover:underline" href={`mailto:${s.email}`}>
                      {s.email}
                    </a>
                  </Field>
                )}
                {s.gabinete && <Field label="Gabinete">{s.gabinete.replace(/\s{2,}/g, " ")}</Field>}
                {s.telefones.length > 0 && <Field label="Telefone">(61) {s.telefones[0].replace(/^(\d{4})(\d{4})$/, "$1-$2")}</Field>}
                {!s.email && !s.gabinete && s.telefones.length === 0 && <p className="text-sm text-muted">Contato não informado.</p>}
              </dl>
            </Card>

            <Card title="Mandato">
              <dl className="space-y-3">
                <Field label="Situação atual">{s.situacao}</Field>
                <Field label="Condição">{s.condicao ?? "não informada"}</Field>
                <Field label="Início do exercício">{fmtDate(s.mandato.exercicioInicio)}</Field>
                <Field label="Fim do mandato">{fmtDate(s.mandato.fim)}</Field>
                <Field label="Representa">{UF_NAMES[s.uf] ?? s.uf}</Field>
                {s.suplentes.length > 0 && (
                  <Field label="Suplentes">
                    <ul>
                      {s.suplentes.map((x) => (
                        <li key={x.nome}>
                          {x.ordem}: {x.nome}
                        </li>
                      ))}
                    </ul>
                  </Field>
                )}
              </dl>
            </Card>
          </aside>
        </div>
      </Container>
    </>
  );
}
