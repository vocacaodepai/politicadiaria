"use client";

import { useCallback, useEffect, useState } from "react";
import type { DebateAfirmacao, DebateBloco, DebateChecagem, DebateData, DebateFonte } from "@/lib/debate-ao-vivo";
import { Badge, ExternalLink, Panel, Section } from "./Shared";

const POLL_MS = 60_000;
const ENDPOINT = "/api/eleicoes/debate-ao-vivo";

const fmt = (iso: string, withSeconds = false) =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
  }).format(new Date(iso));

function Refs({ ns, fontes }: { ns: number[]; fontes: DebateFonte[] }) {
  if (!ns.length) return null;
  return (
    <span className="ml-1 whitespace-nowrap font-mono text-[0.7rem] text-muted">
      {ns.map((n, i) => {
        const f = fontes.find((x) => x.n === n);
        return (
          <span key={n}>
            {i > 0 && ", "}
            <a href={`#fonte-${n}`} className="text-accent underline underline-offset-2" title={f ? `${f.veiculo}: ${f.rotulo}` : undefined}>
              [{n}]
            </a>
          </span>
        );
      })}
    </span>
  );
}

function Afirmacao({ a, fontes }: { a: DebateAfirmacao; fontes: DebateFonte[] }) {
  return (
    <li className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-3 gap-y-1 border-t border-border py-3 first:border-t-0 max-sm:grid-cols-1">
      <p className="label-mono text-foreground">{a.candidato}</p>
      <p className="text-sm leading-relaxed sm:text-base">
        {a.tipo === "citacao" ? <q>{a.texto}</q> : a.texto}
        <Refs ns={a.fontes} fontes={fontes} />
      </p>
    </li>
  );
}

function Checagem({ c, fontes }: { c: DebateChecagem; fontes: DebateFonte[] }) {
  return (
    <li className="border-t border-border py-3 first:border-t-0">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={c.veredito === "Sem dado" ? "plain" : "soft"}>{c.veredito}</Badge>
        <span className="label-mono text-muted">Afirmação de {c.candidato}</span>
      </div>
      <p className="mt-1 text-sm font-semibold leading-snug sm:text-base">{c.afirmacao}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        {c.nota}
        <Refs ns={c.fontes} fontes={fontes} />
      </p>
    </li>
  );
}

function Bloco({ b, fontes }: { b: DebateBloco; fontes: DebateFonte[] }) {
  return (
    <article id={b.id} className="scroll-mt-24 border border-border bg-surface p-4 sm:p-5" aria-labelledby={`${b.id}-t`}>
      <header>
        <p className="label-mono text-accent">
          {b.horarioRotulo} · {b.bloco}
        </p>
        <h3 id={`${b.id}-t`} className="mt-1 font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">
          {b.tema}
        </h3>
      </header>
      {b.pendente && (
        <p className="mt-3 border-l-4 border-accent-2 bg-surface-2 p-3 text-sm leading-relaxed">
          Ainda sem registro em fonte aberta e conferida. Nada será escrito aqui até existir cobertura confirmada.
        </p>
      )}
      {b.pergunta && (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          <strong className="text-foreground">Pergunta ou formato:</strong> {b.pergunta}
        </p>
      )}
      {b.contexto && (
        <p className="mt-3 text-sm leading-relaxed">
          {b.contexto}
          <Refs ns={b.fontesContexto ?? []} fontes={fontes} />
        </p>
      )}
      {b.afirmacoes.length > 0 && (
        <div className="mt-4">
          <h4 className="label-mono text-muted">O que cada candidato disse (resumo)</h4>
          <ul className="mt-1">
            {b.afirmacoes.map((a, i) => (
              <Afirmacao key={i} a={a} fontes={fontes} />
            ))}
          </ul>
        </div>
      )}
      {b.respostaOutroLado && (
        <p className="mt-3 text-sm leading-relaxed">
          <strong>Resposta ou contexto do outro lado:</strong> {b.respostaOutroLado}
          <Refs ns={b.fontesResposta ?? []} fontes={fontes} />
        </p>
      )}
      {b.checagens.length > 0 && (
        <div className="mt-4">
          <h4 className="label-mono text-muted">Checagem das afirmações</h4>
          <ul className="mt-1">
            {b.checagens.map((c, i) => (
              <Checagem key={i} c={c} fontes={fontes} />
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export function DebateLive({ initial }: { initial: DebateData }) {
  const [data, setData] = useState<DebateData>(initial);
  const [lastCheck, setLastCheck] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(ENDPOINT, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const next = (await res.json()) as DebateData;
      setData((cur) => (next.atualizadoEm !== cur.atualizadoEm ? next : cur));
      setFailed(false);
    } catch {
      setFailed(true);
    }
    setLastCheck(new Date().toISOString());
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!document.hidden) void refresh();
    }, POLL_MS);
    const onVisible = () => {
      if (!document.hidden) void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  const { evento, fontes, blocos } = data;
  const confirmados = blocos.filter((b) => !b.pendente);

  return (
    <>
      <div className="mt-6 border-l-4 border-accent bg-surface-2 p-4 text-sm leading-relaxed" role="status" aria-live="polite">
        <p className="flex flex-wrap items-center gap-2 font-bold">
          <Badge tone="strong">{data.statusRotulo}</Badge>
          <span>Atualizado em {fmt(data.atualizadoEm)} (Brasília)</span>
        </p>
        <p className="mt-2">{data.aviso}</p>
        <p className="mt-2 text-xs text-muted">
          A página confere novidades sozinha a cada 60 segundos.
          {lastCheck && ` Última conferência: ${fmt(lastCheck, true)}.`}
          {failed && " A última tentativa falhou; mostrando a versão já carregada."}
        </p>
      </div>

      <Section id="transmissao" kicker="O evento" title={evento.titulo} lead={`${evento.emissora}. Mediação: ${evento.mediadores}.`}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Formato">
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
              {evento.formato.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted">
              Previsto para as 20h; a Band informou início às 20h15 por atraso na chegada dos candidatos.
              <Refs ns={evento.fontesFormato} fontes={fontes} />
            </p>
          </Panel>
          <Panel title="Os dois candidatos" note="Ordem alfabética. Percentuais do 1º turno, votos válidos, segundo o TSE.">
            <ul className="space-y-2 text-sm">
              {data.candidatos.map((c) => (
                <li key={c.id}>
                  <strong>{c.nome}</strong> ({c.partido}): {c.primeiroTurno}.
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm">
              Transmissão: <ExternalLink href={evento.transmissao}>YouTube (Band)</ExternalLink>
            </p>
          </Panel>
        </div>
      </Section>

      <Section
        id="blocos"
        kicker="Minuto a minuto"
        title="O que foi dito, bloco a bloco"
        lead="Resumos do que os candidatos disseram, com a fonte de cada trecho. Quem fez a acusação aparece sempre como autor dela: acusação feita no palco não é fato provado."
      >
        <div className="space-y-5">
          {blocos.map((b) => (
            <Bloco key={b.id} b={b} fontes={fontes} />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">{confirmados.length} trechos com registro e {blocos.length - confirmados.length} pendente(s).</p>
      </Section>

      <Section id="pendencias" kicker="Transparência" title="O que ainda não foi confirmado">
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed sm:text-base">
          {data.pendencias.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </Section>

      <Section id="fontes" kicker="Fontes" title="Fontes numeradas">
        <ol className="space-y-3">
          {fontes.map((f) => (
            <li key={f.n} id={`fonte-${f.n}`} className="scroll-mt-24 text-sm leading-relaxed">
              <span className="font-mono text-muted">[{f.n}]</span> <ExternalLink href={f.url}>{f.rotulo}</ExternalLink>, {f.veiculo}. Aberta e conferida em {fmt(f.conferidaEm)}.
              {f.nota && <span className="block text-xs text-muted">{f.nota}</span>}
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
