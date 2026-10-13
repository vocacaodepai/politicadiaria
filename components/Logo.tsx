import Link from "next/link";

/** Monograma "PD" (quadrado de tinta com letras serifadas). */
export function LogoIcon({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
  /** Mantidos por compatibilidade com usos antigos. */
  mono?: boolean;
  id?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" fill="currentColor" />
      <text
        x="16"
        y="23.2"
        textAnchor="middle"
        fontFamily="var(--font-display), Georgia, serif"
        fontWeight="800"
        fontSize="19"
        letterSpacing="-1"
        style={{ fill: "var(--background)" }}
      >
        PD
      </text>
    </svg>
  );
}

/** Nome do jornal em serifa de alto contraste, no estilo de cabeçalho (masthead). */
export function Logo({
  className = "",
  href = "/",
  priority = false,
}: {
  size?: number;
  className?: string;
  href?: string | null;
  mono?: boolean;
  id?: string;
  /** Versão grande, usada no cabeçalho da primeira página. */
  priority?: boolean;
}) {
  const inner = (
    <span
      className={`font-display font-black leading-none tracking-tight ${
        priority ? "text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem]" : "text-[1.5rem]"
      }`}
    >
      Política Diária
    </span>
  );
  const cls = `inline-flex shrink-0 items-center whitespace-nowrap text-foreground ${className}`;
  if (href === null) return <span className={cls}>{inner}</span>;
  return (
    <Link href={href} className={cls} aria-label="Política Diária, página inicial">
      {inner}
    </Link>
  );
}
