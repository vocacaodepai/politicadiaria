import { getPexelsImage } from "@/lib/pexels";
import { getPixabayImage } from "@/lib/pixabay";
import { getWikimediaImage } from "@/lib/wikimedia";
import { getGoogleCseWikimediaImage } from "@/lib/google-cse";

export type CoverOverride = { url: string; width: number; height: number; credit: string; creditUrl: string };

/**
 * Cascata de imagem de capa: foto real licenciada antes de banco de imagem
 * genérico. Pessoas, empresas e produtos reais citados no texto (ex.: Elon
 * Musk, logo de uma empresa) merecem foto real, nunca uma ilustração
 * genérica de banco de imagem — por isso o Wikimedia Commons (fotos sob
 * Creative Commons/domínio público, com crédito) vem antes do Pexels/
 * Pixabay. A Google Custom Search entra só como localizador dentro do
 * próprio Wikimedia Commons quando a busca direta não acha nada com essa
 * frase; nunca baixa imagem de outro domínio ou de resultado de busca
 * genérico. Pexels/Pixabay seguem como último recurso, para temas
 * abstratos sem pessoa/empresa real identificável.
 */
// "Dario Amodei portrait", "OpenAI logo": aponta pra uma pessoa ou empresa
// real específica. Pexels/Pixabay não sabem quem é essa pessoa/empresa —
// fazem busca por palavra-chave solta e podem devolver qualquer foto com
// "portrait" ou "logo" na tag (já aconteceu de vir foto de gato pra "Dario
// Amodei portrait"). Por isso, sem achado no Wikimedia/CSE pra esse tipo de
// busca, não cai no banco de imagem genérico: fica no gradiente de
// fallback, que é neutro, em vez de uma foto sem nenhuma relação com o fato.
function isNamedEntityQuery(query: string): boolean {
  return /\b(portrait|logo)$/i.test(query.trim());
}

async function resolveCoverPhoto(query: string, seed: number, override?: CoverOverride) {
  if (override) return override;

  const wikimedia = (await getWikimediaImage(query, seed)) ?? (await getGoogleCseWikimediaImage(query, seed));
  if (wikimedia) return wikimedia;
  if (isNamedEntityQuery(query)) return null;

  return (await getPexelsImage(query, seed)) ?? (await getPixabayImage(query, seed));
}

// Fallback quando não há foto: gradiente escuro com um brilho da marca,
// coerente com o tema (funciona no claro e no escuro).
const GLOWS = ["#1D4ED8", "#F59E0B", "#3B82F6", "#0EA5E9", "#B45309", "#6366F1"];

function FallbackCover({
  seed,
  className,
  label,
}: {
  seed: number;
  className?: string;
  label?: string;
}) {
  const glow = GLOWS[seed % GLOWS.length];
  const id = `cover-${seed}`;
  return (
    <div className={`relative overflow-hidden bg-ink ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={id} cx="75%" cy="20%" r="80%">
            <stop offset="0%" stopColor={glow} stopOpacity="0.55" />
            <stop offset="60%" stopColor={glow} stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0A1224" stopOpacity="0" />
          </radialGradient>
          <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="240" fill="#0A1224" />
        <rect width="400" height="240" fill={`url(#${id}-grid)`} />
        <rect width="400" height="240" fill={`url(#${id})`} />
        {label && (
          <text
            x="20"
            y="212"
            fill="#ffffff"
            fillOpacity="0.55"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="11"
            letterSpacing="1.5"
          >
            {label.toUpperCase()}
          </text>
        )}
      </svg>
    </div>
  );
}

/**
 * Capa do artigo: Wikimedia Commons → Google CSE (restrito ao Wikimedia) →
 * Pexels → Pixabay → gradiente. Sempre com width/height (evita CLS) e
 * crédito visível da foto (licença). `priority` marca a imagem principal da
 * página (LCP).
 */
export async function CoverImage({
  query,
  seed,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  showCredit = true,
  creditPlacement = "overlay",
  label,
  override,
}: {
  query: string;
  seed: number;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  showCredit?: boolean;
  /** Crédito sobre a foto (cards) ou abaixo dela (página de artigo, para não parecer anúncio). */
  creditPlacement?: "overlay" | "below";
  /** Texto pequeno impresso no fallback (ex.: categoria). */
  label?: string;
  /** Foto real do produto (self-hosted), usada no lugar do banco de imagens quando presente. */
  override?: CoverOverride;
}) {
  const photo = await resolveCoverPhoto(query, seed, override);

  if (!photo) {
    return <FallbackCover seed={seed} className={className} label={label} />;
  }

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo.url}
      alt={alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className="h-full w-full object-cover"
    />
  );
  const creditText = override ? `Foto: ${override.credit}` : `Foto: ${(photo as { photographer: string; source: string }).photographer} / ${(photo as { photographer: string; source: string }).source}`;
  const creditHref = override ? override.creditUrl : (photo as { photographerUrl: string }).photographerUrl;
  const credit = showCredit ? (
    <a
      href={creditHref}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={
        creditPlacement === "below"
          ? "mt-2 block font-mono text-[11px] text-muted transition hover:text-foreground"
          : "absolute bottom-1.5 right-2 rounded bg-ink/60 px-1.5 py-0.5 font-mono text-[10px] text-white/75 backdrop-blur-sm transition hover:text-white"
      }
    >
      {creditText}
    </a>
  ) : null;

  if (creditPlacement === "below") {
    return (
      <figure className={className ?? ""}>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-surface-2">{img}</div>
        {credit && <figcaption>{credit}</figcaption>}
      </figure>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-surface-2 ${className ?? ""}`}>
      {img}
      {credit}
    </div>
  );
}

/** Só a URL da foto (para JSON-LD e Open Graph), sem renderizar nada. */
export async function getCoverPhoto(query: string, seed: number, override?: CoverOverride) {
  return resolveCoverPhoto(query, seed, override);
}
