import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { NewsletterForm } from "@/components/NewsletterForm";
import { checagemPath, latestChecagens, verdictMeta } from "@/lib/checagens";
import { pesquisasSegundoTurno } from "@/lib/eleicoes";
import { newsletterEnabled } from "@/lib/newsletter";
import { morningTop } from "@/lib/resumo";
import { alternatesFor, formatDate, formatTime } from "@/lib/seo";

// Gerada no build e refeita a cada hora, para a janela de 24h acompanhar o relógio.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Resumo da manhã",
  description: "As 5 principais notícias das últimas 24 horas, a pesquisa eleitoral mais recente e a checagem do dia.",
  alternates: alternatesFor("/resumo"),
};

export default function ResumoPage() {
  const now = new Date();
  const today = now.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
  const { items, fallback } = morningTop(now);
  // Mais recente por data de divulgação (ou fim do campo, se não houver), sem alterar o arquivo de dados.
  const poll = [...pesquisasSegundoTurno()].sort(
    (a, b) => (b.publicadoEm ?? b.campoFim).localeCompare(a.publicadoEm ?? a.campoFim) || b.campoFim.localeCompare(a.campoFim),
  )[0];
  const check = latestChecagens(1)[0];
  const enabled = newsletterEnabled();

  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl">
        <p className="label-mono text-accent">Resumo da manhã</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          O que importa hoje, {formatDate(today)}
        </h1>
        <p className="mt-3 text-muted">
          Gerado em {formatDate(today)} às {formatTime(now.toISOString())} (Brasília). Feeds RSS:{" "}
          <Link className="underline" href="/noticias/feed.xml">notícias</Link>,{" "}
          <Link className="underline" href="/checagens/feed.xml">checagens</Link>,{" "}
          <Link className="underline" href="/artigos/feed.xml">resenhas</Link>.
        </p>

        <section aria-labelledby="top5" className="mt-8">
          <h2 id="top5" className="border-t-[3px] border-foreground pt-2 font-display text-2xl font-bold">
            {fallback ? "Últimas notícias" : "5 principais notícias das últimas 24 horas"}
          </h2>
          {fallback && <p className="mt-2 text-sm text-muted">Nada novo nas últimas 24 horas; estas são as mais recentes.</p>}
          <ol className="mt-4 divide-y divide-border">
            {items.map((n) => (
              <li key={n.slug} className="py-4">
                <p className="font-mono text-xs text-muted">
                  {formatDate(n.date)} {formatTime(n.publishedAt) && `· ${formatTime(n.publishedAt)}`}
                </p>
                <Link href={`/noticias/${n.slug}`} className="mt-1 block font-display text-xl font-bold leading-snug hover:text-accent">
                  {n.title}
                </Link>
                <p className="mt-1 text-sm text-muted">{n.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        {poll && (
          <section aria-labelledby="pesquisa" className="mt-10">
            <h2 id="pesquisa" className="border-t-[3px] border-foreground pt-2 font-display text-2xl font-bold">
              Pesquisa mais recente
            </h2>
            <p className="mt-3">
              <strong>{poll.rotulo}</strong>, 2º turno, campo de {formatDate(poll.campoInicio, "short")} a{" "}
              {formatDate(poll.campoFim, "short")}
              {poll.publicadoEm && <>, divulgada em {formatDate(poll.publicadoEm, "short")}</>}: Lula {poll.lula ?? "s/d"}% e
              Flávio Bolsonaro {poll.flavio ?? "s/d"}% ({poll.base === "validos" ? "votos válidos" : "votos totais"}). Amostra de{" "}
              {poll.amostra.toLocaleString("pt-BR")} entrevistas, margem de {poll.margem} pontos
              {poll.registro && <>, registro {poll.registro}</>}.
            </p>
            <p className="mt-2 text-sm text-muted">
              Fonte:{" "}
              <a className="underline" href={poll.materia.url} target="_blank" rel="noopener noreferrer nofollow">
                {poll.materia.veiculo}
              </a>
              . Todas as pesquisas e o ranking de acerto em <Link className="underline" href="/eleicoes/pesquisas">/eleicoes/pesquisas</Link>.
            </p>
          </section>
        )}

        {check && (
          <section aria-labelledby="checagem" className="mt-10">
            <h2 id="checagem" className="border-t-[3px] border-foreground pt-2 font-display text-2xl font-bold">
              Checagem mais recente
            </h2>
            <p className="mt-3 font-mono text-xs text-muted">{formatDate(check.date)}</p>
            <Link href={checagemPath(check.slug)} className="block font-display text-xl font-bold leading-snug hover:text-accent">
              {verdictMeta[check.verdict].label}: {check.title}
            </Link>
            <p className="mt-1 text-sm text-muted">{check.summary}</p>
          </section>
        )}

        <div className="mt-12">
          <NewsletterForm enabled={enabled} />
        </div>
      </div>
    </Container>
  );
}
