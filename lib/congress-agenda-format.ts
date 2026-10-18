/** Tipos e formatos puros da agenda (sem fs): seguros para componentes de cliente. */

export type AgendaCategoria = "sessao" | "comissao" | "audiencia" | "outro";

export type AgendaEvento = {
  id: string;
  casa: "camara" | "senado" | "congresso";
  /** ISO 8601 com o fuso de Brasília (-03:00). */
  inicio: string;
  fim: string | null;
  tipo: string;
  categoria: AgendaCategoria;
  titulo: string;
  orgao: { id: string; sigla: string; nome: string } | null;
  local: string | null;
  /** Situação padronizada: Convocada, Realizada, Cancelada, Suspensa, Em andamento, Não realizada. */
  situacao: string;
  situacaoFonte: string | null;
  /** true/false quando a fonte informa; null = "não informado pela fonte". */
  reservada: boolean | null;
  url: string;
  pauta: string | null;
  registro: string | null;
  fonte: string;
  partidos: string[];
  ufs: string[];
  parlamentares: number;
  registrados: number;
};

export type AgendaMeta = {
  atualizadoEm: string;
  geradoEm: string;
  janela: { de: string; ate: string };
  fusoHorario: string;
  totais: Record<string, number>;
  fontes: Record<string, string>;
  falhas: { fonte: string; erro: string }[];
};

export const AGENDA_CATEGORIAS: Record<AgendaCategoria, string> = {
  sessao: "Sessão",
  comissao: "Comissão",
  audiencia: "Audiência",
  outro: "Outro",
};

/** "2026-10-21T10:00:00-03:00" -> "21/10/2026 às 10h00 (Brasília)". */
export function formatAgendaWhen(iso: string, withZone = true): string {
  const d = iso.slice(0, 10).split("-").reverse().join("/");
  const hm = iso.slice(11, 16).replace(":", "h");
  return `${d} às ${hm}${withZone ? " (Brasília, UTC-03:00)" : ""}`;
}
export const agendaDay = (iso: string) => iso.slice(0, 10);

export const RESERVADA_TEXT = (r: boolean | null) => (r === null ? "não informado pela fonte" : r ? "Sim, a fonte marca como reservada/sigilosa" : "Não, a fonte não marca como reservada");

export function situacaoTone(s: string): "ok" | "warn" | "bad" | "idle" {
  if (s === "Convocada" || s === "Em andamento") return "ok";
  if (s === "Cancelada" || s === "Não realizada") return "bad";
  if (s === "Suspensa") return "warn";
  return "idle";
}
