import { site } from "@/lib/articles";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${site.name}: ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  return renderOgImage({
    title: site.tagline,
    eyebrow: "Artigos, notícias e reviews",
    footer: "www.politicadiaria.com.br",
    byline: "Inteligência artificial em português",
  });
}
