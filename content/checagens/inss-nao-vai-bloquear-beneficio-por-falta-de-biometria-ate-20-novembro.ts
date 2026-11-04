import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "inss-nao-vai-bloquear-beneficio-por-falta-de-biometria-ate-20-novembro",
  title: "É falso que o INSS vai bloquear benefícios de quem não tiver biometria até 20 de novembro",
  summary:
    "Mensagens falam em prazo de 20/11 para aposentados e pensionistas fazerem biometria. O INSS diz que a regra vale só para novos pedidos e que não há bloqueio.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. O INSS informou em 27/10/2026 que a exigência vale apenas para pedidos feitos desde 21/11/2025, que não há prazo geral em 20 de novembro e que ninguém precisa ir a agência para isso.",
  claim: {
    text: "Mensagens dizem que aposentados e pensionistas precisam ter documento com biometria até 20 de novembro de 2026 ou terão o benefício bloqueado, e que devem procurar o INSS ou clicar em links para se regularizar.",
    origin:
      "Publicações em redes sociais e aplicativos de mensagem, segundo o INSS e a Agência Brasil, que também alertam para golpes que usam o assunto.",
    firstSeen: "2026-10-27",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-04",
  checkedAt: "2026-11-04T13:55:00-03:00",
  updated: "2026-11-04",
  topic: "Economia",
  points: [
    {
      status: "falso",
      text: "Não há bloqueio por falta de biometria em 20 de novembro: o INSS classifica como falsa a informação e diz que a exigência se aplica só a requerimentos feitos desde 21 de novembro de 2025.",
    },
    {
      status: "verdade",
      text: "A biometria é exigida em novos pedidos de benefício, com isenções listadas pelo INSS, como maiores de 80 anos, migrantes e refugiados nas condições previstas, moradores no exterior e quem não consegue se deslocar por mais de 30 dias por motivo de saúde, com comprovação.",
    },
    {
      status: "verdade",
      text: "Para quem já recebe, a Agência Brasil informou em 26/01/2026 que a implementação será gradual, sem bloqueio automático, e que o INSS avisará individualmente e com antecedência se for preciso atualizar a biometria.",
    },
    {
      status: "atencao",
      text: "Há risco de golpe: o INSS diz que não envia pessoas às casas para prova de vida e não pede senhas, dados bancários nem transferências. Em dúvida, consulte o Meu INSS ou ligue para o 135.",
    },
  ],
  sources: [
    {
      label: "INSS esclarece: é falsa a informação de que vai bloquear benefício de quem não tiver documento com biometria",
      publisher: "Instituto Nacional do Seguro Social (gov.br)",
      url: "https://www.gov.br/inss/pt-br/assuntos/noticias/inss-esclarece-e-falsa-a-informacao-de-que-vai-bloquear-beneficio-de-quem-nao-tiver-documento-com-biometria",
      kind: "primaria",
      note: "Nota oficial: a exigência vale para pedidos feitos desde 21/11/2025, o cadastro não é feito nas agências e o órgão não pede dados por links. Publicada em 27/10/2026 e atualizada em 28/10.",
      published: "2026-10-27",
    },
    {
      label: "INSS alerta para golpes que usam informação falsa sobre biometria",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/geral/noticia/2026-10/inss-alerta-para-golpes-que-usam-informacao-falsa-sobre-biometria",
      kind: "imprensa",
      note: "Relata a nota do INSS, o alerta contra golpes e a orientação de consultar o Meu INSS ou o 135. Publicada em 28/10/2026.",
      published: "2026-10-28",
    },
    {
      label: "INSS esclarece se aposentadorias podem ser bloqueadas por falta de biometria",
      publisher: "Jornal DCI",
      url: "https://www.dci.com.br/economia/inss/inss-esclarece-se-aposentadorias-podem-ser-bloqueadas-por-falta-de-biometria/",
      kind: "imprensa",
      note: "Informa que o INSS nega bloqueio automático generalizado e lista as isenções. Publicada em 28/10/2026.",
      published: "2026-10-28",
    },
    {
      label: "INSS não deixará de pagar aposentadoria a quem não tem nova identidade",
      publisher: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/economia/noticia/2026-01/inss-nao-deixara-de-pagar-aposentadoria-quem-nao-tem-nova-identidade",
      kind: "imprensa",
      note: "Explica a base legal (Decreto 12.561/2025, que regulamenta a Lei 15.077), o cronograma e que, para quem já recebe, a implementação é gradual e sem bloqueio automático. Publicada em 26/01/2026. As isenções por tipo de benefício aparecem de forma um pouco diferente na nota de outubro; seguimos a nota mais recente do INSS.",
      published: "2026-01-26",
    },
  ],
  timeline: [
    { date: "2025-07-23", text: "Data do Decreto 12.561/2025, que regulamenta a Lei 15.077, segundo a Agência Brasil." },
    { date: "2025-11-21", text: "A biometria passa a ser exigida em novos pedidos de benefício, segundo o INSS." },
    { date: "2026-01-26", text: "A Agência Brasil informa que não haverá bloqueio automático para quem já recebe benefício." },
    { date: "2026-10-27", text: "O INSS publica nota classificando como falsa a informação sobre bloqueio em 20 de novembro." },
    { date: "2026-10-28", text: "Agência Brasil e DCI publicam reportagens sobre a nota e o alerta contra golpes." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Mensagens afirmam que quem recebe aposentadoria ou pensão do INSS precisa ter um documento com biometria até 20 de novembro de 2026, sob pena de bloqueio do benefício. Em <a href="https://www.gov.br/inss/pt-br/assuntos/noticias/inss-esclarece-e-falsa-a-informacao-de-que-vai-bloquear-beneficio-de-quem-nao-tiver-documento-com-biometria" target="_blank" rel="noopener noreferrer nofollow">nota publicada em 27 de outubro</a>, o próprio INSS classifica a informação como falsa e diz que a exigência vale só para pedidos feitos desde 21 de novembro de 2025.</p>
    <p>Segundo o órgão, o cadastro biométrico não é feito nas agências: ele ocorre quando o cidadão tira um documento público, como a Carteira de Identidade Nacional, a CNH ou o título de eleitor. A <a href="https://agenciabrasil.ebc.com.br/geral/noticia/2026-10/inss-alerta-para-golpes-que-usam-informacao-falsa-sobre-biometria" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a> e o <a href="https://www.dci.com.br/economia/inss/inss-esclarece-se-aposentadorias-podem-ser-bloqueadas-por-falta-de-biometria/" target="_blank" rel="noopener noreferrer nofollow">Jornal DCI</a> reproduziram a nota em 28 de outubro.</p>

    <h2>O que muda e o que não muda</h2>
    <p>A regra tem base no Decreto 12.561/2025, que regulamenta a Lei 15.077, segundo a <a href="https://agenciabrasil.ebc.com.br/economia/noticia/2026-01/inss-nao-deixara-de-pagar-aposentadoria-quem-nao-tem-nova-identidade" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a>. Para quem já recebe benefício, o governo informou em janeiro que a implementação será gradual, sem bloqueio automático, e que o INSS avisará individualmente e com antecedência se for preciso atualizar a biometria. A mesma reportagem diz que a Carteira de Identidade Nacional será o único documento aceito para esse fim a partir de 1º de janeiro de 2028.</p>
    <p>A nota de outubro lista isenções, como pessoas com mais de 80 anos, migrantes e refugiados nas condições previstas, moradores no exterior e quem não consegue se deslocar por mais de 30 dias por motivo de saúde. O INSS também separa a prova de vida, que é feita por cruzamento automático de dados, do cadastro biométrico.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>Nenhuma fonte oficial menciona prazo geral de 20 de novembro nem bloqueio de quem já recebe. A confusão provavelmente mistura a data de 21 de novembro de 2025, quando a exigência começou para novos pedidos, com um prazo que não existe, mas essa é uma hipótese nossa, não uma conclusão das fontes. O INSS alerta que golpistas usam o tema: o órgão não envia pessoas às casas e não pede senhas, dados bancários nem transferências. Em dúvida, use o Meu INSS ou o telefone 135. Veja outras <a href="/checagem">checagens do site</a>.</p>
  `,
};
