import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { allCorrecoes, correcaoHref } from "@/lib/correcoes";
import { alternatesFor, formatDate } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Correções",
  description: "Histórico público das correções feitas em notícias, checagens e resenhas da Política Diária: o que mudou e por quê.",
  alternates: alternatesFor("/correcoes"),
};

const tipoLabel = { noticia: "Notícia", artigo: "Resenha", checagem: "Checagem", dados: "Dados" } as const;

export default function CorrecoesPage() {
  const items = allCorrecoes();
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl">
        <p className="label-mono text-accent">Transparência</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Correções</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Erro corrigido às claras. Cada entrada mostra a data, o item, o que mudou e o motivo. Para pedir uma correção,
          use a página de <Link className="text-accent underline" href="/contato">contato</Link>. Regras completas na{" "}
          <Link className="text-accent underline" href="/politica-editorial">política editorial</Link>.
        </p>
        {items.length === 0 ? (
          <p className="mt-8 border border-border bg-surface p-5">Nenhuma correção registrada até agora.</p>
        ) : (
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {items.map((c, i) => {
              const href = correcaoHref(c);
              return (
                <li key={`${c.data}-${c.slug}-${i}`} className="py-5">
                  <p className="font-mono text-xs text-muted">
                    <time dateTime={c.data}>{formatDate(c.data)}</time> · {tipoLabel[c.tipo]}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-bold leading-snug">
                    {href ? <Link href={href} className="hover:text-accent">{c.titulo}</Link> : c.titulo}
                  </h2>
                  <p className="mt-2"><strong>O que mudou:</strong> {c.mudanca}</p>
                  <p className="mt-1 text-muted"><strong>Motivo:</strong> {c.motivo}</p>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </Container>
  );
}
