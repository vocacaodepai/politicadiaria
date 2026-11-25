import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "bolsa-familia-nao-acaba-marco-2027-pf-nao-visitara",
  title: "É falso que o Bolsa Família vai acabar em março de 2027 e que a PF fará visitas",
  summary:
    "Não há anúncio de fim ou corte do Bolsa Família em março de 2027, e o MDS nega visitas da PF. Visitas domiciliares previstas são do cadastro.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Não há anúncio de fim do Bolsa Família nem de benefício reduzido a R$ 350 em março de 2027. O ministério nega que a Polícia Federal vá visitar beneficiários; o acordo assinado com a PF trata de combate a fraudes.",
  claim: {
    text: "A partir de março de 2027, milhares de famílias perderiam o Bolsa Família e quem ficasse passaria a receber R$ 350. Outras publicações dizem que, a partir de 2027, a Polícia Federal visitaria as casas de beneficiários do programa e do BPC.",
    origin:
      "Publicações em redes sociais descritas pela Lupa e pelo Aos Fatos em 25 de novembro de 2026. Segundo o Aos Fatos, as postagens sobre a PF somavam ao menos 105 mil interações nas redes da Meta.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-25",
  checkedAt: "2026-11-25T18:23:00-03:00",
  updated: "2026-11-25",
  topic: "Benefícios sociais",
  points: [
    {
      status: "falso",
      text: "Não há previsão de fim ou de corte do programa em março de 2027. Segundo o MDS, em nota atualizada em 4 de novembro, o Bolsa Família segue em funcionamento, sem suspensão de pagamentos ou redução de benefícios.",
    },
    {
      status: "falso",
      text: "O valor de R$ 350 não aparece em norma nem anúncio localizado. Desde outubro, o mínimo por família é de R$ 691, segundo o MDS, e a Lei 14.601/2023 veda que as correções dos valores resultem em redução.",
    },
    {
      status: "falso",
      text: "Ao Aos Fatos, o MDS afirmou que não há medida para a PF visitar beneficiários. O acordo de novembro com o Ministério da Justiça, com participação da PF, prevê troca de dados, inteligência e investigação contra fraudes.",
    },
    {
      status: "verdade",
      text: "Há mudança em visitas domiciliares: pela Portaria MDS 1.199/2026, a entrevista em casa passa a ser obrigatória para inclusão ou atualização cadastral no BPC a partir de 1º de julho de 2027, com exceções a regulamentar. A portaria não atribui a tarefa à PF.",
    },
    {
      status: "atencao",
      text: "Uma família pode deixar de receber ou ter o valor alterado se não cumprir as regras ou se mudar sua renda ou composição. Isso é regra do programa e não equivale a um corte geral com data marcada.",
    },
  ],
  sources: [
    {
      label: "MDS alerta para circulação de informações falsas sobre Bolsa Família e Gás do Povo",
      publisher: "Ministério do Desenvolvimento e Assistência Social",
      url: "https://www.gov.br/mds/pt-br/noticias-e-conteudos/Noticias/2026/bolsa-familia-e-gas-do-povo-mds-alerta-para-circulacao-de-informacoes-falsas",
      kind: "primaria",
      note: "Publicada em 27 de outubro e atualizada em 4 de novembro: nega cortes, informa que o programa segue sem suspensão ou redução e registra o piso de R$ 691.",
      published: "2026-10-27",
    },
    {
      label: "MDS, MJSP e Polícia Federal firmam acordo para combater fraudes no CadÚnico e Bolsa Família",
      publisher: "Ministério do Desenvolvimento e Assistência Social",
      url: "https://www.gov.br/mds/pt-br/noticias-e-conteudos/Noticias/2026/mds-firma-acordo-de-cooperacao-com-mjsp-e-policia-federal-para-fortalecer-prevencao-e-combate-a-fraudes-no-cadastro-unico-e-no-bolsa-familia",
      kind: "primaria",
      note: "Descreve o Acordo de Cooperação Técnica 49/2026: compartilhamento de informações, cruzamento de bases, protocolos, inteligência e investigação contra golpes e fraudes. Não menciona visitas a casas.",
      published: "2026-11-09",
    },
    {
      label: "Lei nº 14.601/2023, que institui o Programa Bolsa Família",
      publisher: "Planalto",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm",
      kind: "primaria",
      note: "Permite corrigir os valores dos benefícios em intervalos de no máximo 24 meses, na forma de regulamento, vedada a redução. Também prevê alteração do valor da família quando mudam renda ou composição.",
      published: "2023-06-19",
    },
    {
      label: "Portaria MDS nº 1.199, de 15 de julho de 2026",
      publisher: "Ministério do Desenvolvimento e Assistência Social",
      url: "https://www.gov.br/mds/pt-br/acesso-a-informacao/legislacao/portaria/PORTARIAMDSN1.199de15DEJULHODE2026DOUImprensaNacional.pdf",
      kind: "primaria",
      note: "Torna obrigatória a entrevista domiciliar para o BPC a partir de 1º de julho de 2027 e determina que atualizações de famílias de uma só pessoa no Bolsa Família sejam feitas no domicílio, com exceções.",
      published: "2026-07-15",
    },
    {
      label: "É falso que Bolsa Família será encerrado em março de 2027",
      publisher: "Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/11/25/e-falso-que-bolsa-familia-sera-encerrado-em-marco-de-2027/",
      kind: "agencia",
      note: "Reproduz o texto que circulou, com mais de 3,7 mil curtidas em uma publicação no Facebook, e conclui que não há previsão de cortes.",
      published: "2026-11-25",
    },
    {
      label: "PF não visitará casas de beneficiários do BPC e do Bolsa Família a partir de 2027",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/pf-bolsa-familia-bpc/",
      kind: "agencia",
      note: "Traz a negativa do MDS, informa que a PF não respondeu e explica que as visitas de cadastro são feitas por servidores dos Cras.",
      published: "2026-11-25",
    },
    {
      label: "Bolsa Família não terá reajuste previsto no Orçamento de 2027",
      publisher: "Folha de Pernambuco",
      url: "https://www.folhape.com.br/economia/bolsa-familia-nao-tera-reajuste-previsto-no-orcamento-de-2027/509855/",
      kind: "imprensa",
      note: "Informa que a proposta enviada ao Congresso em 31 de agosto, antes do reajuste de setembro, reserva R$ 157,1 bilhões ao programa, abaixo dos R$ 158,6 bilhões previstos para 2026.",
      published: "2026-08-31",
    },
  ],
  timeline: [
    { date: "2026-08-31", text: "O governo envia ao Congresso a proposta de Orçamento de 2027, com R$ 157,1 bilhões para o Bolsa Família, segundo a Folha de Pernambuco." },
    { date: "2026-09-17", text: "O MDS anuncia correção de 15,04% nos benefícios a partir de outubro, com piso de R$ 691." },
    { date: "2026-11-04", text: "O MDS atualiza a nota em que nega cortes no Bolsa Família." },
    { date: "2026-11-09", text: "O MDS divulga o acordo de combate a fraudes com o Ministério da Justiça e a Polícia Federal." },
    { date: "2026-11-25", text: "Lupa e Aos Fatos publicam checagens sobre o fim do programa e as visitas da PF." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>O texto reproduzido pela <a href="https://www.agencialupa.org/verificacao/2026/11/25/e-falso-que-bolsa-familia-sera-encerrado-em-marco-de-2027/" target="_blank" rel="noopener noreferrer nofollow">Lupa</a> fala em perda do benefício em março de 2027, em pagamento de R$ 350 para quem permanecer e em fiscalização de todos os que recebem o BPC. A agência afirma que não há anúncio de cortes. O <a href="https://www.gov.br/mds/pt-br/noticias-e-conteudos/Noticias/2026/bolsa-familia-e-gas-do-povo-mds-alerta-para-circulacao-de-informacoes-falsas" target="_blank" rel="noopener noreferrer nofollow">Ministério do Desenvolvimento e Assistência Social (MDS)</a> já havia negado cortes em nota publicada em 27 de outubro e atualizada em 4 de novembro.</p>
    <p>A <a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm" target="_blank" rel="noopener noreferrer nofollow">Lei 14.601/2023</a> autoriza o Executivo a corrigir os valores dos benefícios e diz que a correção não pode reduzi-los. Uma mudança na própria lei dependeria de nova norma, e não localizamos anúncio oficial nesse sentido. A lei também prevê que o valor pago a uma família pode cair quando há alteração de renda ou de composição familiar.</p>
    <p>Sobre o orçamento, a <a href="https://www.folhape.com.br/economia/bolsa-familia-nao-tera-reajuste-previsto-no-orcamento-de-2027/509855/" target="_blank" rel="noopener noreferrer nofollow">Folha de Pernambuco</a> registrou que a proposta para 2027 reserva R$ 157,1 bilhões ao programa, menos que os R$ 158,6 bilhões previstos para 2026. O projeto foi enviado antes do reajuste anunciado em setembro e ainda depende do Congresso, por isso o número pode mudar. Ele indica um programa mantido no ano que vem, e não encerrado em março.</p>

    <h2>De onde vem a história das visitas</h2>
    <p>Em 9 de novembro, o MDS divulgou um <a href="https://www.gov.br/mds/pt-br/noticias-e-conteudos/Noticias/2026/mds-firma-acordo-de-cooperacao-com-mjsp-e-policia-federal-para-fortalecer-prevencao-e-combate-a-fraudes-no-cadastro-unico-e-no-bolsa-familia" target="_blank" rel="noopener noreferrer nofollow">acordo de cooperação</a> com o Ministério da Justiça, com participação da PF. O objetivo descrito é enfrentar links, aplicativos e sites falsos que usam o nome do Cadastro Único e do Bolsa Família, além de grupos que tentam obter benefícios de forma indevida.</p>
    <p>Segundo o <a href="https://www.aosfatos.org/noticias/pf-bolsa-familia-bpc/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, as publicações distorcem esse acordo. O ministério disse à agência que não há medida para a PF visitar beneficiários, e a corporação não respondeu. Visitas ligadas ao cadastro existem em situações específicas e são feitas por servidores dos Centros de Referência de Assistência Social (Cras).</p>
    <p>A <a href="https://www.gov.br/mds/pt-br/acesso-a-informacao/legislacao/portaria/PORTARIAMDSN1.199de15DEJULHODE2026DOUImprensaNacional.pdf" target="_blank" rel="noopener noreferrer nofollow">Portaria MDS 1.199</a>, de julho, fixa que a partir de 1º de julho de 2027 a entrevista domiciliar será obrigatória para incluir ou atualizar o cadastro de quem pede ou recebe o BPC. No Bolsa Família, a mesma data vale para exigir que famílias de uma só pessoa atualizem o cadastro no domicílio. Há exceções previstas.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>As duas partes centrais não se sustentam: não há fim ou corte do programa marcado para março de 2027, e o ministério responsável nega visitas da Polícia Federal. Existe uma regra real sobre entrevistas em casa, mas ela começa em julho, trata de cadastro e não foi atribuída à PF.</p>
    <p>Quem recebe o benefício pode conferir a situação pelos aplicativos oficiais, pelo telefone 121 do ministério ou no Cras do município, sem informar dados em links recebidos por mensagem. Outras checagens sobre o tema: o <a href="/checagem/video-cnn-bolsa-familia-acabar-lula-e-de-2025-regra-transicao">vídeo de 2025 apresentado como plano de acabar com o programa</a> e o <a href="/checagem/governo-lula-nao-suspendeu-pagamento-dezembro-gas-do-povo">post sobre suspensão do Gás do Povo</a>.</p>
  `,
};
