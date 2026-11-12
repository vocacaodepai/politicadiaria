import type { Metadata } from "next";
import { Container } from "@/components/Container";
import {
  bloqueiosGerais,
  diasEmAberto,
  duracaoMin,
  formatDataHora,
  getFila,
  getRodadas,
  motivoLabels,
  prUrl,
  resumoPorRotina,
  rotinaLabels,
  type Contagem,
  type Motivo,
} from "@/lib/rotinas";

export const dynamic = "force-static";

/**
 * Painel interno das rotinas automáticas. Fora do sitemap (app/sitemap.ts não lista /interno),
 * sem link no menu e com robots noindex/nofollow. Lê o registro e a fila em tempo de build.
 */
export const metadata: Metadata = {
  title: "Painel interno das rotinas",
  description: "Página interna de acompanhamento das rotinas automáticas.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

const ULTIMAS = 10;

function Lista({ itens, vazio, rotulo }: { itens: Contagem[]; vazio: string; rotulo?: (c: string) => string }) {
  if (!itens.length) return <p className="mt-2 text-sm text-muted">{vazio}</p>;
  return (
    <ul className="mt-2 space-y-1 text-sm">
      {itens.slice(0, 8).map((c) => (
        <li key={c.chave} className="flex justify-between gap-4 border-b border-border pb-1">
          <span className="break-all">{rotulo ? rotulo(c.chave) : c.chave}</span>
          <span className="font-semibold tabular-nums">{c.total}</span>
        </li>
      ))}
    </ul>
  );
}

const th = "border-b border-foreground px-2 py-1.5 text-left font-semibold";
const td = "border-b border-border px-2 py-1.5 align-top";

export default function RotinasInternoPage() {
  const fila = getFila();
  const rodadas = getRodadas();
  const resumos = resumoPorRotina(rodadas);
  const bloqueios = bloqueiosGerais(rodadas);
  const referencia = Date.parse(fila.atualizadoEm) || Date.parse(rodadas[0]?.fim ?? "") || 0;
  const abertas = fila.pautas
    .filter((p) => p.status === "aberta")
    .sort((a, b) => a.primeiraVezVisto.localeCompare(b.primeiraVezVisto));
  const publicadas = fila.pautas.filter((p) => p.status === "publicada").length;
  const descartadas = fila.pautas.filter((p) => p.status === "descartada").length;

  return (
    <Container className="py-8 sm:py-10">
      <header className="border-t-[3px] border-foreground pt-3">
        <p className="label-mono text-accent">Interno</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Painel das rotinas</h1>
      </header>

      <aside
        aria-label="Aviso"
        role="note"
        className="mt-4 border border-foreground bg-surface-2 p-4 text-sm leading-relaxed"
      >
        <p className="label-mono text-accent">Página interna</p>
        <p className="mt-1">
          Esta página é de uso interno da redação: não aparece no menu, não entra no sitemap e pede aos buscadores que não a
          indexem. Mostra o que cada rodada das rotinas automáticas publicou, descartou ou teve bloqueado (arquivos em{" "}
          <code>content/rotinas/registro/</code>) e a fila de pautas (<code>content/pautas/fila.json</code>). Não há dado
          pessoal. Os números são atualizados a cada deploy.
        </p>
      </aside>

      <section className="mt-8" aria-labelledby="visao-geral">
        <h2 id="visao-geral" className="border-t-[3px] border-foreground pt-2 font-display text-2xl font-bold">
          Visão geral
        </h2>
        {rodadas.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            Nenhuma rodada registrada ainda. Cada rotina acrescenta um arquivo em content/rotinas/registro/ ao fim da rodada.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className={th}>Rotina</th>
                  <th className={th}>Rodadas</th>
                  <th className={th}>Com publicação</th>
                  <th className={th}>Itens publicados</th>
                  <th className={th}>Descartes</th>
                  <th className={th}>Bloqueios</th>
                  <th className={th}>Última rodada</th>
                </tr>
              </thead>
              <tbody>
                {resumos.map((r) => (
                  <tr key={r.rotina}>
                    <td className={td}>
                      <a href={`#rotina-${r.rotina}`}>{rotinaLabels[r.rotina]}</a>
                    </td>
                    <td className={`${td} tabular-nums`}>{r.total}</td>
                    <td className={`${td} tabular-nums`}>
                      {r.comPublicacao}
                      {r.total ? ` (${Math.round((100 * r.comPublicacao) / r.total)}%)` : ""}
                    </td>
                    <td className={`${td} tabular-nums`}>{r.itensPublicados}</td>
                    <td className={`${td} tabular-nums`}>{r.motivos.reduce((n, m) => n + m.total, 0)}</td>
                    <td className={`${td} tabular-nums`}>{r.bloqueios.reduce((n, b) => n + b.total, 0)}</td>
                    <td className={td}>{r.ultima ? formatDataHora(r.ultima.inicio) : "sem registro"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6 max-w-xl">
          <h3 className="font-semibold">Bloqueios mais frequentes (todas as rotinas)</h3>
          <Lista itens={bloqueios} vazio="Nenhum bloqueio registrado." />
        </div>
      </section>

      <section className="mt-10" aria-labelledby="fila">
        <h2 id="fila" className="border-t-[3px] border-foreground pt-2 font-display text-2xl font-bold">
          Fila de pautas abertas
        </h2>
        <p className="mt-2 text-sm text-muted">
          {abertas.length} aberta(s), {publicadas} publicada(s), {descartadas} descartada(s).
          {fila.atualizadoEm ? ` Fila atualizada em ${formatDataHora(fila.atualizadoEm)}.` : ""}
        </p>
        {abertas.length > 0 && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className={th}>Tema</th>
                  <th className={th}>Motivo</th>
                  <th className={th}>Rotina</th>
                  <th className={th}>Visto pela 1ª vez</th>
                  <th className={th}>Última revisão</th>
                  <th className={th}>Dias</th>
                  <th className={th}>Fontes abertas</th>
                </tr>
              </thead>
              <tbody>
                {abertas.map((p) => (
                  <tr key={p.id}>
                    <td className={td}>
                      {p.tema}
                      {p.falta ? <span className="block text-xs text-muted">Falta: {p.falta}</span> : null}
                    </td>
                    <td className={td}>{motivoLabels[p.motivo] ?? p.motivo}</td>
                    <td className={td}>{p.rotina ? rotinaLabels[p.rotina] : ""}</td>
                    <td className={td}>{formatDataHora(p.primeiraVezVisto)}</td>
                    <td className={td}>{formatDataHora(p.ultimaRevisao)}</td>
                    <td className={`${td} tabular-nums`}>{referencia ? diasEmAberto(p, referencia) : ""}</td>
                    <td className={td}>
                      {p.fontesAbertas.length === 0
                        ? "nenhuma"
                        : p.fontesAbertas.map((u) => (
                            <a key={u} href={u} target="_blank" rel="noopener noreferrer nofollow" className="block break-all">
                              {new URL(u).hostname}
                            </a>
                          ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {resumos.map((r) => (
        <section key={r.rotina} id={`rotina-${r.rotina}`} className="mt-10" aria-labelledby={`h-${r.rotina}`}>
          <h2 id={`h-${r.rotina}`} className="border-t-[3px] border-foreground pt-2 font-display text-2xl font-bold">
            {rotinaLabels[r.rotina]}
          </h2>
          {r.total === 0 ? (
            <p className="mt-2 text-sm text-muted">Nenhuma rodada registrada.</p>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted">
                {r.total} rodada(s) registrada(s), {r.comPublicacao} com publicação, {r.itensPublicados} item(ns) publicado(s).
              </p>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold">Motivos de descarte mais frequentes</h3>
                  <Lista
                    itens={r.motivos}
                    vazio="Nenhum descarte registrado."
                    rotulo={(m) => motivoLabels[m as Motivo] ?? m}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Bloqueios mais frequentes (host e erro)</h3>
                  <Lista itens={r.bloqueios} vazio="Nenhum bloqueio registrado." />
                </div>
              </div>
              <h3 className="mt-6 font-semibold">Últimas {Math.min(ULTIMAS, r.total)} rodadas</h3>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className={th}>Início</th>
                      <th className={th}>Duração</th>
                      <th className={th}>Publicou</th>
                      <th className={th}>Descartou</th>
                      <th className={th}>Bloqueios</th>
                      <th className={th}>PR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.rodadas.slice(0, ULTIMAS).map((x) => {
                      const link = prUrl(x);
                      return (
                        <tr key={x.arquivo}>
                          <td className={td}>{formatDataHora(x.inicio)}</td>
                          <td className={`${td} tabular-nums`}>{duracaoMin(x)} min</td>
                          <td className={td}>
                            {x.publicou.length === 0 ? (
                              <span className="text-muted">nada</span>
                            ) : (
                              <ul>
                                {x.publicou.map((s) => (
                                  <li key={s} className="break-all">
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </td>
                          <td className={td}>
                            {x.descartou.length === 0 ? (
                              <span className="text-muted">nada</span>
                            ) : (
                              <ul>
                                {x.descartou.map((d, i) => (
                                  <li key={i}>
                                    {d.tema} <span className="text-muted">({motivoLabels[d.motivo] ?? d.motivo})</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </td>
                          <td className={td}>
                            {x.bloqueios.length === 0 ? (
                              <span className="text-muted">nenhum</span>
                            ) : (
                              <ul>
                                {x.bloqueios.map((b, i) => (
                                  <li key={i} className="break-all">
                                    {b.host}: {b.erro}
                                    {b.detalhe ? <span className="text-muted"> ({b.detalhe})</span> : null}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </td>
                          <td className={td}>
                            {link ? (
                              <a href={link} target="_blank" rel="noopener noreferrer nofollow">
                                {x.pr ? `#${x.pr}` : "ver"}
                              </a>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      ))}
    </Container>
  );
}
