import raw from "@/data/eleicoes/debate-ao-vivo.json";

/** Dados da cobertura do debate do 2º turno (Band, 18/10/2026). Fonte: data/eleicoes/debate-ao-vivo.json. */

export type Veredito = "Verdadeiro" | "Falso" | "Impreciso" | "Sem dado";

export type DebateAfirmacao = {
  candidato: string;
  tipo: "resumo" | "citacao";
  texto: string;
  fontes: number[];
};

export type DebateChecagem = {
  candidato: string;
  afirmacao: string;
  veredito: Veredito;
  nota: string;
  fontes: number[];
};

export type DebateBloco = {
  id: string;
  horario: string | null;
  horarioRotulo: string;
  bloco: string;
  tema: string;
  pergunta?: string;
  contexto?: string;
  fontesContexto?: number[];
  pendente?: boolean;
  afirmacoes: DebateAfirmacao[];
  respostaOutroLado: string | null;
  fontesResposta?: number[];
  checagens: DebateChecagem[];
};

export type DebateFonte = {
  n: number;
  rotulo: string;
  veiculo: string;
  url: string;
  conferidaEm: string;
  nota?: string;
};

export type DebateData = {
  atualizadoEm: string;
  status: "em-preparacao" | "parcial" | "ao-vivo" | "encerrado";
  statusRotulo: string;
  aviso: string;
  evento: {
    titulo: string;
    dataPrevista: string;
    inicioRegistrado?: string;
    emissora: string;
    mediadores: string;
    transmissao: string;
    formato: string[];
    fontesFormato: number[];
  };
  candidatos: { id: string; nome: string; partido: string; primeiroTurno: string; fonte: string }[];
  fontes: DebateFonte[];
  pendencias: string[];
  blocos: DebateBloco[];
};

export function getDebate(): DebateData {
  return raw as unknown as DebateData;
}
