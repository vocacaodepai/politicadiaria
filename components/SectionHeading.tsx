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
    <div className={`mb-5 flex items-end justify-between gap-4 ${className}`}>
      <div>
        {label && <p className="label-mono text-accent">{label}</p>}
        <Tag className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</Tag>
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 font-mono text-xs font-medium text-muted transition hover:text-accent"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
