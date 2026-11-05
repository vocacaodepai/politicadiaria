import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "zonas-eleitorais-brasilia-votos-iguais-video-mostra-so-a-1-zona",
  title: "É falso que Lula e Flávio tenham tido os mesmos votos em todas as zonas de Brasília",
  summary:
    "Vídeo diz que os votos se repetem nas zonas do DF. Segundo Estadão Verifica e Boatos.org, os números são só da 1ª Zona e não se repetem em nenhuma das 19.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Os números do vídeo (32.714 a 29.764) são reais, mas pertencem só à 1ª Zona Eleitoral no 2º turno. Segundo o Estadão Verifica, nenhuma das 19 zonas do DF repetiu os mesmos votos.",
  claim: {
    text: "Vídeo em redes sociais afirma que Lula e Flávio Bolsonaro tiveram exatamente os mesmos números de votos em todas as zonas eleitorais de Brasília no 2º turno de 2026 (32.714 para Lula e 29.764 para Flávio) e pede que um matemático ou cientista político explique, sugerindo fraude.",
    origin:
      "Vídeos publicados em redes sociais no fim de outubro de 2026, segundo Estadão Verifica e Boatos.org. Nenhuma das duas identifica quem começou a circulação.",
    firstSeen: "2026-10-30",
    attribution: "Vídeos em redes sociais",
  },
  date: "2026-11-05",
  checkedAt: "2026-11-05T14:30:00-03:00",
  updated: "2026-11-05",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "Os números mostrados no vídeo existem. Segundo o Estadão Verifica, Lula teve 32.714 votos (52,36%) e Flávio, 29.764 (47,64%) na 1ª Zona Eleitoral no 2º turno, consulta feita no aplicativo e no site de resultados do TSE.",
    },
    {
      status: "falso",
      text: "Os mesmos números não se repetem nas demais zonas. Segundo o Estadão Verifica, Lula e Flávio não repetiram o mesmo número de votos em nenhuma das 19 zonas do DF, nem no 1º nem no 2º turno. O Boatos.org chega à mesma conclusão.",
    },
    {
      status: "falso",
      text: "O vídeo apresenta o resultado de uma zona como se fosse o de toda a capital. No total do DF no 2º turno, Flávio teve 979.542 votos (54,28%) e Lula, 825.224 (45,72%), segundo Estadão Verifica e Boatos.org; o Brasil de Fato registra os mesmos totais.",
    },
    {
      status: "atencao",
      text: "Segundo o Estadão Verifica e o Brasil de Fato, Lula venceu no 2º turno só nas zonas da Asa Sul e da Asa Norte, e Flávio nas demais. A divisão por zona é pública no sistema de resultados do TSE, que não conseguimos abrir diretamente; os números vêm das checagens, que citam esse sistema.",
    },
  ],
  sources: [
    {
      label: "É falso que votação em Brasília tenha tido mesmo número de votos em todas as zonas eleitorais",
      publisher: "Estadão Verifica (via Terra)",
      url: "https://www.terra.com.br/noticias/brasil/politica/e-falso-que-votacao-em-brasilia-tenha-tido-mesmo-numero-de-votos-em-todas-as-zonas-eleitorais,824fa5cd5cf80ab776e1ccb987ff9337tww8vqsq.html",
      kind: "agencia",
      note: "Cita dados do aplicativo e do site de resultados do TSE: 1ª Zona no 2º turno com 32.714 a 29.764, nenhuma repetição nas 19 zonas e totais do DF. Publicada em 30/10/2026.",
      published: "2026-10-30",
    },
    {
      label: "Lula obteve o mesmo número de votos em todas as zonas eleitorais de Brasília?",
      publisher: "Boatos.org",
      url: "https://www.boatos.org/politica/lula-obteve-o-mesmo-numero-de-votos-em-todas-as-zonas-eleitorais-de-brasilia.html",
      kind: "agencia",
      note: "Classifica como falso: os números são da 1ª Zona e não se repetem; Lula venceu só na 1ª e na 14ª zonas no 2º turno. O texto é inconsistente na contagem das demais zonas (17 ou 18), sem alterar a conclusão. Publicada em 04/11/2026.",
      published: "2026-11-04",
    },
    {
      label: "No DF, Lula somou quase 150 mil votos a mais em relação ao primeiro turno e avançou em todas as zonas eleitorais da capital",
      publisher: "Brasil de Fato",
      url: "https://www.brasildefato.com.br/2026/10/26/no-df-lula-somou-quase-150-mil-votos-a-mais-em-relacao-ao-primeiro-turno-e-avancou-em-todas-as-zonas-eleitorais-da-capital/",
      kind: "imprensa",
      note: "Traz os totais do DF no 2º turno (Flávio 979.542, Lula 825.224) e lista as zonas vencidas por cada um, com percentuais bem diferentes entre zonas. Não indica a fonte dos percentuais por zona. Publicada em 26/10/2026.",
      published: "2026-10-26",
    },
  ],
  timeline: [
    { date: "2026-10-25", text: "Realizado o 2º turno da eleição presidencial." },
    { date: "2026-10-26", text: "O Brasil de Fato publica o resultado do DF por zona, com Lula à frente na Asa Sul e na Asa Norte." },
    { date: "2026-10-30", text: "O Estadão Verifica publica que os números do vídeo são da 1ª Zona e não se repetem nas 19 zonas." },
    { date: "2026-11-04", text: "O Boatos.org publica a checagem do mesmo vídeo e conclui que ele não comprova fraude." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Um vídeo que circula nas redes afirma que Lula e Flávio Bolsonaro tiveram os mesmos números de votos em todas as zonas eleitorais de Brasília no segundo turno, com 32.714 votos para Lula e 29.764 para Flávio, e sugere fraude. Segundo o <a href="https://www.terra.com.br/noticias/brasil/politica/e-falso-que-votacao-em-brasilia-tenha-tido-mesmo-numero-de-votos-em-todas-as-zonas-eleitorais,824fa5cd5cf80ab776e1ccb987ff9337tww8vqsq.html" target="_blank" rel="noopener noreferrer nofollow">Estadão Verifica</a>, publicado pelo Terra em 30/10, esses números são reais, mas correspondem apenas à 1ª Zona Eleitoral no 2º turno (Lula com 52,36% e Flávio com 47,64%).</p>
    <p>A mesma checagem afirma que Lula e Flávio não repetiram o mesmo número de votos em nenhuma das 19 zonas do Distrito Federal, em nenhum dos dois turnos. O <a href="https://www.boatos.org/politica/lula-obteve-o-mesmo-numero-de-votos-em-todas-as-zonas-eleitorais-de-brasilia.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.org</a>, em 04/11, chega à mesma conclusão e diz que Lula venceu só na 1ª e na 14ª zonas, enquanto Flávio ganhou nas demais.</p>

    <h2>O resultado do DF</h2>
    <p>No total do DF, segundo o Estadão Verifica e o Boatos.org, Flávio teve 979.542 votos (54,28%) e Lula, 825.224 (45,72%). O <a href="https://www.brasildefato.com.br/2026/10/26/no-df-lula-somou-quase-150-mil-votos-a-mais-em-relacao-ao-primeiro-turno-e-avancou-em-todas-as-zonas-eleitorais-da-capital/" target="_blank" rel="noopener noreferrer nofollow">Brasil de Fato</a> registra os mesmos totais e lista os percentuais por zona, que variam bastante: Lula teve 56,3% na Asa Norte e 52,3% na Asa Sul, enquanto Flávio teve 59,4% em Taguatinga e 58,5% em Samambaia.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central, a de que os votos se repetem em todas as zonas, é contrariada pelos dados por zona que as duas agências consultaram no sistema de resultados do TSE. O que o vídeo mostra é verdadeiro, mas é o resultado de uma única zona apresentado como se valesse para a cidade inteira. Resultados diferentes entre zonas são o esperado, porque cada uma reúne bairros e eleitorados distintos. Um número que aparece em uma consulta não prova fraude.</p>
    <p>A mesma régua vale para qualquer candidato: dados eleitorais podem ser conferidos por qualquer pessoa no sistema de resultados do TSE. Veja o painel de <a href="/eleicoes">Eleições 2026</a> e outras <a href="/checagem">checagens do período eleitoral</a>, como a sobre <a href="/checagem/votacao-unanime-106-secoes-zero-voto-flavio-nao-prova-fraude">seções com votação unânime</a>.</p>
  `,
};
