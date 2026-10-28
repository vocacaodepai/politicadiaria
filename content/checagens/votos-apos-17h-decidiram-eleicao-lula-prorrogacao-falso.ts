import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "votos-apos-17h-decidiram-eleicao-lula-prorrogacao-falso",
  title: "É falso que os votos depois das 17h tenham decidido a eleição a favor de Lula",
  summary:
    "Posts dizem que a prorrogação até as 19h deu a vitória a Lula. Aos Fatos, E-farsas e Gazeta do Paraná mostram que cerca de 34 mil votos não explicam uma diferença de 4,4 milhões.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Segundo dados do TSE analisados por Aos Fatos, E-farsas e Gazeta do Paraná, foram cerca de 34 mil votos depois das 17h, contra uma vantagem de Lula de 4.430.191 votos. Mesmo que todos fossem dele e fossem retirados, o resultado não mudaria.",
  claim: {
    text: "Os votos registrados depois das 17h, com a prorrogação da votação até as 19h no 2º turno, teriam dado a vitória a Lula e indicariam fraude.",
    origin:
      "Publicações em redes sociais e grupos de mensagens depois da totalização de 25/10/2026, segundo o E-farsas. O Aos Fatos descreve a tese como sustentada por apoiadores de Flávio Bolsonaro e não identifica uma publicação específica.",
    firstSeen: "2026-10-25",
    attribution: "Perfis em redes sociais e grupos de mensagens, segundo o E-farsas e o Aos Fatos",
  },
  date: "2026-10-28",
  checkedAt: "2026-10-28T07:55:00-03:00",
  updated: "2026-10-28",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A votação foi estendida até as 19h. Segundo a Gazeta do Paraná, o ministro Cristiano Zanin (STF) decidiu às 17h03 de 25/10, e o TSE depois confirmou que a extensão valia só para seções que ainda estavam abertas. O Aos Fatos registra que o pedido partiu das duas campanhas.",
    },
    {
      status: "verdade",
      text: "Houve votos registrados depois das 17h: 34.393, segundo o Aos Fatos com dados do TSE (32.399 entre 17h e 18h, 1.981 entre 18h e 19h e 13 depois das 19h).",
    },
    {
      status: "falso",
      text: "Esses votos não explicam o resultado. A vantagem de Lula foi de 4.430.191 votos, segundo a Gazeta do Paraná. Pelas contas do Aos Fatos, a diferença é cerca de 128 vezes maior que o total de votos depois das 17h.",
    },
    {
      status: "falso",
      text: "Nem o cenário extremo muda o resultado. Se os 34.393 votos fossem todos de Lula e fossem descartados, a vantagem cairia para cerca de 4,37 milhões. Se fossem todos passados de Lula para Flávio, cairia para cerca de 4,33 milhões, segundo o Aos Fatos.",
    },
    {
      status: "atencao",
      text: "Nem todos esses votos vieram da prorrogação. Segundo a Gazeta do Paraná, quem já estava na fila às 17h podia votar pela lei. O E-farsas, que cita dados da Justiça Eleitoral, aponta que só 5.052 votos foram dados depois que a ordem chegou aos tribunais regionais, às 18h17.",
    },
    {
      status: "atencao",
      text: "O total varia conforme a base: 34.393 (Aos Fatos), 34.330 (Gazeta do Paraná, a partir de análise de dados do TSE) e cerca de 35 mil (E-farsas). As três ficam na mesma faixa e a conclusão é a mesma.",
    },
  ],
  sources: [
    {
      label: "Votos registrados após as 17h não mudam resultado das eleições",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/votos-registrados-apos-as-17h-nao-mudam-resultado-das-eleicoes/",
      kind: "agencia",
      note: "Conta 34.393 votos depois das 17h a partir de dados do TSE e compara com a vantagem de cerca de 4,4 milhões de Lula. Mostra os cenários extremos como limites matemáticos, e não como indício de irregularidade. Publicada em 27/10/2026, às 13h08.",
      published: "2026-10-27",
    },
    {
      label: "Os votos feitos depois das 17h deram a vitória para o Lula?",
      publisher: "E-farsas",
      url: "https://www.e-farsas.com/os-votos-feitos-depois-das-17h-deram-a-vitoria-para-o-lula.html",
      kind: "agencia",
      note: "Cruza dados da Justiça Eleitoral e conclui que os votos depois das 17h, cerca de 35 mil, não bastariam para alterar o resultado a favor de nenhum dos candidatos. Aponta que 7.352 urnas ainda estavam abertas depois da prorrogação. Publicada em 26/10/2026.",
      published: "2026-10-26",
    },
    {
      label: "Prorrogação da votação foi fraude? Gazeta checa 15 declarações feitas na Assembleia Legislativa do Paraná",
      publisher: "Gazeta do Paraná",
      url: "https://gazetadoparana.com.br/publico/prorrogacao-da-votacao-foi-fraude-gazeta-checa-15-declaracoes-feitas-na-assembleia-legislativa-do",
      kind: "imprensa",
      note: "Traz 34.330 votos depois das 17h, a vantagem de 4.430.191 votos, a cronologia da decisão de Zanin e a ressalva de que quem estava na fila às 17h podia votar. Publicada em 26/10/2026, às 17h09.",
      published: "2026-10-26",
    },
  ],
  timeline: [
    { date: "2026-10-25", text: "Zanin decide às 17h03 estender a votação até as 19h, a pedido das campanhas. O TSE esclarece depois que a extensão vale só para seções ainda abertas, segundo a Gazeta do Paraná." },
    { date: "2026-10-26", text: "E-farsas e Gazeta do Paraná publicam análises dos votos depois das 17h." },
    { date: "2026-10-27", text: "O Aos Fatos publica a checagem com 34.393 votos depois das 17h e a comparação com a vantagem de Lula." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Depois do 2º turno, circulou a tese de que os votos registrados depois das 17h, com a votação estendida até as 19h, teriam dado a vitória a Lula (PT) sobre Flávio Bolsonaro (PL). Segundo o <a href="https://www.aosfatos.org/noticias/votos-registrados-apos-as-17h-nao-mudam-resultado-das-eleicoes/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, foram 34.393 votos depois das 17h, com base em dados do TSE, contra uma vantagem de Lula de cerca de 4,4 milhões.</p>
    <p>A <a href="https://gazetadoparana.com.br/publico/prorrogacao-da-votacao-foi-fraude-gazeta-checa-15-declaracoes-feitas-na-assembleia-legislativa-do" target="_blank" rel="noopener noreferrer nofollow">Gazeta do Paraná</a> chega a 34.330 votos e à vantagem de 4.430.191. O <a href="https://www.e-farsas.com/os-votos-feitos-depois-das-17h-deram-a-vitoria-para-o-lula.html" target="_blank" rel="noopener noreferrer nofollow">E-farsas</a> fala em cerca de 35 mil votos. Os números diferem um pouco entre as fontes, mas ficam na mesma faixa.</p>

    <h2>A conta, com os cenários extremos</h2>
    <p>O Aos Fatos testou os casos-limite. Se todos os 34.393 votos fossem de Lula e fossem retirados, a vantagem cairia para cerca de 4,37 milhões. Se todos fossem transferidos de Lula para Flávio, a diferença cairia 68.786 votos, para cerca de 4,33 milhões. A checagem diz que são limites hipotéticos, e não indícios de irregularidade.</p>
    <p>Também importa o que a prorrogação mudou. Segundo a Gazeta do Paraná, quem já estava na fila às 17h tinha direito de votar, e o TSE confirmou que a extensão valia só onde as seções seguiam abertas. O E-farsas, citando dados da Justiça Eleitoral, aponta que 5.052 votos foram dados depois que a ordem chegou aos tribunais regionais. As duas campanhas pediram mais tempo de votação, como mostra a <a href="/checagem/prorrogacao-votacao-so-lula-pediu-pl-tambem-pediu-segundo-turno">checagem sobre os pedidos de prorrogação</a>.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O fato de que houve votos depois das 17h é verdadeiro. O que as fontes contrariam é a conclusão de que eles decidiram a eleição: o total equivale a menos de 1% da diferença entre os candidatos. Esta checagem trata do efeito numérico dos votos. A legalidade da decisão que estendeu o horário é assunto de ações em curso, que estão na <a href="/noticias/votos-prorrogacao-35-mil-anulacao-codigo-eleitoral">cobertura sobre o pedido de anulação</a> e na <a href="/noticias/zanin-prorroga-votacao-19h-segundo-turno">notícia sobre a decisão de Zanin</a>.</p>
    <p>O resultado oficial está no <a href="/eleicoes">painel de Eleições 2026</a>. A mesma régua vale para qualquer campo: veja as demais <a href="/checagem">checagens do 2º turno</a>.</p>
  `,
};
