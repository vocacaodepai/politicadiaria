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
        const raw = v.e ?? v.t;
        const text = raw.length > 170 ? `${raw.slice(0, 169).replace(/\s\S*$/, "")}…` : raw;
        return (
          <tr key={`${v.id}-${idx}`}>
            <td className="whitespace-nowrap font-mono text-xs text-muted">{brDate(v.d)}</td>
            <td>
              <b className="block text-sm leading-snug">{title}</b>
              <span className="text-xs leading-snug text-muted">{text}</span>
            </td>
            <td className="whitespace-nowrap text-sm font-medium">{VOTE_LABELS[casa][code] ?? code}</td>
            <td className="text-xs leading-snug text-muted">{resultText(casa, v)}</td>
          </tr>
        );
      })}
    </>
  );
}

export const VOTE_TABLE_CLASS =
  "w-full min-w-[640px] border-collapse [&_td]:border-t [&_td]:border-border [&_td]:py-2 [&_td]:pr-3 [&_td]:align-top [&_th]:pb-2 [&_th]:pr-3 [&_th]:text-left [&_th]:font-mono [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-muted";

export const VOTE_TABLE_HEAD = (
  <thead>
    <tr>
      <th scope="col">Data</th>
      <th scope="col">Matéria votada</th>
      <th scope="col">Registro</th>
      <th scope="col">Resultado</th>
    </tr>
  </thead>
);
