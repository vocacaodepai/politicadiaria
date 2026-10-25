import raw from "@/data/documentos/documentos.json";

export type Documento = {
  id: string;
  titulo: string;
  orgao: string;
  status: "verificado" | "nao-verificado";
  verificadoEm: string | null;
  url: string;
  verificado: string | null;
  observacao: string | null;
};

export const documentos = (raw as { documentos: Documento[] }).documentos;
export const documentosObservacao = (raw as { observacao: string }).observacao;
