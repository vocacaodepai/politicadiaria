import type { CamaraVote, SenadoVote, VoteRow } from "@/lib/congress";

export type Casa = "camara" | "senado";

export const VOTE_LABELS: Record<Casa, Record<string, string>> = {
  camara: { S: "Sim", N: "Não", A: "Abstenção", O: "Obstrução", "17": "Art. 17 (presidiu)", F: "Sem voto registrado" },
  senado: {
    S: "Sim",
    N: "Não",
    A: "Abstenção",
    O: "Obstrução",
    V: "Voto secreto",
    P: "Presidiu a sessão",
    R: "Presente, sem voto",
    F: "Não compareceu",
    AP: "Atividade parlamentar",
    M: "Missão oficial",
    L: "Licença",
    NA: "Não aplicável",
  },
};

export const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}/.test(s);
export const brDate = (iso: string) => (isDate(iso) ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : iso);

type AnyVote = CamaraVote | SenadoVote;

export function resultText(casa: Casa, v: AnyVote): string {
  if (casa === "camara") {
    const c = v as CamaraVote;
    const r = c.a === 1 ? "Aprovada" : c.a === 0 ? "Rejeitada" : "Resultado não informado";
    const parts = [c.s !== null ? `Sim ${c.s}` : null, c.n !== null ? `Não ${c.n}` : null, c.o ? `Outros ${c.o}` : null].filter(Boolean);
    return parts.length ? `${r} (${parts.join(" · ")})` : r;
  }
  const s = v as SenadoVote;
  const r = s.r === "A" ? "Aprovada" : s.r === "R" ? "Rejeitada" : s.sec ? "Votação secreta" : "Resultado não informado";
  const parts = s.sec ? [] : [s.s !== null ? `Sim ${s.s}` : null, s.n !== null ? `Não ${s.n}` : null, s.ab ? `Abst. ${s.ab}` : null].filter(Boolean);
  return parts.length ? `${r} (${parts.join(" · ")})` : r;
}

export type { VoteRow };
