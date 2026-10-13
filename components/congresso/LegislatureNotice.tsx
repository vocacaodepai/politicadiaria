import { getMeta, getSenator, getSenatorsIndex } from "@/lib/congress";

const dateBR = (iso: string) => new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });

/** Quantos dos senadores em exercício têm mandato até o fim da 57ª legislatura (31/01/2027). */
function senatorsUpForRenewal(end: string): number {
  return getSenatorsIndex().filter((s) => getSenator(s.slug)?.mandato.fim === end).length;
}

const CF = "https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-publicacaooriginal-1-pl.html";

/**
 * Aviso de data de coleta e de legislatura. A data vem de data/congresso/meta.json (a coleta
 * real, não a data da página); a posse de 1º/02/2027 está no art. 57, § 4º, da Constituição.
 */
export function LegislatureNotice({ className = "" }: { className?: string }) {
  const meta = getMeta();
  const end = "2027-01-31";
  const renew = senatorsUpForRenewal(end);
  const collected = new Date(meta.geradoEm).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
  return (
    <aside aria-labelledby="aviso-legislatura" className={`border-y-[3px] border-double border-foreground bg-surface-2/60 px-4 py-4 text-sm leading-relaxed ${className}`}>
      <h2 id="aviso-legislatura" className="label-mono text-accent">
        Quem aparece aqui: os parlamentares em exercício hoje
      </h2>
      <p className="mt-2">
        A listagem mostra quem exerce mandato na <strong>{meta.legislatura}ª legislatura</strong> ({dateBR(meta.inicioLegislatura)} a {dateBR(end)}). Os dados foram coletados nas bases abertas da Câmara e do Senado em{" "}
        <strong>{dateBR(meta.atualizadoEm)}</strong> ({collected}, horário de Brasília).
      </p>
      <p className="mt-2 text-muted">
        Os eleitos em outubro de 2026 só tomam posse em <strong className="text-foreground">1º de fevereiro de 2027</strong>, quando começa a 58ª legislatura: as sessões preparatórias de cada Casa para a posse dos novos membros ocorrem a partir dessa data (
        <a className="text-accent underline" href={CF} target="_blank" rel="noopener noreferrer">
          Constituição, art. 57, § 4º
        </a>
        ). Até lá, o mandato é exercido por quem está nesta lista. Em 2026 a renovação alcança as 513 cadeiras da Câmara e, no Senado, {renew} dos {getSenatorsIndex().length} senadores em exercício têm mandato até {dateBR(end)} (
        <a className="text-accent underline" href="https://legis.senado.leg.br/dadosabertos/senador/lista/atual" target="_blank" rel="noopener noreferrer">
          dados abertos do Senado
        </a>
        ). Quem foi reeleito ou eleito só passa a constar como parlamentar da nova legislatura depois da posse.
      </p>
    </aside>
  );
}
