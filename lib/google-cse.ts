import type { StockPhoto } from "./pexels";
import { getWikimediaFileInfo } from "./wikimedia";

const CSE_API = "https://www.googleapis.com/customsearch/v1";

/**
 * Usa a Google Custom Search API só como localizador: a busca é restrita ao
 * Wikimedia Commons (site:commons.wikimedia.org), para achar a página de uma
 * foto licenciada quando a busca direta na API do Commons (lib/wikimedia.ts)
 * não encontra nada com essa frase exata. Nunca baixa imagem de resultado de
 * busca genérico nem de outro domínio: cada candidato é confirmado de volta
 * no Wikimedia (licença + crédito) antes de ser usado.
 */
export async function getGoogleCseWikimediaImage(query: string, seed = 0): Promise<StockPhoto | null> {
  const apiKey = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
  const engineId = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID;
  if (!apiKey || !engineId) return null;

  try {
    const params = new URLSearchParams({
      key: apiKey,
      cx: engineId,
      q: query,
      siteSearch: "commons.wikimedia.org",
      siteSearchFilter: "i",
      num: "5",
    });
    const res = await fetch(`${CSE_API}?${params.toString()}`, {
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const items = data?.items as Array<{ link: string }> | undefined;
    if (!items || items.length === 0) return null;

    const candidates: StockPhoto[] = [];
    for (const item of items) {
      const match = item.link.match(/\/wiki\/(File:[^?#]+)/);
      if (!match) continue;
      const title = decodeURIComponent(match[1]);
      const photo = await getWikimediaFileInfo(title, query);
      if (photo) candidates.push(photo);
    }

    if (candidates.length === 0) return null;
    return candidates[seed % candidates.length];
  } catch {
    return null;
  }
}
