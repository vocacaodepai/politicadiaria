import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import {
  acerto2026,
  acertoHistorico,
  fmtCampo,
  fmtDate,
  fmtDateTime,
  fmtPct,
  getMeta,
  getPesquisas,
  pesquisasSegundoTurno,
  quadroGeral,
  segundoTurnoComecou,
  type AcertoConjunto,
  type AcertoLinha,
  type Pesquisa2,
} from "@/lib/eleicoes";
import { Badge, ExternalLink, Panel, Section, SubNav, TableWrap, Tile, td, th } from "./Shared";

const PATH = "/eleicoes/pesquisas";
const TITLE = "Pesquisas eleitorais 2026 e ranking de acerto dos institutos";
const DESC =
  "As últimas pesquisas de intenção de voto por instituto, o ranking de quem mais se aproximou do resultado do 1º turno de 2026 e o histórico de 2022 e 2018, com a conta explicada.";

export const pesquisasMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

const stick = "sticky left-0 z-[1] bg-surface";

const num = (n: number, d = 1) => n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
const signed = (n: number, d = 1) => `${n > 0 ? "+" : n < 0 ? "-" : ""}${num(Math.abs(n), d)}`;
const pub = (n: number | undefined) => (n === undefined ? "-" : `${n.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`);

function Registro({ r }: { r: string | null }) {
  return r ? <span className="font-mono text-xs">{r}</span> : <span className="text-xs text-muted">não confirmado</span>;
}

function FonteMateria({ p }: { p: { materia: { url: string; veiculo: string } } }) {
  return (
    <a href={p.materia.url} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline underline-offset-2">
      {p.materia.veiculo}
    </a>
  );
}

/* ------------------------------------------------------------- segundo turno */

function MiniDuelo({ a, b, nomeA, nomeB }: { a: number; b: number; nomeA: string; nomeB: string }) {
  const total = a + b;
  const pa = (a / total) * 100;
  return (
    <div className="min-w-32">
      <div className="flex h-2.5 w-full" role="img" aria-label={`${nomeA} ${num(pa)}% e ${nomeB} ${num(100 - pa)}% dos votos válidos`}>
        <span className="h-full bg-accent" style={{ width: `${pa}%` }} />
        <span className="h-full bg-accent-2" style={{ width: `${100 - pa}%` }} />
      </div>
      <p className="mt-1 font-mono text-[0.7rem] tabular-nums text-muted">
        {num(pa)} x {num(100 - pa)}
      </p>
    </div>
  );
}

function linhaSegundo(p: Pesquisa2) {
  const a = p.flavio ?? 0;
  const b = p.lula ?? 0;
  const diff = a - b;
  const lider = diff === 0 ? "Empate numérico" : `${diff > 0 ? "Flávio Bolsonaro" : "Lula"} +${num(Math.abs(diff))}`;
  return { a, b, diff, lider };
}

function SegundoTurno() {
  const polls = pesquisasSegundoTurno();
  const comecou = segundoTurnoComecou();
  return (
    <Section
      id="segundo-turno"
      kicker="Segundo turno, 25 de outubro"
      title="Flávio Bolsonaro e Lula: pesquisas depois do 1º turno"
      lead={
        comecou
          ? "A votação do 2º turno já começou: o resultado oficial está no painel. As pesquisas abaixo são anteriores à apuração."
          : "Tabela de pesquisas feitas depois do 1º turno, da mais recente para a mais antiga. Quando saírem novas pesquisas, elas entram aqui."
      }
    >
      {polls.length === 0 ? (
        <Panel>
          <p className="text-sm">Aguardando novas pesquisas do 2º turno.</p>
        </Panel>
      ) : (
        <>
          <TableWrap caption="Pesquisas de segundo turno para presidente: Flávio Bolsonaro e Lula" min={900}>
            <thead>
              <tr>
                <th className={`${th} ${stick}`} scope="col">Instituto</th>
                <th className={th} scope="col">Campo</th>
                <th className={`${th} text-right`} scope="col">Amostra</th>
                <th className={`${th} text-right`} scope="col">Margem</th>
                <th className={th} scope="col">Registro TSE</th>
                <th className={`${th} text-right`} scope="col">Flávio Bolsonaro</th>
                <th className={`${th} text-right`} scope="col">Lula</th>
                <th className={`${th} text-right`} scope="col">Indecisos</th>
                <th className={th} scope="col">Em votos válidos</th>
                <th className={th} scope="col">Diferença</th>
                <th className={th} scope="col">Fonte</th>
              </tr>
            </thead>
            <tbody>
              {polls.map((p) => {
                const l = linhaSegundo(p);
                return (
                  <tr key={p.id}>
                    <th scope="row" className={`${td} ${stick} text-left font-semibold`}>
                      {p.instituto}
                      {p.base === "validos" && <span className="block text-xs font-normal text-muted">divulgou em válidos</span>}
                    </th>
                    <td className={`${td} whitespace-nowrap`}>{fmtCampo(p.campoInicio, p.campoFim)}</td>
                    <td className={`${td} text-right font-mono text-xs tabular-nums`}>{p.amostra.toLocaleString("pt-BR")}</td>
                    <td className={`${td} text-right font-mono text-xs tabular-nums`}>±{num(p.margem)}</td>
                    <td className={td}><Registro r={p.registro} /></td>
                    <td className={`${td} text-right font-mono tabular-nums`}>{p.flavio !== null ? `${num(p.flavio)}%` : "-"}</td>
                    <td className={`${td} text-right font-mono tabular-nums`}>{p.lula !== null ? `${num(p.lula)}%` : "-"}</td>
                    <td className={`${td} text-right font-mono text-xs tabular-nums`}>{p.indecisos !== null ? `${num(p.indecisos)}%` : "-"}</td>
                    <td className={td}>
                      <MiniDuelo a={l.a} b={l.b} nomeA="Flávio Bolsonaro" nomeB="Lula" />
                    </td>
                    <td className={`${td} text-xs`}>
                      {l.lider} p.p.
                    </td>
                    <td className={`${td} text-xs`}><FonteMateria p={p} /></td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrap>
          <p className="mt-2 text-xs text-muted">
            Barra: <span className="inline-block h-2 w-3 bg-accent align-middle" /> Flávio Bolsonaro e <span className="inline-block h-2 w-3 bg-accent-2 align-middle" /> Lula, recalculados em votos válidos (cada um dividido pela soma dos dois). Pesquisas que já divulgam em votos válidos aparecem assim marcadas. Margem de erro é por candidato, em pontos percentuais.
          </p>
        </>
      )}
    </Section>
  );
}

/* ----------------------------------------------------------- 1º turno: últimas */

function Ultimas({ c }: { c: AcertoConjunto }) {
  const keys = ["flavio", "lula", "cury", "caiado", "renan", "zema"];
  const polls = [...getPesquisas().primeiroTurno2026].sort((a, b) => b.campoFim.localeCompare(a.campoFim) || a.instituto.localeCompare(b.instituto, "pt-BR"));
  return (
    <Section
      id="ultimas"
      kicker="Antes do primeiro turno"
      title="As últimas pesquisas de cada instituto e o resultado"
      lead="Última pesquisa divulgada por cada instituto até a véspera da votação de 4 de outubro, como foi publicada (em votos totais, com indecisos, brancos e nulos). A última linha traz o resultado apurado pelo TSE, em votos válidos."
    >
      <TableWrap caption="Últimas pesquisas de primeiro turno por instituto e resultado do TSE" min={980}>
        <thead>
          <tr>
            <th className={`${th} ${stick}`} scope="col">Instituto</th>
            <th className={th} scope="col">Campo</th>
            <th className={`${th} text-right`} scope="col">Amostra</th>
            <th className={`${th} text-right`} scope="col">Margem</th>
            <th className={th} scope="col">Registro TSE</th>
            {keys.map((k) => (
              <th key={k} className={`${th} text-right`} scope="col">
                {c.nomes[k]}
              </th>
            ))}
            <th className={`${th} text-right`} scope="col">Indecisos</th>
            <th className={th} scope="col">Fonte</th>
          </tr>
        </thead>
        <tbody>
          {polls.map((p) => (
            <tr key={p.id}>
              <th scope="row" className={`${td} ${stick} text-left font-semibold`}>
                {p.instituto}
                {p.observacao && <span className="block max-w-48 text-xs font-normal text-muted">{p.observacao}</span>}
              </th>
              <td className={`${td} whitespace-nowrap`}>{fmtCampo(p.campoInicio, p.campoFim)}</td>
              <td className={`${td} text-right font-mono text-xs tabular-nums`}>{p.amostra.toLocaleString("pt-BR")}</td>
              <td className={`${td} text-right font-mono text-xs tabular-nums`}>±{num(p.margem)}</td>
              <td className={td}><Registro r={p.registro} /></td>
              {keys.map((k) => (
                <td key={k} className={`${td} text-right font-mono text-xs tabular-nums`}>{pub(p.valores[k])}</td>
              ))}
              <td className={`${td} text-right font-mono text-xs tabular-nums`}>{p.indecisos !== null ? `${num(p.indecisos)}%` : "-"}</td>
              <td className={`${td} text-xs`}><FonteMateria p={p} /></td>
            </tr>
          ))}
          <tr className="bg-surface-2">
            <th scope="row" className={`${td} ${stick} bg-surface-2 text-left font-bold`}>Resultado (TSE, válidos)</th>
            <td className={td} colSpan={4}>{fmtDate(c.dataVotacao)}</td>
            {keys.map((k) => (
              <td key={k} className={`${td} text-right font-mono text-xs font-bold tabular-nums`}>{fmtPct(c.resultado[k])}</td>
            ))}
            <td className={td}>-</td>
            <td className={td}>-</td>
          </tr>
        </tbody>
      </TableWrap>
      <p className="mt-2 text-xs text-muted">
        &quot;-&quot; indica que o instituto não divulgou o número; valores como &quot;&lt;1%&quot; foram tratados como zero nas contas. Alguns institutos publicam em votos válidos (AtlasIntel, por exemplo) e outros em votos totais. Registro no TSE: só consta quando a fonte compilada o traz.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ ranking */

function Resposta({ ok, sim, nao }: { ok: boolean; sim: string; nao: string }) {
  return <Badge tone={ok ? "soft" : "plain"}>{ok ? sim : nao}</Badge>;
}

function barraErro(v: number, max: number): ReactNode {
  return (
    <div className="flex items-center gap-2">
      <span className="relative block h-2.5 w-20 bg-surface-2" aria-hidden="true">
        <span className="block h-full bg-accent" style={{ width: `${Math.min(100, (v / max) * 100)}%` }} />
      </span>
      <span className="font-mono text-xs font-bold tabular-nums">{num(v, 2)}</span>
    </div>
  );
}

function TabelaRanking({ c, caption, detalhe = true }: { c: AcertoConjunto; caption: string; detalhe?: boolean }) {
  const [l1, l2] = c.lideres;
  const max = Math.max(...c.linhas.map((l) => l.erroMedio)) * 1.0;
  const nome = (k: string) => c.nomes[k];
  return (
    <TableWrap caption={caption} min={detalhe ? 1000 : 760}>
      <thead>
        <tr>
          <th className={th} scope="col">#</th>
          <th className={`${th} ${stick}`} scope="col">Instituto</th>
          <th className={th} scope="col">Fim do campo</th>
          <th className={th} scope="col">Erro médio (p.p.)</th>
          {detalhe && (
            <>
              <th className={`${th} text-right`} scope="col">Erro: {nome(l1)}</th>
              <th className={`${th} text-right`} scope="col">Erro: {nome(l2)}</th>
              <th className={`${th} text-right`} scope="col">Maior erro</th>
            </>
          )}
          <th className={th} scope="col">Diferença entre 1º e 2º</th>
          <th className={th} scope="col">1º colocado</th>
          <th className={th} scope="col">Dois primeiros</th>
          {detalhe && <th className={th} scope="col">Líderes na margem</th>}
          <th className={th} scope="col">Fonte</th>
        </tr>
      </thead>
      <tbody>
        {c.linhas.map((l: AcertoLinha, i) => (
          <tr key={l.poll.id}>
            <td className={`${td} font-mono text-xs`}>{i + 1}</td>
            <th scope="row" className={`${td} ${stick} text-left font-semibold`}>
              {l.poll.instituto}
              <span className="block text-xs font-normal text-muted">{l.poll.amostra.toLocaleString("pt-BR")} entrevistas, ±{num(l.poll.margem)}</span>
            </th>
            <td className={`${td} whitespace-nowrap`}>
              {fmtDate(l.poll.campoFim)}
              <span className="block text-xs text-muted">{l.diasAteVotacao === 1 ? "1 dia antes" : `${l.diasAteVotacao} dias antes`}</span>
            </td>
            <td className={td}>{barraErro(l.erroMedio, max)}</td>
            {detalhe && (
              <>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{signed(l.erro[l1])}</td>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{signed(l.erro[l2])}</td>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{num(l.erroMaximo)}</td>
              </>
            )}
            <td className={`${td} text-xs`}>
              <span className="font-mono tabular-nums">{signed(l.erroDiferenca)} p.p.</span>
              <span className="block text-muted">{l.erroDiferenca === 0 ? "igual ao resultado" : l.erroDiferenca > 0 ? `mostrou ${nome(l1)} mais à frente` : `mostrou ${nome(l1)} menos à frente`}</span>
            </td>
            <td className={td}><Resposta ok={l.acertouPrimeiro} sim="Acertou" nao="Errou" /></td>
            <td className={td}><Resposta ok={l.acertouFinalistas} sim="Acertou" nao="Errou" /></td>
            {detalhe && (
              <td className={`${td} text-xs`}>
                {l.lideresNaMargem} de 2
              </td>
            )}
            <td className={`${td} text-xs`}><FonteMateria p={l.poll} /></td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

function Ranking({ c }: { c: AcertoConjunto }) {
  const [l1, l2] = c.lideres;
  const total = c.linhas.length;
  const primeiro = c.linhas.filter((l) => l.acertouPrimeiro).length;
  const fin = c.linhas.filter((l) => l.acertouFinalistas).length;
  const melhor = c.linhas[0];
  const pior = c.linhas[c.linhas.length - 1];
  return (
    <Section
      id="ranking"
      kicker="Ranking de acerto"
      title="Quem chegou mais perto do resultado do 1º turno"
      lead="Para cada instituto, comparamos a última pesquisa antes da votação com o resultado apurado pelo TSE. Menor erro médio, mais perto do resultado. A conta está explicada mais abaixo."
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile label="Institutos comparados" value={total} hint={c.excluidas.length ? `${c.excluidas.length} fora da conta, por informação incompleta` : "todos com dados completos"} />
        <Tile label="Menor erro médio" value={`${num(melhor.erroMedio, 2)} p.p.`} hint={melhor.poll.instituto} />
        <Tile label="Maior erro médio" value={`${num(pior.erroMedio, 2)} p.p.`} hint={pior.poll.instituto} />
        <Tile label="Acertaram os dois primeiros" value={`${fin} de ${total}`} hint={`${primeiro} de ${total} acertaram quem ficou em 1º (${c.nomes[l1]}); dois primeiros: ${c.nomes[l1]} e ${c.nomes[l2]}`} />
      </div>
      <div className="mt-6">
        <TabelaRanking c={c} caption="Ranking de acerto das pesquisas de primeiro turno de 2026" />
        <p className="mt-2 text-xs text-muted">
          Erro com sinal: positivo quando a pesquisa mostrou o candidato com mais votos do que teve; negativo quando mostrou menos. &quot;Líderes na margem&quot;: em quantos dos dois primeiros colocados o erro ficou dentro da margem de erro da pesquisa (ajustada para votos válidos).
        </p>
        {c.excluidas.length > 0 && (
          <div className="mt-4 border-l-4 border-accent-2 bg-surface-2 p-3 text-sm">
            <p className="label-mono text-muted">Fora da conta</p>
            {c.excluidas.map((e) => (
              <p key={e.poll.id} className="mt-1">
                <strong>{e.poll.instituto}</strong> (campo {fmtCampo(e.poll.campoInicio, e.poll.campoFim)}): {e.motivo}{" "}
                <FonteMateria p={e.poll} />
              </p>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- histórico */

function Historico({ c22, c18, c26 }: { c22: AcertoConjunto; c18: AcertoConjunto; c26: AcertoConjunto }) {
  const geral = quadroGeral([c18, c22, c26]);
  const p = getPesquisas();
  return (
    <Section
      id="historico"
      kicker="Histórico"
      title="E nas eleições anteriores? 2022 e 2018"
      lead="Mesma conta aplicada às últimas pesquisas de cada instituto antes do 1º turno de 2022 e de 2018, comparadas ao resultado oficial. Servem de contexto: poucos pontos de comparação não formam tendência."
    >
      <div className="space-y-8">
        {[c22, c18].map((c) => (
          <div key={c.ano}>
            <h3 className="font-display text-xl font-bold">
              {c.ano}: votação em {fmtDate(c.dataVotacao)}
            </h3>
            <p className="mt-1 text-sm text-muted">
              Resultado em votos válidos: {c.ordemResultado.slice(0, 4).map((k) => `${c.nomes[k]} ${fmtPct(c.resultado[k])}`).join(", ")}
              {c.ordemResultado.length > 4 ? ", entre outros" : ""}. Comparados: {c.principais.map((k) => c.nomes[k]).join(", ")} e os demais candidatos juntos.
            </p>
            <div className="mt-3">
              <TabelaRanking c={c} caption={`Ranking de acerto das pesquisas de ${c.ano}`} detalhe={false} />
            </div>
            <p className="mt-2 text-xs text-muted">
              Resultado: <ExternalLink href={c.fonteResultado.url}>{c.fonteResultado.rotulo}</ExternalLink>. Pesquisas em{" "}
              <ExternalLink href={p.compilacao.find((f) => f.rotulo.includes(String(c.ano)))?.url ?? p.compilacao[0].url}>compilação da Wikipédia</ExternalLink>, com a matéria de cada instituto linkada.
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="font-display text-xl font-bold">Quadro geral: quem aparece em mais de uma eleição</h3>
        <p className="mt-1 max-w-3xl text-sm text-muted">
          Para comparar anos diferentes, usamos o erro na diferença entre os dois primeiros colocados (em módulo, média das eleições), porque o número de candidatos comparados muda de ano para ano. Ordenado do menor para o maior.
        </p>
        <div className="mt-3">
          <TableWrap caption="Institutos com pesquisas em mais de uma eleição" min={640}>
            <thead>
              <tr>
                <th className={`${th} ${stick}`} scope="col">Instituto</th>
                <th className={th} scope="col">Eleições</th>
                <th className={th} scope="col">Posição em cada uma</th>
                <th className={th} scope="col">Erro na diferença entre 1º e 2º</th>
                <th className={`${th} text-right`} scope="col">Média (p.p.)</th>
              </tr>
            </thead>
            <tbody>
              {geral.map((r) => (
                <tr key={r.slug}>
                  <th scope="row" className={`${td} ${stick} text-left font-semibold`}>{r.instituto}</th>
                  <td className={td}>{r.anos.length}</td>
                  <td className={`${td} text-xs`}>{r.anos.map((y) => `${y.ano}: ${y.posicao}º de ${y.de}`).join(" · ")}</td>
                  <td className={`${td} text-xs`}>{r.anos.map((y) => `${y.ano}: ${signed(y.erroDiferenca)}`).join(" · ")}</td>
                  <td className={`${td} text-right font-mono text-xs font-bold tabular-nums`}>{num(r.mediaErroDiferenca, 2)}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </div>
        <p className="mt-2 text-xs text-muted">
          Ibope (2018) e Ipec (2022) são registros diferentes e não foram somados. Em cada eleição, entra a última pesquisa registrada do instituto que consta na compilação.
        </p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- método */

function Metodo({ c }: { c: AcertoConjunto }) {
  const ex = c.linhas.find((l) => l.poll.instituto === "Datafolha") ?? c.linhas[0];
  const [l1, l2] = c.lideres;
  const n = (k: string) => c.nomes[k];
  const v = (k: string) => ex.poll.valores[k] ?? 0;
  return (
    <Section id="metodo" kicker="Metodologia" title="Como a conta é feita, em linguagem simples">
      <ol className="max-w-3xl list-decimal space-y-3 pl-5 text-sm leading-relaxed sm:text-base">
        <li>
          <strong>Qual pesquisa entra.</strong> A última pesquisa de cada instituto cujo campo terminou até a véspera da votação. Se o instituto divulgou os números de só dois candidatos, ele fica fora, porque não dá para comparar com o resultado completo.
        </li>
        <li>
          <strong>Tirar indecisos, brancos e nulos.</strong> O TSE calcula a porcentagem de cada candidato sobre os votos válidos. Pesquisas costumam divulgar sobre todos os entrevistados. Para comparar, dividimos o número de cada candidato pela soma dos números de todos os candidatos da pesquisa. É como se os indecisos, brancos e nulos se dividissem na mesma proporção.
        </li>
        <li>
          <strong>Comparar com o resultado.</strong> Para cada candidato, o erro é a porcentagem da pesquisa (já em votos válidos) menos a porcentagem que ele teve nas urnas, em pontos percentuais (p.p.). O erro médio é a média desses erros sem sinal, nos {c.principais.length} candidatos comparados.
        </li>
        <li>
          <strong>Diferença entre 1º e 2º.</strong> Subtraímos a porcentagem do 2º colocado da do 1º na pesquisa e no resultado, e comparamos as duas diferenças. Mostra se o instituto exagerou ou diminuiu a vantagem de quem ficou na frente.
        </li>
        <li>
          <strong>Dentro da margem.</strong> A margem de erro é a divulgada pelo instituto. Como a conta foi feita em votos válidos, ela é ajustada na mesma proporção (margem x 100 dividida pela soma dos números da pesquisa).
        </li>
      </ol>

      <div className="mt-6 max-w-3xl border border-border bg-surface p-4 text-sm leading-relaxed">
        <p className="label-mono text-muted">Exemplo com números reais</p>
        <p className="mt-2">
          {ex.poll.instituto} (campo até {fmtDate(ex.poll.campoFim)}) divulgou {n(l1)} com {num(v(l1), v(l1) % 1 ? 1 : 0)}% e {n(l2)} com {num(v(l2), v(l2) % 1 ? 1 : 0)}%. Somando todos os candidatos da pesquisa, o total é {num(ex.somaPublicada, 1)}%. Em votos válidos: {n(l1)} {num(ex.parte[l1], 2)}% ({num(v(l1), v(l1) % 1 ? 1 : 0)} ÷ {num(ex.somaPublicada, 1)} × 100) e {n(l2)} {num(ex.parte[l2], 2)}%.
        </p>
        <p className="mt-2">
          O resultado do TSE foi {n(l1)} {fmtPct(c.resultado[l1])} e {n(l2)} {fmtPct(c.resultado[l2])}. Os erros: {n(l1)} {signed(ex.erro[l1], 2)} p.p. e {n(l2)} {signed(ex.erro[l2], 2)} p.p. A pesquisa dá erro médio de {num(ex.erroMedio, 2)} p.p. nos {c.principais.length} candidatos.
        </p>
      </div>

      <h3 className="mt-8 font-display text-xl font-bold">Ressalvas importantes</h3>
      <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
        <li><strong>Pesquisa é retrato do momento, não previsão.</strong> Ela mede a intenção de voto nos dias de campo; o eleitor pode mudar de ideia depois.</li>
        <li><strong>Datas diferentes.</strong> O último dia de campo vai de 1 a 7 dias antes da votação. Quem pesquisou mais perto da eleição teve menos tempo para o cenário mudar.</li>
        <li><strong>Votos válidos e votos totais.</strong> Institutos usam bases diferentes e o instituto pode ter sido preciso na base dele. A conversão acima é uma aproximação igual para todos.</li>
        <li><strong>Números inteiros.</strong> Muitas pesquisas arredondam para o inteiro; um candidato com 0,3% aparece como 0% ou 1%. Isso gera pequenos erros.</li>
        <li><strong>Poucos pontos de comparação.</strong> Um ranking de uma única eleição mistura habilidade e sorte. O histórico de 2022 e 2018 ajuda, mas ainda são poucas observações.</li>
      </ul>
      <p className="mt-4 max-w-3xl text-sm text-muted">
        Esta página só reporta números e explica a conta. Não avalia a qualidade de nenhum instituto além da distância entre a última pesquisa e o resultado.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------- fontes */

function Fontes() {
  const p = getPesquisas();
  const meta = getMeta();
  return (
    <Section id="fontes" kicker="Transparência" title="Fontes das pesquisas">
      <div className="border border-border bg-surface p-4 sm:p-5">
        <p className="text-sm">
          <strong>Dados conferidos em {fmtDate(p.coletadoEm)}.</strong> Resultado do 1º turno: TSE, atualizado em {fmtDateTime(meta.atualizadoEm)}.
        </p>
        <p className="mt-3 text-sm leading-relaxed">{p.observacao}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {p.compilacao.map((f) => (
            <li key={f.url}>
              <ExternalLink href={f.url}>{f.rotulo}</ExternalLink>
            </li>
          ))}
          <li>
            <ExternalLink href={p.registroTse.url}>{p.registroTse.rotulo}</ExternalLink>
            <span className="block text-xs text-muted">Para conferir o número de registro de uma pesquisa, use este sistema.</span>
          </li>
        </ul>
        <p className="mt-4 text-xs text-muted">
          Cada linha das tabelas tem um link para a matéria de imprensa ou do instituto que publicou a pesquisa. Alguns veículos bloqueiam leitores automáticos; nesses casos, os números foram conferidos com o título e o texto das demais coberturas disponíveis.
        </p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- página */

export function PesquisasPage() {
  const meta = getMeta();
  const c26 = acerto2026();
  const c22 = acertoHistorico(2022);
  const c18 = acertoHistorico(2018);
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESC,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    dateModified: meta.atualizadoEm,
    isPartOf: { "@type": "CollectionPage", name: "Eleições 2026", url: absoluteUrl("/eleicoes") },
  };
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Eleições 2026", path: "/eleicoes" }, { name: "Pesquisas", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Eleições 2026", href: "/eleicoes" }, { name: "Pesquisas" }]} className="mb-6" />
        <ListingHeader
          label="Eleições 2026"
          title="Pesquisas eleitorais e quem mais acertou"
          description="O que as pesquisas mostravam antes do 1º turno, o que saiu das urnas e a conta de quanto cada instituto errou. Mais as pesquisas do segundo turno, conforme forem saindo."
          count={`Resultado do TSE atualizado em ${fmtDateTime(meta.atualizadoEm)}`}
        />
        <SubNav active="pesquisas" />

        <div className="mt-6 border-l-4 border-accent-2 bg-surface-2 p-4 text-sm leading-relaxed">
          <p className="font-bold">Antes de ler</p>
          <p className="mt-1">
            Pesquisa eleitoral é um retrato do momento, não uma previsão. Cada instituto tem metodologia, datas de campo e jeito de divulgar diferentes. Aqui só medimos a distância entre a última pesquisa e o resultado das urnas. Veja a <a href="#metodo" className="text-accent underline underline-offset-2">metodologia</a>.
          </p>
        </div>

        <nav aria-label="Nesta página" className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {[
            ["segundo-turno", "Segundo turno"],
            ["ultimas", "Últimas do 1º turno"],
            ["ranking", "Ranking de acerto"],
            ["historico", "2022 e 2018"],
            ["metodo", "Metodologia"],
            ["fontes", "Fontes"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
              {label}
            </a>
          ))}
        </nav>

        <SegundoTurno />
        <Ultimas c={c26} />
        <Ranking c={c26} />
        <Historico c22={c22} c18={c18} c26={c26} />
        <Metodo c={c26} />
        <Fontes />

        <p className="mt-10 text-sm text-muted">
          Volte ao <Link href="/eleicoes" className="text-accent underline underline-offset-2">painel de resultados</Link>.
        </p>
      </Container>
    </>
  );
}
