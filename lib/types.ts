/**
 * Tipos compartilhados do conteúdo editorial.
 * Os artigos vivem em content/articles/<slug>.ts (um arquivo por artigo) e
 * são reunidos pelo índice gerado em content/articles/index.ts.
 */
export type FaqItem = { question: string; answer: string };

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number; // índice da opção correta
  explanation: string;
};

export const categories = [
  {
    slug: "politica-brasileira",
    label: "Política Brasileira",
    description:
      "Livros sobre o sistema político do Brasil: partidos, eleições, Congresso, presidencialismo de coalizão, Judiciário e as disputas que moldam o país.",
  },
  {
    slug: "politica-internacional",
    label: "Política Internacional",
    description:
      "Geopolítica, relações internacionais, guerras, diplomacia e as potências que decidem o tabuleiro global, em livros que valem a leitura.",
  },
  {
    slug: "historia-politica",
    label: "História Política",
    description:
      "Impérios, revoluções, ditaduras e democracias: obras de história que ajudam a entender de onde vêm as instituições de hoje.",
  },
  {
    slug: "ideias-politicas",
    label: "Ideias Políticas",
    description:
      "Liberalismo, conservadorismo, socialismo e outras tradições, dos clássicos aos autores contemporâneos, com resenha clara de cada obra.",
  },
  {
    slug: "economia-e-estado",
    label: "Economia e Estado",
    description:
      "Livros sobre o papel do Estado, políticas públicas, desigualdade, comércio e as escolhas econômicas que a política faz por todos nós.",
  },
  {
    slug: "democracia-e-instituicoes",
    label: "Democracia e Instituições",
    description:
      "Como democracias nascem, funcionam e morrem: constituições, cortes, partidos, imprensa e os limites do poder.",
  },
  {
    slug: "biografias",
    label: "Biografias e Memórias",
    description:
      "Vida e obra de líderes, presidentes, estadistas e personagens da política, em biografias e memórias com resenha e nota.",
  },
] as const;

export type Category = (typeof categories)[number]["slug"];

/** Dados estruturados da resenha de um livro (artigos com kind: "review"). */
export type ReviewData = {
  /** Título do livro avaliado. */
  tool: string;
  /** Autor ou autores do livro. */
  bookAuthor: string;
  /** Editora e ano da edição indicada (opcionais). */
  publisher?: string;
  year?: number;
  pages?: number;
  /** Nota final de 0 a 10, com uma casa decimal. */
  score: number;
  /** Critérios avaliados, cada um com nota de 0 a 10. */
  criteria: { label: string; score: number }[];
  pros: string[];
  cons: string[];
  /** Faixa de preço em texto, ex.: "R$ 40 a R$ 70 (verificado em 07/10/2026)". */
  price: string;
  /** Para quem o livro é ideal, em uma frase. */
  bestFor: string;
  /** Link de afiliado da Amazon Brasil com a tag do site (https). */
  url: string;
  /** Se há links de afiliado no artigo (exibe o aviso). Padrão: true nas resenhas. */
  affiliate?: boolean;
  /** Texto do botão principal. Padrão: "Ver o livro na Amazon". */
  ctaLabel?: string;
};

export type Article = {
  slug: string;
  title: string;
  /** Título curto para a tag <title> (até ~60 caracteres). Padrão: title. */
  seoTitle?: string;
  excerpt: string;
  /** Meta description (120-160 caracteres). Padrão: excerpt. */
  metaDescription?: string;
  category: Category;
  date: string; // ISO (AAAA-MM-DD)
  /** Data da última atualização editorial (AAAA-MM-DD). */
  updated?: string;
  /** Minutos de leitura declarados; o site recalcula pelo texto (ver readingTime). */
  readTime: number;
  imageQuery: string;
  seed: number;
  /**
   * Foto real do produto (self-hosted em /public/images/products), usada no lugar do
   * banco de imagens para a capa do livro, quando houver imagem de edição livre de uso.
   */
  coverImage?: { url: string; width: number; height: number; credit: string; creditUrl: string };
  content: string; // HTML
  /** Tipo do artigo. Padrão: "guia". */
  kind?: "guia" | "review";
  /** Voz autoral do blog. Padrão: a redação do site (lib/author.ts). */
  author?: string;
  /** Resumo em 3 pontos exibido logo após a capa. */
  keyPoints?: string[];
  /** Dados do review (só para kind: "review"). */
  review?: ReviewData;
  /** Perguntas frequentes exibidas em acordeão ao fim do artigo. */
  faq?: FaqItem[];
  /** Quiz curto pra fixar o aprendizado, exibido ao fim do artigo. */
  quiz?: QuizQuestion[];
};

export type NewsFaqItem = FaqItem;
export type NewsQuizQuestion = QuizQuestion;

/** Tópicos de notícia, usados só pelo filtro em /noticias (não confundir com `categories` dos artigos). */
export const newsTopics = [
  { slug: "brasil", label: "Brasil" },
  { slug: "congresso", label: "Congresso" },
  { slug: "justica", label: "Justiça e STF" },
  { slug: "economia", label: "Economia e política" },
  { slug: "eleicoes", label: "Eleições" },
  { slug: "mundo", label: "Mundo" },
  { slug: "americas", label: "Américas" },
  { slug: "europa", label: "Europa" },
  { slug: "oriente-medio", label: "Oriente Médio" },
  { slug: "asia", label: "Ásia e África" },
] as const;

export type NewsTopic = (typeof newsTopics)[number]["slug"];

export type NewsItem = {
  slug: string;
  title: string;
  /** Resumo curto (também vira meta description, cortada em ~158 caracteres). */
  summary: string;
  author: string;
  sourceName: string;
  sourceUrl: string;
  date: string; // ISO (AAAA-MM-DD)
  /**
   * Horário exato de publicação (ISO 8601 com offset, ex.:
   * "2026-10-05T14:32:00-03:00"), mostrado ao lado da data na listagem.
   * Opcional: notícia sem `publishedAt` mostra só a data, como sempre foi.
   */
  publishedAt?: string;
  /**
   * Texto completo da notícia (HTML), escrito a partir da fonte e exibido em
   * /noticias/[slug]. Opcional só nas notícias antigas; todo item novo deve ter.
   */
  content?: string;
  /**
   * Texto livre descrevendo a foto da capa (ex.: "Sam Altman portrait",
   * "OpenAI logo"), passado pela mesma cascata do CoverImage (Wikimedia
   * Commons primeiro). Opcional: notícia sem imageQuery não mostra capa,
   * mantendo o comportamento antigo.
   */
  imageQuery?: string;
  /** Tópico usado só pelo filtro em /noticias. Opcional nas notícias antigas. */
  topic?: NewsTopic;
  /** Perguntas frequentes exibidas em acordeão ao fim da matéria. */
  faq?: NewsFaqItem[];
  /** Quiz curto pra fixar o aprendizado, exibido ao fim da matéria. */
  quiz?: NewsQuizQuestion[];
};
