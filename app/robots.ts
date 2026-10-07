import type { MetadataRoute } from "next";
import { site } from "@/lib/articles";

export const dynamic = "force-static";

/**
 * Tudo liberado para todos os robôs (inclusive o Mediapartners-Google, do
 * AdSense). Só a busca interna (noindex, resultados infinitos) e as rotas de
 * API ficam de fora. Sitemap e host sempre no domínio canônico com www.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
