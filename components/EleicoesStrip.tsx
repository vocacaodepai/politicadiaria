import Link from "next/link";
import { Container } from "@/components/Container";
import { acerto2026, fmtDate, fmtDateTime, fmtPct, getMeta, getResultados } from "@/lib/eleicoes";

/** Faixa da home enquanto houver eleição: 1º turno apurado e atalho para o painel. */
export function EleicoesStrip() {
  const r = getResultados();
  const meta = getMeta();
  const t1 = [...r.presidente.turno1.candidatos].sort((a, b) => b.votos - a.votos).slice(0, 2);
  const melhor = acerto2026().linhas[0];
  const turno2 = meta.calendario.find((c) => c.titulo === "Segundo turno");

  return (
    <Container as="section" className="mt-10" aria-label="Eleições 2026">
      <div className="border-y-[3px] border-double border-foreground py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="label-mono text-accent">Eleições 2026 · 2º turno em {turno2 ? fmtDate(turno2.data) : "25/10/2026"}</p>
          <p className="label-mono text-muted">Atualizado em {fmtDateTime(meta.atualizadoEm)}</p>
        </div>
        <h2 className="mt-2 font-display text-2xl font-black leading-tight sm:text-3xl">
          Presidente: resultado do 1º turno e pesquisas
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {t1.map((c) => (
            <li key={c.numero} className="border-t border-border pt-3">
              <p className="font-display text-xl font-bold">{c.nome}</p>
              <p className="label-mono text-muted">{c.partido} · {fmtPct(c.pct)} dos válidos no 1º turno</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-border pt-3 text-sm">
          <span className="label-mono text-accent">Ranking de acerto dos institutos</span>{" "}
          No 1º turno, a pesquisa do {melhor.poll.instituto} chegou mais perto do resultado do TSE (erro médio de {melhor.erroMedio.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} p.p.).{" "}
          <Link href="/eleicoes/pesquisas#ranking" className="font-semibold text-accent hover:underline">Ver o ranking</Link>
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/eleicoes" className="text-accent hover:underline">Painel das eleições</Link>
          <Link href="/eleicoes/apuracao" className="text-accent hover:underline">Apuração ao vivo</Link>
          <Link href="/eleicoes/pesquisas" className="text-accent hover:underline">Pesquisas e ranking de acerto</Link>
          <span className="text-muted font-normal">Fonte: TSE (resultados.tse.jus.br)</span>
        </div>
      </div>
    </Container>
  );
}
