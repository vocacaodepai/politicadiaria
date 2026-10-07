export type StockPhoto = {
  url: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
  photographerUrl: string;
  source: "Pexels" | "Pixabay" | "Wikimedia Commons";
};

const PEXELS_API = "https://api.pexels.com/v1/search";

/**
 * Busca uma imagem no Pexels usando a chave de API do usuário (PEXELS_API_KEY).
 * É a primeira opção da cascata de imagens (ver components/CoverImage.tsx):
 * Pexels -> Pixabay -> gradiente de fallback.
 */
export async function getPexelsImage(
  query: string,
  seed = 0
): Promise<StockPhoto | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  try {
    const params = new URLSearchParams({
      query,
      per_page: "5",
      orientation: "landscape",
    });
    const res = await fetch(`${PEXELS_API}?${params.toString()}`, {
      headers: { Authorization: apiKey },
      next: { revalidate: 60 * 60 * 24 * 7 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const photos = data?.photos as
      | Array<{
          src: { large2x: string; large: string };
          width: number;
          height: number;
          alt: string;
          photographer: string;
          photographer_url: string;
        }>
      | undefined;

    if (!photos || photos.length === 0) return null;

    const photo = photos[seed % photos.length];

    return {
      url: photo.src.large2x || photo.src.large,
      width: photo.width,
      height: photo.height,
      alt: photo.alt || query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      source: "Pexels",
    };
  } catch {
    return null;
  }
}
