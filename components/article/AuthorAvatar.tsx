import { author } from "@/lib/author";

/** Avatar do autor: foto oficial para o editor do site, iniciais para qualquer outro nome. */
export function AuthorAvatar({
  name,
  size = "sm",
  className = "",
}: {
  name: string;
  /** sm = 32px (linha de meta), lg = 64px (caixa do autor). */
  size?: "sm" | "lg";
  className?: string;
}) {
  const px = size === "lg" ? 64 : 32;
  const dims = size === "lg" ? "h-16 w-16 text-xl" : "h-8 w-8 text-[11px]";
  if (name === author.name) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={size === "lg" ? author.image : author.imageSmall}
        alt={`Foto de ${author.name}`}
        width={px}
        height={px}
        loading="lazy"
        decoding="async"
        className={`shrink-0 rounded-lg border border-border object-cover ${dims} ${className}`}
      />
    );
  }
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-display font-bold tracking-tight text-white ${dims} ${className}`}
    >
      {initials}
    </span>
  );
}
