import Link from "next/link";
import { getAgendaMeta, getParliamentarianAgenda, hasAgenda } from "@/lib/congress-agenda";
import { AgendaItem } from "./AgendaItem";
import { Card } from "./Stat";

/** Bloco "Agenda" da página de cada parlamentar: próximos 14 dias e últimos 7, com a fonte de cada item. */
export function AgendaSection({ casa, id, nome }: { casa: "camara" | "senado"; id: number; nome: string }) {
  const meta = hasAgenda() ? getAgendaMeta() : null;
  const items = meta ? getParliamentarianAgenda(casa, id) : null;
  if (!meta || !items) {
    return (
      <Card id="agenda" title="Agenda">
        <p className="text-sm text-muted">A agenda deste parlamentar ainda não foi coletada.</p>
      </Card>
    );
  }
  const collected = Date.parse(meta.geradoEm);
  const upcoming = items.filter((x) => Date.parse(x.evento.inicio) >= collected);
  const recent = items.filter((x) => !upcoming.includes(x)).reverse();
  const fonteLabel = casa === "camara" ? "API de eventos da Câmara" : "agenda do Senado (comissões, Plenário e Congresso Nacional)";
  return (
    <Card
      id="agenda"
      title="Agenda"
      note={
        <>
          Janela de {meta.janela.de.split("-").reverse().join("/")} a {meta.janela.ate.split("-").reverse().join("/")}, coletada em {meta.atualizadoEm.split("-").reverse().join("/")}. Fonte: {fonteLabel}; horários de Brasília. A convocação não garante presença nem que a reunião aconteça: confira a situação no link oficial. Quando a fonte não traz um campo, a página diz &quot;não informado pela fonte&quot;.{" "}
          <Link href="/congresso/agenda" className="text-accent underline">
            Ver a agenda de todos os parlamentares
          </Link>
          .
        </>
      }
    >
      {items.length === 0 ? (
        <p className="text-sm text-muted">
          Nenhum evento vinculado a {nome} na janela coletada. É comum em períodos de campanha eleitoral e recesso, quando a Câmara e o Senado reduzem as reuniões.
        </p>
      ) : (
        <>
          <h3 className="label-mono text-muted">Próximos eventos ({upcoming.length})</h3>
          {upcoming.length ? (
            <div className="mt-2 divide-y divide-border">
              {upcoming.map((x) => (
                <AgendaItem key={x.evento.id} e={x.evento} vinculo={x.v} cargo={x.cargo} />
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-muted">Nenhum evento futuro vinculado na coleta de {meta.atualizadoEm.split("-").reverse().join("/")}.</p>
          )}
          {recent.length > 0 && (
            <details className="mt-5">
              <summary className="cursor-pointer text-sm font-medium">Últimos 7 dias ({recent.length})</summary>
              <div className="mt-3 divide-y divide-border">
                {recent.map((x) => (
                  <AgendaItem key={x.evento.id} e={x.evento} vinculo={x.v} cargo={x.cargo} />
                ))}
              </div>
            </details>
          )}
        </>
      )}
    </Card>
  );
}
