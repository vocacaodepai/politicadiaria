/** Botão de compra (link de afiliado, Amazon ou Shopee): rel e target fixos, igual em todas as caixas da resenha. */
export function BuyButton({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-center font-display text-sm font-semibold text-accent-foreground transition hover:opacity-90 ${className}`}
    >
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}
