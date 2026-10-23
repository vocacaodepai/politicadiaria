import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "video-urnas-eua-2019-bolsonaro-tinha-razao-fora-de-contexto",
  title: "Reportagem de 2019 sobre urnas dos EUA não prova fraude nas urnas brasileiras",
  summary:
    "Post no TikTok usa trecho de reportagem da RedeTV News de 2019 sobre urnas americanas. Lupa e Comprova mostram que a empresa citada nunca forneceu urnas ao Brasil.",
  author: "Equipe Política Diária",
  verdict: "fora-de-contexto",
  quick:
    "Fora de contexto. A reportagem é real, de 2019, e trata de urnas da empresa americana ES&S, que nunca forneceu urnas ao Brasil. O sistema brasileiro é diferente do americano, e as checagens não registram fraude comprovada desde 1996.",
  claim: {
    text: "Trecho de reportagem da RedeTV News sobre o debate nos EUA em torno das urnas eletrônicas, com a frase “Bolsonaro tinha razão, as urnas podem ser fraudadas” e a legenda de que seria preciso voto impresso para evitar fraude.",
    origin:
      "Vídeo no TikTok, enviado por leitores à Agência Lupa por WhatsApp. A checagem não identifica o autor nem a data da primeira publicação.",
    attribution: "Publicação em rede social",
  },
  date: "2026-10-23",
  checkedAt: "2026-10-23T14:35:00-03:00",
  updated: "2026-10-23",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A reportagem existe e discute a segurança de sistemas de votação nos Estados Unidos. A Lupa informa que ela foi publicada no YouTube em 11/06/2019.",
    },
    {
      status: "falso",
      text: "A empresa citada, a Election Systems and Software (ES&S), nunca forneceu urnas eletrônicas ao Brasil, segundo a Lupa e o Comprova.",
    },
    {
      status: "falso",
      text: "O trecho não mostra fraude no Brasil. O sistema americano varia por estado e condado, e o brasileiro é eletrônico, com software desenvolvido pela Justiça Eleitoral.",
    },
    {
      status: "atencao",
      text: "As fontes divergem sobre a data da reportagem: a Lupa cita 11/06/2019 e o Comprova (2024) fala em outubro de 2019. Em ambos os casos, é um conteúdo de 2019.",
    },
    {
      status: "atencao",
      text: "Segundo o Comprova, nunca houve fraude comprovada nem denúncia relevante desde a adoção da urna eletrônica, em 1996. A checagem não substitui auditorias: o teste de integridade e a zerésima são abertos a fiscalização.",
    },
  ],
  sources: [
    {
      label: "Post distorce vídeo de 2019 sobre urnas dos EUA",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/10/20/post-distorce-video-de-2019-sobre-urnas-dos-eua/",
      kind: "agencia",
      note: "Identifica a reportagem (RedeTV News, 11/06/2019), informa que a ES&S nunca forneceu urnas ao Brasil e que o TSE publicou em 03/05/2021 um vídeo dizendo que a reportagem era usada fora de contexto.",
      published: "2026-10-20",
    },
    {
      label: "Post engana ao usar vídeo antigo de urnas americanas para lançar dúvidas sobre eleições brasileiras",
      publisher: "Projeto Comprova (SBT News)",
      url: "https://sbtnews.sbt.com.br/noticia/comprova/enganoso-post-engana-ao-usar-video-antigo-de-urnas-americanas-para-lancar-duvidas-sobre-eleicoes-brasileiras",
      kind: "agencia",
      note: "Checagem de março de 2024 sobre a mesma reportagem: o software das urnas brasileiras é desenvolvido na Justiça Eleitoral e o hardware é fabricado por empresas que seguem diretrizes do TSE. Data da reportagem divergente da Lupa (outubro de 2019).",
      published: "2024-03-15",
    },
  ],
  timeline: [
    { date: "2019-06-11", text: "Data de publicação no YouTube da reportagem da RedeTV News, segundo a Lupa. O Comprova cita outubro de 2019." },
    { date: "2021-05-03", text: "O TSE publica vídeo dizendo que a reportagem era usada fora de contexto, segundo a Lupa." },
    { date: "2024-03-15", text: "O Projeto Comprova publica checagem sobre versão anterior do mesmo conteúdo." },
    { date: "2026-10-20", text: "A Agência Lupa publica checagem do post no TikTok, a poucos dias do segundo turno." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>A <a href="https://www.agencialupa.org/verificacao/2026/10/20/post-distorce-video-de-2019-sobre-urnas-dos-eua/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> checou um vídeo do TikTok que mostra um trecho de reportagem da RedeTV News sobre o debate nos Estados Unidos a respeito de urnas eletrônicas. A legenda diz que o ex-presidente Jair Bolsonaro tinha razão ao dizer que as urnas podem ser fraudadas. Segundo a Lupa, a reportagem foi publicada no YouTube em 11 de junho de 2019 e fala de equipamentos da empresa americana ES&S, que nunca forneceu urnas ao Brasil.</p>
    <p>O <a href="https://sbtnews.sbt.com.br/noticia/comprova/enganoso-post-engana-ao-usar-video-antigo-de-urnas-americanas-para-lancar-duvidas-sobre-eleicoes-brasileiras" target="_blank" rel="noopener noreferrer nofollow">Projeto Comprova</a> já havia checado, em março de 2024, outra versão do mesmo material e chegou à mesma conclusão. Segundo o Comprova, o software das urnas brasileiras é desenvolvido dentro da Justiça Eleitoral e o hardware é fabricado por empresas que seguem diretrizes do TSE. As duas agências divergem na data da reportagem (junho ou outubro de 2019), mas concordam que é um conteúdo antigo e sobre outro país.</p>

    <h2>Os sistemas são diferentes</h2>
    <p>Segundo a Lupa, os Estados Unidos não têm um sistema nacional de votação: a tecnologia varia por estado e condado, e alguns locais usam cédulas de papel lidas por leitores ópticos. No Brasil, a votação é eletrônica em todo o país. A Lupa lembra que a urna passa por etapas abertas à fiscalização, como a zerésima, que comprova que nenhum voto está registrado antes do início, e o teste de integridade, que compara os votos digitados com o resultado apurado. O Comprova afirma que não há fraude comprovada nem denúncia relevante desde 1996.</p>
    <p>Segundo a Lupa, em 3 de maio de 2021 o TSE publicou um vídeo dizendo que a reportagem da RedeTV News estava sendo usada fora de contexto para espalhar desinformação. O Política Diária não conseguiu abrir a página técnica do TSE sobre a urna, e por isso não a lista entre as fontes.</p>

    <h2>Por que o veredito é Fora de contexto</h2>
    <p>O vídeo é uma reportagem verdadeira, mas sobre outro sistema, de outro país e de seis anos atrás. A conclusão do post (as urnas brasileiras podem ser fraudadas) não decorre do que a reportagem mostra. Por isso o selo é Fora de contexto. Discutir o voto impresso é um debate legítimo de política pública, e esta checagem não o avalia: trata apenas do uso deste trecho.</p>
    <p>Veja também a checagem sobre a <a href="/checagem/pausa-divulgacao-tse-fraude-primeiro-turno">pausa na divulgação dos resultados do primeiro turno</a> e o painel <a href="/eleicoes">Eleições 2026</a>.</p>
  `,
};
