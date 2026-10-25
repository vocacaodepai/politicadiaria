/**
 * Guias de entrada "Os 5 livros para entender X" (/guias/<slug>).
 *
 * Ficam fora de content/articles: todo artigo do site é resenha de livro. O guia só reúne resenhas
 * que já existem e lê delas nota, preço, link de compra e "para quem serve". Nada é recalculado
 * nem reescrito aqui. A ordem é uma sugestão de leitura e o critério vem declarado em cada guia.
 */
import { getArticleBySlug } from "@/lib/articles";
import type { Article } from "@/lib/types";

export type Guia = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  /** Critério da ordem de leitura, mostrado ao leitor. */
  criterio: string;
  /** Slugs de content/articles, na ordem de leitura, com uma frase de porquê (sem fatos novos). */
  livros: { slug: string; porque: string }[];
};

export const guias: Guia[] = [
  {
    slug: "estado-e-economia",
    title: "Os 5 livros para entender Estado e economia",
    description: "Cinco resenhas para entender o debate sobre o papel do Estado na economia, do liberalismo clássico às instituições e ao caso brasileiro.",
    intro:
      "Cinco obras já resenhadas no site sobre o tamanho e o papel do Estado, o mercado e as instituições. São livros de tradição liberal e de economia de mercado, mais um estudo sobre instituições e uma memória do caso brasileiro. A nota de cada um julga a qualidade da obra, não a posição do autor, e as resenhas listam as críticas feitas a cada livro.",
    criterio:
      "Da introdução mais acessível à obra mais longa, com o caso brasileiro por último: começa pelo texto que a resenha indica como introdução curta, passa por Friedman e Hayek, segue para o estudo comparado de instituições e fecha com as memórias de 1.460 páginas.",
    livros: [
      { slug: "mises-as-seis-licoes-lvm", porque: "Porta de entrada: a resenha o indica como introdução curta e acessível." },
      { slug: "capitalismo-e-liberdade-friedman-intrinseca", porque: "Ensaio sobre liberdade econômica e política, em 320 páginas." },
      { slug: "o-caminho-da-servidao-hayek-lvm", porque: "Segue o debate sobre planejamento central, em 344 páginas." },
      { slug: "por-que-as-nacoes-fracassam-acemoglu", porque: "Amplia o foco para instituições e desenvolvimento, em 592 páginas." },
      { slug: "a-lanterna-na-popa-roberto-campos-topbooks", porque: "Fecha com o caso brasileiro, em 1.460 páginas." },
    ],
  },
  {
    slug: "conservadorismo",
    title: "Os 5 livros para entender o pensamento conservador",
    description: "Cinco resenhas para entender a tradição conservadora: do ensaio de entrada às fontes clássicas, com um olhar sobre o Brasil.",
    intro:
      "Cinco obras já resenhadas no site sobre conservadorismo, tradição e instituições, de um ensaio de entrada às fontes clássicas. A nota julga a qualidade do livro, não a posição do autor, e cada resenha lista as críticas feitas à obra.",
    criterio:
      "Do ensaio de entrada às fontes clássicas, com a leitura mais longa por último: Scruton abre porque a resenha o indica antes de Burke e Tocqueville, Garschagen entra como leitura leve sobre o Brasil, Burke e Sowell aprofundam e Tocqueville, com 768 páginas, fecha.",
    livros: [
      { slug: "como-ser-um-conservador-scruton-record", porque: "Entrada: a resenha o indica antes de passar a Burke e Tocqueville." },
      { slug: "pare-de-acreditar-no-governo-garschagen-record", porque: "Leitura leve, de viés liberal, sobre a relação entre brasileiros e Estado." },
      { slug: "reflexoes-revolucao-franca-burke-vide", porque: "A fonte do conservadorismo moderno, segundo a resenha." },
      { slug: "os-intelectuais-e-a-sociedade-sowell-e-realizacoes", porque: "Argumento sobre o papel dos formadores de opinião, para discutir com os próprios critérios." },
      { slug: "a-democracia-na-america-tocqueville-edipro", porque: "Clássico longo, de 768 páginas, para quem tem tempo." },
    ],
  },
  {
    slug: "poder-e-instituicoes",
    title: "Os 5 livros para entender poder e instituições",
    description: "Cinco resenhas para entender como o poder funciona: de Maquiavel e Locke à erosão democrática, ao Estado brasileiro e à ordem mundial.",
    intro:
      "Cinco obras já resenhadas no site sobre poder, governo e instituições, de clássicos a leituras atuais, do Brasil e do mundo. A nota julga a qualidade do livro, não a posição do autor, e cada resenha lista as críticas feitas à obra.",
    criterio:
      "Do texto mais curto ao mais longo, com uma exceção: Kissinger vem depois dos dois primeiros porque a resenha o indica a quem já tem alguma base em relações internacionais. Ordem: 176, 272, 432, 656 e 832 páginas.",
    livros: [
      { slug: "o-principe-maquiavel-penguin-companhia", porque: "Texto-base da reflexão moderna sobre poder, em 176 páginas." },
      { slug: "como-as-democracias-morrem-levitsky-ziblatt", porque: "Quadro simples para avaliar sinais de erosão democrática, em 272 páginas." },
      { slug: "ordem-mundial-kissinger-objetiva", porque: "Interpretação realista do equilíbrio de poder, em 432 páginas." },
      { slug: "dois-tratados-sobre-o-governo-locke-martins-fontes", porque: "Fonte das ideias de governo limitado e consentimento, em 656 páginas." },
      { slug: "os-donos-do-poder-faoro-resenha", porque: "Clássico sobre as origens do Estado brasileiro, em 832 páginas." },
    ],
  },
];

export function getGuia(slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug);
}

export type GuiaLivro = { article: Article; porque: string };

/** Resolve os slugs nas resenhas existentes; slug sem resenha é ignorado (o check-content avisa). */
export function guiaLivros(g: Guia): GuiaLivro[] {
  return g.livros.flatMap((l) => {
    const article = getArticleBySlug(l.slug);
    return article?.review ? [{ article, porque: l.porque }] : [];
  });
}
