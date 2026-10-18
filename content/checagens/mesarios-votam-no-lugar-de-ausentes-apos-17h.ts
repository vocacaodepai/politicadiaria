import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "mesarios-votam-no-lugar-de-ausentes-apos-17h",
  title: "É falso que mesários votem no lugar de eleitores ausentes após as 17h",
  summary:
    "Vídeo diz que mesários votam por quem faltou depois das 17h. O TSE e o TRE-RS dizem que a urna exige identificação e que a fila só vale para quem já chegou.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Segundo o TSE, o voto só é registrado depois que o eleitor é identificado, e a votação depois das 17h atende apenas quem já estava na fila. Quem não comparece fica marcado como “não comparecimento” no Caderno de Votação. A queda da abstenção entre turnos, citada no vídeo, não prova voto por ausentes.",
  claim: {
    text: "Depois das 17h, mesários usariam a urna para votar no lugar de eleitores mortos ou ausentes, no que a publicação chama de “voto espírita”, e a queda da abstenção no 2º turno de 2022 seria a prova.",
    origin:
      "Vídeo e publicações em redes sociais, que voltaram a circular na semana de 12 a 15 de outubro de 2026, a pouco mais de uma semana do 2º turno. O TSE já havia respondido a versões da mesma alegação em agosto de 2026.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-18",
  checkedAt: "2026-10-18T07:45:16-03:00",
  updated: "2026-10-18",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A votação não termina às 17h para todos: segundo o TSE, quem já está na fila nesse horário continua votando até o último eleitor, e mesários também votam, mas só por si mesmos.",
    },
    {
      status: "falso",
      text: "Segundo o TSE, o voto só é registrado depois que o eleitor é identificado e habilitado, com documento e conferência dos dados e da foto no terminal do mesário, além da biometria quando há cadastro.",
    },
    {
      status: "falso",
      text: "Quem não compareceu é registrado como “não comparecimento” no Caderno de Votação, de acordo com o TSE. Mesários não têm como votar “em nome” de outra pessoa sem que isso deixe registro.",
    },
    {
      status: "atencao",
      text: "A abstenção em 2022 foi de 20,93% no 1º turno e de 20,57% no 2º, segundo a checagem do TNH1. A variação de 0,36 ponto percentual indica comparecimento um pouco maior, e não voto atribuído a ausentes.",
    },
    {
      status: "atencao",
      text: "As páginas do TSE e do TRE-RS retornaram erro de acesso (403) na nossa conferência. O que descrevemos do TSE vem de veículos que reproduzem a explicação do tribunal, e a nota do TRE-RS vem de reprodução em site de notícias.",
    },
  ],
  sources: [
    {
      label: "É falso: TSE nega que mesários possam votar por eleitores ausentes",
      publisher: "Agência Cenarium",
      url: "https://agenciacenarium.com.br/e-falso-tse-nega-que-mesarios-possam-votar-por-eleitores-ausentes/",
      kind: "imprensa",
      note: "Reproduz a resposta do TSE: o voto só é registrado após identificação, a votação após as 17h vale só para quem está na fila e a regra consta da Resolução TSE nº 23.751/2026.",
      published: "2026-08-10",
    },
    {
      label: "TSE reforça alerta sobre informação falsa de que mesários podem votar por eleitores ausentes após as 17h",
      publisher: "Expressão Brasiliense",
      url: "https://expressaobrasiliense.com/eleicoes-2026/tse-reforca-alerta-sobre-informacao-falsa-de-que-mesarios-podem-votar-por-eleitores-ausentes-apos-as-17h/",
      kind: "imprensa",
      note: "Segundo o TSE, não existe brecha para que uma pessoa vote em nome de outra, e a Zerésima e o Boletim de Urna permitem a fiscalização.",
      published: "2026-08-12",
    },
    {
      label: "“Voto espírita”: é falso que mesários votaram no lugar de eleitores mortos ou ausentes após as 17h",
      publisher: "TNH1",
      url: "https://www.tnh1.com.br/noticia/nid/voto-espirita-e-falso-que-mesarios-votaram-no-lugar-de-eleitores-mortos-ou-ausentes-apos-as-17h/",
      kind: "imprensa",
      note: "Descreve o vídeo, o procedimento de identificação sem biometria (ano de nascimento, assinatura e log da urna), o Infodip para óbitos e os números de abstenção de 2022.",
      published: "2026-10-15",
    },
    {
      label: "Eleições 2026: o que é verdade e o que é mentira sobre o 2º turno",
      publisher: "Fast Company Brasil",
      url: "https://fastcompanybrasil.com/news/eleicoes-2026-verdade-mentira-sobre-2-turno/",
      kind: "imprensa",
      note: "Resume a checagem “Fato ou Boato” da Justiça Eleitoral sobre o “voto espírita”: a votação segue após as 17h só para quem está na fila, e a mudança da abstenção entre turnos não prova voto por outra pessoa.",
      published: "2026-10-15",
    },
    {
      label: "TRE-RS desmente Mauricio Marcon e diz que mesários não votam por eleitores ausentes",
      publisher: "Claudemir Pereira",
      url: "https://claudemirpereira.com.br/2026/10/15/eleicoes-2026-tre-rs-desmente-mauricio-marcon-e-diz-que-mesarios-nao-votam-por-eleitores-ausentes/",
      kind: "imprensa",
      note: "Informa que o TRE-RS divulgou nota em 14/10/2026 dizendo que a urna tem camadas de segurança contra voto por outra pessoa; o site não traz a fala literal do autor da publicação, e a página oficial do TRE-RS não abriu na nossa conferência.",
      published: "2026-10-15",
    },
  ],
  timeline: [
    { date: "2026-08-10", text: "A Agência Cenarium publica a resposta do TSE à alegação de que mesários votam por ausentes após as 17h." },
    { date: "2026-08-12", text: "O Expressão Brasiliense publica que o TSE reforça o alerta sobre a informação falsa." },
    { date: "2026-10-14", text: "Segundo reprodução da nota, o TRE-RS rebate publicação que repetia a alegação nas redes." },
    { date: "2026-10-15", text: "TNH1 e Fast Company Brasil publicam checagens sobre o “voto espírita” a dez dias do 2º turno." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>A alegação que voltou a circular em outubro de 2026 afirma que, depois das 17h, mesários usariam a urna para votar no lugar de eleitores mortos ou ausentes, o chamado “voto espírita”. Segundo o <a href="https://www.tnh1.com.br/noticia/nid/voto-espirita-e-falso-que-mesarios-votaram-no-lugar-de-eleitores-mortos-ou-ausentes-apos-as-17h/" target="_blank" rel="noopener noreferrer nofollow">TNH1</a>, o vídeo se apoia na habilitação sem biometria, na suposta falta de conferência e na queda da abstenção em 2022.</p>
    <p>De acordo com o <a href="https://agenciacenarium.com.br/e-falso-tse-nega-que-mesarios-possam-votar-por-eleitores-ausentes/" target="_blank" rel="noopener noreferrer nofollow">texto da Agência Cenarium</a>, que reproduz a resposta do TSE, o voto só é registrado depois que o eleitor é identificado e habilitado: ele apresenta documento, o mesário confere os dados e a foto cadastrada no terminal, e a biometria entra como etapa adicional. A votação depois das 17h, diz o tribunal, acontece apenas para quem já estava na fila. Mesários podem votar, mas não por terceiros. Quem não compareceu é registrado como “não comparecimento” no Caderno de Votação. As regras constam, segundo o veículo, da Resolução TSE nº 23.751/2026.</p>
    <p>O <a href="https://expressaobrasiliense.com/eleicoes-2026/tse-reforca-alerta-sobre-informacao-falsa-de-que-mesarios-podem-votar-por-eleitores-ausentes-apos-as-17h/" target="_blank" rel="noopener noreferrer nofollow">Expressão Brasiliense</a> relata a mesma explicação e a frase atribuída ao TSE de que “não existe qualquer brecha para que uma pessoa vote em nome de outra”. A <a href="https://fastcompanybrasil.com/news/eleicoes-2026-verdade-mentira-sobre-2-turno/" target="_blank" rel="noopener noreferrer nofollow">Fast Company Brasil</a> resume a checagem da Justiça Eleitoral e acrescenta que mudanças na abstenção entre os turnos não provam que alguém votou por outra pessoa.</p>

    <h2>Identificação, biometria e o que acontece sem ela</h2>
    <p>O TNH1 descreve o caso de eleitor cuja biometria não é reconhecida: a habilitação passa a exigir o ano de nascimento e a assinatura no Caderno de Votação, a digital do mesário responsável é registrada e o log da urna identifica quem liberou o voto. Para falecidos, a checagem informa que os cartórios comunicam os óbitos pelo Infodip e os nomes saem das folhas de votação. Representantes partidários podem acompanhar os trabalhos, e as ocorrências vão para a ata.</p>
    <p>Segundo reprodução da nota do TRE-RS publicada pelo site Claudemir Pereira, o tribunal gaúcho divulgou em 14 de outubro um desmentido à publicação que repetia a alegação, dizendo que a urna tem camadas de segurança para impedir voto por outra pessoa. O site informa que a publicação teve 21,4 mil compartilhamentos até as 20h50 daquele dia. Não conseguimos abrir a página oficial do TRE-RS, e por isso tratamos a nota como informada pelo site.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O fato central da alegação, que mesários votam por ausentes, é contrariado pela descrição do procedimento feita pelo TSE e por registros que podem ser conferidos depois: o Caderno de Votação, o log da urna, a Zerésima impressa antes da votação e o Boletim de Urna afixado na seção. O argumento da abstenção também não sustenta a conclusão: de acordo com o TNH1, ela foi de 20,93% no 1º turno de 2022 e de 20,57% no 2º, uma variação de 0,36 ponto percentual que indica comparecimento um pouco maior, e não voto atribuído a ausentes.</p>
    <p>Fica uma ressalva honesta: as páginas oficiais do TSE e do TRE-RS não abriram para nós, e o veredito se apoia em quatro veículos que reproduzem as explicações dos tribunais. O leitor pode conferir os documentos da seção no dia do voto. O boletim de urna de cada seção traz um QR Code para conferência. Para os dados oficiais do 2º turno, veja o <a href="/eleicoes">painel de Eleições 2026</a>. A mesma régua vale para alegações de fraude ou de manipulação atribuídas a qualquer campo político.</p>
  `,
};
