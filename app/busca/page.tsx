import { alternatesFor } from "@/lib/seo";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { SearchPage } from "@/components/SearchPage";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Busque notícias de política, resenhas de livros e parlamentares na Política Diária.",
  alternates: alternatesFor("/busca"),
  robots: { index: false, follow: true },
};

export default function BuscaPage() {
  return (
    <Container className="py-10">
      <p className="label-mono text-accent">Busca</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        O que você quer aprender hoje?
      </h1>
      <Suspense fallback={<p className="mt-6 text-sm text-muted">Carregando…</p>}>
        <SearchPage />
      </Suspense>
    </Container>
  );
}
