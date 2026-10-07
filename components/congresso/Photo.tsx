import type { Photo } from "@/lib/congress";
import { initials } from "@/lib/congress-format";

/**
 * Foto oficial (Câmara/Senado) hospedada na origem; sem foto, avatar com iniciais.
 * Com `showCredit`, o crédito e a licença ficam visíveis abaixo da foto.
 */
export function ParliamentarianPhoto({
  photo,
  name,
  size = 96,
  className = "",
  showCredit = false,
  priority = false,
}: {
  photo: Photo | { url: string } | null;
  name: string;
  size?: number;
  className?: string;
  showCredit?: boolean;
  priority?: boolean;
}) {
  const full = photo && "credito" in photo ? photo : null;
  const h = Math.round(size * 1.25);
  const box = (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl border border-border bg-surface-2 ${className}`}
      style={{ width: size, height: h }}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.url}
          alt={`Foto de ${name}`}
          width={size}
          height={h}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div
          role="img"
          aria-label={`Sem foto disponível de ${name}`}
          className="flex h-full w-full items-center justify-center bg-ink font-display font-bold text-ink-foreground/80"
          style={{ fontSize: size * 0.32 }}
        >
          {initials(name)}
        </div>
      )}
    </div>
  );
  if (!showCredit) return box;
  return (
    <figure className="shrink-0" style={{ width: size }}>
      {box}
      <figcaption className="mt-1.5 text-[11px] leading-snug text-muted">
        {full ? (
          <>
            Foto:{" "}
            <a href={full.creditoUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline decoration-border underline-offset-2 hover:text-accent">
              {full.credito}
            </a>
            {full.fonte === "wikimedia" && <> ({full.licenca})</>}
          </>
        ) : (
          "Sem foto oficial disponível"
        )}
      </figcaption>
    </figure>
  );
}
