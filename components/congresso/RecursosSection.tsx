import type { Expenses, Remuneracao } from "@/lib/congress";
import { formatBRL, formatInt, formatPct, pct } from "@/lib/congress";
import { getCamaraRecursos, getRecursosMeta, getSenadoRecursos, type CamaraRecursos, type SenadoRecursos } from "@/lib/congress-recursos";
import { SourceValue, expenseSourceUrl } from "./ProfileSections";
import { Card } from "./Stat";

const NI = "não informado pela fonte";
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dmy = (iso: string) => iso.split("-").reverse().join("/");

function Line({ label, children, note }: { label: string; children: React.ReactNode; note?: React.ReactNode }) {
  return (
    <tr className="border-t border-border align-top">
      <th scope="row" className="py-2 pr-4 text-left text-sm font-medium">
        {label}
        {note && <span className="mt-0.5 block text-xs font-normal leading-snug text-muted">{note}</span>}
      </th>
      <td className="py-2 text-right text-sm tabular-nums">{children}</td>
    </tr>
  );
}

const Src = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-accent" title="Conferir na fonte oficial">
    {children}
  </a>
);

/** Nota fixa sobre o que é e o que não é público (vale para qualquer parlamentar). */
export function PersonalSpendingNote() {
  return (
    <div className="mt-5 border-l-[3px] border-foreground bg-surface-2 p-3 text-sm leading-relaxed">
      <p className="font-semibold">Gastos pessoais não são dado público</p>
      <p className="mt-1 text-muted">
        O que um parlamentar paga com o próprio dinheiro (mercado, lazer, contas da casa, viagens particulares) é assunto privado e não consta em nenhuma base oficial aberta. Esta página não coleta nem mostra esse tipo de gasto.
      </p>
      <p className="mt-2 font-semibold">O que é público e está nesta página</p>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-muted">
        <li>o subsídio e as verbas pagas com dinheiro público (cota parlamentar com nota, verba de gabinete, auxílio-moradia, passagens e diárias);</li>
        <li>as contas de campanha que o candidato declarou à Justiça Eleitoral (receitas, despesas e bens declarados);</li>
        <li>a agenda oficial, as votações e as proposições.</li>
      </ul>
    </div>
  );
}

function passagens(expenses: Expenses) {
  return expenses?.porCategoria.find((c) => /passagens/i.test(c.categoria)) ?? null;
}

/* ---------------------------------------------------------------- Câmara */

function CamaraBlock({ r, rem, expenses, id }: { r: CamaraRecursos; rem: Remuneracao; expenses: Expenses; id: number }) {
  const v = r.verbaGabinete;
  const pass = passagens(expenses);
  const lastYear = expenses?.porAno.at(-1)?.ano ?? 2026;
  return (
    <>
      <table className="w-full border-collapse">
        <caption className="sr-only">Gabinete, benefícios e viagens</caption>
        <tbody>
          <Line
            label="Verba de gabinete usada no mandato"
            note={`Limite mensal de ${formatBRL(v?.tetoMensal ?? rem.camara.verbaGabinete.tetoMensal)} para pagar salários de secretários parlamentares (fonte: página do deputado no Portal da Câmara).`}
          >
            {v ? <Src href={r.fonte.verbaGabinete}>{formatBRL(v.totalGasto)}</Src> : NI}
          </Line>
          <Line label="Pessoal de gabinete" note="Secretários parlamentares e outros cargos do gabinete; só a quantidade é publicada aqui, sem nomes.">
            {r.pessoalGabinete ? (
              <Src href={r.fonte.pagina}>
                {formatInt(r.pessoalGabinete.noAno)} {r.pessoalGabinete.noAno === 1 ? "pessoa" : "pessoas"} neste ano
                {r.pessoalGabinete.ativas !== null ? `, ${formatInt(r.pessoalGabinete.ativas)} ativas hoje` : ""}
              </Src>
            ) : (
              NI
            )}
          </Line>
          <Line
            label="Quadro lotado no gabinete hoje"
            note={r.quadroGabinete ? r.quadroGabinete.porGrupo.map((g) => `${g.grupo}: ${g.n}`).join("; ") : "Arquivo aberto de funcionários da Câmara; só a contagem por tipo de vínculo, sem nomes."}
          >
            {r.quadroGabinete ? (
              <Src href="https://dadosabertos.camara.leg.br/arquivos/funcionarios/csv/funcionarios.csv">
                {formatInt(r.quadroGabinete.total)} {r.quadroGabinete.total === 1 ? "pessoa" : "pessoas"}
              </Src>
            ) : (
              NI
            )}
          </Line>
          <Line label="Auxílio-moradia" note={`Valor oficial: ${formatBRL(rem.camara.auxilioMoradia.valorMensal)} por mês, para quem não usa apartamento funcional.`}>
            {r.auxilioMoradia ? <Src href={r.fonte.pagina}>{r.auxilioMoradia.recebe ? "Recebe o auxílio" : "Não recebe o auxílio"}</Src> : NI}
          </Line>
          <Line label="Imóvel funcional">
            {r.imovelFuncional ? <Src href={r.fonte.pagina}>{r.imovelFuncional.usa ? `Faz uso${r.imovelFuncional.desde ? ` desde ${dmy(r.imovelFuncional.desde)}` : ""}` : "Não faz uso"}</Src> : NI}
          </Line>
          <Line label="Viagens em missão oficial">{r.viagensMissaoOficial !== null ? <Src href={r.fonte.pagina}>{formatInt(r.viagensMissaoOficial)}</Src> : NI}</Line>
          <Line label="Passaporte diplomático">{r.passaporteDiplomatico !== null ? <Src href={r.fonte.pagina}>{r.passaporteDiplomatico ? "Possui" : "Não possui"}</Src> : NI}</Line>
          <Line label="Passagens pagas pela cota (CEAP)" note="Passagens aéreas, aquáticas e terrestres reembolsadas pela cota no mandato.">
            {pass ? <SourceValue value={pass.total} href={expenseSourceUrl("camara", id, 2023, undefined, lastYear)} /> : NI}
          </Line>
        </tbody>
      </table>

      {v && (
        <>
          <h3 className="mt-5 label-mono text-muted">Verba de gabinete: total do ano e mês a mês</h3>
          <div className="mt-2 space-y-2">
            {[...v.anos].reverse().map((a, i) => (
              <details key={a.ano} className="rounded-lg border border-border px-3 py-2" open={i === 0}>
                <summary className="cursor-pointer text-sm font-medium">
                  {a.ano}: gasto <span className="font-mono tabular-nums">{formatBRL(a.totalGasto)}</span> de <span className="font-mono tabular-nums">{formatBRL(a.totalDisponivel)}</span> disponíveis ({formatPct(pct(a.totalGasto, a.totalDisponivel), 1)})
                </summary>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full min-w-[320px] border-collapse text-sm">
                    <caption className="sr-only">Verba de gabinete em {a.ano}</caption>
                    <thead>
                      <tr className="text-left">
                        <th scope="col" className="pb-1 label-mono text-muted">Mês</th>
                        <th scope="col" className="pb-1 text-right label-mono text-muted">Disponível</th>
                        <th scope="col" className="pb-1 text-right label-mono text-muted">Gasto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {a.meses.map((m) => (
                        <tr key={m.mes} className="border-t border-border">
                          <th scope="row" className="py-1 text-left font-normal capitalize">{MESES[Number(m.mes.slice(5, 7)) - 1]}</th>
                          <td className="py-1 text-right font-mono text-xs tabular-nums"><SourceValue value={m.disponivel} href={a.url} /></td>
                          <td className="py-1 text-right font-mono text-xs tabular-nums"><SourceValue value={m.gasto} href={a.url} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
          </div>
        </>
      )}
      <p className="mt-3 text-xs text-muted">
        Fonte: <Src href={r.fonte.pagina}>página oficial do deputado</Src> e <Src href={r.fonte.verbaGabinete}>verba de gabinete</Src> no Portal da Câmara
        {r.atualizadoNaFonte ? `, atualizadas na fonte em ${r.atualizadoNaFonte}` : ""}; coleta em {dmy(r.coletadoEm)}. Despesa ou documento sigiloso: {NI}.
      </p>
      {r.avisos.length > 0 && <p className="mt-1 text-xs text-muted">Itens que a página oficial não trouxe na coleta: {r.avisos.join("; ")}.</p>}
    </>
  );
}

/* ---------------------------------------------------------------- Senado */

function SenadoBlock({ r }: { r: SenadoRecursos }) {
  if (!r.anos.length) return <p className="text-sm text-muted">Recursos utilizados {NI}.</p>;
  return (
    <>
      <p className="text-sm text-muted">
        A API administrativa do Senado publica, por ano, a cota usada, os gastos que ficam fora da cota (diárias, correios e outros), o uso de auxílio-moradia e imóvel funcional e a quantidade de pessoal no gabinete e nos escritórios de apoio. O Senado não publica um teto de &quot;verba de gabinete&quot; em reais: só a quantidade de pessoas.
      </p>
      <div className="mt-3 space-y-2">
        {[...r.anos].reverse().map((a, i) => {
          const pass = a.cota.despesas.find((d) => /passagens/i.test(d.recurso));
          return (
            <details key={a.ano} className="rounded-lg border border-border px-3 py-2" open={i === 0}>
              <summary className="cursor-pointer text-sm font-medium">
                {a.ano}: cota <span className="font-mono tabular-nums">{formatBRL(a.cota.total)}</span>
                {a.foraDaCota.total > 0 && (
                  <>
                    {" "}e fora da cota <span className="font-mono tabular-nums">{formatBRL(a.foraDaCota.total)}</span>
                  </>
                )}
              </summary>
              <table className="mt-2 w-full border-collapse text-sm">
                <caption className="sr-only">Recursos utilizados em {a.ano}</caption>
                <tbody>
                  <Line label="Cota (CEAPS)">
                    <SourceValue value={a.cota.total} href={a.url} />
                  </Line>
                  <Line label="Passagens dentro da cota" note="Passagens aéreas, aquáticas e terrestres nacionais.">
                    {pass ? <SourceValue value={pass.valor} href={a.url} /> : NI}
                  </Line>
                  {a.foraDaCota.despesas
                    .filter((d) => d.valor > 0)
                    .map((d) => (
                      <Line key={d.recurso} label={`Fora da cota: ${d.recurso}`}>
                        <SourceValue value={d.valor} href={a.url} />
                      </Line>
                    ))}
                  {a.beneficios.map((b) => (
                    <Line key={b.beneficio} label={b.beneficio}>
                      <Src href={a.url}>{b.utilizacao}</Src>
                    </Line>
                  ))}
                  {a.pessoal.map((p) => (
                    <Line key={p.local} label={`Pessoal: ${p.local}`} note={p.vinculos.map((v) => `${v.vinculo}: ${v.quantidade}`).join("; ")}>
                      <Src href={a.url}>{formatInt(p.quantidade)} {p.quantidade === 1 ? "pessoa" : "pessoas"}</Src>
                    </Line>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-muted">
                <Src href={a.url}>Página oficial de {a.ano}</Src> · <Src href={a.fonteApi}>dados da API</Src>
              </p>
            </details>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">Fonte: Senado Federal, recursos utilizados por senador; coleta em {dmy(r.coletadoEm)}. Despesa ou documento sigiloso: {NI}.</p>
    </>
  );
}

export function RecursosSection({ casa, id, rem, expenses }: { casa: "camara" | "senado"; id: number; rem: Remuneracao; expenses: Expenses }) {
  const meta = getRecursosMeta();
  const cam = casa === "camara" ? getCamaraRecursos(id) : null;
  const sen = casa === "senado" ? getSenadoRecursos(id) : null;
  return (
    <Card
      id="gabinete"
      title="Gabinete, benefícios e viagens"
      note={meta ? `Só entra o que a fonte oficial publica; o que não consta aparece como "${NI}". Dados coletados em ${dmy(meta.atualizadoEm)}.` : undefined}
    >
      {casa === "camara" && cam && <CamaraBlock r={cam} rem={rem} expenses={expenses} id={id} />}
      {casa === "senado" && sen && <SenadoBlock r={sen} />}
      {!cam && !sen && <p className="text-sm text-muted">Estes dados ainda não foram coletados para este parlamentar.</p>}
      <PersonalSpendingNote />
    </Card>
  );
}
