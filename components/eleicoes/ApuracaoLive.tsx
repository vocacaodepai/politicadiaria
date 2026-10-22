"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ApuracaoRodada, ApuracaoSnapshot } from "@/lib/eleicoes-extra";
import { Badge, Bars, Legend, Panel, TableWrap, td, th, type Tone } from "./Shared";

const POLL_MS = 60_000;
const URL_DADOS = "/eleicoes/apuracao/dados.json";

const pct = (n: number, d = 2) => `${n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d })}%`;
const int = (n: number) => n.toLocaleString("pt-BR");
const pp = (n: number) => `${n > 0 ? "+" : n < 0 ? "-" : ""}${Math.abs(n).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} p.p.`;

function carimbo(iso: string): string {
  const parts = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date(iso));
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${g("day")}/${g("month")}/${g("year")} às ${g("hour")}h${g("minute")}`;
}

function Rodada({ r, destaque = false }: { r: ApuracaoRodada; destaque?: boolean }) {
  const tones: Record<string, Tone> = Object.fromEntries(r.candidatos.map((c, i) => [c.nome, i === 0 ? "a" : "b"]));
  return (
    <Panel
      title={r.uf ? `${r.titulo} (${r.uf})` : `Presidente: ${r.titulo}`}
      note={
        r.comecou
          ? `Seções totalizadas: ${pct(r.apuracao.pctSecoesTotalizadas)} (${int(r.apuracao.secoesTotalizadas)} de ${int(r.apuracao.secoesTotal)}). Arquivo do TSE gerado em ${r.tse.data} às ${r.tse.hora}.`
          : "Aguardando apuração: o TSE ainda não publicou votos do 2º turno."
      }
      className={destaque ? "" : "h-full"}
    >
      <Bars
        ariaLabel={`Apuração do segundo turno: ${r.titulo}`}
        rows={r.candidatos.map((c) => ({
          label: c.nome,
          sub: c.partido,
          value: r.comecou ? c.pct : 0,
          display: r.comecou ? `${pct(c.pct)} · ${int(c.votos)}` : "aguardando",
          tone: tones[c.nome],
          badge: r.comecou && c.eleito ? <Badge tone="strong">Eleito</Badge> : undefined,
        }))}
        max={100}
        marker={50}
        markerLabel="50% dos votos válidos"
        labelWidth="8.5rem"
        valueWidth="9.5rem"
      />
      {destaque && r.candidatos.length === 2 && <Legend items={r.candidatos.map((c, i) => ({ tone: (i === 0 ? "a" : "b") as Tone, label: c.nome }))} />}
    </Panel>
  );
}

function Comparacao({ s }: { s: ApuracaoSnapshot }) {
  const p = s.presidente;
  const f = p.candidatos.find((c) => c.nome === "Flávio Bolsonaro");
  const l = p.candidatos.find((c) => c.nome === "Lula");
  if (!p.comecou || !f || !l) {
    return (
      <Panel title="Última rodada de pesquisas x resultado apurado">
        <p className="text-sm leading-relaxed">
          <strong>Aguardando apuração.</strong> A comparação aparece aqui quando o TSE publicar os primeiros votos do 2º turno. Antes disso, nenhum número é calculado: as pesquisas ficam em{" "}
          <Link href="/eleicoes/pesquisas#segundo-turno" className="text-accent underline underline-offset-2">pesquisas do 2º turno</Link>.
        </p>
      </Panel>
    );
  }
  const parcial = p.apuracao.pctSecoesTotalizadas < 100;
  return (
    <Panel
      title="Última rodada de pesquisas x resultado apurado"
      note={`Pesquisas recalculadas em votos válidos entre os dois candidatos (cada um dividido pela soma dos dois). Resultado: ${pct(f.pct)} Flávio Bolsonaro e ${pct(l.pct)} Lula, com ${pct(p.apuracao.pctSecoesTotalizadas)} das seções.${parcial ? " A apuração é parcial: a diferença muda enquanto os votos são contados. Pesquisa é retrato do momento, não previsão." : ""}`}
    >
      <TableWrap caption="Comparação entre a última pesquisa de cada instituto e o resultado apurado" min={620}>
        <thead>
          <tr>
            <th className={th} scope="col">Instituto</th>
            <th className={th} scope="col">Campo até</th>
            <th className={`${th} text-right`} scope="col">Flávio</th>
            <th className={`${th} text-right`} scope="col">Lula</th>
            <th className={`${th} text-right`} scope="col">Flávio: pesquisa menos apurado</th>
          </tr>
        </thead>
        <tbody>
          {s.pesquisas.map((q) => {
            const fa = (q.flavio / (q.flavio + q.lula)) * 100;
            return (
              <tr key={`${q.instituto}-${q.campoFim}`}>
                <th scope="row" className={`${td} text-left font-semibold`}>{q.instituto}</th>
                <td className={`${td} whitespace-nowrap`}>{q.campoFim.split("-").reverse().join("/")}</td>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{pct(fa, 1)}</td>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{pct(100 - fa, 1)}</td>
                <td className={`${td} text-right font-mono text-xs tabular-nums`}>{pp(fa - f.pct)}</td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>
    </Panel>
  );
}

export function ApuracaoLive({ initial }: { initial: ApuracaoSnapshot }) {
  const [snap, setSnap] = useState(initial);
  const [checadoEm, setChecadoEm] = useState<string | null>(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    let vivo = true;
    async function checar() {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await fetch(URL_DADOS, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const novo = (await res.json()) as ApuracaoSnapshot;
        if (!vivo) return;
        if (novo?.presidente && novo.atualizadoEm) setSnap(novo);
        setFalhou(false);
        setChecadoEm(new Date().toISOString());
      } catch {
        if (vivo) setFalhou(true);
      }
    }
    const id = setInterval(checar, POLL_MS);
    document.addEventListener("visibilitychange", checar);
    return () => {
      vivo = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", checar);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border border-border bg-surface px-3 py-2 text-xs" role="status" aria-live="polite">
        <span className={`inline-block h-2 w-2 ${falhou ? "bg-warn" : "bg-success"}`} aria-hidden="true" />
        <span>
          <strong>Dados atualizados em {carimbo(snap.atualizadoEm)}</strong> · fonte: TSE
        </span>
        <span className="text-muted">
          {falhou
            ? "Não foi possível checar novidades agora. Exibindo os últimos dados carregados."
            : checadoEm
              ? `Verificado nesta página às ${carimbo(checadoEm).split(" às ")[1]}. A página confere novidades a cada minuto.`
              : "A página confere novidades a cada minuto, sem recarregar."}
        </span>
      </div>

      <div className="mt-5">
        <Rodada r={snap.presidente} destaque />
      </div>

      <h3 className="mt-8 font-display text-xl font-bold">Governadores em segundo turno</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {snap.governadores.map((g) => (
          <Rodada key={g.uf} r={g} />
        ))}
      </div>

      <div className="mt-8">
        <Comparacao s={snap} />
      </div>
    </div>
  );
}
