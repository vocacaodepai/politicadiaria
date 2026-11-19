import { sortedChecagens, verdictCounts } from "@/lib/checagens";
import { verdictMeta } from "@/lib/checagens-meta";
import { formatDate } from "@/lib/seo";
import { factCheckVerdicts } from "@/lib/types";

const BAR: Record<string, string> = {
  falso: "bg-[#B91C1C]",
  enganoso: "bg-[#C2410C]",
  "fora-de-contexto": "bg-[#A16207]",
  "sem-provas": "bg-[#64748B]",
  verdadeiro: "bg-[#15803D]",
};

/** Números grandes no alto de /checagem: quantos fatos foram checados, em quantas fontes, e como se dividem. */
export function ChecagemStats() {
  const all = sortedChecagens();
  const counts = verdictCounts();
  const sources = all.reduce((n, c) => n + c.sources.length, 0);
  const total = all.length;
  if (!total) return null;
  return (
    <section aria-label="Números da checagem" className="mt-8">
      <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
        <div className="bg-background p-5">
          <p className="font-display text-6xl font-extrabold leading-none tabular-nums sm:text-7xl">{total}</p>
          <p className="mt-2 text-sm font-semibold">fatos checados até hoje</p>
        </div>
        <div className="bg-background p-5">
          <p className="font-display text-6xl font-extrabold leading-none tabular-nums sm:text-7xl">{sources}</p>
          <p className="mt-2 text-sm font-semibold">fontes abertas e conferidas</p>
        </div>
        <div className="bg-background p-5">
          <p className="font-display text-6xl font-extrabold leading-none tabular-nums sm:text-7xl">{counts.falso}</p>
          <p className="mt-2 text-sm font-semibold">
            boatos falsos ({Math.round((counts.falso / total) * 100)}% do total)
          </p>
        </div>
      </div>
      <div className="mt-4" role="img" aria-label={factCheckVerdicts.map((v) => `${verdictMeta[v.slug].label}: ${counts[v.slug]}`).join(", ")}>
        <div className="flex h-3 w-full overflow-hidden">
          {factCheckVerdicts.map((v) =>
            counts[v.slug] ? <div key={v.slug} className={BAR[v.slug]} style={{ width: `${(counts[v.slug] / total) * 100}%` }} /> : null,
          )}
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs">
          {factCheckVerdicts
            .filter((v) => counts[v.slug] > 0)
            .map((v) => (
              <li key={v.slug} className="inline-flex items-center gap-1.5">
                <span className={`inline-block h-2.5 w-2.5 ${BAR[v.slug]}`} aria-hidden="true" />
                <span className="font-semibold">{verdictMeta[v.slug].label}</span>
                <span className="tabular-nums text-muted">{counts[v.slug]}</span>
              </li>
            ))}
          <li className="text-muted">Última checagem em {formatDate(all[0].date, "short")}</li>
        </ul>
      </div>
    </section>
  );
}
