import { AdUnit, type AdFormat } from "./AdUnit";

/**
 * Espaço de anúncio do Google AdSense.
 *
 * Renderiza um bloco real só quando o site tiver NEXT_PUBLIC_ADSENSE_CLIENT e o
 * id da unidade do formato (NEXT_PUBLIC_ADSENSE_SLOT_*) configurados na Vercel.
 * Sem isso, não renderiza nada em produção (caixa vazia rotulada "Publicidade"
 * é motivo clássico de reprovação no AdSense) e mostra um contorno só em dev.
 */
const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const SLOTS: Record<AdFormat, string | undefined> = {
  leaderboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD,
  rectangle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE,
  "in-article": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE,
  anchor: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ANCHOR,
};

export function AdSlot({
  format = "rectangle",
  className = "",
}: {
  format?: AdFormat;
  className?: string;
}) {
  const slot = SLOTS[format];
  if (!CLIENT || !slot) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div
        className={`flex min-h-[90px] w-full items-center justify-center rounded-lg border border-dashed border-border text-muted ${className}`}
      >
        <span className="label-mono">anúncio ({format}) só em dev</span>
      </div>
    );
  }
  return <AdUnit client={CLIENT} slot={slot} format={format} className={className} />;
}
