import { site } from "@/lib/articles";

/** JSON seguro para <script type="application/ld+json">: escapa "<" para nada fechar a tag. */
export function safeJsonLd(data: unknown): string {
  // Escapa "<" (fecharia a tag <script>) e os separadores de linha Unicode
  // (U+2028/U+2029), que quebram o parser de JS em atributos inline.
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** Prefixo de caminho (só no export estático do GitHub Pages). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Caminho com o basePath, para fetch/manifest (o <Link> já faz isso sozinho). */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

export const FEED_TYPES = { "application/rss+xml": `${site.url}/feed.xml` } as const;

/** alternates de metadata com canonical próprio e o link do RSS em toda página. */
export function alternatesFor(path: string) {
  return { canonical: path, types: FEED_TYPES };
}

/** URL absoluta do site a partir de um caminho. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Corta em limite de caracteres respeitando palavras e sem reticências quebradas. */
export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.]$/, "")}…`;
}

/** Meta description dentro do limite do Google. */
export function metaDescription(text: string): string {
  return truncate(text, 158);
}

/** Minutos de leitura a partir do HTML (200 palavras/min, mínimo 1). */
export function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string, style: "long" | "short" = "long"): string {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: style === "long" ? "long" : "short",
    year: "numeric",
  });
}

/** "14:32" a partir de um ISO datetime com horário (ex.: publishedAt de notícia); vazio se não tiver horário. */
export function formatTime(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" });
}

/** "há 2 dias", "hoje", "ontem". Só para uso em componentes renderizados no build diário. */
export function relativeDay(iso: string, today = new Date()): string {
  const d = new Date(`${iso}T12:00:00-03:00`);
  const t = new Date(today.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" }) + "T12:00:00-03:00");
  const diff = Math.round((t.getTime() - d.getTime()) / 86400000);
  if (diff <= 0) return "hoje";
  if (diff === 1) return "ontem";
  if (diff < 7) return `há ${diff} dias`;
  return formatDate(iso, "short");
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
