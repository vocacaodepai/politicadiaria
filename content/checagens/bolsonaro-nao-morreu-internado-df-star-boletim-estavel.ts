import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "bolsonaro-nao-morreu-internado-df-star-boletim-estavel",
  title: "É falso que Jair Bolsonaro tenha morrido em 21/11: ele segue internado e estável",
  summary:
    "Posts dizem que Bolsonaro morreu em 21/11. O boletim do DF Star de 22/11 o dá como clinicamente estável na UTI, e o g1 relatou internação em 23/11.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Não há registro de morte de Jair Bolsonaro. O boletim do Hospital DF Star de 22/11, citado pela Agência Brasil e pelo Poder360, o descreve como “clinicamente estável”, na UTI e sem previsão de alta. Em 23/11, o g1 relatou que ele continuaria internado e que a equipe médica descartava cirurgia por ora.",
  claim: {
    text: "Publicações em redes sociais afirmam, com a chamada “URGENTE: Jair Bolsonaro acaba de falecer”, que o ex-presidente morreu no sábado, 21 de novembro de 2026, durante a internação no Hospital DF Star, em Brasília.",
    origin:
      "Postagens no Facebook, que somavam ao menos 2 mil compartilhamentos até a tarde de 23/11, e mensagens no WhatsApp, onde não é possível estimar o alcance, segundo o Aos Fatos.",
    firstSeen: "2026-11-21",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-23",
  checkedAt: "2026-11-23T18:17:00-03:00",
  updated: "2026-11-23",
  topic: "Brasil",
  points: [
    {
      status: "verdade",
      text: "Bolsonaro está internado. Foi levado ao Hospital DF Star, em Brasília, na sexta-feira, 20/11, com dor e distensão abdominal, segundo a Agência Brasil. O diagnóstico divulgado pelo hospital é de abdômen agudo obstrutivo.",
    },
    {
      status: "falso",
      text: "Não há morte registrada. O boletim médico de domingo, 22/11, diz que o paciente está “clinicamente estável, mantendo tratamento clínico, jejum e suporte nutricional”, sem previsão de alta, segundo a Agência Brasil e o Poder360.",
    },
    {
      status: "falso",
      text: "Em 23/11, o g1 informou que Bolsonaro continuaria na UTI e que a equipe médica descartava nova cirurgia enquanto houvesse melhora do quadro. Na noite de 22/11, Michelle Bolsonaro disse que a endoscopia teve resultado “muito positivo”, segundo o Poder360.",
    },
    {
      status: "atencao",
      text: "O quadro inspira cuidado: o g1 relatou pneumonia por broncoaspiração identificada na tarde de domingo, e a internação é na UTI. Estar estável e internado não é o mesmo que estar fora de risco, e esta checagem trata só da alegação de morte.",
    },
  ],
  sources: [
    {
      label: "Bolsonaro segue internado na UTI sem previsão de alta",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-11/bolsonaro-segue-internado-na-uti-sem-previsao-de-alta",
      kind: "imprensa",
      note: "Reproduz o boletim do DF Star de 22/11: “clinicamente estável”, em jejum e suporte nutricional, sem previsão de alta, com diagnóstico de abdômen agudo obstrutivo.",
      published: "2026-11-22",
    },
    {
      label: "Exame de Bolsonaro teve resultado “muito positivo”, diz Michelle",
      publisher: "Poder360",
      url: "https://www.poder360.com.br/poder-saude/exame-de-bolsonaro-teve-resultado-muito-positivo-diz-michelle/",
      kind: "imprensa",
      note: "Cita o boletim médico de 22/11, com link para o comunicado do hospital, e registra a fala de Michelle Bolsonaro sobre a endoscopia.",
      published: "2026-11-23",
    },
    {
      label: "Bolsonaro continuará internado na UTI por dores abdominais e pneumonia; médicos descartam cirurgia neste momento",
      publisher: "g1",
      url: "https://g1.globo.com/politica/noticia/2026/11/23/bolsonaro-continuara-internado-na-uti-por-dores-abdominais-e-pneumonia-medicos-descartam-cirurgia-neste-momento.ghtml",
      kind: "imprensa",
      note: "Relata declaração da equipe médica em 23/11: tratamento clínico, UTI mantida, cirurgia descartada por ora e pneumonia por broncoaspiração identificada no domingo.",
      published: "2026-11-23",
    },
    {
      label: "É falso que ex-presidente Jair Bolsonaro morreu",
      publisher: "Aos Fatos",
      url: "https://aosfatos.org/noticias/e-falso-jair-bolsonaro-morreu/",
      kind: "agencia",
      note: "Classifica como falso e diz que as publicações inventam uma data de falecimento. O texto data a pneumonia como “domingo (23)”; o g1 e o calendário indicam domingo, 22/11, e esta checagem adota a data do g1.",
      published: "2026-11-23",
    },
  ],
  timeline: [
    { date: "2026-11-20", text: "Bolsonaro, em prisão domiciliar, sente dor abdominal e é levado ao Hospital DF Star, em Brasília, segundo a Agência Brasil." },
    { date: "2026-11-21", text: "Data em que as publicações dizem que ele morreu. No mesmo dia, o hospital o descreveu como estável na UTI, segundo o g1." },
    { date: "2026-11-22", text: "Boletim médico: “clinicamente estável”, sem previsão de alta. À noite, Michelle Bolsonaro diz que a endoscopia teve resultado “muito positivo”." },
    { date: "2026-11-23", text: "O g1 relata que Bolsonaro continuará na UTI e que a equipe médica descarta cirurgia por ora. O Aos Fatos publica a checagem do boato." },
  ],
  content: `
    <h2>O que circulou</h2>
    <p>Depois que o ex-presidente Jair Bolsonaro foi internado no Hospital DF Star, em Brasília, publicações em redes sociais passaram a afirmar que ele tinha morrido no sábado, 21 de novembro. Uma das chamadas dizia “URGENTE: Jair Bolsonaro acaba de falecer”. Segundo o <a href="https://aosfatos.org/noticias/e-falso-jair-bolsonaro-morreu/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, as postagens reuniam ao menos 2 mil compartilhamentos no Facebook até a tarde de segunda-feira, 23, e o conteúdo também circula no WhatsApp.</p>
    <p>A internação é real e foi noticiada em <a href="/noticias/bolsonaro-internado-df-star-distensao-abdominal">Bolsonaro internado no DF Star com distensão abdominal</a> e em <a href="/noticias/bolsonaro-uti-abdomen-agudo-obstrutivo-moraes-visitas-tornozeleira">Bolsonaro na UTI com abdômen agudo obstrutivo</a>. O que as fontes não registram é a morte.</p>

    <h2>O que as fontes dizem</h2>
    <p>A <a href="https://agenciabrasil.ebc.com.br/politica/noticia/2026-11/bolsonaro-segue-internado-na-uti-sem-previsao-de-alta" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a> publicou em 22 de novembro o trecho do boletim do hospital: “Paciente apresenta-se clinicamente estável, mantendo tratamento clínico, jejum e suporte nutricional. Segue sem previsão de alta hospitalar”. O diagnóstico informado é de abdômen agudo obstrutivo. O <a href="https://www.poder360.com.br/poder-saude/exame-de-bolsonaro-teve-resultado-muito-positivo-diz-michelle/" target="_blank" rel="noopener noreferrer nofollow">Poder360</a> cita o mesmo boletim e disponibiliza o comunicado em PDF.</p>
    <p>Na noite de domingo, Michelle Bolsonaro afirmou nos stories do Instagram que a endoscopia teve resultado “muito positivo”, segundo o Poder360. Em 23 de novembro, o <a href="https://g1.globo.com/politica/noticia/2026/11/23/bolsonaro-continuara-internado-na-uti-por-dores-abdominais-e-pneumonia-medicos-descartam-cirurgia-neste-momento.ghtml" target="_blank" rel="noopener noreferrer nofollow">g1</a> relatou que a equipe médica manteria o tratamento clínico, que Bolsonaro continuaria na UTI e que uma nova cirurgia estava descartada enquanto houvesse melhora. O g1 também informou que exames identificaram pneumonia por broncoaspiração na tarde de domingo.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central é a morte no sábado, 21 de novembro. O boletim oficial do dia seguinte e as reportagens de 22 e 23 de novembro tratam Bolsonaro como paciente vivo, internado e estável. Nenhuma fonte aberta registra óbito, e o Aos Fatos chegou à mesma conclusão ao dizer que as publicações inventam uma data de falecimento.</p>
    <p>Há uma divergência de data: o Aos Fatos situa a pneumonia em “domingo (23)”, mas 23 de novembro é segunda-feira. Esta checagem adota a informação do g1, de que o quadro foi identificado na tarde de domingo, 22. Sobre o estado de saúde, a checagem se limita ao que os boletins e a imprensa informam e não faz prognóstico. A mesma régua vale para qualquer político: veja a checagem do <a href="/checagem/video-bolsonaro-deixa-hospital-lesoes-pele-gravado-setembro-2025">vídeo de Bolsonaro deixando o hospital</a>, a de <a href="/checagem/lula-nao-foi-internado-filipinas-rouquidao-agenda-mantida">Lula nas Filipinas</a> e as demais <a href="/checagem">checagens</a>.</p>
  `,
};
