import type { StockPhoto } from "./pexels";

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

// A política de uso da API do Wikimedia (https://meta.wikimedia.org/wiki/User-Agent_policy)
// exige um User-Agent identificando a aplicação com um jeito de contato;
// sem isso o tráfego é tratado como anônimo e sofre limite de taxa mais
// agressivo (já vimos erro 429 em produção sem esse header).
const COMMONS_HEADERS = {
  "User-Agent": "PoliticaDiaria/1.0 (https://www.politicadiaria.com.br; contato@politicadiaria.com.br)",
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

type CommonsImageInfo = {
  url: string;
  thumburl?: string;
  width: number;
  height: number;
  extmetadata?: {
    LicenseShortName?: { value: string };
    Artist?: { value: string };
  };
};

function toStockPhoto(title: string, info: CommonsImageInfo, query: string): StockPhoto | null {
  // Sem metadado de licença explícito, não arrisca publicar a foto.
  const license = info.extmetadata?.LicenseShortName?.value;
  if (!license) return null;

  const artist = info.extmetadata?.Artist?.value ? stripHtml(info.extmetadata.Artist.value) : "Wikimedia Commons";
  const pageUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(title)}`;

  return {
    url: info.thumburl || info.url,
    width: info.width,
    height: info.height,
    alt: query,
    photographer: `${artist} (${license})`,
    photographerUrl: pageUrl,
    source: "Wikimedia Commons",
  };
}

/**
 * Busca uma foto real licenciada (Creative Commons/domínio público) no
 * Wikimedia Commons: prioridade para pessoas, empresas e produtos reais
 * citados no texto, antes de cair em banco de imagem genérico (Pexels/
 * Pixabay). Só devolve foto com metadado de licença explícito, para nunca
 * publicar imagem sem atribuição correta.
 */
export async function getWikimediaImage(query: string, seed = 0): Promise<StockPhoto | null> {
  try {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      generator: "search",
      gsrsearch: `${query} filetype:bitmap`,
      gsrnamespace: "6",
      gsrlimit: "8",
      prop: "imageinfo",
      iiprop: "url|size|extmetadata",
      iiurlwidth: "1600",
      origin: "*",
    });
    const res = await fetch(`${COMMONS_API}?${params.toString()}`, {
      headers: COMMONS_HEADERS,
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const pages = data?.query?.pages as
      | Record<string, { title: string; imageinfo?: CommonsImageInfo[] }>
      | undefined;
    if (!pages) return null;

    const licensed = Object.values(pages)
      .filter((p) => p.imageinfo && p.imageinfo[0])
      .map((p) => toStockPhoto(p.title, p.imageinfo![0], query))
      .filter((p): p is StockPhoto => p !== null);

    if (licensed.length === 0) return null;
    return licensed[seed % licensed.length];
  } catch {
    return null;
  }
}

/**
 * Busca a ficha de licença/crédito de um arquivo específico do Wikimedia
 * Commons, dado o título exato (ex.: "File:Elon Musk 2015.jpg"). Usada pela
 * Google Custom Search (lib/google-cse.ts) depois de localizar a página do
 * arquivo, para confirmar a licença antes de usar a imagem.
 */
export async function getWikimediaFileInfo(title: string, query: string): Promise<StockPhoto | null> {
  try {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      titles: title,
      prop: "imageinfo",
      iiprop: "url|size|extmetadata",
      iiurlwidth: "1600",
      origin: "*",
    });
    const res = await fetch(`${COMMONS_API}?${params.toString()}`, {
      headers: COMMONS_HEADERS,
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const pages = data?.query?.pages as
      | Record<string, { title: string; imageinfo?: CommonsImageInfo[] }>
      | undefined;
    if (!pages) return null;

    const page = Object.values(pages)[0];
    if (!page?.imageinfo?.[0]) return null;

    return toStockPhoto(page.title, page.imageinfo[0], query);
  } catch {
    return null;
  }
}
