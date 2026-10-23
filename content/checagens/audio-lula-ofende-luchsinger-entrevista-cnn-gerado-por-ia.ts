import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "audio-lula-ofende-luchsinger-entrevista-cnn-gerado-por-ia",
  title: "É falso o áudio em que Lula ofende Roberta Luchsinger após entrevista à CNN",
  summary:
    "Áudio atribuído a Lula sobre a entrevista da lobista à CNN Brasil é sintético, segundo Aos Fatos e Boatos.org. A Secom do Planalto negou que a gravação seja real.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. O áudio atribuído a Lula, com reclamações sobre a entrevista de Roberta Luchsinger à CNN Brasil, é uma voz sintética, segundo o Aos Fatos e o Boatos.org. O Aos Fatos não achou registro da fala e diz que a Secom do Planalto negou que o áudio seja real. Uma análise do NCFA (USP e UFABC) apontou síntese vocal.",
  claim: {
    text: "Um áudio atribuído ao presidente Lula mostraria o presidente reclamando, de forma ofensiva, da entrevista que Roberta Luchsinger deu à CNN Brasil, apresentado como gravação vazada.",
    origin:
      "Circulou no X, no Instagram, no Facebook e no WhatsApp, em alguns casos com montagem de texto, segundo o Aos Fatos. Até a tarde de 22/10/2026, publicações somavam cerca de 100 mil visualizações no X e 2,5 mil interações no Instagram e no Facebook.",
    firstSeen: "2026-10-21",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-23",
  checkedAt: "2026-10-23T08:40:00-03:00",
  updated: "2026-10-23",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "O Aos Fatos buscou a gravação nos canais oficiais da CNN Brasil e em outras fontes confiáveis e não encontrou registro das declarações atribuídas a Lula.",
    },
    {
      status: "falso",
      text: "Segundo o Aos Fatos, a Secom do Planalto negou que o áudio seja autêntico. O Boatos.org também classifica o material como voz imitada por inteligência artificial, sem gravação original verificável.",
    },
    {
      status: "falso",
      text: "O NCFA, núcleo de computação forense ligado à USP e à UFABC, comparou o áudio com uma fala real de Lula e o classificou como síntese vocal, com 99,2% de confiança no método empregado, segundo o Aos Fatos.",
    },
    {
      status: "atencao",
      text: "A análise do projeto da WITNESS no Brasil também indicou manipulação por IA, mas o Aos Fatos ressalva que a amostra de teste foi pequena e que uma segunda análise não encontrou sinais conclusivos. O veredito se apoia no conjunto das verificações, não em uma só.",
    },
    {
      status: "verdade",
      text: "A entrevista de Roberta Luchsinger à CNN Brasil existiu: foi exibida em 17/10/2026, e nela a lobista, investigada pela Polícia Federal, faz acusações a Lula e ao filho dele, Fábio Luís Lula da Silva. São alegações dela, que não podem ser verificadas a partir da própria entrevista.",
    },
  ],
  sources: [
    {
      label: "É falso áudio em que Lula reclama de entrevista de Roberta Luchsinger à CNN",
      publisher: "Aos Fatos",
      url: "https://aosfatos.org/noticias/falso-audio-lula-roberta-luchsinger-cnn/",
      kind: "agencia",
      note: "Reúne a negativa da Secom, a análise do NCFA (USP e UFABC) e o teste da WITNESS, e informa o alcance das publicações. Não achou registro da fala nos canais da CNN Brasil.",
      published: "2026-10-22",
    },
    {
      label: "É falso que Lula tenha gravado áudio xingando Roberta Luchsinger após entrevista na CNN",
      publisher: "Boatos.org",
      url: "https://www.boatos.org/politica/lula-gravou-audio-xingando-roberta-luchsinger-de-vagabunda-apos-entrevista-dela-na-cnn.html",
      kind: "agencia",
      note: "Checagem independente que classifica o áudio como voz imitada por IA, sem gravação original verificável, e lembra que Lula só comentou o caso no debate da Band.",
      published: "2026-10-21",
    },
    {
      label: "Veja a íntegra da entrevista concedida por Luchsinger à CNN Brasil",
      publisher: "CNN Brasil",
      url: "https://www.cnnbrasil.com.br/politica/veja-a-integra-da-entrevista-concedida-por-luchsinger-a-cnn-brasil/",
      kind: "imprensa",
      note: "Íntegra da entrevista exibida em 17/10/2026. Confirma que a entrevista existiu e mostra o que ela disse sobre Lula e Lulinha. O conteúdo não contém a reação atribuída a Lula no áudio.",
      published: "2026-10-18",
    },
  ],
  timeline: [
    { date: "2026-10-17", text: "A CNN Brasil exibe a entrevista de Roberta Luchsinger." },
    { date: "2026-10-21", text: "O Boatos.org publica a checagem do áudio atribuído a Lula." },
    { date: "2026-10-22", text: "O Aos Fatos publica a checagem, com a análise do NCFA e a negativa da Secom." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Um áudio com a voz atribuída ao presidente Lula, apresentado como vazamento, circula em redes sociais e no WhatsApp com ofensas à lobista Roberta Luchsinger por causa da entrevista dela à CNN Brasil. Segundo o <a href="https://aosfatos.org/noticias/falso-audio-lula-roberta-luchsinger-cnn/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, as publicações somavam cerca de 100 mil visualizações no X até a tarde de 22 de outubro.</p>
    <p>O Aos Fatos não encontrou a fala nos canais oficiais da CNN Brasil nem em outras fontes confiáveis, e informa que a Secom do Planalto negou que o áudio seja real. O <a href="https://www.boatos.org/politica/lula-gravou-audio-xingando-roberta-luchsinger-de-vagabunda-apos-entrevista-dela-na-cnn.html" target="_blank" rel="noopener noreferrer nofollow">Boatos.org</a>, em checagem própria, também concluiu que a voz foi imitada com inteligência artificial e que não existe gravação original verificável.</p>

    <h2>A análise técnica</h2>
    <p>Conforme o Aos Fatos, o professor Mário Gazziro, do NCFA (Núcleo de Computação Forense Aplicada, ligado à USP e à UFABC), comparou características acústicas do áudio com uma fala real de Lula e o classificou como falsificação por síntese vocal, com índice de confiança de 99,2% no método usado. O projeto da WITNESS no Brasil também apontou indícios de IA, mas o próprio Aos Fatos registra que a amostra do teste foi pequena e que uma segunda análise não foi conclusiva.</p>
    <p>A entrevista que motivou o áudio é real. A <a href="https://www.cnnbrasil.com.br/politica/veja-a-integra-da-entrevista-concedida-por-luchsinger-a-cnn-brasil/" target="_blank" rel="noopener noreferrer nofollow">CNN Brasil publicou a íntegra</a>, na qual a entrevistada faz acusações a Lula e ao filho dele. São alegações dela, que a reportagem diz não ser possível verificar, e a Secom já havia declarado que o presidente desconhece os fatos relatados.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>Há três linhas independentes que apontam na mesma direção: ausência de registro da fala, negativa do Planalto e análise de síntese vocal por laboratório forense, além da checagem separada do Boatos.org. Por isso o selo é Falso, e não Sem provas. A ressalva fica por conta do teste da WITNESS, que sozinho não bastaria.</p>
    <p>O caso entra na lista de áudios sintéticos que circulam na reta final da campanha. Para conferir outras alegações, veja as demais <a href="/checagem">checagens</a> e o <a href="/eleicoes">painel de Eleições 2026</a>.</p>
  `,
};
