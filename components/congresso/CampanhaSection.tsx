import { formatBRL, formatInt, formatPct, pct } from "@/lib/congress";
import { getCampanha, getCampanhaMeta, type CampanhaEleicao, type Total } from "@/lib/congress-campanha";
import { Card } from "./Stat";

const dmy = (iso: string) => iso.split("-").reverse().join("/");

function Src({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-accent" title="Conferir na fonte oficial">
      {children}
    </a>
  );
}

function Breakdown({ title, items, total, href }: { title: string; items: Total[]; total: number; href: string }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="label-mono text-muted">{title}</p>
      <table className="mt-1 w-full border-collapse text-sm">
        <caption className="sr-only">{title}</caption>
        <tbody>
          {items.map((i) => (
            <tr key={i.nome} className="border-t border-border align-top">
              <th scope="row" className="py-1 pr-2 text-left text-xs font-normal leading-snug">
                {i.nome}
              </th>
              <td className="whitespace-nowrap py-1 text-right font-mono text-xs tabular-nums">
                <Src href={href}>{formatBRL(i.total)}</Src>
                <span className="ml-1 text-muted">{total > 0 ? formatPct(pct(i.total, total), 0) : ""}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Election({ e }: { e: CampanhaEleicao }) {
  const src = e.fontes.prestacaoDeContas;
  if (e.status === "sem-candidatura") {
    return (
      <div className="rounded-lg border border-border p-3">
        <h3 className="font-display text-base font-bold">Eleição de {e.ano}</h3>
        <p className="mt-1 text-sm text-muted">
          Sem candidatura localizada nos dados abertos do TSE de {e.ano} com o mesmo nome civil e a mesma data de nascimento. Isso é esperado para quem não disputou aquela eleição (por exemplo, senadores eleitos em 2018 em relação a 2022).{" "}
          <Src href={e.fontes.dadosAbertos}>Fonte</Src>.
        </p>
      </div>
    );
  }
  if (e.status === "nao-vinculado") {
    return (
      <div className="rounded-lg border border-border p-3">
        <h3 className="font-display text-base font-bold">Eleição de {e.ano}</h3>
        <p className="mt-1 text-sm text-muted">
          <strong className="text-foreground">Não vinculado com segurança.</strong> {e.motivo ?? "Os dados do TSE não permitem associar este parlamentar a uma candidatura sem ambiguidade."} Nenhum valor é exibido para evitar atribuir a conta de outra pessoa.{" "}
          <Src href={e.fontes.dadosAbertos}>Fonte</Src>.
        </p>
      </div>
    );
  }
  const c = e.candidatura!;
  const r = e.receitas;
  const d = e.despesas;
  return (
    <div className="rounded-lg border border-border p-3">
      <h3 className="font-display text-base font-bold">
        Eleição de {e.ano}: {c.cargo.toLowerCase()} ({c.uf})
      </h3>
      <p className="mt-1 text-sm text-muted">
        Candidatura nº {c.numero}, nome de urna &quot;{c.nomeUrna}&quot;, {c.partido}. Situação da candidatura: {c.situacaoCandidatura ?? "não informada"}. Resultado: {c.resultado ?? "não informado (eleição em andamento ou sem apuração publicada)"}.
      </p>
      {e.avisoPrestacao ? (
        <p className="mt-2 text-sm text-muted">{e.avisoPrestacao}</p>
      ) : (
        <>
          <dl className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-lg border border-border p-3">
              <dt className="label-mono text-muted">Receitas declaradas</dt>
              <dd className="mt-0.5 font-display text-xl font-bold tabular-nums">{r ? <Src href={src}>{formatBRL(r.total)}</Src> : "n/d"}</dd>
            </div>
            <div className="rounded-lg border border-border p-3">
              <dt className="label-mono text-muted">Despesas contratadas</dt>
              <dd className="mt-0.5 font-display text-xl font-bold tabular-nums">{d ? <Src href={src}>{formatBRL(d.contratadas)}</Src> : "n/d"}</dd>
            </div>
            <div className="rounded-lg border border-border p-3">
              <dt className="label-mono text-muted">Despesas pagas</dt>
              <dd className="mt-0.5 font-display text-xl font-bold tabular-nums">{d ? <Src href={src}>{formatBRL(d.pagas)}</Src> : "n/d"}</dd>
            </div>
            <div className="rounded-lg border border-border p-3">
              <dt className="label-mono text-muted">Bens declarados</dt>
              <dd className="mt-0.5 font-display text-xl font-bold tabular-nums">
                {e.bens ? <Src href={e.fontes.dadosAbertos}>{formatBRL(e.bens.total)}</Src> : "n/d"}
              </dd>
              {e.bens && <p className="text-[11px] text-muted">{formatInt(e.bens.quantidade)} {e.bens.quantidade === 1 ? "item" : "itens"} na declaração ao TSE</p>}
            </div>
          </dl>
          <p className="mt-2 text-xs text-muted">
            Prestação de contas: {e.prestacao?.tipo ?? "tipo não informado pela fonte"}
            {e.prestacao?.ultimaData ? `; última data de entrega registrada: ${dmy(e.prestacao.ultimaData)}` : "; data de entrega não informada pela fonte"}.
            {e.ano >= 2026 && " Em 2026 a prestação ainda está em andamento e os valores são parciais."}
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {r && <Breakdown title="Receitas por origem" items={r.porOrigem} total={r.total} href={src} />}
            {d && <Breakdown title="Despesas contratadas, por tipo" items={d.porOrigemContratadas} total={d.contratadas} href={src} />}
            {e.bens && <Breakdown title="Bens declarados, por tipo" items={e.bens.porTipo} total={e.bens.total} href={e.fontes.dadosAbertos} />}
          </div>
          {r && (
            <p className="mt-3 text-xs text-muted">
              Doadores agregados por tipo: {formatInt(r.doadoresPessoaFisica)} {r.doadoresPessoaFisica === 1 ? "pessoa física" : "pessoas físicas"} e {formatInt(r.doadoresPessoaJuridica)} {r.doadoresPessoaJuridica === 1 ? "pessoa jurídica ou partido distinto" : "pessoas jurídicas ou partidos distintos"}. Nomes e CPF de doadores não são publicados aqui.
            </p>
          )}
        </>
      )}
      <p className="mt-2 text-[11px] text-muted">
        Vínculo com o parlamentar: {e.criterio}. Fontes:{" "}
        <Src href={e.fontes.dadosAbertos}>candidaturas e bens (dados abertos do TSE)</Src>, <Src href={e.fontes.prestacaoDeContas}>prestação de contas (dados abertos do TSE)</Src> e{" "}
        <Src href={e.fontes.consultaPublica}>DivulgaCandContas</Src>.
      </p>
    </div>
  );
}

export function CampanhaSection({ casa, id, nome }: { casa: "camara" | "senado"; id: number; nome: string }) {
  const meta = getCampanhaMeta();
  const data = meta ? getCampanha(casa, id) : null;
  return (
    <Card
      id="campanha"
      title="Gastos de campanha e bens declarados"
      note={
        meta
          ? `Dados abertos do TSE de ${dmy(meta.atualizadoEm)}. Podem estar em análise ou parciais. ${meta.observacao}`
          : undefined
      }
    >
      {!data ? (
        <p className="text-sm text-muted">
          Não coletado ainda. Os gastos de campanha de {nome} (candidaturas de 2022 e, quando houver, de 2026) saem dos dados abertos do TSE por um script próprio (<code>npm run congress:campanha</code>) que a rotina diária do Congresso executa; nenhum valor é estimado.
        </p>
      ) : (
        <div className="space-y-4">
          {data.eleicoes.map((e) => (
            <Election key={e.ano} e={e} />
          ))}
        </div>
      )}
    </Card>
  );
}
