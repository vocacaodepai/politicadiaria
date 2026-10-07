import type { StockPhoto } from "./pexels";

const PIXABAY_API = "https://pixabay.com/api/";

/**
 * Busca uma imagem no Pixabay usando a chave de API do usuário (PIXABAY_API_KEY).
 * Usada como segunda opção, quando o Pexels não retorna resultado (sem chave
 * configurada, busca sem resultados, ou falha de rede).
 */
export async function getPixabayImage(
  query: string,
  seed = 0
): Promise<StockPhoto | null> {
  const apiKey = process.env.PIXABAY_API_KEY;
  if (!apiKey) return null;

  try {
    const params = new URLSearchParams({
      key: apiKey,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      per_page: "5",
      safesearch: "true",
    });
    const res = await fetch(`${PIXABAY_API}?${params.toString()}`, {
      next: { revalidate: 60 * 60 * 24 * 7 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const hits = data?.hits as
      | Array<{
          largeImageURL: string;
          webformatURL: string;
          imageWidth: number;
          imageHeight: number;
          tags: string;
          user: string;
          pageURL: string;
        }>
      | undefined;

    if (!hits || hits.length === 0) return null;

    const photo = hits[seed % hits.length];

    return {
      url: photo.largeImageURL || photo.webformatURL,
      width: photo.imageWidth,
      height: photo.imageHeight,
      alt: photo.tags || query,
      photographer: photo.user,
      photographerUrl: photo.pageURL,
      source: "Pixabay",
    };
  } catch {
    return null;
  }
}
