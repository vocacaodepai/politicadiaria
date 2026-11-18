import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "capa-veja-moro-ladrao-era-o-juiz-falsa",
  title: "É falsa a capa da Veja que diz que “o ladrão era o juiz” sobre Sergio Moro",
  summary:
    "Imagem atribui à Veja a manchete “No fim o ladrão era o juiz”, com Sergio Moro na capa. Lupa e Boatos.Org mostram que a edição real tem outro tema.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. A Veja não publicou capa com a manchete “No fim o ladrão era o juiz” sobre o senador Sergio Moro. Segundo a Lupa e o Boatos.Org, a edição mais recente da revista, a 3.021, de 13/11/2026, tem como manchete “A era da incerteza”, sobre o pacote fiscal. A imagem reaproveita uma reportagem de abril de 2024 sobre um relatório do CNJ, que não é condenação.",
  claim: {
    text: "Suposta capa da revista Veja com a manchete “No fim o ladrão era o juiz” e foto de Sergio Moro, dizendo que um relatório do CNJ afirma que Moro, Deltan Dallagnol e Gabriela Hardt se uniram para desviar dinheiro da União.",
    origin:
      "Publicações no X e outras redes, segundo a Lupa, que recebeu pedidos de checagem de leitores pelo WhatsApp. A imagem se apresenta como a edição 2.958, de 11/11/2026. O Boatos.Org registrou a imagem em 15/11/2026.",
    firstSeen: "2026-11-15",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-18",
  checkedAt: "2026-11-18T19:44:38-03:00",
  updated: "2026-11-18",
  topic: "Justiça",
  points: [
    {
      status: "falso",
      text: "Segundo a Lupa e o Boatos.Org, a edição mais recente da Veja é a 3.021, de 13/11/2026, com a manchete “A era da incerteza”, sobre o pacote fiscal do governo. Não há referência a Moro, Dallagnol ou Hardt na capa.",
    },
    {
      status: "falso",
      text: "A Lupa informa que a reportagem anunciada na imagem nunca foi publicada com aquela capa e que a ferramenta de detecção da OpenAI identificou na imagem a marca d’água da empresa, indício de criação por inteligência artificial.",
    },
    {
      status: "verdade",
      text: "Existe uma reportagem real da Veja, de abril de 2024, sobre um relatório da Corregedoria Nacional de Justiça que acusava Moro, Dallagnol e Hardt de tentar desviar cerca de R$ 2,5 bilhões, segundo a Lupa e o Boatos.Org.",
    },
    {
      status: "atencao",
      text: "Relatório de correição não é condenação. O Boatos.Org observa que o texto de 2024 tratava de um relatório do CNJ, não de decisão criminal, e por isso o rótulo de “ladrão” não tem base nele. Segundo a Lupa, Moro afirmou que os valores foram devolvidos à Petrobras.",
    },
    {
      status: "atencao",
      text: "A juíza Gabriela Hardt foi punida pelo CNJ com dois anos de disponibilidade em agosto de 2026, e a pena foi suspensa em liminar pelo ministro Luiz Fux, do STF, em novembro. O caso trata de processo disciplinar, não de condenação por desvio.",
    },
  ],
  sources: [
    {
      label: "É falsa capa da Veja que acusa Moro de desviar dinheiro",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/verificacao/2026/11/18/e-falsa-capa-da-veja-que-acusa-moro-de-desviar-dinheiro/",
      kind: "agencia",
      note: "Compara a imagem com a edição 3.021 da Veja, de 13/11/2026, aponta marca d’água da OpenAI detectada na imagem e reconstitui o caso do relatório do CNJ de 2024 e a punição de Hardt em 2026.",
      published: "2026-11-18",
    },
    {
      label: "Veja publicou capa chamando Sergio Moro de juiz ladrão?",
      publisher: "Boatos.Org",
      url: "https://www.boatos.org/politica/veja-publicou-capa-chamando-sergio-moro-de-juiz-ladrao.html",
      kind: "agencia",
      note: "Classifica a imagem como montagem, informa que a edição 3.021 traz a manchete “A era da incerteza” e identifica a reportagem de abril de 2024 que serviu de base.",
      published: "2026-11-15",
    },
    {
      label: "Maioria do CNJ derruba decisão que afastou juíza Gabriela Hardt",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/justica/noticia/2024-04/maioria-do-cnj-derruba-decisao-que-afastou-juiza-gabriela-hardt",
      kind: "imprensa",
      note: "Registra que, em 16/04/2024, o plenário do CNJ não referendou a liminar do corregedor Luís Felipe Salomão que afastava Hardt, e descreve a suspeita sobre o repasse de cerca de R$ 2 bilhões a um fundo da força-tarefa.",
      published: "2024-04-16",
    },
  ],
  timeline: [
    { date: "2024-04-15", text: "O corregedor nacional de Justiça, Luís Felipe Salomão, afasta Gabriela Hardt em liminar, segundo a Lupa." },
    { date: "2024-04-16", text: "A Veja publica reportagem sobre o relatório da correição, segundo a Lupa, e o plenário do CNJ derruba o afastamento de Hardt, segundo a Agência Brasil." },
    { date: "2026-08-04", text: "O CNJ aplica a Hardt a pena de dois anos de disponibilidade, segundo a Lupa." },
    { date: "2026-11-13", text: "Data da edição 3.021 da Veja, com a manchete “A era da incerteza”, segundo Lupa e Boatos.Org." },
    { date: "2026-11-15", text: "O Boatos.Org publica a checagem da imagem." },
    { date: "2026-11-18", text: "A Lupa publica a checagem e classifica a capa como falsa." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Circula nas redes uma imagem que imita a capa da revista Veja, com foto do senador <a href="/congresso/senadores/sergio-moro-6331">Sergio Moro</a> e a manchete “No fim o ladrão era o juiz”. O texto diz que um relatório do Conselho Nacional de Justiça (CNJ) concluiu que Moro, o ex-procurador Deltan Dallagnol e a juíza Gabriela Hardt se uniram para desviar dinheiro da União. A imagem se apresenta como a edição 2.958, de 11 de novembro de 2026.</p>
    <p>Segundo a <a href="https://www.agencialupa.org/verificacao/2026/11/18/e-falsa-capa-da-veja-que-acusa-moro-de-desviar-dinheiro/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>, a edição mais recente da revista é a 3.021, de 13 de novembro de 2026, com a manchete “A era da incerteza”, sobre o pacote fiscal do governo. O <a href="https://www.boatos.org/politica/veja-publicou-capa-chamando-sergio-moro-de-juiz-ladrao.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.Org</a> chegou à mesma conclusão e classificou a imagem como montagem. A Lupa relata ainda que a ferramenta de detecção da OpenAI encontrou na imagem a marca d’água da empresa.</p>

    <h2>De onde veio a manchete</h2>
    <p>As duas checagens identificam a base da peça: uma reportagem real da Veja, de abril de 2024, sobre um relatório da Corregedoria Nacional de Justiça. Segundo a Lupa, o documento acusava Moro, Dallagnol e Hardt de tentar desviar cerca de R$ 2,5 bilhões entre 2016 e 2019. Ainda segundo a Lupa, Moro afirmou na época que todos os valores foram devolvidos à Petrobras, e Dallagnol chamou o relatório de “obra de ficção científica”.</p>
    <p>O caso teve desdobramentos no próprio CNJ. Em 16 de abril de 2024, segundo a <a href="https://agenciabrasil.ebc.com.br/justica/noticia/2024-04/maioria-do-cnj-derruba-decisao-que-afastou-juiza-gabriela-hardt" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a>, o plenário do conselho derrubou a liminar do corregedor Luís Felipe Salomão que afastava Hardt. Em agosto de 2026, o CNJ aplicou à juíza dois anos de disponibilidade, punição que o ministro Luiz Fux, do STF, <a href="/noticias/fux-suspende-punicao-cnj-juiza-gabriela-hardt">suspendeu em liminar</a> em novembro.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O fato central, a publicação dessa capa pela Veja, é contrariado por duas agências de checagem independentes, que compararam a imagem com a edição real da revista. Além disso, o conteúdo anunciado não corresponde a nenhuma decisão: um relatório de correição e um processo disciplinar não são condenação por desvio, e nenhuma das fontes consultadas registra decisão judicial nesse sentido contra Moro, Dallagnol ou Hardt.</p>
    <p>Esta checagem trata apenas da imagem atribuída à Veja e não avalia o mérito do processo disciplinar, que segue em discussão no STF. Para o debate recente sobre a Lava Jato, veja a notícia sobre a <a href="/noticias/gilmar-rebate-moro-anulacao-triplex-motivos-formais">resposta de Gilmar Mendes a Moro</a> e outras <a href="/checagem">checagens</a>, como a da <a href="/checagem/capa-folha-extrato-lula-300-bilhoes-propinas-falsa">capa falsa da Folha sobre Lula</a>, que atingia o outro campo.</p>
  `,
};
