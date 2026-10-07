/**
 * Transformações do HTML editorial feitas no servidor, antes de renderizar:
 * ids nos títulos (sumário e âncoras), tabelas roláveis, links externos
 * seguros e pontos de inserção de anúncio. O HTML já passou pelo guarda-corpo
 * (scripts/check-content.mjs), então aqui só se organiza, não se sanitiza.
 */

import sanitizeHtml from "sanitize-html";

export type TocEntry = { id: string; text: string; level: 2 | 3 };

/** Lista de tags e atributos permitidos (a mesma do scripts/check-content.mjs). */
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "h2", "h3", "h4", "ul", "ol", "li", "a", "strong", "em", "b", "i", "u",
    "br", "hr", "blockquote", "code", "pre", "table", "thead", "tbody", "tr",
    "th", "td", "div", "span", "img", "figure", "figcaption", "sup", "sub",
    "small", "mark", "del", "ins", "dl", "dt", "dd", "cite", "abbr", "kbd",
  ],
  allowedAttributes: {
    a: ["href", "title", "rel", "target"],
    img: ["src", "alt", "width", "height", "loading"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    div: ["class"],
    span: ["class"],
    ul: ["class"],
    ol: ["class", "start"],
    abbr: ["title"],
  },
  allowedSchemes: ["https", "mailto"],
  allowedSchemesAppliedToAttributes: ["href", "src"],
  allowProtocolRelative: false,
  disallowedTagsMode: "discard",
  allowedClasses: {
    div: ["callout-box", "callout-ok", "callout-warn", "callout-bad", "callout-tip", "table-wrap", "buy-btn"],
    span: ["callout-label"],
    ul: ["checklist"],
    ol: ["checklist"],
  },
};

/**
 * Sanitiza o HTML editorial antes de renderizar. O guarda-corpo em build já
 * barra conteúdo fora do padrão; isto é a segunda camada, que vale mesmo se
 * alguém escrever HTML à mão fora das rotinas.
 */
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}

export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&[a-z]+;|&#\d+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "secao";
}

export function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Primeiro parágrafo em texto puro (para resumos). */
export function firstParagraph(html: string): string {
  const m = /<p\b[^>]*>([\s\S]*?)<\/p>/i.exec(html);
  return m ? stripTags(m[1]) : "";
}

export type PreparedHtml = {
  /** Pedaços do HTML; entre cada par entra um anúncio in-article. */
  parts: string[];
  toc: TocEntry[];
  words: number;
};

/**
 * Prepara o corpo do artigo:
 * - adiciona id único a cada <h2>/<h3>
 * - envolve tabelas em .table-wrap
 * - links externos ganham target="_blank" e rel com noopener (preserva o rel existente)
 * - divide o HTML antes do 3º e do 6º <h2> para inserir anúncios (se `adsAfterH2` > 0)
 */
export function prepareArticleHtml(html: string, { adBreaks = [2, 5] as number[] } = {}): PreparedHtml {
  // (o conteúdo passa por sanitizeContent antes de qualquer transformação)
  const toc: TocEntry[] = [];
  const used = new Set<string>();

  let out = sanitizeContent(html).replace(/<(h2|h3)\b([^>]*)>([\s\S]*?)<\/\1>/gi, (_m, tag: string, attrs: string, inner: string) => {
    const text = stripTags(inner);
    let id = slugifyHeading(text);
    let i = 2;
    while (used.has(id)) id = `${slugifyHeading(text)}-${i++}`;
    used.add(id);
    const level = tag.toLowerCase() === "h2" ? 2 : 3;
    toc.push({ id, text, level });
    const cleanAttrs = attrs.replace(/\sid\s*=\s*"[^"]*"/i, "");
    return `<${tag}${cleanAttrs} id="${id}">${inner}</${tag}>`;
  });

  out = out.replace(/<table\b[\s\S]*?<\/table>/gi, (t) => `<div class="table-wrap">${t}</div>`);

  out = out.replace(/<a\b([^>]*)>/gi, (m, attrs: string) => {
    const hrefM = /href\s*=\s*"([^"]*)"/i.exec(attrs);
    if (!hrefM || !/^https?:\/\//i.test(hrefM[1])) return m;
    let a = attrs;
    const relM = /\srel\s*=\s*"([^"]*)"/i.exec(a);
    const rel = new Set((relM ? relM[1] : "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    a = relM ? a.replace(relM[0], ` rel="${[...rel].join(" ")}"`) : `${a} rel="${[...rel].join(" ")}"`;
    if (!/\starget\s*=/i.test(a)) a += ' target="_blank"';
    return `<a${a}>`;
  });

  const words = stripTags(out).split(/\s+/).filter(Boolean).length;

  // Divide antes dos <h2> escolhidos (nunca dentro de lista/tabela, já que h2 é nível de bloco).
  const parts: string[] = [];
  if (adBreaks.length > 0) {
    const h2Positions: number[] = [];
    const re = /<h2\b/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(out))) h2Positions.push(m.index);
    const cuts = adBreaks
      .map((n) => h2Positions[n])
      .filter((p): p is number => typeof p === "number")
      .sort((a, b) => a - b);
    let last = 0;
    for (const c of cuts) {
      if (c - last < 400) continue; // evita anúncio colado em outro
      parts.push(out.slice(last, c));
      last = c;
    }
    parts.push(out.slice(last));
  } else {
    parts.push(out);
  }

  return { parts, toc, words };
}

/** Só os h2 (para o sumário curto). */
export function tocH2(toc: TocEntry[]): TocEntry[] {
  return toc.filter((t) => t.level === 2);
}
