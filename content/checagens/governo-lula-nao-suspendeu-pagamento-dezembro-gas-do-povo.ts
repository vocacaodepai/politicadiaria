import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "governo-lula-nao-suspendeu-pagamento-dezembro-gas-do-povo",
  title: "Post engana ao dizer que o governo Lula suspendeu o Gás do Povo em dezembro",
  summary:
    "Posts dizem que o Gás do Povo foi bloqueado e não pagará em dezembro. Segundo o Aos Fatos, MDS e Caixa negam a suspensão; o vale depende da frequência da família.",
  author: "Equipe Política Diária",
  verdict: "enganoso",
  quick:
    "Enganoso. Segundo o Aos Fatos, o MDS nega a suspensão e a Caixa diz que há liberações previstas para 10/11 e 10/12. Mas nem toda família recebe vale todo mês: a frequência depende do tamanho da família.",
  claim: {
    text: "O governo Lula teria bloqueado os recursos do Gás do Povo, e os beneficiários não receberiam o auxílio para comprar gás de cozinha em dezembro de 2026.",
    origin:
      "Publicações em redes sociais com a chamada “notícia urgente”. Segundo o Aos Fatos, o conteúdo somava cerca de 6 milhões de visualizações no Instagram, 500 mil no X e 13 mil compartilhamentos no Facebook até a tarde de 28/10/2026.",
    firstSeen: "2026-10-28",
    attribution: "Publicações em redes sociais, segundo o Aos Fatos",
  },
  date: "2026-10-28",
  checkedAt: "2026-10-28T20:05:00-03:00",
  updated: "2026-10-28",
  topic: "Políticas públicas",
  points: [
    {
      status: "falso",
      text: "Não há suspensão do programa. Segundo o Aos Fatos, o MDS negou a suspensão, disse que o orçamento de 2026 está assegurado e que há previsão de recursos para 2027 na proposta orçamentária em análise no Congresso. O Aos Fatos também não encontrou anúncio de corte.",
    },
    {
      status: "verdade",
      text: "A Caixa, operadora do programa, informou ao Aos Fatos que o Gás do Povo segue funcionando e que as próximas liberações estão previstas para 10 de novembro e 10 de dezembro de 2026, conforme calendário do MDS.",
    },
    {
      status: "atencao",
      text: "O vale não chega a todas as famílias todo mês. O MDS informa que o número de recargas por ano varia de 4 a 6, conforme o tamanho da família. Segundo o Aos Fatos, famílias de 2 ou 3 pessoas têm direito a uma recarga a cada três meses e as de 4 ou mais, a cada dois meses. Por isso, algumas famílias podem não ter vale em dezembro sem que haja suspensão.",
    },
    {
      status: "atencao",
      text: "Para saber se a família tem vale disponível, o caminho é o aplicativo “Meu Social – Gás do Povo”, o portal da Caixa ou o telefone 121 (MDS), segundo o Aos Fatos.",
    },
  ],
  sources: [
    {
      label: "Governo Lula não suspendeu pagamento de dezembro do Gás do Povo",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/governo-lula-pagamento-dezembro-gas-do-povo/",
      kind: "agencia",
      note: "Registra a resposta do MDS (sem suspensão, orçamento de 2026 assegurado) e da Caixa (liberações em 10/11 e 10/12), e explica que a frequência do vale varia por família. Publicada em 28/10/2026, às 13h35, e classificada como enganosa.",
      published: "2026-10-28",
    },
    {
      label: "Gás do Povo",
      publisher: "Ministério do Desenvolvimento e Assistência Social (MDS)",
      url: "https://www.gov.br/mds/pt-br/acoes-e-programas/gas-do-povo",
      kind: "primaria",
      note: "Página oficial do programa: a família selecionada recebe um vale para recarga gratuita do botijão, e a quantidade de recargas por ano varia de 4 a 6 conforme o tamanho da família.",
    },
    {
      label: "Vale-recarga do Gás do Povo começa a ser liberado a partir desta segunda (10)",
      publisher: "Agência Gov",
      url: "https://agenciagov.ebc.com.br/noticias/202608/vale-recarga-do-gas-do-povo-comeca-a-ser-liberado-a-partir-desta-segunda-10",
      kind: "primaria",
      note: "Comunicado do governo federal de agosto de 2026 sobre a folha do mês, com os critérios de participação (ao menos duas pessoas na família, renda de até meio salário mínimo por pessoa, Cadastro Único atualizado) e os canais de dúvida e denúncia.",
      published: "2026-08-10",
    },
  ],
  timeline: [
    { date: "2026-08-10", text: "O governo federal libera a folha de agosto do Gás do Povo, segundo a Agência Gov." },
    { date: "2026-10-28", text: "O Aos Fatos publica a checagem com as respostas do MDS e da Caixa." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Publicações nas redes sociais afirmam que o governo Lula (PT) bloqueou os recursos do Gás do Povo e que os beneficiários não receberiam o auxílio em dezembro. Segundo o <a href="https://www.aosfatos.org/noticias/governo-lula-pagamento-dezembro-gas-do-povo/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, o conteúdo somava cerca de 6 milhões de visualizações no Instagram até a tarde de 28/10/2026.</p>
    <p>O Aos Fatos ouviu o Ministério do Desenvolvimento e Assistência Social (MDS), que negou a suspensão e disse que o orçamento de 2026 está assegurado, com previsão de recursos para 2027 na proposta orçamentária em análise no Congresso. A Caixa, que opera o programa, informou que ele funciona normalmente e que as próximas liberações de vales estão previstas para 10 de novembro e 10 de dezembro.</p>

    <h2>Por que a confusão acontece</h2>
    <p>Na <a href="https://www.gov.br/mds/pt-br/acoes-e-programas/gas-do-povo" target="_blank" rel="noopener noreferrer nofollow">página oficial do programa</a>, o MDS explica que a família selecionada recebe um vale para trocar o botijão em revendas credenciadas e que o número de recargas por ano varia de 4 a 6, conforme o tamanho da família. Segundo o Aos Fatos, famílias de 2 ou 3 pessoas têm uma recarga a cada três meses, e as de 4 ou mais, uma a cada dois meses.</p>
    <p>Isso significa que a folha de dezembro pode não incluir todas as famílias. O Aos Fatos destaca que isso é diferente de uma suspensão do programa. Os critérios de participação, descritos em <a href="https://agenciagov.ebc.com.br/noticias/202608/vale-recarga-do-gas-do-povo-comeca-a-ser-liberado-a-partir-desta-segunda-10" target="_blank" rel="noopener noreferrer nofollow">comunicado da Agência Gov</a> de agosto, incluem ao menos duas pessoas na família, renda de até meio salário mínimo por pessoa e Cadastro Único atualizado.</p>

    <h2>Por que o veredito é Enganoso</h2>
    <p>A parte central do boato, o bloqueio dos recursos e o fim do benefício em dezembro, é contrariada pelo MDS e pela Caixa, segundo o Aos Fatos. Há, porém, um fundo de verdade: o vale não é mensal para todas as famílias, e algumas não terão recarga em dezembro pela regra de frequência. Como o conjunto leva à conclusão de que o programa acabou, o selo é Enganoso, e não Falso. Na dúvida, a consulta deve ser feita nos canais oficiais, e não em mensagens encaminhadas.</p>
    <p>Veja outras <a href="/checagem">checagens</a> sobre boatos do período eleitoral.</p>
  `,
};
