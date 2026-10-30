import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "corte-r-5-9-bi-saude-educacao-pos-eleicao-reportagem-cnn-e-de-2024",
  title: "Reportagem sobre corte de R$ 5,9 bi na Saúde e na Educação é de julho de 2024",
  summary:
    "Vídeo da CNN circula como se mostrasse corte feito por Lula após o 2º turno de 2026. Segundo a Lupa, é de 31/07/2024 e trata de bloqueio no Orçamento daquele ano.",
  author: "Equipe Política Diária",
  verdict: "fora-de-contexto",
  quick:
    "Fora de contexto. O trecho é real, mas de 31/07/2024: trata do bloqueio de R$ 15 bi no Orçamento daquele ano, e não de corte feito depois da eleição de 2026. A Lupa não achou notícia de novo corte.",
  claim: {
    text: "Mensagem com a frase “Pós eleição | Lula acaba de cortar quase R$ 6 Bilhões da Saúde e Educação”, ilustrada com trecho de reportagem da CNN.",
    origin:
      "Mensagens de WhatsApp e publicações no Facebook, Instagram e YouTube, segundo a Lupa, que foi acionada por leitores até 29/10/2026. A Lupa não informou o alcance.",
    firstSeen: "2026-10-28",
    attribution: "Publicações em redes sociais e mensagens de WhatsApp, segundo a Lupa",
  },
  date: "2026-10-30",
  checkedAt: "2026-10-30T07:42:00-03:00",
  updated: "2026-10-30",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "O trecho não é recente. Segundo a Lupa, vem do programa Live CNN de 31 de julho de 2024, e uma pesquisa em buscadores por novo corte na Saúde e na Educação não retornou resultados.",
    },
    {
      status: "verdade",
      text: "O bloqueio existiu em 2024. O governo anunciou em 18/07/2024 uma contenção de R$ 15 bilhões no Orçamento, sendo R$ 11,2 bilhões de bloqueio e R$ 3,8 bilhões de contingenciamento, segundo a Agência Brasil.",
    },
    {
      status: "verdade",
      text: "A Saúde teve o maior bloqueio em valor absoluto, de R$ 4,4 bilhões, segundo o UOL. O valor citado na mensagem (quase R$ 6 bilhões) corresponde à soma de Saúde e Educação naquele decreto de 2024.",
    },
    {
      status: "atencao",
      text: "As fontes divergem no valor da Educação: a Lupa fala em R$ 1,5 bilhão e o UOL, em R$ 1,28 bilhão, o que dá cerca de R$ 5,7 bilhões a R$ 5,9 bilhões na soma. Nenhuma das duas liga o valor a 2026. O decreto de 2024 é o documento a consultar.",
    },
    {
      status: "atencao",
      text: "Esta checagem não avalia a execução do Orçamento de 2026. Quem quiser conferir bloqueios ou contingenciamentos do ano deve consultar os relatórios bimestrais do governo e o Diário Oficial da União.",
    },
  ],
  sources: [
    {
      label: "Reportagem que mostra cortes na Saúde e Educação não é atual; vídeo é de 2024",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/jornalismo/2026/10/29/reportagem-que-mostra-cortes-na-saude-e-educacao-nao-e-atual-video-e-de-2024/",
      kind: "agencia",
      note: "Identificou por busca reversa o trecho do Live CNN de 31/07/2024. Informa bloqueio de R$ 4,4 bi na Saúde e R$ 1,5 bi na Educação e que a busca por novo corte não retornou resultados.",
      published: "2026-10-29",
    },
    {
      label: "Para cumprir marco fiscal, governo suspende R$ 15 bilhões do orçamento",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/economia/noticia/2024-07/para-cumprir-marco-fiscal-governo-suspende-r-15-bilhoes-do-orcamento",
      kind: "imprensa",
      note: "Registra o anúncio do ministro da Fazenda, Fernando Haddad, em 18/07/2024: contenção de R$ 15 bi, sendo R$ 11,2 bi de bloqueio e R$ 3,8 bi de contingenciamento, para cumprir o arcabouço fiscal.",
      published: "2024-07-18",
    },
    {
      label: "Governo bloqueia R$ 4,4 bi da Saúde e R$ 2,1 bi das Cidades no Orçamento",
      publisher: "UOL",
      url: "https://economia.uol.com.br/noticias/redacao/2024/07/30/governo-detalha-congelamento-de-r-15-bilhoes.htm",
      kind: "imprensa",
      note: "Detalha o decreto assinado em 30/07/2024: 30 dos 31 ministérios atingidos, R$ 4,4 bi na Saúde e R$ 1,28 bi na Educação, com preservação dos mínimos constitucionais de Saúde e Educação.",
      published: "2024-07-30",
    },
  ],
  timeline: [
    { date: "2024-07-18", text: "O ministro Fernando Haddad anuncia contenção de R$ 15 bilhões no Orçamento de 2024." },
    { date: "2024-07-30", text: "Decreto detalha o bloqueio por ministério; a Saúde tem o maior valor, de R$ 4,4 bilhões." },
    { date: "2024-07-31", text: "A CNN exibe, no Live CNN, a reportagem sobre o bloqueio que voltou a circular, segundo a Lupa." },
    { date: "2026-10-25", text: "Segundo turno da eleição presidencial de 2026." },
    { date: "2026-10-29", text: "A Lupa publica a checagem da mensagem sobre o suposto corte pós-eleição." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Depois do segundo turno de 25 de outubro, circulou no WhatsApp, no Facebook, no Instagram e no YouTube um trecho de reportagem da CNN sobre bloqueio de verbas na Saúde e na Educação, acompanhado da frase “Pós eleição | Lula acaba de cortar quase R$ 6 Bilhões da Saúde e Educação”. Segundo a <a href="https://www.agencialupa.org/jornalismo/2026/10/29/reportagem-que-mostra-cortes-na-saude-e-educacao-nao-e-atual-video-e-de-2024/" target="_blank" rel="noopener noreferrer nofollow">Lupa</a>, que verificou o material a pedido de leitores, o vídeo vem do programa Live CNN de 31 de julho de 2024.</p>
    <p>Na época, o governo anunciou uma contenção de R$ 15 bilhões no Orçamento de 2024 para cumprir as metas do arcabouço fiscal. Pela <a href="https://agenciabrasil.ebc.com.br/economia/noticia/2024-07/para-cumprir-marco-fiscal-governo-suspende-r-15-bilhoes-do-orcamento" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a>, o total foi dividido em R$ 11,2 bilhões de bloqueio e R$ 3,8 bilhões de contingenciamento. O decreto que distribuiu o corte atingiu 30 dos 31 ministérios, segundo o <a href="https://economia.uol.com.br/noticias/redacao/2024/07/30/governo-detalha-congelamento-de-r-15-bilhoes.htm" target="_blank" rel="noopener noreferrer nofollow">UOL</a>, e a Saúde foi a mais afetada em valor absoluto, com R$ 4,4 bilhões.</p>

    <h2>O que mudou e o que não mudou</h2>
    <p>O material é real, mas descreve outro ano. A Lupa informa que uma busca por novo corte na Saúde e na Educação em 2026 não retornou resultados. As fontes divergem no valor da Educação: a Lupa cita R$ 1,5 bilhão e o UOL, R$ 1,28 bilhão. A divergência não muda a conclusão, porque nenhuma das duas fontes situa o bloqueio depois da eleição de 2026.</p>
    <p>O UOL registra ainda que a distribuição do bloqueio teve como diretriz a preservação das regras de aplicação de recursos em Saúde e Educação, os mínimos constitucionais. Bloqueio e contingenciamento são medidas temporárias, que atingem principalmente despesas discricionárias, como novos contratos e investimentos, e podem ser revistas ao longo do ano.</p>

    <h2>Por que o veredito é Fora de contexto</h2>
    <p>O vídeo e os valores existem e têm fonte, mas foram apresentados como decisão de depois da eleição de 2026. A data é o que muda o sentido da peça. Esta checagem não afirma nem nega a existência de bloqueios no Orçamento de 2026: para isso, vale consultar os relatórios bimestrais do governo e o Diário Oficial da União.</p>
    <p>Outras alegações sobre programas sociais e contas públicas depois do segundo turno estão em <a href="/checagem/governo-lula-nao-suspendeu-pagamento-dezembro-gas-do-povo">Gás do Povo em dezembro</a>. Os resultados da eleição estão no <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
