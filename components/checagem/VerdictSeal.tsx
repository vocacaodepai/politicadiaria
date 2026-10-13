import type { FactCheckVerdict } from "@/lib/types";
import { verdictMeta } from "@/lib/checagens-meta";

/**
 * Selo de veredito. Nunca depende só da cor: cada veredito tem rótulo escrito,
 * ícone próprio e estilo de borda diferente (sólida, tracejada, pontilhada ou dupla).
 */
const look: Record<FactCheckVerdict, { tone: string; border: string }> = {
  falso: { tone: "border-danger bg-danger/10 text-danger", border: "border-solid" },
  enganoso: { tone: "border-warn bg-warn/10 text-warn", border: "border-dashed" },
  "fora-de-contexto": { tone: "border-accent bg-accent/10 text-accent", border: "border-double" },
  "sem-provas": { tone: "border-muted bg-surface-2 text-muted", border: "border-dotted" },
  verdadeiro: { tone: "border-success bg-success/10 text-success", border: "border-solid" },
};

function Icon({ verdict, className }: { verdict: FactCheckVerdict; className: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  switch (verdict) {
    case "falso":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" />
        </svg>
      );
    case "verdadeiro":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M7.5 12.5l3 3 6-6.5" />
        </svg>
      );
    case "enganoso":
      return (
        <svg {...common}>
          <path d="M12 3.2l10 17.3H2L12 3.2z" />
          <path d="M12 10v4.5M12 17.4v.2" />
        </svg>
      );
    case "fora-de-contexto":
      return (
        <svg {...common}>
          <path d="M7 3H3v4M17 3h4v4M7 21H3v-4M17 21h4v-4" />
          <path d="M9 9h6v6H9z" />
        </svg>
      );
    case "sem-provas":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M9.4 9.4a2.7 2.7 0 1 1 3.9 2.4c-.9.5-1.3 1-1.3 2M12 16.9v.2" />
        </svg>
      );
  }
}

export function VerdictSeal({
  verdict,
  size = "sm",
  className = "",
}: {
  verdict: FactCheckVerdict;
  size?: "sm" | "lg";
  className?: string;
}) {
  const meta = verdictMeta[verdict];
  const l = look[verdict];

  if (size === "lg") {
    return (
      <div
        role="img"
        aria-label={`Veredito: ${meta.label}`}
        className={`inline-flex items-center gap-3 border-4 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3.5 ${l.tone} ${l.border} ${className}`}
      >
        <Icon verdict={verdict} className="size-9 shrink-0 sm:size-12" />
        <span className="flex flex-col leading-none">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] opacity-80">Veredito</span>
          <span className="mt-1.5 font-display text-3xl font-black uppercase tracking-tight sm:text-5xl">
            {meta.label}
          </span>
        </span>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 border-2 px-2 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-[0.08em] ${l.tone} ${l.border} ${className}`}
    >
      <Icon verdict={verdict} className="size-3.5 shrink-0" />
      {meta.label}
    </span>
  );
}
