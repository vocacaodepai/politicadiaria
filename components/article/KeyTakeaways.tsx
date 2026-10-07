/** Caixa "Em 3 pontos": resumo do artigo logo após a capa. */
export function KeyTakeaways({ points }: { points?: string[] }) {
  if (!points || points.length === 0) return null;
  return (
    <section
      aria-labelledby="em-pontos"
      className="rounded-r-xl border-l-4 border-accent bg-surface-2 p-5 sm:p-6"
    >
      <h2 id="em-pontos" className="label-mono text-accent">
        Em {points.length} pontos
      </h2>
      <ul className="mt-3 space-y-2.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed sm:text-base">
            <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
