export function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="label-mono text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">{value}</p>
      {hint && <p className="mt-1 text-xs leading-snug text-muted">{hint}</p>}
    </div>
  );
}

export function Card({ title, id, children, className = "", note }: { title: string; id?: string; children: React.ReactNode; className?: string; note?: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-t` : undefined} className={`scroll-mt-24 rounded-xl border border-border bg-surface p-5 ${className}`}>
      <h2 id={id ? `${id}-t` : undefined} className="font-display text-lg font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
      {note && <p className="mt-3 text-xs leading-relaxed text-muted">{note}</p>}
    </section>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="label-mono text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm leading-snug text-foreground">{children}</dd>
    </div>
  );
}
