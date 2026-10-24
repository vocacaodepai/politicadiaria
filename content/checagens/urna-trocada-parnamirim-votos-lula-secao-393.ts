import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "urna-trocada-parnamirim-votos-lula-secao-393",
  title: "Troca de urna em Parnamirim não foi por equipamento violado com votos para Lula",
  summary:
    "Vídeo mostra troca de urna na seção 393, em Parnamirim (RN). Aos Fatos e TRE-RN dizem que houve falha de tela e que nenhum voto foi perdido ou alterado.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Posts disseram que vídeo mostrava urna trocada por outra já violada e com votos para Lula em Parnamirim (RN), no 1º turno. Segundo Aos Fatos e Tribuna do Norte, a tela apagou às 13h05, a urna foi substituída às 13h40 pelo procedimento de contingência e, segundo o TRE-RN, não houve perda, alteração ou direcionamento de votos. Os votos já dados seguem na mídia da urna original.",
  claim: {
    text: "Um vídeo mostraria urnas sendo substituídas por equipamentos já violados e com votos pré-carregados para Lula em Parnamirim (RN).",
    origin:
      "Postagens no Instagram e no Facebook, a partir de 7/10/2026, e correntes de WhatsApp, segundo o Aos Fatos. Um dos textos dizia “Urnas sendo substituídas pelas urnas já violadas e com votos vcs sabem pra quem!”.",
    firstSeen: "2026-10-07",
    attribution: "Perfis em redes sociais, segundo o Aos Fatos",
  },
  date: "2026-10-24",
  checkedAt: "2026-10-24T14:40:00-03:00",
  updated: "2026-10-24",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A urna da seção 393, da 50ª Zona Eleitoral, no Colégio e Curso Over, em Parnamirim, foi de fato substituída em 4/10/2026. O Agora RN informa que a tela apagou por volta das 13h, antes de uma eleitora votar, e que a urna retirada foi enviada para análise técnica.",
    },
    {
      status: "falso",
      text: "Segundo o TRE-RN, citado por Aos Fatos e Tribuna do Norte, a troca seguiu o artigo 147 da Resolução TSE nº 23.751/2026 e não causou perda, alteração ou direcionamento de votos a nenhum candidato.",
    },
    {
      status: "falso",
      text: "Pelo procedimento descrito por Aos Fatos, os votos já dados ficam gravados na mídia da urna original e são recuperados na urna de contingência, e o sistema mantém o registro de quem já votou. A votação segue do ponto em que parou, sem votos pré-carregados.",
    },
    {
      status: "verdade",
      text: "A sequência de horários registrada: votação aberta às 8h, tela apagada às 13h05, reinício sem sucesso às 13h10, troca às 13h40 e encerramento às 18h24. Quem já estava na fila às 17h tem direito de votar, o que explica o horário.",
    },
    {
      status: "atencao",
      text: "A causa técnica da falha de tela não foi divulgada. O Agora RN informa que a urna retirada foi para análise, e a checagem não encontrou resultado dessa perícia.",
    },
    {
      status: "atencao",
      text: "Substituições são comuns: o Agora RN registra 19 trocas de urna no Rio Grande do Norte no 1º turno. A página do TSE com a checagem e a Resolução 23.751/2026 não abriram para consulta automática (erro 403) e não entram como fontes.",
    },
  ],
  sources: [
    {
      label: "É falso que vídeo mostra urna sendo trocada por outra com votos para Lula no RN",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/urna-trocada-votos-lula-rn/",
      kind: "agencia",
      note: "Registra o texto do boato, o alcance em Instagram, Facebook e WhatsApp, a linha do tempo da seção 393 e o procedimento de contingência, com a posição do TRE-RN. Publicada em 8/10/2026.",
      published: "2026-10-08",
    },
    {
      label: "TRE desmente boato de que urnas de Parnamirim foram substituídas por equipamentos violados",
      publisher: "Tribuna do Norte",
      url: "https://tribunadonorte.com.br/tn-nas-eleicoes-2026/tre-desmente-boato-de-que-urnas-de-parnamirim-foram-substituidas-por-equipamentos-violados/",
      kind: "imprensa",
      note: "Confirma de forma independente os horários da troca, a base na Resolução TSE nº 23.751/2026 e a afirmação do TRE-RN de que não houve perda, alteração ou direcionamento de votos.",
      published: "2026-10-08",
    },
    {
      label: "Justiça do RN registra substituição de urnas",
      publisher: "Agora RN",
      url: "https://agorarn.com.br/politica/justica-rn-registra-substituicao-urnas/",
      kind: "imprensa",
      note: "Relata que a tela da urna da seção 393 apagou antes de uma eleitora votar, que a urna foi enviada para análise técnica e que o estado teve 19 substituições no 1º turno.",
      published: "2026-10-05",
    },
  ],
  timeline: [
    { date: "2026-10-04", text: "No 1º turno, a urna da seção 393, em Parnamirim, apaga a tela por volta das 13h e é trocada às 13h40, segundo Aos Fatos e Tribuna do Norte." },
    { date: "2026-10-05", text: "O Agora RN noticia as substituições de urnas no estado, entre elas a da seção 393." },
    { date: "2026-10-07", text: "Postagens com o vídeo da troca e a alegação de urna violada circulam em Instagram, Facebook e WhatsApp, segundo o Aos Fatos." },
    { date: "2026-10-08", text: "Aos Fatos e Tribuna do Norte publicam a posição do TRE-RN de que a troca seguiu o procedimento e não alterou votos." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>No dia do primeiro turno, 4 de outubro, a urna da seção 393, da 50ª Zona Eleitoral, em Parnamirim (RN), parou de funcionar. Segundo o <a href="https://www.aosfatos.org/noticias/urna-trocada-votos-lula-rn/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, a votação começou às 8h, a tela apagou às 13h05 e um reinício feito cinco minutos depois não resolveu. Uma equipe técnica da Justiça Eleitoral substituiu o equipamento às 13h40, e a votação terminou às 18h24.</p>
    <p>Três dias depois, postagens passaram a usar imagens da troca para dizer que as urnas estariam sendo trocadas por outras já violadas, com votos pré-carregados. Um dos textos dizia “vcs sabem pra quem”, e o título do Aos Fatos identifica o suposto beneficiário como Lula. O Aos Fatos registra que o material teve interações em Instagram e Facebook e circulou em WhatsApp, onde o alcance não pode ser medido.</p>

    <h2>Como funciona a troca de urna</h2>
    <p>O TRE-RN explicou, conforme a <a href="https://tribunadonorte.com.br/tn-nas-eleicoes-2026/tre-desmente-boato-de-que-urnas-de-parnamirim-foram-substituidas-por-equipamentos-violados/" target="_blank" rel="noopener noreferrer nofollow">Tribuna do Norte</a>, que o artigo 147 da Resolução TSE nº 23.751/2026 prevê o roteiro: primeiro o reinício do equipamento; se a falha persistir, a troca por uma urna de contingência, feita por equipe designada pela Justiça Eleitoral. Os votos já registrados ficam na mídia da urna original e são transferidos para a nova, e o registro de quem já votou também é mantido.</p>
    <p>Por esse desenho, a urna de contingência não chega com votos. Ela recebe, da urna original, os que já foram dados, e a votação continua do ponto em que parou. O <a href="https://agorarn.com.br/politica/justica-rn-registra-substituicao-urnas/" target="_blank" rel="noopener noreferrer nofollow">Agora RN</a> acrescenta que a urna retirada foi enviada para análise técnica e que o estado teve 19 trocas no primeiro turno, em Natal e em outros 14 municípios.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A troca existiu, e o vídeo é real. O que as fontes contrariam é a conclusão: nem Aos Fatos nem a Tribuna do Norte encontraram indício de urna violada ou de votos pré-carregados, e o TRE-RN afirma que não houve perda, alteração ou direcionamento de votos. Esta checagem não atribui a autoria do boato a ninguém. A causa exata da falha de tela não foi divulgada, e o resultado da análise técnica da urna retirada não foi localizado.</p>
    <p>A mesma régua vale para qualquer candidato: boatos de urna aparecem em todos os campos, e a resposta é a mesma. Para entender as outras alegações sobre a votação, veja as <a href="/checagem">checagens</a> sobre urnas e o <a href="/eleicoes">painel de Eleições 2026</a>. As páginas do TSE não abriram para consulta automática, e por isso a explicação do procedimento vem da imprensa e da agência que as citam.</p>
  `,
};
