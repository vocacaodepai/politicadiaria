/**
 * Metadados puros da seção Checagem (sem importar o conteúdo), para poderem ser
 * usados em componentes de cliente sem levar todas as checagens para o bundle.
 */
import type { FactCheck, FactCheckSourceKind, FactCheckVerdict } from "@/lib/types";

export const CHECAGEM_PATH = "/checagem";

export type VerdictMeta = {
  slug: FactCheckVerdict;
  label: string;
  /** Frase curta que explica o selo. */
  meaning: string;
  /** Valor numérico no ClaimReview (1 a 5). */
  ratingValue: number;
};

/** Significado de cada selo, mostrado na página e usado no JSON-LD. */
export const verdictMeta: Record<FactCheckVerdict, VerdictMeta> = {
  falso: {
    slug: "falso",
    label: "Falso",
    meaning: "O fato central da alegação é contrariado por fontes primárias ou por fontes independentes.",
    ratingValue: 1,
  },
  enganoso: {
    slug: "enganoso",
    label: "Enganoso",
    meaning: "Parte do que se diz é verdadeira, mas o conjunto leva a uma conclusão que as fontes não sustentam.",
    ratingValue: 2,
  },
  "fora-de-contexto": {
    slug: "fora-de-contexto",
    label: "Fora de contexto",
    meaning: "O material é real, mas foi apresentado com data, local ou sentido diferentes dos originais.",
    ratingValue: 2,
  },
  "sem-provas": {
    slug: "sem-provas",
    label: "Sem provas",
    meaning: "Não há evidência aberta que confirme nem que desminta a alegação.",
    ratingValue: 3,
  },
  verdadeiro: {
    slug: "verdadeiro",
    label: "Verdadeiro",
    meaning: "As fontes primárias confirmam a alegação.",
    ratingValue: 5,
  },
};

export const sourceKindLabel: Record<FactCheckSourceKind, string> = {
  primaria: "Fonte primária",
  agencia: "Agência de checagem",
  imprensa: "Imprensa",
  referencia: "Referência",
};

export function checagemPath(slug: string): string {
  return `${CHECAGEM_PATH}/${slug}`;
}

/** Data da última atualização (a data da checagem, se nunca foi atualizada). */
export function checagemUpdated(c: Pick<FactCheck, "date" | "updated">): string {
  return c.updated && c.updated > c.date ? c.updated : c.date;
}
