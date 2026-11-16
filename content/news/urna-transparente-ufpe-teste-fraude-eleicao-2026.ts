import type { NewsItem } from "@/lib/types";

export const item: NewsItem = {
  slug: "urna-transparente-ufpe-teste-fraude-eleicao-2026",
  title: "Estudo da UFPE aplica teste de fraude russo e não acha anomalia",
  summary:
    "Pesquisadores da UFPE aplicaram aos dados do TSE de 2018, 2022 e 2026 o teste que achou picos suspeitos na Rússia e não viram desvio fora do acaso.",
  author: "Equipe Política Diária",
  sourceName: "King's College London",
  sourceUrl: "https://www.kcl.ac.uk/electoral-fraud-and-the-brazilian-missing-peaks",
  date: "2026-11-06",
  publishedAt: "2026-11-16T08:24:19-03:00",
  topic: "eleicoes",
  imageQuery: "Brazilian electronic voting machine urna eletrônica",
  content: `
    <p>Dois professores do Departamento de Ciência Política da Universidade Federal de Pernambuco (UFPE), Dalson Britto Figueiredo Filho e Ernani Rodrigues de Carvalho Neto, aplicaram aos resultados das eleições presidenciais brasileiras de 2018, 2022 e 2026 um teste estatístico usado para apontar indícios de manipulação em eleições da Rússia e não encontraram anomalias. O artigo, "Electoral Fraud and the Brazilian Missing Peaks", foi publicado em inglês em 6 de novembro pelo <a href="https://www.kcl.ac.uk/electoral-fraud-and-the-brazilian-missing-peaks" target="_blank" rel="noopener noreferrer nofollow">King's College London</a>, com base nos dados abertos do Tribunal Superior Eleitoral (TSE) seção por seção.</p>
    <p>O trabalho é o primeiro de uma série sobre a integridade, a consistência e a confiabilidade dos dados da eleição presidencial de 2026, dentro do Projeto Urna Transparente (The Transparent Ballot Box Project), desenvolvido pela Transparência Eleitoral. A publicação também foi noticiada pelo <a href="https://www.diariodepernambuco.com.br/politica/2026/11/11728545-pesquisa-da-ufpe-nao-identifica-indicios-de-fraude-em-votacao-que-reelegeu-lula-presidente.html" target="_blank" rel="noopener noreferrer nofollow">Diario de Pernambuco</a>, que informa que o texto foi republicado em português pela plataforma DesvenDados. Os próprios autores ressalvam que o resultado afasta um tipo específico de fraude, e não todas as formas possíveis.</p>

    <h2>Como funciona o teste dos números inteiros</h2>
    <p>O método foi proposto em 2016 pelos pesquisadores Dmitry Kobak, Sergey Shpilkin e Maxim Pshenichnikov, em artigo na revista <em>Annals of Applied Statistics</em>, segundo o texto publicado pelo King's College. A ideia parte de uma observação simples: quando alguém altera resultados à mão, tende a escrever percentuais redondos, como 60%, 70% ou 80%. Em uma eleição sem interferência, a distribuição do comparecimento e da votação por seção forma uma curva suave, sem picos nos números inteiros.</p>
    <p>Os autores montaram histogramas com intervalos de 0,1 ponto percentual, excluíram seções com 100% de comparecimento e contaram quantas seções ficam a menos de 0,05 ponto de um número inteiro. Esse total foi comparado com o que se esperaria por puro acaso, calculado em 1.000 simulações que sorteiam de novo os votos mantendo o tamanho e o perfil de cada seção. Segundo o artigo, a base de 2026 tem 498.950 seções no segundo turno.</p>
    <p>Na Rússia, o mesmo teste encontrou, segundo os autores, cerca de mil seções acima do esperado na maioria das eleições desde 2004, perto de 2.000 em 2008 e em 2018 e 3.670 em 2020. São esses picos que dão nome ao artigo: no Brasil, eles não aparecem.</p>

    <h2>O que o estudo encontrou no Brasil</h2>
    <p>No primeiro turno de 2026, em 4 de outubro, o artigo registra 171 seções com percentuais inteiros acima do esperado, dentro de uma faixa de variação aleatória que chega a 795. No primeiro turno de 2022, houve 46 seções a menos do que o acaso previa. Somados os seis turnos presidenciais desde 2018, os pesquisadores contaram 535.137 seções com números inteiros, contra 534.817 esperadas, uma diferença de 320 que o Diario de Pernambuco descreve como também dentro do intervalo previsto.</p>
    <ul>
      <li><strong>Eleições analisadas:</strong> primeiro e segundo turnos para presidente em 2018, 2022 e 2026.</li>
      <li><strong>Fonte dos dados:</strong> <a href="https://dadosabertos.tse.jus.br/" target="_blank" rel="noopener noreferrer nofollow">portal de dados abertos do TSE</a>, com o resultado de cada seção.</li>
      <li><strong>Testes de robustez:</strong> acompanhar Lula em vez de Flávio Bolsonaro no primeiro turno de 2026 e calcular os percentuais sobre todos os votos depositados (como faz a lei russa) em vez dos votos válidos (como faz a lei brasileira). Nenhuma das variações saiu da faixa do acaso, segundo o artigo.</li>
    </ul>
    <p>O texto lembra o resultado da disputa: Flávio Bolsonaro (PL) liderou o primeiro turno com 47,03% dos votos válidos, e Lula (PT) venceu o segundo turno, em 25 de outubro. Pelos números oficiais do TSE reunidos no painel <a href="/eleicoes">Eleições 2026</a>, Lula teve 51,79% dos votos válidos na rodada final.</p>
    <p>"Procuramos por essa evidência em seis turnos eleitorais e não a encontramos", escreveram os autores, na versão em português citada pelo Diario de Pernambuco.</p>

    <h2>Os limites que os próprios autores apontam</h2>
    <p>O artigo dedica uma parte às limitações do método. Os picos russos, explicam os pesquisadores, provavelmente nascem de pessoas que preenchem percentuais à mão. No Brasil, as seções informam contagens de votos, e não percentuais: "Nobody at a Brazilian polling station is ever asked to report a percentage" (ninguém em uma seção eleitoral brasileira precisa informar um percentual), escrevem.</p>
    <p>Por isso, segundo os autores, passar no teste é compatível com uma eleição limpa, mas também com uma fraude que tenha evitado números redondos. O teste descarta o tipo de manipulação visto nas contagens russas e nada além disso. É a razão pela qual o Projeto Urna Transparente anuncia outros métodos de estatística forense para os próximos trabalhos da série.</p>
    <p>Em reportagem do Estadão Conteúdo republicada pelo <a href="https://www.oliberal.com/politica/eleicao-do-brasil-passa-em-testes-que-apontaram-fraudes-eleitorais-na-russia-nigeria-e-senegal-1.1194595" target="_blank" rel="noopener noreferrer nofollow">O Liberal</a> em 15 de novembro, o projeto aparece com um segundo exame, o teste do último dígito, proposto em 2012 a partir de eleições da Nigéria e do Senegal. Segundo essa reportagem, a média do último dígito dos votos de Flávio Bolsonaro e de Lula ficou perto de 4,5 nos dois turnos de 2026, o valor esperado quando não há interferência. Esse resultado não consta do artigo do King's College e é atribuído aqui ao Estadão. O mesmo texto informa que os protocolos foram registrados antes do primeiro turno na plataforma Open Science Framework e que novas análises devem sair ainda em novembro.</p>

    <h2>Por que isso importa</h2>
    <p>O resultado do segundo turno é contestado pelo candidato derrotado. Na noite de 25 de outubro, o senador <a href="/congresso/senadores/flavio-bolsonaro-5894">Flávio Bolsonaro</a> (PL-RJ) disse que não reconhecia o resultado e que pediria a anulação da votação, centrando a contestação na prorrogação do horário até as 19h, como mostrou a cobertura sobre o <a href="/noticias/flavio-nao-reconhece-resultado-pede-anulacao-eleicao">anúncio do pedido de anulação</a>. Dias depois, o coordenador da campanha, senador <a href="/congresso/senadores/rogerio-marinho-4694">Rogério Marinho</a> (PL-RN), afirmou que o partido não pode sustentar que houve fraude porque não há provas, como registrou a notícia sobre <a href="/noticias/marinho-pl-sem-prova-fraude-carta-flavio">a carta de Flávio e a fala de Marinho</a>.</p>
    <p>O presidente do TSE, Kassio Nunes Marques, afirmou após o pleito que não houve irregularidades, e o ministro Gilmar Mendes, do Supremo Tribunal Federal, chamou de "bravatas" as acusações contra o resultado, como mostrou a <a href="/noticias/gilmar-bravatas-acusacoes-resultado-eleicao">reportagem sobre a postagem do ministro</a>. Nesse debate, um estudo com método descrito, dados públicos do TSE e material de replicação aberto oferece um parâmetro que qualquer pessoa pode conferir.</p>
    <p>O alcance do estudo, porém, se limita ao que ele testa. Ele não examina a decisão que prorrogou a votação, cuja discussão é jurídica e envolve a ordem do ministro Cristiano Zanin, do STF, que estendeu a votação até as 19h. Também não avalia o software da urna eletrônica. O que o artigo mede é a distribuição dos números já divulgados, seção por seção.</p>

    <h2>O que observar a seguir</h2>
    <p>O Projeto Urna Transparente informa que esta é a primeira de uma série de análises. Os próximos trabalhos devem aplicar outros métodos de estatística forense aos dados de 2026, segundo o artigo do King's College e o Diario de Pernambuco. Como o material de replicação foi publicado no Open Science Framework, outros pesquisadores podem refazer as contas com os mesmos dados e contestar ou confirmar as conclusões.</p>
    <p>Os resultados oficiais por candidato e por estado, as pesquisas e o ranking de acerto dos institutos continuam reunidos no painel de eleições do site, com fonte e data de cada número.</p>
  `,
  faq: [
    {
      question: "O estudo da UFPE prova que não houve fraude na eleição de 2026?",
      answer:
        "Não. Os próprios autores afirmam que o teste afasta só um tipo de manipulação, a que deixa picos em percentuais redondos, como ocorreu na Rússia. Passar no teste é compatível com uma eleição limpa, mas também com uma fraude que tenha evitado números inteiros. Por isso o projeto anuncia outros métodos estatísticos nas próximas análises.",
    },
    {
      question: "Quais dados os pesquisadores usaram?",
      answer:
        "Os resultados de cada seção eleitoral publicados no portal de dados abertos do TSE, nos dois turnos das eleições presidenciais de 2018, 2022 e 2026. Segundo o artigo, só o segundo turno de 2026 reúne 498.950 seções. O material de replicação está no Open Science Framework, o que permite que outros pesquisadores refaçam as contas com a mesma base.",
    },
  ],
};
