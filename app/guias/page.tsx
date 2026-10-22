import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { guias } from "@/lib/guias";
import { alternatesFor } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guias de leitura",
  description: "Guias com cinco livros para entender um tema de política, na ordem sugerida de leitura, com a nota de cada resenha.",
  alternates: alternatesFor("/guias"),
};

export default function GuiasPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl">
        <p className="label-mono text-accent">Livros</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Guias de leitura</h1>
        <p className="mt-3 text-lg text-muted">Cinco livros por tema, na ordem sugerida, só com obras já resenhadas no site.</p>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {guias.map((g) => (
            <li key={g.slug} className="py-5">
              <Link href={`/guias/${g.slug}`} className="font-display text-xl font-bold hover:text-accent">
                {g.title}
              </Link>
              <p className="mt-1 text-sm text-muted">{g.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
