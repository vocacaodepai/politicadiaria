import type { CamaraVote, SenadoVote, VoteRow } from "@/lib/congress";
import { VOTE_LABELS, brDate, resultText, type Casa } from "./votes-shared";

/** Linhas <tr> de votações; usado no servidor (primeiras 100) e no cliente (ver mais). */
export function VoteTableRows({ casa, rows, dict }: { casa: Casa; rows: VoteRow[]; dict: (CamaraVote | SenadoVote)[] }) {
  return (
    <>
      {rows.map(([idx, code]) => {
        const v = dict[idx];
        if (!v) return null;
        const title = v.m ?? "Matéria não identificada";
        const text = v.e ?? v.t;
        return (
          <tr key={`${v.id}-${idx}`} className="border-t border-border align-top">
            <td className="whitespace-nowrap py-2 pr-3 font-mono text-xs text-muted">{brDate(v.d)}</td>
            <td className="py-2 pr-3">
              <span className="block text-sm font-semibold leading-snug">{title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-muted">{text}</span>
            </td>
            <td className="whitespace-nowrap py-2 pr-3 text-sm font-medium">{VOTE_LABELS[casa][code] ?? code}</td>
            <td className="py-2 text-xs leading-snug text-muted">{resultText(casa, v)}</td>
          </tr>
        );
      })}
    </>
  );
}

export const VOTE_TABLE_HEAD = (
  <thead>
    <tr className="text-left">
      <th scope="col" className="pb-2 pr-3 label-mono text-muted">Data</th>
      <th scope="col" className="pb-2 pr-3 label-mono text-muted">Matéria votada</th>
      <th scope="col" className="pb-2 pr-3 label-mono text-muted">Registro</th>
      <th scope="col" className="pb-2 label-mono text-muted">Resultado da votação</th>
    </tr>
  </thead>
);
