import Link from "next/link";

export function SectionHeading({
  label,
  title,
  href,
  linkText = "Ver todos",
  as: Tag = "h2",
  className = "",
}: {
  /** Rótulo pequeno em mono acima do título (ex.: "Notícias de hoje"). */
  label?: string;
  title: string;
  href?: string;
  linkText?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`mb-5 flex items-end justify-between gap-4 border-t-[3px] border-foreground pt-2 ${className}`}>
      <div>
        {label && <p className="label-mono text-accent">{label}</p>}
        <Tag className="mt-0.5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</Tag>
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-xs font-semibold uppercase tracking-[0.06em] text-muted transition hover:text-accent"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
