/** Rótulos do Supremo seguros para componentes de cliente (sem acesso ao disco). */
export type Sigilo = "publico" | "sigiloso" | "nao_informado";

export const SIGILO_LABEL: Record<Sigilo, string> = {
  publico: "Público",
  sigiloso: "Sob sigilo",
  nao_informado: "Não informado pela fonte",
};
