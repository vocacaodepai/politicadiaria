import Link from "next/link";
import type { CamaraVote, Expenses, Propositions, Remuneracao, SenadoVote, VoteRow } from "@/lib/congress";
import { formatBRL, formatBRLShort, formatInt, formatPct, monthLabel, pct } from "@/lib/congress";
import { BarList, StackedBar, type Segment } from "./Bars";
import { Card } from "./Stat";
import { MoreVotes } from "./MoreVotes";
import { VoteTableRows, VOTE_TABLE_HEAD } from "./VoteRows";
import type { Casa } from "./votes-shared";

const sentence = (s: string) => {
  const t = s.toLocaleLowerCase("pt-BR");
  return t.charAt(0).toLocaleUpperCase("pt-BR") + t.slice(1);
};

export function SourceLine({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-xs leading-relaxed text-muted">{children}</p>;
}

/* ------------------------------------------------------------ custos */

function Row({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <tr className="border-t border-border align-top">
      <th scope="row" className="py-2 pr-4 text-left text-sm font-medium">
        {label}
        {note && <span className="mt-0.5 block text-xs font-normal leading-snug text-muted">{note}</span>}
      </th>
      <td className="whitespace-nowrap py-2 text-right font-mono text-sm tabular-nums">{value}</td>
    </tr>
  );
}

function monthsBetween(fromYm: string, toYm: string) {
  const [fy, fm] = fromYm.split("-").map(Number);
  const [ty, tm] = toYm.split("-").map(Number);
  return Math.max(1, (ty - fy) * 12 + (tm - fm) + 1);
}

export function CostSection({ casa, rem, expenses, since }: { casa: Casa; rem: Remuneracao; expenses: Expenses; since: string | null }) {
  const lastMonth = expenses?.porMes.at(-1)?.mes;
  const startYm = since && since > "2023-02-01" ? since.slice(0, 7) : "2023-02";
  const months = lastMonth ? monthsBetween(startYm, lastMonth) : 0;
  const avg = expenses && months ? expenses.total / months : null;
  return (
    <Card
      id="custo"
      title="O que custa ao contribuinte"
      note={`Valores brutos e mensais, verificados em ${new Date(`${rem.verificadoEm}T12:00:00-03:00`).toLocaleDateString("pt-BR")} nas páginas oficiais citadas. ${rem.aviso}`}
    >
      <table className="w-full border-collapse">
        <caption className="sr-only">Remuneração e verbas do mandato</caption>
        <tbody>
          <Row label="Subsídio mensal (bruto)" value={formatBRL(rem.subsidio.valor)} note="Antes do Imposto de Renda e da contribuição previdenciária." />
          {casa === "camara" ? (
            <>
              <Row
                label="Verba de gabinete (teto mensal)"
                value={formatBRL(rem.camara.verbaGabinete.tetoMensal)}
                note={`Para pagar até ${rem.camara.verbaGabinete.maxSecretarios} secretários parlamentares (salários de ${formatBRL(rem.camara.verbaGabinete.salarioMinimoSecretario)} a ${formatBRL(rem.camara.verbaGabinete.salarioMaximoSecretario)}).`}
              />
              <Row
                label="Cota para o exercício da atividade parlamentar (CEAP)"
                value={`${formatBRLShort(rem.camara.cota.minimoMensal)} a ${formatBRLShort(rem.camara.cota.maximoMensal)}`}
                note={`Limite mensal que varia por estado: ${rem.camara.cota.minimoUf} tem o menor (${formatBRL(rem.camara.cota.minimoMensal)}) e ${rem.camara.cota.maximoUf} o maior (${formatBRL(rem.camara.cota.maximoMensal)}). ${rem.camara.cota.observacao}`}
              />
              <Row label="Auxílio-moradia" value={formatBRL(rem.camara.auxilioMoradia.valorMensal)} note={rem.camara.auxilioMoradia.descricao} />
            </>
          ) : (
            <>
              <Row label="Cota para o exercício da atividade parlamentar (CEAPS)" value="Ver despesas" note={rem.senado.cota.descricao} />
              <Row label="Verba de gabinete" value="Não verificado" note={rem.senado.verbaGabinete.descricao} />
            </>
          )}
          {expenses && (
            <Row
              label={`${casa === "camara" ? "Cota" : "CEAPS"} efetivamente usada no mandato atual`}
              value={formatBRL(expenses.total)}
              note={avg ? `Média de ${formatBRL(avg)} por mês entre ${monthLabel(startYm)} e ${monthLabel(lastMonth!)} (dados abertos, valores líquidos de glosas).` : undefined}
            />
          )}
        </tbody>
      </table>
      <SourceLine>
        Fontes:{" "}
        <a className="underline hover:text-accent" href={rem.subsidio.fonte.url} target="_blank" rel="noopener noreferrer">
          {rem.subsidio.fonte.rotulo}
        </a>
        {casa === "camara" ? (
          <>
            {"; "}
            <a className="underline hover:text-accent" href={rem.camara.cota.fonte.url} target="_blank" rel="noopener noreferrer">
              {rem.camara.cota.fonte.rotulo}
            </a>
          </>
        ) : (
          <>
            {"; "}
            <a className="underline hover:text-accent" href={rem.subsidio.fonteSenado.url} target="_blank" rel="noopener noreferrer">
              {rem.subsidio.fonteSenado.rotulo}
            </a>
            {"; "}
            <a className="underline hover:text-accent" href={rem.senado.cota.fonte.url} target="_blank" rel="noopener noreferrer">
              {rem.senado.cota.fonte.rotulo}
            </a>
          </>
        )}
        .
      </SourceLine>
    </Card>
  );
}

/* --------------------------------------------------------- despesas */

export function ExpensesSection({ expenses, casa, updated }: { expenses: Expenses; casa: Casa; updated: string }) {
  const name = casa === "camara" ? "cota parlamentar (CEAP)" : "CEAPS";
  if (!expenses) {
    return (
      <Card id="despesas" title={`Despesas da ${name}`}>
        <p className="text-sm text-muted">Não há despesas registradas nos dados abertos para este mandato até o momento.</p>
      </Card>
    );
  }
  const last12 = expenses.porMes.slice(-12);
  const maxMonth = Math.max(1, ...last12.map((m) => m.total));
  const latestYear = expenses.porAno.at(-1);
  return (
    <Card
      id="despesas"
      title={`Despesas da ${name}`}
      note={`Valores líquidos (já descontadas glosas) reembolsados no mandato atual, desde fevereiro de 2023. O ano mais recente (${latestYear?.ano}) está incompleto. Dados oficiais, atualizados em ${updated}.`}
    >
      <p className="text-sm text-muted">
        Total no mandato: <strong className="text-foreground">{formatBRL(expenses.total)}</strong> em {formatInt(expenses.documentos)} documentos.
      </p>

      <h3 className="mt-5 label-mono text-muted">Por ano</h3>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <caption className="sr-only">Despesas por ano</caption>
          <tbody>
            {expenses.porAno.map((y) => (
              <tr key={y.ano} className="border-t border-border">
                <th scope="row" className="w-16 py-2 text-left font-medium">
                  {y.ano}
                </th>
                <td className="py-2 pr-3">
                  <span className="block h-3 overflow-hidden rounded-sm bg-surface-2" aria-hidden="true">
                    <span className="block h-full rounded-sm bg-accent" style={{ width: `${(y.total / Math.max(1, ...expenses.porAno.map((x) => x.total))) * 100}%` }} />
                  </span>
                </td>
                <td className="whitespace-nowrap py-2 text-right font-mono text-xs tabular-nums">{formatBRL(y.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-6 label-mono text-muted">Por categoria (mandato atual)</h3>
      <BarList
        className="mt-2"
        labelWidth="minmax(8rem,14rem)"
        max={expenses.porCategoria[0]?.total}
        items={expenses.porCategoria.slice(0, 10).map((c) => ({
          label: sentence(c.categoria),
          value: Math.max(0, c.total),
          display: `${formatBRLShort(c.total)} · ${formatPct(pct(c.total, expenses.total), 0)}`,
          hint: c.categoria,
        }))}
      />

      {expenses.porAno.length > 0 && (
        <details className="mt-4 rounded-lg border border-border bg-surface-2/40 p-3">
          <summary className="cursor-pointer text-sm font-medium">Categorias por ano</summary>
          <div className="mt-3 space-y-4">
            {[...expenses.porAno].reverse().map((y) => (
              <div key={y.ano}>
                <p className="text-sm font-semibold">
                  {y.ano} <span className="font-mono text-xs font-normal text-muted">{formatBRL(y.total)}</span>
                </p>
                <ul className="mt-1 space-y-0.5 text-xs text-muted">
                  {y.categorias.slice(0, 8).map((c) => (
                    <li key={c.categoria} className="flex justify-between gap-3">
                      <span className="truncate">{sentence(c.categoria)}</span>
                      <span className="shrink-0 font-mono tabular-nums">{formatBRL(c.total)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      )}

      <h3 className="mt-6 label-mono text-muted">Últimos {last12.length} meses</h3>
      <div className="mt-2 flex h-28 items-end gap-1" role="img" aria-label="Gasto mensal nos últimos meses">
        {last12.map((m) => (
          <div key={m.mes} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1" title={`${monthLabel(m.mes)}: ${formatBRL(m.total)}`}>
            <span className="w-full rounded-t-sm bg-accent" style={{ height: `${Math.max(2, (Math.max(0, m.total) / maxMonth) * 100)}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-1 text-[10px] text-muted">
        {last12.map((m) => (
          <span key={m.mes} className="min-w-0 flex-1 text-center">
            {m.mes.slice(5)}
          </span>
        ))}
      </div>

      {expenses.fornecedores.length > 0 && (
        <>
          <h3 className="mt-6 label-mono text-muted">Maiores fornecedores (pessoas jurídicas)</h3>
          <ul className="mt-2 divide-y divide-border text-sm">
            {expenses.fornecedores.map((f) => (
              <li key={f.cnpj} className="flex justify-between gap-3 py-1.5">
                <span className="min-w-0 truncate">{f.nome}</span>
                <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{formatBRL(f.total)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------ votos */

type VoteCount = { label: string; value: number; tone: Segment["tone"] };

export function VotesSection({
  casa,
  counts,
  total,
  rows,
  dict,
  updated,
  extraNote,
}: {
  casa: Casa;
  counts: VoteCount[];
  /** Denominador dos percentuais (votações nominais em que o parlamentar consta). */
  total: number;
  rows: VoteRow[];
  dict: (CamaraVote | SenadoVote)[];
  updated: string;
  extraNote: React.ReactNode;
}) {
  const first = rows.slice(0, 100);
  const rest = rows.slice(100);
  return (
    <Card id="votos" title="Votações nominais no Plenário" note={<>Dados oficiais, atualizados em {updated}. {extraNote}</>}>
      {total === 0 ? (
        <p className="text-sm text-muted">Nenhuma votação nominal registrada para este parlamentar no mandato atual.</p>
      ) : (
        <>
          <StackedBar
            ariaLabel="Distribuição dos registros em votações nominais"
            total={total}
            segments={counts.filter((c) => c.value > 0)}
          />
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {counts.map((c) => (
              <div key={c.label} className="rounded-lg border border-border p-3">
                <dt className="label-mono text-muted">{c.label}</dt>
                <dd className="mt-0.5 font-display text-xl font-bold tabular-nums">
                  {formatInt(c.value)} <span className="font-mono text-xs font-normal text-muted">{formatPct(pct(c.value, total))}</span>
                </dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-6 font-display text-base font-bold">Últimas {first.length} votações</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <caption className="sr-only">Votações nominais mais recentes</caption>
              {VOTE_TABLE_HEAD}
              <tbody>
                <VoteTableRows casa={casa} rows={first} dict={dict} />
              </tbody>
            </table>
          </div>
          <MoreVotes casa={casa} rows={rest} />
        </>
      )}
    </Card>
  );
}

/* ------------------------------------------------------ proposições */

export function PropositionsSection({ props, casa }: { props: Propositions; casa: Casa }) {
  const types = Object.entries(props.porTipo);
  const link = (id: number) =>
    casa === "camara"
      ? `https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=${id}`
      : `https://www25.senado.leg.br/web/atividade/materias/-/materia/${id}`;
  return (
    <Card
      id="proposicoes"
      title="Proposições de autoria"
      note="Inclui proposições em coautoria apresentadas desde 1º/02/2023. Quantidade não mede qualidade nem produtividade: requerimentos e emendas contam como proposições."
    >
      <p className="text-sm text-muted">
        <strong className="text-foreground">{formatInt(props.total)}</strong> proposições no mandato, sendo{" "}
        <strong className="text-foreground">{formatInt(props.primeiroAutor)}</strong> como {casa === "camara" ? "primeiro(a) signatário(a)" : "autor(a) principal"}.
      </p>
      {types.length > 0 && (
        <p className="mt-2 text-xs text-muted">
          Por tipo:{" "}
          {types.map(([t, n], i) => (
            <span key={t}>
              {i > 0 && " · "}
              {t} {formatInt(n)}
            </span>
          ))}
        </p>
      )}
      {props.recentes.length > 0 && (
        <>
          <h3 className="mt-5 label-mono text-muted">Projetos e propostas mais recentes</h3>
          <ul className="mt-2 divide-y divide-border">
            {props.recentes.map((p) => (
              <li key={`${p.id}-${p.titulo}`} className="py-2.5">
                <a href={link(p.id)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-accent hover:underline">
                  {p.titulo}
                </a>
                <span className="ml-2 font-mono text-xs text-muted">{p.data.slice(8, 10)}/{p.data.slice(5, 7)}/{p.data.slice(0, 4)}</span>
                <p className="mt-0.5 text-xs leading-snug text-muted">{p.ementa}</p>
                {p.situacao && <p className="mt-0.5 text-xs text-muted">Situação: {p.situacao}</p>}
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}

/* ----------------------------------------------------- metodologia */

export function Methodology({ casa, updated }: { casa: Casa; updated: string }) {
  return (
    <section aria-labelledby="metodologia" className="rounded-xl border border-border bg-surface-2/50 p-5 text-sm leading-relaxed text-muted">
      <h2 id="metodologia" className="font-display text-base font-bold text-foreground">
        Fontes e metodologia
      </h2>
      <p className="mt-2">
        Fonte: dados abertos {casa === "camara" ? "da Câmara dos Deputados (dadosabertos.camara.leg.br)" : "do Senado Federal (legis.senado.leg.br/dadosabertos e adm.senado.gov.br)"}, coletados e atualizados em {updated}. Não editamos os valores; só os somamos e organizamos. Nenhum dado pessoal sensível (CPF, endereço residencial) é publicado.
      </p>
      {casa === "camara" ? (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Votações:</strong> consideramos as votações nominais do Plenário (aquelas com voto individual registrado) desde 1º/02/2023.
          </li>
          <li>
            <strong className="text-foreground">&quot;Sem voto registrado&quot;:</strong> votação nominal do Plenário, em dia em que o histórico oficial indica o deputado em exercício, sem voto dele no registro. O primeiro e o último dia de cada período de exercício são desconsiderados, para não contar de forma errada trocas de titular e suplente.
          </li>
          <li>
            <strong className="text-foreground">O que isso NÃO significa:</strong> não é o mesmo que falta em sessão. Não mostra se o deputado estava presente sem votar, em missão oficial, licença, trabalho em comissão ou plenário, nem se houve justificativa. Votações simbólicas, que não registram voto individual, ficam de fora.
          </li>
          <li>
            <strong className="text-foreground">Cota parlamentar:</strong> soma dos valores líquidos dos documentos fiscais reembolsados. Valores podem ser corrigidos pela Câmara depois da coleta.
          </li>
        </ul>
      ) : (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Votações:</strong> votações nominais do Plenário do Senado desde 1º/02/2023, no registro oficial de cada sessão.
          </li>
          <li>
            <strong className="text-foreground">Categorias de ausência:</strong> o Senado registra o motivo (licença, missão oficial, atividade parlamentar, presente sem voto ou não compareceu). Mostramos cada uma separadamente, sem somar tudo como &quot;falta&quot;.
          </li>
          <li>
            <strong className="text-foreground">Voto secreto:</strong> em votações secretas o sistema registra apenas que o senador votou, sem o sentido do voto.
          </li>
          <li>
            <strong className="text-foreground">CEAPS:</strong> valores reembolsados conforme a base oficial de despesas, somados por ano e categoria.
          </li>
        </ul>
      )}
      <p className="mt-2">
        Encontrou um erro? Compare com a página oficial do parlamentar, que prevalece, e{" "}
        <Link href="/contato" className="text-accent underline">
          fale com a redação
        </Link>
        . Veja também nossa{" "}
        <Link href="/politica-editorial" className="text-accent underline">
          política editorial
        </Link>
        .
      </p>
    </section>
  );
}
