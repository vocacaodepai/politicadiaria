import Link from "next/link";

/** Chamada para a seção "Congresso por dentro" (home e barra lateral). */
export function CongressPromo({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-labelledby="congresso-promo"
      className="relative overflow-hidden rounded-xl border border-border bg-ink p-5 text-ink-foreground"
    >
      <div className="hero-glow pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative">
        <p className="label-mono text-ink-foreground/70">Congresso por dentro</p>
        <h2 id="congresso-promo" className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-white">
          Quem senta nas cadeiras do Congresso?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-foreground/80">
          {compact
            ? "513 deputados e 81 senadores, um perfil para cada um: votos, faltas, gastos e salário."
            : "513 deputados federais e 81 senadores, com uma página para cada um: como votaram, quantas vezes faltaram, quanto gastaram e quanto custam ao contribuinte."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/congresso/deputados"
            className="inline-flex h-9 items-center rounded-lg bg-accent px-3.5 text-xs font-semibold text-accent-foreground transition hover:opacity-90"
          >
            Deputados
          </Link>
          <Link
            href="/congresso/senadores"
            className="inline-flex h-9 items-center rounded-lg border border-white/40 px-3.5 text-xs font-semibold text-white transition hover:border-white hover:bg-white/5"
          >
            Senadores
          </Link>
          {!compact && (
            <Link
              href="/congresso"
              className="inline-flex h-9 items-center rounded-lg border border-white/40 px-3.5 text-xs font-semibold text-white transition hover:border-white hover:bg-white/5"
            >
              Visão geral
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
