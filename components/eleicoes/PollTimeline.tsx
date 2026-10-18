import Link from "next/link";
import { acerto2026, diasEntre, fmtCampo, fmtDate, getMeta, pesquisasSegundoTurno, type Pesquisa2 } from "@/lib/eleicoes";
import { ExternalLink, Panel, Section, TableWrap, td, th } from "./Shared";

/**
 * Linha do tempo das pesquisas do 2º turno (Lula x Flávio Bolsonaro) em SVG. Cada pesquisa vira um ponto por candidato na
 * data final do campo, em votos válidos entre os dois, com barra da margem de erro. Dados: data/eleicoes/pesquisas.json.
 * Cores do tema (azul e âmbar), com formas diferentes (círculo e losango) para não depender só da cor.
 */

const W = 720;
const H = 360;
const M = { l: 44, r: 16, t: 16, b: 40 };
const Y0 = 40;
const Y1 = 60;
const num = (n: number, d = 1) => n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

type Ponto = { p: Pesquisa2; flavio: number; lula: number; margem: number; dx: number };

function pontos(polls: Pesquisa2[]): Ponto[] {
  const validos = polls.filter((p) => p.flavio !== null && p.lula !== null);
  const porDia = new Map<string, number>();
  return validos.map((p) => {
    const f = p.flavio as number;
    const l = p.lula as number;
    const soma = f + l;
    const n = porDia.get(p.campoFim) ?? 0;
    porDia.set(p.campoFim, n + 1);
    return { p, flavio: (f / soma) * 100, lula: (l / soma) * 100, margem: p.margem * (100 / soma), dx: n };
  });
}

export function PollTimeline() {
  const polls = pesquisasSegundoTurno();
  const meta = getMeta();
  const pts = pontos(polls);
  if (pts.length === 0) return null;
  const dias = pts.map((x) => x.p.campoFim).sort();
  const d0 = dias[0];
  const dFim = meta.eleicao.turno2;
  const span = diasEntre(d0, dFim) + 1;
  const px = (iso: string, dx = 0) => M.l + ((diasEntre(d0, iso) + 0.5) / span) * (W - M.l - M.r) + (dx - 0.5) * 9;
  const py = (v: number) => M.t + ((Y1 - v) / (Y1 - Y0)) * (H - M.t - M.b);
  const ticks: string[] = [];
  for (let i = 0; i <= diasEntre(d0, dFim); i += 3) ticks.push(new Date(Date.parse(`${d0}T00:00:00Z`) + i * 86400000).toISOString().slice(0, 10));
  if (!ticks.includes(dFim)) ticks.push(dFim);
  const melhor = acerto2026().linhas[0];

  return (
    <Section
      id="linha-do-tempo"
      kicker="Pesquisas do segundo turno"
      title="Linha do tempo: Lula x Flávio Bolsonaro"
      lead={`Cada ponto é uma pesquisa registrada, na data final do campo, em votos válidos entre os dois candidatos. A barra vertical é a margem de erro. Quando as barras de dois pontos se cruzam, a diferença está dentro da margem. Pesquisa é retrato do momento, não previsão. Cada linha tem fonte e registro na tabela abaixo do gráfico.`}
    >
      <Panel>
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="tl-t tl-d">
          <title id="tl-t">Pesquisas do segundo turno entre Lula e Flávio Bolsonaro por data de campo</title>
          <desc id="tl-d">
            {pts.map((x) => `${x.p.instituto}, campo até ${fmtDate(x.p.campoFim)}: Flávio Bolsonaro ${num(x.flavio)}% e Lula ${num(x.lula)}% dos votos válidos, margem de ${num(x.margem)} pontos`).join(". ")}
          </desc>
          {[40, 45, 50, 55, 60].map((v) => (
            <g key={v}>
              <line x1={M.l} x2={W - M.r} y1={py(v)} y2={py(v)} stroke="var(--border)" strokeWidth={v === 50 ? 0 : 1} />
              <text x={M.l - 6} y={py(v) + 4} textAnchor="end" fontSize="15" fill="var(--muted)">{v}%</text>
            </g>
          ))}
          <line x1={M.l} x2={W - M.r} y1={py(50)} y2={py(50)} stroke="var(--foreground)" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x={W - M.r - 2} y={py(50) - 5} textAnchor="end" fontSize="13" fill="var(--muted)">50%: empate</text>
          {ticks.map((t) => (
            <text key={t} x={px(t)} y={H - M.b + 18} textAnchor="middle" fontSize="15" fill="var(--muted)">{fmtCampo(t, t)}</text>
          ))}
          <line x1={px(dFim)} x2={px(dFim)} y1={M.t} y2={H - M.b} stroke="var(--foreground)" strokeOpacity="0.5" />
          <text x={px(dFim) - 4} y={M.t + 12} textAnchor="end" fontSize="13" fill="var(--muted)">votação</text>
          {pts.map((x) => {
            const gx = px(x.p.campoFim, x.dx);
            const rotulo = `${x.p.instituto}, campo ${fmtCampo(x.p.campoInicio, x.p.campoFim)}: Flávio ${num(x.flavio)}%, Lula ${num(x.lula)}% (votos válidos), margem ±${num(x.margem)}`;
            return (
              <g key={x.p.id}>
                <title>{rotulo}</title>
                {[
                  { v: x.flavio, c: "var(--accent)", sq: false },
                  { v: x.lula, c: "var(--accent-2)", sq: true },
                ].map((s) => (
                  <g key={s.c}>
                    <line x1={gx} x2={gx} y1={py(Math.min(Y1, s.v + x.margem))} y2={py(Math.max(Y0, s.v - x.margem))} stroke={s.c} strokeWidth="1.5" strokeOpacity="0.7" />
                    {s.sq ? (
                      <rect x={gx - 4.5} y={py(s.v) - 4.5} width="9" height="9" fill={s.c} stroke="var(--background)" strokeWidth="1.5" transform={`rotate(45 ${gx} ${py(s.v)})`} />
                    ) : (
                      <circle cx={gx} cy={py(s.v)} r="5" fill={s.c} stroke="var(--background)" strokeWidth="1.5" />
                    )}
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
          <li className="inline-flex items-center gap-1.5"><span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />Flávio Bolsonaro (círculo)</li>
          <li className="inline-flex items-center gap-1.5"><span aria-hidden="true" className="inline-block h-2.5 w-2.5 rotate-45 bg-accent-2" />Lula (losango)</li>
          <li>Eixo vertical: % dos votos válidos entre os dois. Passe o cursor ou toque no ponto para ver o instituto.</li>
        </ul>
        <details className="mt-4">
          <summary className="cursor-pointer font-sans text-sm font-bold">Dados de cada ponto: instituto, amostra, margem, registro e fonte</summary>
          <div className="mt-3">
            <TableWrap caption="Pesquisas do segundo turno usadas no gráfico" min={820}>
              <thead>
                <tr>
                  <th className={th} scope="col">Instituto</th>
                  <th className={th} scope="col">Campo</th>
                  <th className={`${th} text-right`} scope="col">Amostra</th>
                  <th className={`${th} text-right`} scope="col">Margem</th>
                  <th className={th} scope="col">Registro TSE</th>
                  <th className={`${th} text-right`} scope="col">Flávio (válidos)</th>
                  <th className={`${th} text-right`} scope="col">Lula (válidos)</th>
                  <th className={th} scope="col">Fonte</th>
                </tr>
              </thead>
              <tbody>
                {[...pts].sort((a, b) => b.p.campoFim.localeCompare(a.p.campoFim) || a.p.instituto.localeCompare(b.p.instituto, "pt-BR")).map((x) => (
                  <tr key={x.p.id}>
                    <th scope="row" className={`${td} text-left font-semibold`}>{x.p.instituto}</th>
                    <td className={`${td} whitespace-nowrap`}>{fmtCampo(x.p.campoInicio, x.p.campoFim)}</td>
                    <td className={`${td} text-right font-mono text-xs tabular-nums`}>{x.p.amostra.toLocaleString("pt-BR")}</td>
                    <td className={`${td} text-right font-mono text-xs tabular-nums`}>±{num(x.p.margem)}</td>
                    <td className={`${td} font-mono text-xs`}>{x.p.registro ?? <span className="font-sans text-muted">não confirmado</span>}</td>
                    <td className={`${td} text-right font-mono text-xs tabular-nums`}>{num(x.flavio)}%</td>
                    <td className={`${td} text-right font-mono text-xs tabular-nums`}>{num(x.lula)}%</td>
                    <td className={`${td} text-xs`}><ExternalLink href={x.p.materia.url}>{x.p.materia.veiculo}</ExternalLink></td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
            <p className="mt-2 text-xs text-muted">Pesquisas divulgadas com indecisos foram recalculadas só entre os dois candidatos (cada um dividido pela soma dos dois); a margem foi ajustada na mesma proporção.</p>
          </div>
        </details>
      </Panel>
      <div className="mt-4 border-l-4 border-accent bg-surface-2 p-3 text-sm leading-relaxed">
        <p className="label-mono text-accent">Ranking de acerto dos institutos</p>
        <p className="mt-1">
          No 1º turno, a última pesquisa do <strong>{melhor.poll.instituto}</strong> ficou mais perto do resultado do TSE, com erro médio de {num(melhor.erroMedio, 2)} p.p. entre os seis principais candidatos.{" "}
          <Link href="/eleicoes/pesquisas#ranking" className="font-semibold text-accent underline underline-offset-2">Veja o ranking completo e a metodologia</Link>.
        </p>
      </div>
    </Section>
  );
}
