import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "reportagem-eleitores-impedidos-londres-e-do-primeiro-turno",
  title: "Reportagem sobre brasileiros impedidos de votar em Londres é do 1º turno, e não do 2º",
  summary:
    "A matéria da CNN Brasil é de 4 de outubro e trata de cerca de 50 eleitores registrados em Edimburgo. Lupa e Aos Fatos não acharam relatos iguais no 2º turno.",
  author: "Equipe Política Diária",
  verdict: "fora-de-contexto",
  quick:
    "Fora de contexto. A reportagem é real, mas foi publicada em 4/10, dia do 1º turno. Lupa e Aos Fatos não encontraram relatos de problema semelhante em Londres no 2º turno.",
  claim: {
    text: "Um erro da Justiça Eleitoral impediu dezenas de brasileiros de votar em Londres no 2º turno da eleição presidencial.",
    origin:
      "Publicações no Instagram, no X e no Facebook que compartilham a reportagem da CNN Brasil como se fosse do 2º turno, no domingo (25/10/2026).",
    firstSeen: "2026-10-25",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-27",
  checkedAt: "2026-10-27T14:35:00-03:00",
  updated: "2026-10-27",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A reportagem existe: a CNN Brasil publicou em 4/10/2026 que ao menos 50 eleitores chegaram à seção de Londres e descobriram estar registrados em Edimburgo, na Escócia.",
    },
    {
      status: "falso",
      text: "O caso não é do 2º turno. A data da matéria é a do 1º turno, e Lupa e Aos Fatos não encontraram denúncias semelhantes em Londres em 25/10.",
    },
    {
      status: "atencao",
      text: "A causa é disputada: a organização da eleição em Londres atribuiu o problema à Justiça Eleitoral, e o TRE-DF, segundo o Aos Fatos, disse que houve confusão dos eleitores, que tiveram quatro anos para conferir o local de votação.",
    },
    {
      status: "atencao",
      text: "Segundo o Aos Fatos, o TRE-DF já havia pedido, na quinta-feira (22), que eleitores ligados ao consulado de Edimburgo conferissem o local de votação.",
    },
  ],
  sources: [
    {
      label: "Reportagem sobre eleitores impedidos de votar em Londres é do primeiro turno",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/eleitores-impedidos-londres-primeiro-turno/",
      kind: "agencia",
      note: "Busca reversa localizou a matéria de 4/10; registra a nota do TRE-DF e ao menos 40 mil curtidas no Instagram até a tarde de 25/10.",
      published: "2026-10-25",
    },
    {
      label: "Vídeo sobre brasileiros impedidos de votar em Londres é do 1º turno",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/10/25/video-sobre-brasileiros-impedidos-de-votar-em-londres-e-do-1o-turno/",
      kind: "agencia",
      note: "Selo “falta contexto”: a reportagem é de 4/10 e não há relatos de problemas em Londres no 2º turno; um post no X passava de 322 mil visualizações.",
      published: "2026-10-25",
    },
    {
      label: "Erro da Justiça Eleitoral impede voto de dezenas de brasileiros em Londres",
      publisher: "CNN Brasil",
      url: "https://www.cnnbrasil.com.br/blogs/americo-martins/internacional/erro-da-justica-eleitoral-impede-voto-de-dezenas-de-brasileiros-em-londres/",
      kind: "imprensa",
      note: "Reportagem original, publicada em 4/10/2026: ao menos 50 eleitores afetados; a organização culpa a Justiça Eleitoral, que diz que os eleitores escolheram os locais.",
      published: "2026-10-04",
    },
  ],
  timeline: [
    { date: "2026-10-04", text: "1º turno: a CNN Brasil publica que ao menos 50 eleitores descobriram em Londres estar registrados em Edimburgo." },
    { date: "2026-10-22", text: "Segundo o Aos Fatos, o TRE-DF pede que eleitores ligados ao consulado de Edimburgo confiram o local de votação." },
    { date: "2026-10-25", text: "2º turno: a reportagem do 1º turno circula como se fosse atual; Lupa e Aos Fatos publicam as checagens." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>A <a href="https://www.cnnbrasil.com.br/blogs/americo-martins/internacional/erro-da-justica-eleitoral-impede-voto-de-dezenas-de-brasileiros-em-londres/" target="_blank" rel="noopener noreferrer nofollow">reportagem da CNN Brasil</a> foi publicada em 4 de outubro de 2026, dia do 1º turno. Ela relata que ao menos 50 eleitores foram afetados: com a criação do consulado em Edimburgo, eleitores da Escócia, da Irlanda do Norte e de Manchester passaram à jurisdição dele, e parte deles chegou a Londres sem saber. A matéria registra a divergência: a organização da eleição culpa a Justiça Eleitoral, que afirma que os eleitores escolheram os locais ao se registrar.</p>
    <p>O <a href="https://www.aosfatos.org/noticias/eleitores-impedidos-londres-primeiro-turno/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a> fez busca reversa e não achou denúncias semelhantes no domingo (25). A <a href="https://www.agencialupa.org/verificacao/2026/10/25/video-sobre-brasileiros-impedidos-de-votar-em-londres-e-do-1o-turno/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a> chegou à mesma conclusão e deu o selo “falta contexto”.</p>

    <h2>Por que o veredito é Fora de contexto</h2>
    <p>A reportagem é verdadeira e a falha descrita ocorreu, mas no 1º turno. Apresentá-la como fato do 2º turno muda a data e sugere um problema novo que as agências não encontraram. O selo é Fora de contexto, e não Falso, porque o material é real. A causa da falha no 1º turno segue com versões diferentes e a checagem não decide entre elas.</p>
    <p>Outros conteúdos reaproveitados no 2º turno foram checados: veja o <a href="/checagem/video-urnas-eua-2019-bolsonaro-tinha-razao-fora-de-contexto">vídeo de 2019 sobre urnas dos EUA</a> e o <a href="/checagem/video-cirio-de-nazare-bloco-do-22-flavio-minas-gerais">Círio de Nazaré apresentado como ato de campanha</a>.</p>
  `,
};
