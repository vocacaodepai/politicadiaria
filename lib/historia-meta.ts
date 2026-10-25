/**
 * Metadados puros da seção História (sem importar o conteúdo), para poderem ser
 * usados em componentes de cliente sem levar todos os artigos para o bundle.
 */
import { historyPeriods, type HistoryArticle, type HistoryPeriod } from "@/lib/types";

export const HISTORIA_PATH = "/historia";

/** Slugs que não podem ser usados por artigo (rotas fixas dentro de /historia). */
export const HISTORIA_RESERVED_SLUGS = ["periodo"] as const;

export function historiaPath(slug: string): string {
  return `${HISTORIA_PATH}/${slug}`;
}

export function historiaPeriodPath(period: HistoryPeriod): string {
  return `${HISTORIA_PATH}/periodo/${period}`;
}

export function getPeriod(slug: string) {
  return historyPeriods.find((p) => p.slug === slug);
}

/** Data da última atualização (a data de publicação, se nunca foi revisado). */
export function historiaUpdated(a: Pick<HistoryArticle, "date" | "updated">): string {
  return a.updated && a.updated > a.date ? a.updated : a.date;
}

/**
 * Marco da linha do tempo: uma eleição presidencial (direta ou indireta) ou um
 * fato eleitoral. `winner` só entra quando o resultado é consenso histórico;
 * cada artigo confere de novo, com fonte, o que afirma. Os marcos sem artigo
 * aparecem como "em breve" e não têm link.
 */
export type HistoriaMilestone = {
  year: number;
  /** Data(s) da votação, em texto curto. Vazio quando só se afirma o ano. */
  dates: string;
  period: HistoryPeriod;
  how: "direta" | "indireta";
  winner: string;
  note?: string;
};

export const HISTORIA_MILESTONES: HistoriaMilestone[] = [
  { year: 2022, dates: "2 e 30 de outubro", period: "nova-republica", how: "direta", winner: "Lula" },
  { year: 2018, dates: "7 e 28 de outubro", period: "nova-republica", how: "direta", winner: "Jair Bolsonaro" },
  { year: 2014, dates: "5 e 26 de outubro", period: "nova-republica", how: "direta", winner: "Dilma Rousseff" },
  { year: 2010, dates: "3 e 31 de outubro", period: "nova-republica", how: "direta", winner: "Dilma Rousseff" },
  { year: 2006, dates: "1º e 29 de outubro", period: "nova-republica", how: "direta", winner: "Lula" },
  { year: 2002, dates: "6 e 27 de outubro", period: "nova-republica", how: "direta", winner: "Lula" },
  { year: 1998, dates: "4 de outubro", period: "nova-republica", how: "direta", winner: "Fernando Henrique Cardoso" },
  { year: 1994, dates: "3 de outubro", period: "nova-republica", how: "direta", winner: "Fernando Henrique Cardoso" },
  { year: 1989, dates: "15 de novembro e 17 de dezembro", period: "nova-republica", how: "direta", winner: "Fernando Collor" },
  {
    year: 1985,
    dates: "15 de janeiro",
    period: "nova-republica",
    how: "indireta",
    winner: "Tancredo Neves",
    note: "Eleito pelo Colégio Eleitoral; José Sarney assumiu a Presidência.",
  },
  { year: 1978, dates: "15 de outubro", period: "ditadura-militar", how: "indireta", winner: "João Figueiredo" },
  { year: 1974, dates: "15 de janeiro", period: "ditadura-militar", how: "indireta", winner: "Ernesto Geisel" },
  { year: 1969, dates: "25 de outubro", period: "ditadura-militar", how: "indireta", winner: "Emílio Garrastazu Médici" },
  { year: 1966, dates: "3 de outubro", period: "ditadura-militar", how: "indireta", winner: "Artur da Costa e Silva" },
  { year: 1964, dates: "11 de abril", period: "ditadura-militar", how: "indireta", winner: "Humberto de Alencar Castelo Branco" },
  { year: 1960, dates: "3 de outubro", period: "republica-1946", how: "direta", winner: "Jânio Quadros" },
  { year: 1955, dates: "3 de outubro", period: "republica-1946", how: "direta", winner: "Juscelino Kubitschek" },
  { year: 1950, dates: "3 de outubro", period: "republica-1946", how: "direta", winner: "Getúlio Vargas" },
  { year: 1945, dates: "2 de dezembro", period: "republica-1946", how: "direta", winner: "Eurico Gaspar Dutra" },
  { year: 1934, dates: "17 de julho", period: "era-vargas", how: "indireta", winner: "Getúlio Vargas", note: "Eleito pela Assembleia Nacional Constituinte." },
  {
    year: 1930,
    dates: "1º de março",
    period: "era-vargas",
    how: "direta",
    winner: "Júlio Prestes",
    note: "Proclamado vencedor, não tomou posse: a Revolução de 1930 levou Getúlio Vargas ao poder.",
  },
  { year: 1926, dates: "", period: "republica-velha", how: "direta", winner: "Washington Luís" },
  { year: 1922, dates: "", period: "republica-velha", how: "direta", winner: "Artur Bernardes" },
  { year: 1919, dates: "", period: "republica-velha", how: "direta", winner: "Epitácio Pessoa", note: "Eleição extraordinária, depois da morte do presidente eleito em 1918." },
  { year: 1918, dates: "", period: "republica-velha", how: "direta", winner: "Rodrigues Alves", note: "Eleito, não chegou a tomar posse por doença e morreu em janeiro de 1919." },
  { year: 1914, dates: "", period: "republica-velha", how: "direta", winner: "Venceslau Brás" },
  { year: 1910, dates: "", period: "republica-velha", how: "direta", winner: "Hermes da Fonseca" },
  { year: 1906, dates: "", period: "republica-velha", how: "direta", winner: "Afonso Pena" },
  { year: 1902, dates: "", period: "republica-velha", how: "direta", winner: "Rodrigues Alves" },
  { year: 1898, dates: "", period: "republica-velha", how: "direta", winner: "Campos Sales" },
  { year: 1894, dates: "", period: "republica-velha", how: "direta", winner: "Prudente de Morais" },
];

/** Texto fixo do período sem eleição presidencial. */
export const IMPERIO_NOTE =
  "No Império (1822 a 1889) o chefe de Estado era o imperador, sem eleição presidencial. Esta seção tratará das eleições para a Câmara dos Deputados e das regras do voto na época, sempre com fonte e data.";
