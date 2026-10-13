import type { FactCheckPoint } from "@/lib/types";

const STATUS = {
  verdade: { label: "É verdade", tone: "text-success border-success", mark: "✓" },
  falso: { label: "Não é verdade", tone: "text-danger border-danger", mark: "✕" },
  atencao: { label: "Atenção", tone: "text-warn border-warn", mark: "!" },
} as const;

/** "O que é verdade e o que não é": cada item com rótulo escrito e marca, não só cor. */
export function Points({ items }: { items: FactCheckPoint[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((p, i) => {
        const s = STATUS[p.status];
        return (
          <li key={i} className="flex gap-3 py-3.5 sm:gap-4">
            <span
              aria-hidden="true"
              className={`mt-0.5 flex size-6 shrink-0 items-center justify-center border-2 text-xs font-black ${s.tone}`}
            >
              {s.mark}
            </span>
            <div className="min-w-0">
              <p className={`text-[0.7rem] font-extrabold uppercase tracking-[0.08em] ${s.tone.split(" ")[0]}`}>{s.label}</p>
              <p className="mt-0.5 text-[0.97rem] leading-relaxed">{p.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
