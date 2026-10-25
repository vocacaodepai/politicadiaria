import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { listingMetadata } from "@/components/listing/metadata";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { apuracaoAoVivo, algumaApuracaoComecou, type ApuracaoViva } from "@/lib/apuracao";
import { fmtInt, fmtPct } from "@/lib/eleicoes";
import { AutoRefresh } from "./AutoRefresh";
import { Badge, ExternalLink, Panel, Section, SubNav } from "./Shared";

export const PATH = "/eleicoes/dia-da-eleicao";
const TITLE = "Dia da eleição: como votar no 2º turno e acompanhar a apuração";
const DESC =
  "Guia do eleitor para o 2º turno de 25 de outubro de 2026 (horário, documentos, celular, ordem do voto) e apuração de presidente e governadores com dados do TSE.";

export const diaEleicaoMetadata = (): Metadata => listingMetadata({ title: TITLE, description: DESC, path: PATH });

/* Fontes abertas citadas na página. TSE bloqueia robôs; os links foram conferidos pelo título no índice de busca. */
const F = {
  abDia: "https://agenciabrasil.ebc.com.br/justica/noticia/2026-08/eleicoes-2026-saiba-o-que-e-permitido-e-proibido-no-dia-da-votacao",
  abOrdem: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/primeiro-governador-depois-presidente-saiba-qual-ordem-de-votacao",
  senCal: "https://www12.senado.leg.br/noticias/infomaterias/2026/03/confira-datas-e-prazos-do-calendario-eleitoral-de-2026",
  senBranco: "https://www12.senado.leg.br/noticias/materias/2026/08/04/votos-em-branco-e-nulos-nao-interferem-no-resultado-das-urnas",
  tseLocal: "https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/consulte-com-antecedencia-o-local-onde-voce-ira-votar-no-2o-turno",
  tseRes: "https://www.tse.jus.br/legislacao/compilada/res/2026/resolucao-no-23-759-de-26-de-fevereiro-de-2026",
  portal: "https://resultados.tse.jus.br/",
  justifica: "https://justifica.tse.jus.br",
};

/* -------------------------------------------------------------- apuração */

/** "19:19:13" -> "19h19". */
const hora = (h: string | null) => (h ? `${h.slice(0, 2)}h${h.slice(3, 5)}` : null);

function Carimbo({ a }: { a: ApuracaoViva }) {
  if (a.origem === "nenhuma") {
    return (
      <p className="text-xs text-muted">
        Fonte: TSE. Não foi possível ler o arquivo do TSE neste momento; a página tenta de novo sozinha.
      </p>
    );
  }
  const g = hora(a.geradoHora);
  return (
    <p className="text-xs text-muted">
      Fonte: TSE{a.origem === "arquivo-do-site" ? " (último dado salvo no site, não o arquivo ao vivo)" : ""}, atualizado às {g ?? "hora não informada"}
      {a.geradoData ? ` de ${a.geradoData.slice(0, 5)}` : ""} (Brasília).
      {a.totalizacaoHora ? ` Última totalização: ${hora(a.totalizacaoHora)}${a.totalizacaoData ? ` de ${a.totalizacaoData.slice(0, 5)}` : ""}.` : ""}
    </p>
  );
}

function statusTexto(a: ApuracaoViva): string {
  switch (a.estado) {
    case "aguardando":
      return "Aguardando apuração: o TSE ainda não divulgou votos.";
    case "indisponivel":
      return "Aguardando apuração: a apuração ainda não começou ou os dados do TSE não puderam ser lidos agora.";
    case "apurando":
      return `${fmtPct(a.pctSecoes, 2)} das seções apuradas (${fmtInt(a.secoesTotalizadas)} de ${fmtInt(a.secoesTotal)}).`;
    case "concluida":
      return `${fmtPct(a.pctSecoes, 2)} das seções apuradas (${fmtInt(a.secoesTotalizadas)} de ${fmtInt(a.secoesTotal)}).`;
  }
}

function CartaoApuracao({ a }: { a: ApuracaoViva }) {
  const temVotos = a.estado === "apurando" || a.estado === "concluida" || a.origem === "arquivo-do-site";
  const pct = temVotos ? Math.min(100, a.pctSecoes) : 0;
  const algumEleito = a.candidatos.some((c) => c.eleitoSegundoTse);
  return (
    <article className="border border-border bg-surface p-4 sm:p-5" aria-labelledby={`${a.corrida.id}-t`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 id={`${a.corrida.id}-t`} className="font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
          {a.corrida.rotulo}
        </h3>
        <p className="label-mono text-muted">{a.corrida.uf === "BR" ? "Brasil" : a.corrida.uf}</p>
      </div>

      <div className="mt-3 min-h-[2.75rem]">
        <p className="text-sm font-semibold">{statusTexto(a)}</p>
        <div
          className="mt-1.5 h-2 bg-surface-2"
          role="progressbar"
          aria-label={`Seções apuradas, ${a.corrida.rotulo}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct * 100) / 100}
        >
          <div className="h-full bg-foreground/60" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="mt-4 space-y-3" aria-label={`Votos por candidato, ${a.corrida.rotulo}, em ordem alfabética do sobrenome`}>
        {a.candidatos.map((c, i) => (
          <li key={c.numero}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight sm:text-base">{c.nome}</p>
                <p className="text-xs text-muted">
                  {c.partido} · {c.numero}
                </p>
              </div>
              <p className="min-w-[8.5rem] text-right font-mono text-sm tabular-nums">
                {temVotos ? (
                  <>
                    <span className="font-bold">{fmtPct(c.pct)}</span>
                    <span className="block text-xs text-muted">{fmtInt(c.votos)} votos</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold">--</span>
                    <span className="block text-xs text-muted">aguardando</span>
                  </>
                )}
              </p>
            </div>
            <div className="mt-1 h-2.5 bg-surface-2" aria-hidden="true">
              <div className={`h-full ${i === 0 ? "bg-accent" : "bg-accent-2"}`} style={{ width: `${temVotos ? Math.min(100, c.pct) : 0}%` }} />
            </div>
            <p className="mt-1 min-h-[1.25rem]">
              {c.eleitoSegundoTse && <Badge tone="strong">Segundo o TSE: {c.situacao.toLowerCase()}</Badge>}
            </p>
          </li>
        ))}
      </ul>

      {temVotos && (
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Votos válidos: {fmtInt(a.votosValidos)}. Brancos: {fmtInt(a.brancos)}. Nulos: {fmtInt(a.nulos)}. Percentuais sobre os votos válidos, como o TSE calcula.
        </p>
      )}
      {a.estado === "concluida" && !algumEleito && (
        <p className="mt-2 text-xs leading-relaxed text-muted">Todas as seções constam como apuradas. O resultado só vale quando o TSE o declara.</p>
      )}
      <div className="mt-3 border-t border-border pt-2">
        <Carimbo a={a} />
      </div>
    </article>
  );
}

async function ApuracaoSection() {
  const dados = await apuracaoAoVivo();
  const comecou = algumaApuracaoComecou(dados);
  const todasFalharam = dados.every((d) => d.origem === "nenhuma" && d.motivoFalha);
  const pres = dados[0];
  const govs = dados.slice(1);
  return (
    <Section
      id="apuracao"
      kicker="Apuração ao vivo"
      title="Presidente e governadores, segundo o TSE"
      lead="Os números vêm dos arquivos de resultado do TSE e não passam por nenhuma conta nossa: sem projeção, sem previsão. Candidatos em ordem alfabética do sobrenome, igual para todos. A ordem não indica quem está à frente."
    >
      <div role="status" className="border-l-4 border-accent bg-surface-2 p-3 text-sm leading-relaxed">
        {comecou
          ? "A apuração começou. Esta página consulta o TSE a cada 30 segundos e se atualiza sozinha enquanto estiver aberta."
          : todasFalharam
            ? "A apuração ainda não começou ou o TSE não respondeu agora. Esta página tenta de novo sozinha a cada poucos segundos."
            : "A apuração ainda não começou. A votação termina às 17h (horário de Brasília) e os números aparecem aqui quando o TSE os divulgar."}
      </div>

      <div className="mt-5">
        <CartaoApuracao a={pres} />
      </div>
      <h3 className="mt-8 font-display text-xl font-bold tracking-tight">Governadores em segundo turno</h3>
      <p className="mt-1 text-sm text-muted">Acre, Amazonas, Distrito Federal, Espírito Santo, Rio Grande do Norte e Tocantins.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {govs.map((g) => (
          <CartaoApuracao key={g.corrida.id} a={g} />
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Portal oficial: <ExternalLink href={F.portal}>resultados.tse.jus.br</ExternalLink>. Se o TSE ficar fora do ar ou recusar a leitura automática, os cartões mostram &ldquo;aguardando apuração&rdquo; ou o último dado salvo no site, sempre com a fonte. O resultado final é o declarado pelo TSE.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------- informações */

function ComoVotar() {
  const li = "text-sm leading-relaxed sm:text-base";
  return (
    <Section id="como-votar" kicker="Informações para o eleitor" title="Como votar no domingo, 25 de outubro" lead="Resumo do que as fontes oficiais e a imprensa identificada informam. Cada item traz o link de onde veio.">
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Horário">
          <ul className="list-disc space-y-2 pl-5">
            <li className={li}>
              A votação vai das 8h às 17h, horário de Brasília, segundo a <ExternalLink href={F.abDia}>Agência Brasil</ExternalLink>.
            </li>
            <li className={li}>
              Quem já estiver na fila às 17h ainda pode votar, segundo a mesma reportagem.
            </li>
            <li className={li}>
              O trabalhador pode se ausentar pelo tempo necessário para votar, sem desconto no salário, segundo a <ExternalLink href={F.abDia}>Agência Brasil</ExternalLink>.
            </li>
          </ul>
        </Panel>

        <Panel title="O que levar">
          <ul className="list-disc space-y-2 pl-5">
            <li className={li}>
              Documento oficial original com foto, como RG, CNH ou passaporte. É obrigatório, segundo a <ExternalLink href={F.abDia}>Agência Brasil</ExternalLink>.
            </li>
            <li className={li}>
              O título de eleitor não é obrigatório, mas ajuda a agilizar. O celular pode mostrar o e-Título, segundo a <ExternalLink href={F.abOrdem}>Agência Brasil</ExternalLink>.
            </li>
            <li className={li}>
              Quem não tem biometria cadastrada também vota: veja <Link href="/noticias/tse-eleitor-sem-biometria-pode-votar-segundo-turno" className="text-accent underline underline-offset-2">a notícia</Link>.
            </li>
            <li className={li}>
              A lei permite levar uma colinha de papel com os números dos candidatos, segundo a <ExternalLink href={F.abOrdem}>Agência Brasil</ExternalLink>.
            </li>
          </ul>
        </Panel>

        <Panel title="Celular e cabine">
          <ul className="list-disc space-y-2 pl-5">
            <li className={li}>
              O celular não entra na cabine: deve ser entregue aos mesários antes. Smartwatch, câmera, filmadora e óculos inteligentes também ficam de fora. Quem se recusar pode ser impedido de votar naquele momento, segundo a <ExternalLink href={F.abOrdem}>Agência Brasil</ExternalLink>.
            </li>
            <li className={li}>
              A regra consta da <ExternalLink href={F.tseRes}>Resolução TSE nº 23.759/2026</ExternalLink>, segundo a <ExternalLink href={F.abDia}>Agência Brasil</ExternalLink>. Mais detalhes na <Link href="/noticias/celular-cabine-ordem-votacao-segundo-turno" className="text-accent underline underline-offset-2">nossa notícia</Link>.
            </li>
          </ul>
        </Panel>

        <Panel title="Ordem do voto, branco e nulo">
          <ul className="list-disc space-y-2 pl-5">
            <li className={li}>
              Em Acre, Amazonas, Distrito Federal, Espírito Santo, Rio Grande do Norte e Tocantins: primeiro governador, depois presidente. Nos demais estados, só presidente. Em cada cargo, digita-se o número do candidato e confirma, segundo a <ExternalLink href={F.abOrdem}>Agência Brasil</ExternalLink>.
            </li>
            <li className={li}>
              Voto em branco: tecla &ldquo;branco&rdquo; e depois &ldquo;confirma&rdquo;. Voto nulo: número que não corresponde a nenhum candidato, seguido de &ldquo;confirma&rdquo;. Nenhum dos dois entra nos votos válidos que definem o resultado, segundo a <ExternalLink href={F.senBranco}>Agência Senado</ExternalLink>.
            </li>
          </ul>
        </Panel>

        <Panel title="Onde votar">
          <ul className="list-disc space-y-2 pl-5">
            <li className={li}>
              Confira o local no aplicativo e-Título (opção &ldquo;Onde votar&rdquo;) ou no portal do TSE, segundo a <ExternalLink href={F.tseLocal}>orientação do TSE para o 2º turno</ExternalLink>.
            </li>
            <li className={li}>
              Segundo o <ExternalLink href={F.tseLocal}>TSE</ExternalLink>, só os tribunais regionais eleitorais alteram locais de votação. Neste 2º turno, <Link href="/noticias/tse-4352-secoes-local-votacao-alterado" className="text-accent underline underline-offset-2">4.352 seções mudaram de endereço</Link>.
            </li>
          </ul>
        </Panel>

        <Panel title="Boca de urna e propaganda no dia">
          <ul className="list-disc space-y-2 pl-5">
            <li className={li}>
              São proibidas a boca de urna e as aglomerações com roupas padronizadas, segundo a <ExternalLink href={F.abDia}>Agência Brasil</ExternalLink>.
            </li>
            <li className={li}>
              O eleitor pode manifestar sua preferência de forma individual e silenciosa, com bandeira, broche, adesivo ou camiseta, segundo a mesma reportagem.
            </li>
            <li className={li}>
              Viu mensagem sobre regras de votação que parece estranha? Confira antes de repassar em <Link href="/checagem" className="text-accent underline underline-offset-2">Checagem</Link>.
            </li>
          </ul>
        </Panel>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Quem não puder votar pode justificar a ausência pelo sistema <ExternalLink href={F.justifica}>justifica.tse.jus.br</ExternalLink>, segundo a Agência Brasil. As regras podem ser atualizadas pela Justiça Eleitoral: em caso de dúvida, vale o que o TSE e o TRE do seu estado informarem.
      </p>
    </Section>
  );
}

function QuandoSaem() {
  return (
    <Section id="resultados" kicker="Resultados" title="Quando saem os resultados">
      <Panel>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>
            A divulgação oficial dos resultados do 2º turno começa a partir das 17h, segundo o calendário da <ExternalLink href={F.senCal}>Agência Senado</ExternalLink>. Não há hora prevista para o fim da apuração: ela depende do que o TSE for totalizando.
          </li>
          <li>
            Como esta página atualiza: o servidor lê os arquivos oficiais do TSE e guarda a leitura por até 30 segundos; com a página aberta, o navegador busca a versão nova a cada 45 segundos. Cada cartão mostra a hora do arquivo do TSE.
          </li>
          <li>
            Não fazemos projeção nem previsão. Candidato só aparece como eleito aqui depois de o TSE marcá-lo assim no próprio arquivo, e a frase é sempre &ldquo;segundo o TSE&rdquo;.
          </li>
        </ul>
      </Panel>
    </Section>
  );
}

function Leitura() {
  const items = [
    { href: "/eleicoes", label: "Painel das eleições", d: "Resultados do 1º turno, Senado, Câmara e calendário." },
    { href: "/eleicoes/pesquisas", label: "Pesquisas e ranking de acerto", d: "Intenção de voto e quanto os institutos acertaram." },
    { href: "/checagem", label: "Checagem", d: "Boatos sobre a votação, com veredito e fontes." },
    { href: "/noticias/celular-cabine-ordem-votacao-segundo-turno", label: "Celular fica fora da cabine e governador vota antes", d: "Notícia de 24/10." },
    { href: "/noticias/tse-zeresima-sistemas-lacrados-segundo-turno", label: "TSE lacra sistemas e emite zerésima na véspera", d: "Notícia sobre a preparação das urnas." },
    { href: "/noticias/segundo-turno-governadores-sete-disputas", label: "Seis estados e o DF terão 2º turno para governador", d: "As disputas estaduais." },
    { href: "/noticias/calendario-ultima-semana-segundo-turno-tse", label: "Última semana do segundo turno", d: "O que vence entre 20 e 25 de outubro." },
    { href: "/noticias/eleitor-nao-pode-ser-preso-segundo-turno", label: "Eleitor não pode ser preso até 48h após o 2º turno", d: "Regras e exceções." },
  ];
  return (
    <Section id="leia-mais" kicker="Leia também" title="Painel, pesquisas, checagem e notícias do dia">
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.href} className="border-t border-border pt-3">
            <Link href={i.href} className="font-display text-lg font-bold leading-snug text-accent hover:underline">
              {i.label}
            </Link>
            <p className="text-xs text-muted">{i.d}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------- página */

export async function DiaEleicaoPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESC,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebPage", name: "Eleições 2026", url: absoluteUrl("/eleicoes") },
  };
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Eleições 2026", path: "/eleicoes" }, { name: "Dia da eleição", path: PATH }])} />
      <AutoRefresh />
      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Eleições 2026", href: "/eleicoes" }, { name: "Dia da eleição" }]} className="mb-6" />
        <ListingHeader
          label="Eleições 2026 · 2º turno"
          title="Dia da eleição: como votar e acompanhar a apuração"
          description="Domingo, 25 de outubro de 2026. Informações básicas para o eleitor e a apuração de presidente e governadores com dados do TSE, sem projeção."
          count="Fonte dos números: TSE · atualização automática"
        />
        <SubNav active="dia" />

        <nav aria-label="Nesta página" className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {[
            ["apuracao", "Apuração ao vivo"],
            ["como-votar", "Como votar"],
            ["resultados", "Quando saem os resultados"],
            ["leia-mais", "Leia também"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
              {label}
            </a>
          ))}
        </nav>

        <ApuracaoSection />
        <ComoVotar />
        <QuandoSaem />
        <Leitura />
      </Container>
    </>
  );
}
