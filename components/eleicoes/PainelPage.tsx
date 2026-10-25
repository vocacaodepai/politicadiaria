import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import {
  calendario,
  fmtDate,
  fmtDateTime,
  fmtInt,
  fmtPct,
  finalistas,
  getMeta,
  getResultados,
  segundoTurnoComecou,
  type Candidato,
  type Governador,
} from "@/lib/eleicoes";
import { Badge, Bars, ExternalLink, Legend, Panel, Section, SubNav, TableWrap, Tile, td, th, type BarRow, type Tone } from "./Shared";

const PATH = "/eleicoes";
const TITLE = "Eleições 2026: resultados, segundo turno e calendário";
const DESC =
  "Painel das eleições gerais de 2026 com dados do TSE: presidente (1º turno e 2º turno), governadores, Senado, Câmara, cláusula de desempenho e datas até a posse.";

export const eleicoesMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

const sobrenome = (nome: string) => nome.split(" ").slice(-1)[0];

function situacaoRotulo(s: string): string {
  if (s === "2º turno") return "Vai ao 2º turno";
  if (s === "Eleito") return "Eleito";
  return "";
}

function candidatoRows(c: Candidato[], tones?: Record<string, Tone>): BarRow[] {
  return c.map((x, i) => ({
    label: x.nome,
    sub: `${x.partido}${x.federacao ? ` · ${x.federacao}` : ""}`,
    value: x.pct,
    display: `${fmtPct(x.pct)} · ${fmtInt(x.votos)}`,
    tone: tones?.[x.nome] ?? (i === 0 ? "a" : "n"),
    badge: situacaoRotulo(x.situacao) ? <Badge tone={x.situacao === "Eleito" ? "strong" : "soft"}>{situacaoRotulo(x.situacao)}</Badge> : undefined,
  }));
}

/* --------------------------------------------------------------- presidente */

function Turno2Presidente({ fin }: { fin: Candidato[] }) {
  const r = getResultados().presidente.turno2;
  const meta = getMeta();
  const comecou = segundoTurnoComecou();
  const tones: Record<string, Tone> = { [fin[0].nome]: "a", [fin[1].nome]: "b" };
  return (
    <Panel
      title={`Segundo turno, ${fmtDate(meta.eleicao.turno2)}`}
      note={
        comecou
          ? `Apuração: ${fmtPct(r.apuracao.pctSecoesTotalizadas, 2)} das seções. Arquivo do TSE gerado em ${r.tse.data} às ${r.tse.hora}.`
          : "As barras mostram o resultado do 2º turno assim que o TSE divulgar a apuração. A regra é a mesma do 1º turno: vence quem tiver mais da metade dos votos válidos, sem contar brancos e nulos."
      }
    >
      <p className="text-sm leading-relaxed">
        {comecou ? (
          <>Disputa entre {fin[0].nome} ({fin[0].partido}) e {fin[1].nome} ({fin[1].partido}).</>
        ) : (
          <>
            Aguardando a votação de {fmtDate(meta.eleicao.turno2)}. Disputam {fin[0].nome} ({fin[0].partido}) e {fin[1].nome} ({fin[1].partido}), na ordem alfabética do sobrenome.
          </>
        )}
      </p>
      <div className="mt-4">
        <Bars
          ariaLabel="Resultado do segundo turno para presidente"
          rows={r.candidatos.map((c) => ({
            label: c.nome,
            sub: c.partido,
            value: comecou ? c.pct : 0,
            display: comecou ? `${fmtPct(c.pct)} · ${fmtInt(c.votos)}` : "aguardando",
            tone: tones[c.nome] ?? "n",
            badge: comecou && c.situacao === "Eleito" ? <Badge tone="strong">Eleito</Badge> : undefined,
          }))}
          max={100}
          marker={50}
          markerLabel="50% dos votos válidos"
          labelWidth="8.5rem"
          valueWidth="9.5rem"
        />
        <Legend items={[{ tone: "a", label: fin[0].nome }, { tone: "b", label: fin[1].nome }]} />
      </div>
      <p className="mt-3 text-xs text-muted">
        Quer ver o que as pesquisas dizem? <Link href="/eleicoes/pesquisas#segundo-turno" className="text-accent underline underline-offset-2">Pesquisas do 2º turno</Link>.
      </p>
    </Panel>
  );
}

function Presidente() {
  const res = getResultados().presidente;
  const t1 = res.turno1;
  const fin = finalistas();
  const [a, b] = t1.candidatos;
  const diff = a.votos - b.votos;
  const validosPct = (t1.votos.validos / t1.votos.totais) * 100;
  const alguemEleito = t1.candidatos.some((c) => c.situacao === "Eleito");
  const tones: Record<string, Tone> = { [fin[0].nome]: "a", [fin[1].nome]: "b" };
  return (
    <Section
      id="presidente"
      kicker="Presidente da República"
      title={`Primeiro turno: ${fin[0].nome} e ${fin[1].nome} vão ao segundo`}
      lead={
        <>
          {a.nome} ({a.partido}) teve {fmtPct(a.pct)} dos votos válidos e {b.nome} ({b.partido}), {fmtPct(b.pct)}: uma diferença de {fmtInt(diff)} votos, ou {(a.pct - b.pct).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} p.p.{" "}
          {alguemEleito ? "Houve candidato eleito no 1º turno." : "Nenhum candidato passou de 50% dos votos válidos, por isso a disputa foi decidida em segundo turno."}
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile label="Apuração" value={fmtPct(t1.apuracao.pctSecoesTotalizadas, 2)} hint={`${fmtInt(t1.apuracao.secoesTotalizadas)} de ${fmtInt(t1.apuracao.secoesTotal)} seções`} />
        <Tile label="Comparecimento" value={fmtPct(t1.eleitorado.pctComparecimento)} hint={`${fmtInt(t1.eleitorado.comparecimento)} de ${fmtInt(t1.eleitorado.aptos)} eleitores aptos`} />
        <Tile label="Abstenção" value={fmtPct(t1.eleitorado.pctAbstencao)} hint={`${fmtInt(t1.eleitorado.abstencoes)} eleitores não compareceram`} />
        <Tile
          label="Brancos e nulos"
          value={fmtPct(t1.votos.pctBrancos + t1.votos.pctNulos)}
          hint={`Brancos: ${fmtInt(t1.votos.brancos)} (${fmtPct(t1.votos.pctBrancos)}). Nulos: ${fmtInt(t1.votos.nulos)} (${fmtPct(t1.votos.pctNulos)}). Votos válidos: ${fmtPct(validosPct)} de quem compareceu.`}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Panel
          title="Votos por candidato no 1º turno"
          note={`Porcentagem sobre os votos válidos (sem brancos e nulos), como o TSE calcula. A linha vertical marca 50%. Dados do TSE, arquivo gerado em ${t1.tse.data} às ${t1.tse.hora}.`}
        >
          <Bars ariaLabel="Votos por candidato a presidente no primeiro turno" rows={candidatoRows(t1.candidatos, tones)} max={100} marker={50} markerLabel="50% dos votos válidos" labelWidth="11rem" valueWidth="9.5rem" />
          <Legend items={[{ tone: "a", label: `${fin[0].nome}, finalista` }, { tone: "b", label: `${fin[1].nome}, finalista` }, { tone: "n", label: "demais candidatos" }]} />
        </Panel>
        <Turno2Presidente fin={fin} />
      </div>

      <details className="mt-4 border border-border bg-surface p-4">
        <summary className="cursor-pointer font-sans text-sm font-bold">Tabela completa do 1º turno</summary>
        <div className="mt-3">
          <TableWrap caption="Resultado do primeiro turno para presidente" min={600}>
            <thead>
              <tr>
                <th className={th} scope="col">#</th>
                <th className={th} scope="col">Candidato</th>
                <th className={th} scope="col">Partido</th>
                <th className={`${th} text-right`} scope="col">Votos</th>
                <th className={`${th} text-right`} scope="col">% válidos</th>
                <th className={th} scope="col">Situação</th>
              </tr>
            </thead>
            <tbody>
              {t1.candidatos.map((c, i) => (
                <tr key={c.numero}>
                  <td className={`${td} font-mono text-xs`}>{i + 1}</td>
                  <th scope="row" className={`${td} text-left font-semibold`}>
                    {c.nome}
                    {c.vice && <span className="block text-xs font-normal text-muted">Vice: {c.vice}</span>}
                  </th>
                  <td className={td}>{c.partido}</td>
                  <td className={`${td} text-right font-mono text-xs tabular-nums`}>{fmtInt(c.votos)}</td>
                  <td className={`${td} text-right font-mono text-xs tabular-nums`}>{fmtPct(c.pct)}</td>
                  <td className={td}>{c.situacao}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </div>
      </details>
    </Section>
  );
}

/* -------------------------------------------------------------- governadores */

function GovCard({ g }: { g: Governador }) {
  const t1 = g.turno1.candidatos.slice(0, 2);
  const t2 = g.turno2;
  const comecou = Boolean(t2 && t2.apuracao.pctSecoesTotalizadas > 0);
  const tones: Record<string, Tone> = { [t1[0].nome]: "a", [t1[1].nome]: "b" };
  return (
    <article className="border border-border bg-surface p-4">
      <header className="flex items-baseline justify-between gap-2">
        <h4 className="font-display text-lg font-bold leading-tight">{g.estado}</h4>
        <Badge tone="soft">2º turno</Badge>
      </header>
      <p className="mt-1 text-xs text-muted">Resultado do 1º turno, % dos votos válidos. A linha marca 50%.</p>
      <div className="mt-3">
        <Bars
          ariaLabel={`Governador de ${g.estado}, primeiro turno`}
          rows={t1.map((c) => ({ label: c.nome, sub: c.partido, value: c.pct, display: fmtPct(c.pct), tone: tones[c.nome] }))}
          max={100}
          marker={50}
          markerLabel="50% dos votos válidos"
          labelWidth="8.5rem"
        />
      </div>
      <p className="mt-3 text-xs text-muted">
        Outros {g.turno1.candidatos.length - 2} candidatos somaram {fmtPct(g.turno1.candidatos.slice(2).reduce((a, c) => a + c.pct, 0))}.
        {t1[0].pct - t1[1].pct < 1 ? " Diferença menor que 1 ponto percentual entre os dois." : ""}
      </p>
      <div className="mt-3 border-t border-border pt-3 text-sm">
        {t2 ? (
          comecou ? (
            <Bars
              ariaLabel={`Governador de ${g.estado}, segundo turno`}
              rows={t2.candidatos.map((c) => ({ label: c.nome, sub: c.partido, value: c.pct, display: fmtPct(c.pct), tone: tones[c.nome] ?? "n", badge: c.situacao === "Eleito" ? <Badge tone="strong">Eleito</Badge> : undefined }))}
              max={100}
              marker={50}
              labelWidth="8.5rem"
            />
          ) : (
            <p className="text-muted">2º turno em 25/10: aguardando a votação.</p>
          )
        ) : (
          <p className="text-muted">
            O TSE marca os dois candidatos com &quot;2º turno&quot;, mas ainda não publicou o arquivo de apuração do 2º turno deste estado.
          </p>
        )}
      </div>
    </article>
  );
}

function Governadores() {
  const gov = getResultados().governadores;
  const segundo = gov.filter((g) => g.segundoTurno);
  const eleitos = gov.filter((g) => !g.segundoTurno);
  return (
    <Section
      id="governadores"
      kicker="Governadores"
      title={`${eleitos.length} eleitos no 1º turno e ${segundo.length} estados com segundo turno`}
      lead="Nos estados, vence no 1º turno quem passa de 50% dos votos válidos. Quem não chegou lá disputa o 2º turno em 25 de outubro, contra o segundo colocado."
    >
      <h3 className="font-display text-xl font-bold">Vão ao segundo turno</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {segundo.map((g) => (
          <GovCard key={g.uf} g={g} />
        ))}
      </div>

      <h3 className="mt-8 font-display text-xl font-bold">Eleitos no primeiro turno</h3>
      <div className="mt-3">
        <TableWrap caption="Governadores eleitos no primeiro turno" min={620}>
          <thead>
            <tr>
              <th className={th} scope="col">Estado</th>
              <th className={th} scope="col">Eleito(a)</th>
              <th className={`${th} text-right`} scope="col">% válidos</th>
              <th className={th} scope="col">Segundo colocado</th>
              <th className={`${th} text-right`} scope="col">% válidos</th>
            </tr>
          </thead>
          <tbody>
            {eleitos.map((g) => {
              const [a, b] = g.turno1.candidatos;
              return (
                <tr key={g.uf}>
                  <th scope="row" className={`${td} text-left font-semibold`}>
                    {g.estado} <span className="font-mono text-xs font-normal text-muted">{g.uf}</span>
                  </th>
                  <td className={td}>
                    {a.nome} <span className="text-xs text-muted">{a.partido}</span>
                  </td>
                  <td className={`${td} text-right font-mono text-xs tabular-nums`}>{fmtPct(a.pct)}</td>
                  <td className={td}>
                    {b.nome} <span className="text-xs text-muted">{b.partido}</span>
                  </td>
                  <td className={`${td} text-right font-mono text-xs tabular-nums`}>{fmtPct(b.pct)}</td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      </div>
      <p className="mt-2 text-xs text-muted">
        Fonte: TSE, resultados 2026, cargo de governador. Os nomes seguem o nome de urna registrado no TSE.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------- senado */

function Senado() {
  const s = getResultados().senado;
  const max = Math.max(...s.porPartido.map((p) => p.n));
  const porUf = new Map<string, typeof s.eleitos>();
  for (const e of s.eleitos) porUf.set(e.uf, [...(porUf.get(e.uf) ?? []), e]);
  return (
    <Section
      id="senado"
      kicker="Senado Federal"
      title={`${s.eleitosTotal} senadores eleitos, dois por estado`}
      lead="Em 2026 foram renovadas 54 das 81 cadeiras: duas por estado e pelo Distrito Federal, com mandato de oito anos a partir de 1º de fevereiro de 2027. Cada eleitor votou em dois candidatos, e os dois mais votados de cada unidade foram eleitos no 1º turno."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Eleitos por partido" note="Contagem dos eleitos em 2026, sem os 27 senadores que continuam no cargo até 2031. Fonte: TSE.">
          <Bars
            ariaLabel="Senadores eleitos por partido"
            rows={s.porPartido.map((p) => ({ label: p.sigla, value: p.n, display: `${p.n} · ${fmtPct((p.n / s.eleitosTotal) * 100, 1)}` }))}
            max={max}
            labelWidth="6rem"
            valueWidth="5.5rem"
          />
        </Panel>
        <Panel title="Eleitos por estado" note="Lista dos dois mais votados em cada unidade, com votos.">
          <details>
            <summary className="cursor-pointer font-sans text-sm font-bold">Ver os {s.eleitosTotal} nomes</summary>
            <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {[...porUf.entries()].map(([uf, list]) => (
                <li key={uf} className="text-sm">
                  <p className="font-mono text-xs font-bold text-muted">{uf}</p>
                  {list.map((e) => (
                    <p key={e.nome} className="leading-snug">
                      {e.nome} <span className="text-xs text-muted">{e.partido} · {fmtInt(e.votos)} votos</span>
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </details>
        </Panel>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- câmara */

function Camara() {
  const c = getResultados().camara;
  const max = Math.max(...c.porPartido.map((p) => p.n));
  const ag = c.agrupamentos;
  const nao = ag.filter((a) => a.clausula === "nao");
  const rotulo = (k: "votos" | "cadeiras" | "nao") => (k === "nao" ? <Badge>Abaixo do mínimo</Badge> : k === "votos" ? <Badge tone="soft">Atingiu pelos votos</Badge> : <Badge tone="soft">Atingiu pelas cadeiras</Badge>);
  return (
    <Section
      id="camara"
      kicker="Câmara dos Deputados"
      title={`${fmtInt(c.eleitosTotal)} deputados federais eleitos`}
      lead={`Todas as 513 cadeiras foram renovadas, com mandato de 1º de fevereiro de 2027 a 1º de fevereiro de 2031. A maioria simples é de 257 deputados. Os números abaixo contam os eleitos por partido de origem; federações (como a de PT, PCdoB e PV) votam e valem como um bloco para a cláusula de desempenho.`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Panel title="Bancadas eleitas, por partido" note="Cada barra é o número de deputados eleitos pelo partido. Não há cor por partido: o objetivo é comparar tamanhos. Fonte: TSE.">
          <Bars
            ariaLabel="Deputados federais eleitos por partido"
            rows={c.porPartido.map((p) => ({ label: p.sigla, value: p.n, display: `${p.n} · ${fmtPct((p.n / c.eleitosTotal) * 100, 1)}` }))}
            max={max}
            labelWidth="8.5rem"
            valueWidth="5.5rem"
          />
        </Panel>
        <Panel title="Cláusula de desempenho (cláusula de barreira)" note={<>Cálculo do Política Diária com os dados do TSE: soma dos votos de legenda e nominais de cada partido ou federação em todos os estados, dividida pelo total de votos válidos para a Câmara ({fmtInt(c.votosValidosNacional)}). A lista oficial é a do TSE; o cálculo próprio pode diferir em casas decimais. Regra de 2026 segundo o <ExternalLink href="https://www.em.com.br/politica/2026/10/7514783-clausula-de-barreira-veja-as-siglas-que-podem-sumir-do-mapa.html">Estado de Minas</ExternalLink>.</>}>
          <p className="text-sm leading-relaxed">{c.clausulaRegra.texto}</p>
          <p className="mt-2 text-sm leading-relaxed">
            Quem não cumpre fica sem acesso regular ao fundo partidário e ao tempo gratuito de rádio e TV, mas o partido continua existindo.
          </p>
          <p className="mt-3 text-sm">
            <strong>{ag.filter((a) => a.clausula !== "nao").length}</strong> partidos ou federações atingiram o mínimo por algum dos critérios;{" "}
            <strong>{nao.filter((a) => a.cadeiras > 0).length}</strong> elegeram deputados, mas ficaram abaixo.
          </p>
        </Panel>
      </div>
      <div className="mt-6">
        <TableWrap caption="Partidos e federações: cadeiras, votos e cláusula de desempenho" min={720}>
          <thead>
            <tr>
              <th className={th} scope="col">Partido ou federação</th>
              <th className={`${th} text-right`} scope="col">Cadeiras</th>
              <th className={`${th} text-right`} scope="col">% dos votos válidos</th>
              <th className={`${th} text-right`} scope="col">Estados com 1,5% ou mais</th>
              <th className={`${th} text-right`} scope="col">Estados com eleito</th>
              <th className={th} scope="col">Cláusula</th>
            </tr>
          </thead>
          <tbody>
            {ag.filter((a) => a.cadeiras > 0 || a.pctVotos >= 0.5).map((a) => (
              <tr key={a.sigla}>
                <th scope="row" className={`${td} text-left font-semibold`}>
                  {a.sigla.replace(/\//g, " / ")}
                  {a.federacao && <span className="block text-xs font-normal text-muted">federação</span>}
                </th>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{a.cadeiras}</td>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{fmtPct(a.pctVotos)}</td>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{a.ufsAcimaDe1_5}</td>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{a.ufsComCadeira}</td>
                <td className={td}>{rotulo(a.clausula)}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <p className="mt-2 text-xs text-muted">
          Ficam fora da tabela os {ag.filter((a) => a.cadeiras === 0 && a.pctVotos < 0.5).length} partidos sem cadeira e com menos de 0,5% dos votos válidos ({ag.filter((a) => a.cadeiras === 0 && a.pctVotos < 0.5).map((a) => a.sigla).join(", ")}).
        </p>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------- calendário e fontes */

function Calendario() {
  const itens = calendario();
  return (
    <Section id="calendario" kicker="Calendário" title="O que vem a seguir" lead="Do segundo turno à posse. Datas com fonte; o que não pôde ser confirmado aparece indicado.">
      <ol className="relative border-l-2 border-foreground/70 pl-6">
        {itens.map((i) => (
          <li key={i.titulo} className="relative pb-6 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[1.95rem] top-1 h-3 w-3 border-2 border-foreground ${i.situacao === "concluido" ? "bg-foreground" : i.situacao === "proximo" ? "bg-accent" : "bg-background"}`}
            />
            <p className="font-mono text-xs text-muted">
              {i.dataRotulo ?? fmtDate(i.data)}{" "}
              {i.situacao === "concluido" ? <Badge>Concluído</Badge> : i.situacao === "proximo" ? <Badge tone="strong">Próximo</Badge> : null}
              {!i.confirmada && <Badge tone="soft">Data a confirmar</Badge>}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold leading-tight">{i.titulo}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{i.descricao}</p>
            {i.fonte && (
              <p className="mt-1 text-xs">
                Fonte: <ExternalLink href={i.fonte.url}>{i.fonte.rotulo}</ExternalLink>
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Fontes() {
  const meta = getMeta();
  return (
    <Section id="fontes" kicker="Transparência" title="Fontes e atualização">
      <div className="border border-border bg-surface p-4 sm:p-5">
        <p className="text-sm">
          <strong>Atualizado em {fmtDateTime(meta.atualizadoEm)}</strong> (horário de Brasília). Os dados de apuração são lidos do portal de resultados do TSE por um script
          (<code className="font-mono text-xs">npm run eleicoes:update</code>) e conferidos antes de publicar. Cada número desta página vem de uma das fontes abaixo.
        </p>
        <ul className="mt-4 space-y-3 text-sm">
          {meta.fontes.map((f) => (
            <li key={f.url}>
              <ExternalLink href={f.url}>{f.rotulo}</ExternalLink>
              <span className="block text-xs text-muted">{f.uso}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-5 font-sans text-xs font-bold uppercase tracking-[0.1em] text-muted">Arquivos do TSE lidos nesta coleta</h3>
        <ul className="mt-2 space-y-2 text-xs">
          {meta.fontesResultados.map((f) => (
            <li key={f.rotulo}>
              <span className="font-semibold">{f.rotulo}</span>
              {f.arquivoTse && <span className="text-muted"> (gerado pelo TSE em {f.arquivoTse.data} às {f.arquivoTse.hora})</span>}
              <span className="block break-all font-mono text-[0.7rem] text-muted">{f.url}</span>
            </li>
          ))}
        </ul>
        {meta.avisosColeta && meta.avisosColeta.length > 0 && (
          <div className="mt-5 border-l-4 border-accent-2 bg-surface-2 p-3 text-sm leading-relaxed">
            <p className="label-mono text-muted">Observação da coleta</p>
            {meta.avisosColeta.map((a) => (
              <p key={a}>{a}</p>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs text-muted">
          Resultados são de apuração e podem mudar até a diplomação, por recursos na Justiça Eleitoral. Esta página não faz juízo de nenhum candidato ou partido: mostra números e quem está à frente neles.
        </p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- página */

export function PainelPage() {
  const res = getResultados();
  const meta = getMeta();
  const gov = res.governadores;
  const segundo = gov.filter((g) => g.segundoTurno);
  const fin = finalistas();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESC,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    dateModified: meta.atualizadoEm,
    hasPart: [{ "@type": "WebPage", name: "Pesquisas e ranking de acerto", url: absoluteUrl("/eleicoes/pesquisas") }],
  };
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Eleições 2026", path: PATH }])} />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Eleições 2026" }]} className="mb-6" />
        <ListingHeader
          label="Eleições 2026"
          title="Eleições 2026: o painel do primeiro turno e do que vem a seguir"
          description="Resultados do TSE para presidente, governadores, Senado e Câmara, quem está na frente, quem foi ao segundo turno e as datas até a posse. Números apurados, com fonte e hora da coleta."
          count={`Atualizado em ${fmtDateTime(meta.atualizadoEm)} · fonte: TSE`}
        />
        <SubNav active="painel" />

        <Link
          href="/eleicoes/dia-da-eleicao"
          className="mt-6 block border-2 border-accent bg-surface p-4 hover:bg-surface-2"
        >
          <span className="label-mono text-accent">2º turno · domingo, 25 de outubro</span>
          <span className="mt-1 block font-display text-xl font-bold leading-tight sm:text-2xl">Dia da eleição: como votar e acompanhar a apuração</span>
          <span className="mt-1 block text-sm text-muted">Horário, documentos, celular, ordem do voto e apuração de presidente e governadores com dados do TSE.</span>
        </Link>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Tile label="Presidente" value={`${sobrenome(fin[0].nome)} x ${sobrenome(fin[1].nome)}`} hint={`2º turno em ${fmtDate(meta.eleicao.turno2)}`} />
          <Tile label="Governadores" value={`${gov.length - segundo.length} eleitos`} hint={`${segundo.length} estados em 2º turno: ${segundo.map((g) => g.uf).join(", ")}`} />
          <Tile label="Senado" value={`${res.senado.eleitosTotal} eleitos`} hint="de 54 vagas renovadas" />
          <Tile label="Câmara" value={`${res.camara.eleitosTotal} eleitos`} hint="todas as 513 cadeiras" />
        </div>

        <nav aria-label="Nesta página" className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {[
            ["presidente", "Presidente"],
            ["governadores", "Governadores"],
            ["senado", "Senado"],
            ["camara", "Câmara"],
            ["calendario", "Calendário"],
            ["fontes", "Fontes"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
              {label}
            </a>
          ))}
        </nav>

        <Presidente />
        <Link href="/promessas" className="mt-10 block border-2 border-foreground bg-surface p-4 hover:bg-surface-2">
          <span className="label-mono text-accent">Depois da eleição</span>
          <span className="mt-1 block font-display text-xl font-bold leading-tight sm:text-2xl">Painel de promessas: o que cada candidato prometeu</span>
          <span className="mt-1 block text-sm text-muted">Propostas dos planos de governo de Lula e Flávio Bolsonaro, com página e fonte. A partir da posse, o painel acompanha o eleito com dados oficiais.</span>
        </Link>
        <Governadores />
        <Senado />
        <Camara />
        <Calendario />
        <Fontes />

        <p className="mt-10 text-sm text-muted">
          Para conhecer quem são os 513 deputados e 81 senadores em exercício, veja <Link href="/congresso" className="text-accent underline underline-offset-2">Congresso por dentro</Link>. Sobre pesquisas de intenção de voto e quanto elas acertaram, veja{" "}
          <Link href="/eleicoes/pesquisas" className="text-accent underline underline-offset-2">pesquisas e ranking de acerto</Link>.
        </p>
      </Container>
    </>
  );
}
