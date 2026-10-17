import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "quem-nao-votou-1-turno-nao-pode-votar-2-turno",
  title: "É falso que quem não votou no 1º turno esteja impedido de votar no 2º",
  summary:
    "Cada turno é uma eleição independente: quem faltou em 4/10 pode votar em 25/10 com o título regular. A ausência, porém, precisa ser justificada até 3/12.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. Segundo a Justiça Eleitoral, cada turno é uma eleição independente: quem faltou ao 1º turno pode votar no 2º, em 25 de outubro, se o título estiver regular. O que não some é a pendência: a ausência de 4/10 deve ser justificada até 3 de dezembro.",
  claim: {
    text: "Quem não votou no primeiro turno das eleições de 2026 estaria impedido de votar no segundo.",
    origin:
      "Mensagens em redes sociais depois do 1º turno, segundo o Senado Verifica, que registrou o boato em 9/10/2026.",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-10-17",
  checkedAt: "2026-10-17T19:50:00-03:00",
  updated: "2026-10-17",
  topic: "Eleições 2026",
  points: [
    {
      status: "falso",
      text: "Faltar ao 1º turno não impede o voto no 2º. Segundo a Justiça Eleitoral, citada pelo Senado Verifica e pela Agência Brasil, cada turno é uma eleição independente. A condição é o título estar regular, sem cancelamento nem suspensão.",
    },
    {
      status: "verdade",
      text: "A ausência continua valendo como pendência. A Agência Brasil informa que quem não justificou a falta ao 1º turno precisa regularizar a situação mesmo que vote no 2º. O prazo para justificar a falta de 4/10 é 3 de dezembro de 2026.",
    },
    {
      status: "verdade",
      text: "Há multa de R$ 3,51 por turno para quem não justifica (Agência Brasil e O Tempo). Segundo O Tempo, a multa não impede o voto, mas bloqueia a certidão de quitação eleitoral.",
    },
    {
      status: "atencao",
      text: "O título pode ser cancelado se o eleitor deixar de votar em três eleições consecutivas sem justificar nem pagar a multa, e cada turno conta como uma eleição (O Tempo). Para o eleitor que faltou aos dois turnos de 2026 sem regularizar, isso significa duas ausências.",
    },
    {
      status: "atencao",
      text: "As páginas do TSE e dos TREs consultadas bloquearam o acesso automático (erro 403). As regras vêm do Senado Verifica, da Agência Brasil e de O Tempo, que citam a Justiça Eleitoral.",
    },
  ],
  sources: [
    {
      label: "É falso que quem não votou no primeiro turno não pode votar no segundo",
      publisher: "Senado Verifica (Senado Federal)",
      url: "https://www12.senado.leg.br/verifica/materias/2026/e-falso-que-quem-nao-votou-no-primeiro-turno-nao-pode-votar-no-segundo",
      kind: "agencia",
      note: "Classifica a alegação como falsa. Cita a Justiça Eleitoral (cada turno é uma eleição independente), a Resolução TSE nº 23.759/2026 e os prazos de 3/12/2026 (1º turno) e 8/1/2027 (2º turno).",
      published: "2026-10-09",
    },
    {
      label: "Eleitor que faltou no primeiro turno pode votar no segundo",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/eleitor-que-faltou-no-primeiro-turno-pode-votar-no-segundo",
      kind: "imprensa",
      note: "Informa que mais de 33,4 milhões de eleitores não votaram em 4/10 (abstenção de 21,08%), que cada turno é independente e que a pendência deve ser regularizada, com multa de R$ 3,51 por turno.",
      published: "2026-10-05",
    },
    {
      label: "Quem não votou no primeiro turno pode votar no segundo? Veja regras e multas",
      publisher: "O Tempo",
      url: "https://www.otempo.com.br/politica/2026/10/13/quem-nao-votou-no-primeiro-turno-pode-votar-no-segundo-veja-regras-e-multas",
      kind: "imprensa",
      note: "Confirma que o eleitor com título regular vota no 2º turno sem justificar antes, a regra do cancelamento do título por três ausências consecutivas e a isenção para quem tem voto facultativo.",
      published: "2026-10-13",
    },
  ],
  timeline: [
    { date: "2026-10-04", text: "Primeiro turno. Segundo a Agência Brasil, 21,08% do eleitorado não compareceu, a maior abstenção em um 1º turno de eleição geral desde 1998." },
    { date: "2026-10-05", text: "A Agência Brasil publica que quem faltou pode votar no 2º turno e que a ausência deve ser regularizada." },
    { date: "2026-10-09", text: "O Senado Verifica publica a checagem classificando a alegação como falsa." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Depois do primeiro turno, em 4 de outubro, circulou nas redes a mensagem de que quem não foi às urnas não poderia votar no segundo turno. O <a href="https://www12.senado.leg.br/verifica/materias/2026/e-falso-que-quem-nao-votou-no-primeiro-turno-nao-pode-votar-no-segundo" target="_blank" rel="noopener noreferrer nofollow">Senado Verifica</a> classificou a alegação como falsa em 9 de outubro. Segundo a Justiça Eleitoral, citada na checagem, cada turno é uma eleição independente, e por isso a falta em um não impede o voto no outro.</p>
    <p>A <a href="https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/eleitor-que-faltou-no-primeiro-turno-pode-votar-no-segundo" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a> trouxe a mesma orientação já em 5 de outubro, quando informou que 33,4 milhões de eleitores deixaram de votar no primeiro turno. A condição é que a inscrição eleitoral esteja regular, ou seja, sem cancelamento nem suspensão, como lembra <a href="https://www.otempo.com.br/politica/2026/10/13/quem-nao-votou-no-primeiro-turno-pode-votar-no-segundo-veja-regras-e-multas" target="_blank" rel="noopener noreferrer nofollow">O Tempo</a>.</p>

    <h2>O que a ausência custa</h2>
    <p>O fato de poder votar não apaga a falta. Quem não compareceu em 4 de outubro deve justificar a ausência até 3 de dezembro de 2026, e o segundo turno tem prazo próprio, 8 de janeiro de 2027, segundo o Senado Verifica. A justificativa pode ser feita pelo aplicativo e-Título, pelo Autoatendimento Eleitoral no portal do TSE ou em um cartório eleitoral.</p>
    <p>Sem justificativa aceita, a Agência Brasil e O Tempo informam multa de R$ 3,51 por turno. De acordo com O Tempo, a multa não impede o voto, mas bloqueia a certidão de quitação eleitoral. Também segundo O Tempo, o título pode ser cancelado se o eleitor deixar de votar em três eleições consecutivas sem justificar nem pagar, e cada turno conta como uma eleição.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O centro da alegação, o impedimento de votar no segundo turno, é contrariado por três fontes abertas, todas apoiadas na Justiça Eleitoral. Há um ponto verdadeiro misturado: a falta gera obrigações, e quem a ignora acumula pendências. Isso não equivale a perder o direito de votar em 25 de outubro. As páginas do TSE e dos tribunais regionais consultadas bloquearam o acesso automático, e por isso as regras aqui vêm de veículos que as citam. Para o quadro da disputa, veja o <a href="/eleicoes">painel de Eleições 2026</a> e a <a href="/noticias/tre-rj-pede-tropas-federais-segundo-turno">cobertura do segundo turno</a>.</p>
  `,
};
