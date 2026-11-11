import type { PromessaStatus } from "@/lib/promessas";

/**
 * Selo de status. Nunca depende só da cor: cada status tem rótulo escrito e estilo de borda diferente.
 * `neutro` mostra a versão "sem acompanhamento" (cinza), usada antes da posse e no arquivo da campanha.
 */
const look: Record<PromessaStatus, string> = {
  prometida: "border-muted bg-surface-2 text-foreground border-solid",
  "em tramitacao": "border-accent bg-accent/10 text-accent border-dashed",
  "em andamento": "border-warn bg-warn/10 text-warn border-double",
  entregue: "border-success bg-success/10 text-success border-solid",
  contrariada: "border-danger bg-danger/10 text-danger border-solid",
  "sem dados": "border-muted bg-surface text-muted border-dotted",
};

export function StatusBadge({ status, label, className = "" }: { status: PromessaStatus; label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center border-2 px-2 py-0.5 text-[11px] font-bold uppercase leading-tight tracking-[0.06em] ${look[status]} ${className}`}
    >
      {label}
    </span>
  );
}

/** Cor de cada status nas barras e nos cartões do painel (sempre acompanhada do rótulo escrito). */
export const STATUS_COLOR: Record<PromessaStatus, string> = {
  prometida: "#64748B",
  "em tramitacao": "#1E40AF",
  "em andamento": "#A16207",
  entregue: "#15803D",
  contrariada: "#B91C1C",
  "sem dados": "#A8A29E",
};
