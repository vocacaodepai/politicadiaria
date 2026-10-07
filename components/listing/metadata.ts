import type { Metadata } from "next";
import { site } from "@/lib/articles";
import { absoluteUrl, metaDescription, alternatesFor } from "@/lib/seo";

/**
 * Metadata completo de uma página de listagem: título (o layout aplica o
 * template "%s | Política Diária"), description até 158 caracteres, canonical
 * próprio e Open Graph com URL absoluta.
 */
export function listingMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile";
}): Metadata {
  const desc = metaDescription(description);
  return {
    title,
    description: desc,
    alternates: alternatesFor(path),
    openGraph: {
      type,
      url: absoluteUrl(path),
      title: `${title} | ${site.name}`,
      description: desc,
      siteName: site.name,
      locale: site.locale,
    },
  };
}

/** Título de uma página n>1 de uma listagem. */
export function pagedTitle(title: string, page: number): string {
  return page > 1 ? `${title}: página ${page}` : title;
}
