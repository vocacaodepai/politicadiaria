/**
 * Histórico de correções (/correcoes). Fontes: data/correcoes.json (notícias, resenhas, dados)
 * e o campo `corrections` de cada checagem. Nada é inventado: lista vazia = nenhuma correção.
 */
import raw from "@/data/correcoes.json";
import { checagens } from "@/lib/checagens";

export type CorrecaoTipo = "noticia" | "artigo" | "checagem" | "dados";

export type Correcao = {
  data: string; // AAAA-MM-DD
  tipo: CorrecaoTipo;
  slug?: string;
  titulo: string;
  mudanca: string;
  motivo: string;
};

export function correcaoHref(c: Pick<Correcao, "tipo" | "slug">): string | undefined {
  if (!c.slug) return undefined;
  if (c.tipo === "noticia") return `/noticias/${c.slug}`;
  if (c.tipo === "artigo") return `/artigos/${c.slug}`;
  if (c.tipo === "checagem") return `/checagem/${c.slug}`;
  return undefined;
}

export function allCorrecoes(): Correcao[] {
  const manual = (raw as { correcoes: Correcao[] }).correcoes;
  const fromChecagens: Correcao[] = checagens.flatMap((c) =>
    (c.corrections ?? []).map((x) => ({
      data: x.date,
      tipo: "checagem" as const,
      slug: c.slug,
      titulo: c.title,
      mudanca: x.text,
      motivo: "Registrado na própria checagem.",
    })),
  );
  return [...manual, ...fromChecagens].sort((a, b) => b.data.localeCompare(a.data));
}

/** "dd/mm" da correção mais recente de um item, ou undefined. */
export function correctedAt(tipo: CorrecaoTipo, slug: string): string | undefined {
  const c = allCorrecoes().find((x) => x.tipo === tipo && x.slug === slug);
  if (!c) return undefined;
  const [, m, d] = c.data.split("-");
  return `${d}/${m}`;
}
