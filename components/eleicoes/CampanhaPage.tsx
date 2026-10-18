import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";
import { fmtDateTime } from "@/lib/eleicoes";
import { getCampanha, type CampanhaCandidato, type CampanhaFile, type ValorCategoria } from "@/lib/eleicoes-extra";
import { Badge, ExternalLink, Panel, Section, SubNav, TableWrap, td, th } from "./Shared";

const PATH = "/eleicoes/campanha";
const TITLE = "Gastos de campanha e bens declarados dos candidatos em 2026";
const DESC = "Receitas, despesas e bens declarados à Justiça Eleitoral pelos candidatos à Presidência e a governador em segundo turno, com fonte e data da prestação de contas do TSE.";

export const campanhaMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

const brl = (n: number | null) => (n === null ? "não informado pela fonte" : n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
const NI = <span className="text-muted">não informado pela fonte</span>;

function Categorias({ itens }: { itens: ValorCategoria[] | null }) {
  if (!itens) return <p className="text-xs text-muted">Categorias: não informado pela fonte.</p>;
  return (
    <ul className="mt-1 space-y-0.5 text-xs">
      {itens.map((i) => (
        <li key={i.categoria} className="flex justify-between gap-3">
          <span>{i.categoria}</span>
          <span className="font-mono tabular-nums">{brl(i.valor)}</span>
        </li>
      ))}
    </ul>
  );
}

function Cartao({ c, f }: { c: CampanhaCandidato; f: CampanhaFile }) {
  const coletado = f.status === "coletado";
  const fonte = c.ultimaPrestacao ? `TSE, prestação de contas parcial de ${c.ultimaPrestacao}` : "TSE, prestação de contas (data da última entrega não informada pela fonte)";
  return (
    <article className="border border-border bg-surface p-4">
      <header className="flex items-baseline justify-between gap-2">
        <h4 className="font-display text-lg font-bold leading-tight">{c.nome}</h4>
        <span className="text-xs text-muted">{c.partido}{c.uf ? ` · ${c.uf}` : ""}</span>
      </header>
      {!coletado ? (
        <p className="mt-3 text-sm"><Badge>Não coletado ainda</Badge> Receitas, despesas e bens aparecerão aqui quando a coleta no TSE for concluída.</p>
      ) : (
        <>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="font-bold">Receitas declaradas</dt>
              <dd>{c.receitas?.total != null ? brl(c.receitas.total) : NI}<Categorias itens={c.receitas?.porCategoria ?? null} /></dd>
            </div>
            <div>
              <dt className="font-bold">Despesas declaradas</dt>
              <dd>{c.despesas?.total != null ? brl(c.despesas.total) : NI}<Categorias itens={c.despesas?.porCategoria ?? null} /></dd>
            </div>
            <div>
              <dt className="font-bold">Bens declarados</dt>
              <dd>{c.bensDeclarados?.total != null ? brl(c.bensDeclarados.total) : NI}<Categorias itens={c.bensDeclarados?.porTipo ?? null} /></dd>
            </div>
            <div>
              <dt className="font-bold">Sigilo ou publicidade</dt>
              <dd>{c.sigilo === null ? NI : c.sigilo ? "Marcado com sigilo pela fonte" : "Público"}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted">
            Fonte: {fonte}. {c.urlTse && <ExternalLink href={c.urlTse}>Página do candidato no TSE</ExternalLink>}
          </p>
        </>
      )}
    </article>
  );
}

function Grupo({ id, kicker, title, f }: { id: string; kicker: string; title: string; f: CampanhaFile }) {
  return (
    <Section id={id} kicker={kicker} title={title}>
      {f.status !== "coletado" && (
        <div className="mb-4 border-l-4 border-accent-2 bg-surface-2 p-3 text-sm leading-relaxed">
          <p className="label-mono text-muted">Estado da coleta: não coletado ainda</p>
          <p>{f.motivo}</p>
          <p className="text-xs text-muted">Última tentativa: {fmtDateTime(f.coletadoEm)}. Fonte prevista: <ExternalLink href={f.fonte.url}>{f.fonte.rotulo}</ExternalLink>.</p>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {f.candidatos.map((c) => (
          <Cartao key={`${c.nome}-${c.uf ?? "br"}`} c={c} f={f} />
        ))}
      </div>
    </Section>
  );
}

export function CampanhaPage() {
  const { presidente, governadores } = getCampanha();
  const ult = presidente.coletadoEm > governadores.coletadoEm ? presidente.coletadoEm : governadores.coletadoEm;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Eleições 2026", path: "/eleicoes" }, { name: "Gastos e bens", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Eleições 2026", href: "/eleicoes" }, { name: "Gastos e bens" }]} className="mb-6" />
        <ListingHeader label="Dinheiro da campanha" title="Gastos de campanha e bens declarados" description={DESC} count={`Última tentativa de coleta: ${fmtDateTime(ult)} · fonte: TSE`} />
        <SubNav active="campanha" />

        <div className="mt-6 max-w-3xl border border-border bg-surface p-4 text-sm leading-relaxed">
          <p className="label-mono text-accent">Nota de transparência</p>
          <p className="mt-1">
            Esta página mostra só dados oficiais, declarados pelos candidatos e partidos à Justiça Eleitoral. Gasto privado de uma pessoa não é dado público e não aparece aqui. Doadores e fornecedores entram apenas somados por tipo, sem nome nem CPF de pessoa física. Cada valor traz a fonte e a data da prestação de contas parcial; o que a fonte não informa aparece como “não informado pela fonte”. Prestação parcial pode ser retificada até a prestação final.
          </p>
        </div>

        <Grupo id="presidente" kicker="Presidência" title="Lula e Flávio Bolsonaro" f={presidente} />
        <Grupo id="governadores" kicker="Governadores" title="Candidatos em segundo turno" f={governadores} />

        <Section id="fonte" kicker="Fonte e coleta" title="De onde vêm os números">
          <Panel>
            <p className="text-sm leading-relaxed">
              Os valores vêm da API pública do <ExternalLink href="https://divulgacandcontas.tse.jus.br/">DivulgaCandContas, do TSE</ExternalLink>, coletada pelo comando <code className="font-mono text-xs">npm run campanha:update</code>. Quando a API recusa o acesso, a página mantém o estado “não coletado ainda” e não estima nada.
            </p>
          </Panel>
          <div className="mt-4">
            <TableWrap caption="Estado da coleta por grupo" min={420}>
              <thead>
                <tr><th className={th} scope="col">Grupo</th><th className={th} scope="col">Estado</th><th className={th} scope="col">Última tentativa</th></tr>
              </thead>
              <tbody>
                {[["Presidente", presidente], ["Governadores em 2º turno", governadores]].map(([n, f]) => (
                  <tr key={n as string}>
                    <th scope="row" className={`${td} text-left font-semibold`}>{n as string}</th>
                    <td className={td}>{(f as CampanhaFile).status === "coletado" ? "Coletado" : "Não coletado ainda"}</td>
                    <td className={td}>{fmtDateTime((f as CampanhaFile).coletadoEm)}</td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          </div>
        </Section>
      </Container>
    </>
  );
}
