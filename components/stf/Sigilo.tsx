import { SIGILO_LABEL, type Sigilo } from "@/lib/stf-labels";

export function SigiloBadge({ value }: { value: Sigilo }) {
  const tone = value === "sigiloso" ? "border-foreground bg-foreground text-background" : "border-border bg-surface-2 text-muted";
  return <span className={`inline-block border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${tone}`}>{SIGILO_LABEL[value]}</span>;
}

/** Explicação neutra do que é sigilo, para o rodapé das páginas com processos. */
export function SigiloNote({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="sigilo-nota" className={`border-t-[3px] border-foreground pt-4 text-sm leading-relaxed text-muted ${className}`}>
      <h2 id="sigilo-nota" className="font-display text-xl font-bold text-foreground">
        O que é sigilo no processo
      </h2>
      <p className="mt-2">
        Em regra, processos judiciais são públicos. A lei permite restringir o acesso em hipóteses específicas, como o segredo de justiça, para proteger a intimidade das partes ou o interesse social, e o relator pode decretar
        sigilo em investigações em curso. Processo sob sigilo pode ter número e andamento visíveis, mas peças e decisões ficam restritas às partes e aos seus advogados.
      </p>
      <p className="mt-2">
        Neste site, o campo <strong className="text-foreground">sigilo</strong> mostra o que a fonte oficial informa: <em>Sob sigilo</em> quando o texto do STF diz que o processo corre em sigilo ou em segredo de justiça;{" "}
        <em>Público</em> quando o item consta de pauta pública divulgada pelo tribunal; e <em>Não informado pela fonte</em> quando a fonte não traz essa informação. A ausência da marca não significa que o processo seja público.
      </p>
    </section>
  );
}
