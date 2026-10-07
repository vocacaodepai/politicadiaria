import { safeJsonLd } from "@/lib/seo";

/** Bloco <script type="application/ld+json">, sempre serializado por safeJsonLd. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />;
}
