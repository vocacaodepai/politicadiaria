import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { FerramentasGrid } from "@/components/FerramentasGrid";
import { listingMetadata } from "@/components/listing/metadata";

const TITLE = "Ferramentas políticas";
const DESC = "Congresso por dentro, Eleições 2026, Promessas, Checagem, História e Livros: as ferramentas da Política Diária num só lugar.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESC, path: "/ferramentas" });

export default function FerramentasPage() {
  return (
    <Container className="py-8 sm:py-12">
      <p className="label-mono text-accent">Política Diária</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{TITLE}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">{DESC}</p>
      <div className="mt-8">
        <FerramentasGrid />
      </div>
    </Container>
  );
}
