import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { documentos, documentosObservacao } from "@/lib/documentos";
import { alternatesFor, formatDate } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Documentos primários",
  description: "Documentos-chave das eleições 2026 (calendário, resoluções do TSE, lei), com fonte, data de verificação e link oficial.",
  alternates: alternatesFor("/documentos"),
};

export default function DocumentosPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-4xl">
        <p className="label-mono text-accent">Fontes primárias</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Documentos primários</h1>
        <p className="mt-3 text-muted">{documentosObservacao}</p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Documentos-chave das eleições 2026</caption>
            <thead>
              <tr className="border-b-2 border-foreground">
                <th scope="col" className="py-2 pr-3">Documento</th>
                <th scope="col" className="py-2 pr-3">Estado</th>
                <th scope="col" className="py-2 pr-3">Verificado em</th>
                <th scope="col" className="py-2">Fonte</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((d) => (
                <tr key={d.id} className="border-b border-border align-top">
                  <th scope="row" className="py-3 pr-3 font-semibold">
                    {d.titulo}
                    <span className="mt-0.5 block text-xs font-normal text-muted">{d.orgao}</span>
                    {d.verificado && <span className="mt-1 block font-normal">{d.verificado}</span>}
                    {d.observacao && <span className="mt-1 block text-xs font-normal text-muted">{d.observacao}</span>}
                  </th>
                  <td className="py-3 pr-3">{d.status === "verificado" ? "Verificado" : "Não verificado"}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{d.verificadoEm ? formatDate(d.verificadoEm, "short") : "não conferido"}</td>
                  <td className="py-3">
                    <a href={d.url} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
                      Abrir ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
