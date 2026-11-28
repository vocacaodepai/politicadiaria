import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "software-fraude-abstencao-votos-lula-sem-fundamento",
  title: "É falso que software cortou a abstenção para dar votos a Lula no 2º turno",
  summary:
    "Vídeo diz que um programa manipulou a apuração. Estadão Verifica classifica como falso, e o TSE mostra abstenção de 19,22% no 2º turno, ante 21,08%.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Segundo o Estadão Verifica, a urna tem barreiras contra programas estranhos e o TSE não recebeu contestação formal baseada no vídeo. Os arquivos oficiais mostram que a abstenção caiu de 21,08% no 1º turno para 19,22% no 2º, e não subiu.",
  claim: {
    text: "Um software manipulou a apuração para reduzir abstenção, brancos e nulos e aumentar os votos de Lula; a abstenção real do 2º turno teria sido 8% maior que a do 1º.",
    origin:
      "Vídeo que circula em redes sociais, entre elas o Threads. Segundo o Estadão Verifica, a acusação é feita pelo empresário Felipe Cecílio, ex-candidato a deputado federal em Goiás, que não respondeu à reportagem.",
    attribution: "Vídeo em redes sociais",
  },
  date: "2026-11-28",
  checkedAt: "2026-11-28T09:22:00-03:00",
  updated: "2026-11-28",
  topic: "Eleições 2026",
  points: [
    {
      status: "verdade",
      text: "A abstenção, os votos em branco e os nulos foram menores no 2º turno do que no 1º, segundo os arquivos de resultados do TSE. A diferença está nos totais oficiais, mas não demonstra manipulação.",
    },
    {
      status: "falso",
      text: "A abstenção não foi maior no 2º turno. O arquivo oficial registra 30.509.005 ausentes (19,22%) em 25/10, contra 33.469.244 (21,08%) em 04/10.",
    },
    {
      status: "falso",
      text: "Não há prova de que um software tenha manipulado a apuração. O Estadão Verifica aponta que a urna bloqueia programas estranhos e que os softwares usados são conferidos.",
    },
    {
      status: "atencao",
      text: "O TSE informou ao Estadão Verifica que, até a publicação da checagem, em 25/11, não havia contestação formal do resultado com base nas alegações do vídeo.",
    },
  ],
  sources: [
    {
      label: "Arquivo oficial de resultados para presidente, 1º turno (eleição 6257)",
      publisher: "Tribunal Superior Eleitoral",
      url: "https://resultados.tse.jus.br/oficial/ele2026/6257/dados/br/br-c0001-e006257-u.json",
      kind: "primaria",
      note: "Com 100% das seções totalizadas: 158.745.502 aptos, 125.275.835 votantes (78,92%), 33.469.244 ausentes (21,08%), 2.300.798 brancos e 3.674.249 nulos.",
      published: "2026-10-05",
    },
    {
      label: "Arquivo oficial de resultados para presidente, 2º turno (eleição 6258)",
      publisher: "Tribunal Superior Eleitoral",
      url: "https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json",
      kind: "primaria",
      note: "Com 100% das seções totalizadas: 158.745.502 aptos, 128.236.074 votantes (80,78%), 30.509.005 ausentes (19,22%), 1.430.496 brancos e 2.723.305 nulos.",
      published: "2026-10-25",
    },
    {
      label: "É falso que software tenha aumentado votos para Lula a partir de queda na abstenção",
      publisher: "Estadão Verifica, reproduzido pelo Terra",
      url: "https://www.terra.com.br/noticias/brasil/politica/e-falso-que-software-tenha-aumentado-votos-para-lula-a-partir-de-queda-na-abstencao,c2d9d5efb5b9247e4d5cdde234b7c1978nnt9n3k.html",
      kind: "agencia",
      note: "Descreve a alegação e quem a fez, explica as barreiras da urna contra programas não autorizados e traz a resposta do TSE.",
      published: "2026-11-25",
    },
  ],
  timeline: [
    { date: "2026-10-04", text: "No 1º turno, a abstenção é de 21,08%, segundo o arquivo oficial do TSE." },
    { date: "2026-10-25", text: "No 2º turno, a abstenção é de 19,22%, segundo o arquivo oficial do TSE." },
    { date: "2026-11-06", text: "Cecílio grava vídeo dizendo ter provas de manipulação numérica, segundo o Estadão Verifica." },
    { date: "2026-11-25", text: "O Terra publica a checagem do Estadão Verifica que classifica a alegação como falsa." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>O vídeo afirma que há provas de manipulação por software e que a abstenção do 2º turno teria sido 8% maior que a do 1º, e não menor. A alegação é descrita pelo <a href="https://www.terra.com.br/noticias/brasil/politica/e-falso-que-software-tenha-aumentado-votos-para-lula-a-partir-de-queda-na-abstencao,c2d9d5efb5b9247e4d5cdde234b7c1978nnt9n3k.html" target="_blank" rel="noopener noreferrer nofollow">Estadão Verifica, em texto reproduzido pelo Terra</a>.</p>
    <p>Os totais oficiais estão nos arquivos do TSE do <a href="https://resultados.tse.jus.br/oficial/ele2026/6257/dados/br/br-c0001-e006257-u.json" target="_blank" rel="noopener noreferrer nofollow">1º turno</a> e do <a href="https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json" target="_blank" rel="noopener noreferrer nofollow">2º turno</a> para presidente:</p>
    <table>
      <thead>
        <tr><th>Medida</th><th>1º turno (04/10)</th><th>2º turno (25/10)</th></tr>
      </thead>
      <tbody>
        <tr><td>Eleitores aptos</td><td>158.745.502</td><td>158.745.502</td></tr>
        <tr><td>Comparecimento</td><td>125.275.835 (78,92%)</td><td>128.236.074 (80,78%)</td></tr>
        <tr><td>Abstenção</td><td>33.469.244 (21,08%)</td><td>30.509.005 (19,22%)</td></tr>
        <tr><td>Votos em branco</td><td>2.300.798 (1,84%)</td><td>1.430.496 (1,12%)</td></tr>
        <tr><td>Votos nulos</td><td>3.674.249 (2,93%)</td><td>2.723.305 (2,12%)</td></tr>
      </tbody>
    </table>
    <p>O aumento do comparecimento entre os turnos já tinha sido tema de notícia, com o recorte do <a href="/noticias/voto-facultativo-comparecimento-urnas-2026">voto facultativo</a>. Uma mudança nos totais, por si só, não indica interferência na apuração.</p>

    <h2>O que protege a urna</h2>
    <p>Segundo o Estadão Verifica, a urna eletrônica tem dispositivos que impedem o funcionamento de programas estranhos. A porta USB é desligada automaticamente antes que um dispositivo não autorizado possa ser lido, e o equipamento faz um teste próprio ao ser ligado.</p>
    <p>A checagem também cita o Teste de Autenticidade dos Sistemas Eleitorais, que compara os resumos digitais dos programas usados nas urnas com os que foram lacrados pelo TSE. O procedimento conta com a participação de juiz, partidos, federações, coligações, Ministério Público e OAB.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O dado central apresentado como prova é contrariado pelo registro oficial: a abstenção caiu 1,86 ponto percentual do 1º para o 2º turno. A acusação de que um software alterou votos não veio acompanhada de evidência verificada, de acordo com o Estadão Verifica, que procurou o autor e não obteve resposta.</p>
    <p>Pedidos e questionamentos sobre o resultado têm caminho próprio na Justiça Eleitoral. Veja o que Flávio Bolsonaro disse sobre <a href="/noticias/flavio-nao-reconhece-resultado-pede-anulacao-eleicao">pedir a anulação da eleição</a> e a checagem sobre um <a href="/checagem/relatorio-pericial-independente-fraude-2-turno-apocrifo-distorce-dados">relatório apócrifo que alegava fraude no 2º turno</a>. Os resultados estão no <a href="/eleicoes">painel das Eleições 2026</a>.</p>
  `,
};
