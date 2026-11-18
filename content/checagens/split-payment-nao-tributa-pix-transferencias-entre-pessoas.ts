import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "split-payment-nao-tributa-pix-transferencias-entre-pessoas",
  title: "É falso que o split payment vai taxar todo Pix a partir de 2027",
  summary:
    "Post diz que, com o split payment, de cada Pix de R$ 100 só R$ 80 chegarão ao destino. O mecanismo só separa tributos de compras e não cria imposto.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. O split payment da reforma tributária não é um imposto sobre o Pix. Ele separa, no momento do pagamento, a CBS e o IBS devidos em compras de bens e serviços. Uma transferência entre pessoas sem essa natureza não entra no mecanismo, e em 2027 o uso será facultativo e restrito a operações entre empresas do regime regular.",
  claim: {
    text: "Imagem com texto diz que, “a partir de 2027 com o Split Payment do Lula”, um Pix de R$ 100 chegará ao destinatário com R$ 80, e R$ 20 irão para o governo.",
    origin:
      "Publicação no TikTok, em forma de imagem com texto, enviada por leitores à Agência Lupa pelo WhatsApp. A Lupa publicou a checagem em 13/11/2026.",
    attribution: "Publicação em redes sociais, segundo a Agência Lupa",
  },
  date: "2026-11-13",
  checkedAt: "2026-11-13T08:02:00-03:00",
  updated: "2026-11-13",
  topic: "Economia e impostos",
  points: [
    {
      status: "verdade",
      text: "O split payment existe e começa em 2027. Ele foi criado pela reforma tributária do consumo e regulamentado para a CBS pelo Decreto nº 12.955, de 29 de abril de 2026, segundo o texto publicado pelo Senado.",
    },
    {
      status: "verdade",
      text: "O Pix está entre os meios de pagamento previstos no mecanismo. O art. 28, § 5º, do decreto lista o Pix por QR Code dinâmico e estático, o Pix automático e o Pix por chave, ao lado de boleto, TED, TEF e cartões.",
    },
    {
      status: "falso",
      text: "O mecanismo não incide sobre qualquer Pix. O art. 28 trata das “transações de pagamento relativas a operações com bens ou com serviços”: a parte separada é a CBS e o IBS já devidos na compra, e não uma taxa sobre a transferência.",
    },
    {
      status: "falso",
      text: "Não há regra que retenha 20% de cada Pix. Segundo a Lupa, uma transferência de R$ 100 a um amigo não sofre retenção, e na primeira etapa o decreto permite limitar o split às operações em que o comprador é contribuinte do regime regular, com uso facultativo.",
    },
    {
      status: "atencao",
      text: "O split payment muda a forma de recolher o tributo em compras, não o valor dele. Segundo a Agência Brasil, o uso será facultativo em 2027 e obrigatório para o varejo a partir de 2033.",
    },
  ],
  sources: [
    {
      label: "É falso que split payment irá tributar o Pix",
      publisher: "Agência Lupa",
      url: "https://www.agencialupa.org/jornalismo/2026/11/13/e-falso-que-split-payment-ira-tributar-o-pix/",
      kind: "agencia",
      note: "Classifica a alegação como falsa, descreve o post do TikTok e explica que o split se aplica a pagamentos de operações com bens e serviços, não a qualquer transferência por Pix. Publicada em 13/11/2026, à 0h04.",
      published: "2026-11-13",
    },
    {
      label: "Decreto nº 12.955, de 29 de abril de 2026 (regulamenta a CBS)",
      publisher: "Senado Federal",
      url: "https://legis.senado.gov.br/norma/43106091/publicacao/43105497",
      kind: "primaria",
      note: "Texto do decreto. O art. 28 aplica o split às transações de pagamento relativas a operações com bens ou serviços e lista no § 5º os arranjos, entre eles quatro modalidades de Pix. O art. 33, § 1º, permite que a primeira etapa seja facultativa e restrita a operações com adquirente do regime regular.",
      published: "2026-04-29",
    },
    {
      label: "Comunicado: início da etapa de testes da Plataforma Pública do Split Payment",
      publisher: "Receita Federal",
      url: "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/setembro/comunicado-5",
      kind: "primaria",
      note: "Anuncia a fase de testes de integração entre prestadores de serviços de pagamento e a plataforma pública a partir de 15/10/2026, sem impacto em operações reais nem em consumidores. Publicado em 30/9/2026, às 15h13.",
      published: "2026-09-30",
    },
    {
      label: "Impostos: split payment será adotado de forma facultativa em 2027",
      publisher: "Agência Brasil (Radioagência Nacional)",
      url: "https://agenciabrasil.ebc.com.br/radioagencia-nacional/economia/audio/2026-11/impostos-split-payment-sera-adotado-de-forma-facultativa-em-2027",
      kind: "imprensa",
      note: "Informa que o split será facultativo em 2027 e obrigatório para o setor varejista a partir de 2033, e registra a avaliação de um professor de contabilidade de que o mecanismo não muda o valor do imposto. Publicada em 5/11/2026.",
      published: "2026-11-05",
    },
  ],
  timeline: [
    { date: "2026-04-29", text: "Assinado o Decreto nº 12.955, que regulamenta a CBS e detalha o split payment." },
    { date: "2026-10-15", text: "Começa a fase de testes da plataforma pública do split payment, segundo a Receita Federal." },
    { date: "2026-11-13", text: "A Agência Lupa publica a checagem do post que dizia que o split vai tributar todo Pix." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Circulou no TikTok uma imagem com o texto de que, “a partir de 2027 com o Split Payment do Lula”, um Pix de R$ 100 chegaria ao destinatário com apenas R$ 80, e R$ 20 iriam para o governo. Segundo a <a href="https://www.agencialupa.org/jornalismo/2026/11/13/e-falso-que-split-payment-ira-tributar-o-pix/" target="_blank" rel="noopener noreferrer nofollow">Agência Lupa</a>, que recebeu o conteúdo de leitores pelo WhatsApp e o classificou como falso, o mecanismo não cria cobrança sobre transferências por Pix.</p>
    <p>O split payment é a forma de recolher os novos tributos sobre o consumo criados pela reforma tributária: a Contribuição sobre Bens e Serviços (CBS), federal, e o Imposto sobre Bens e Serviços (IBS), de estados e municípios. No <a href="https://legis.senado.gov.br/norma/43106091/publicacao/43105497" target="_blank" rel="noopener noreferrer nofollow">Decreto nº 12.955, de 29 de abril de 2026</a>, que regulamenta a CBS, o art. 28 manda os prestadores de serviços de pagamento separar e recolher o tributo “nas transações de pagamento relativas a operações com bens ou com serviços”. Ou seja, numa compra, a parte do valor que corresponde ao tributo vai direto ao fisco, e o restante segue para o vendedor.</p>
    <p>O Pix aparece no decreto, e é daí que vem a confusão. O § 5º do mesmo artigo lista os meios de pagamento em que o split pode ser usado: boleto, Pix por QR Code dinâmico e estático, Pix automático, Pix por chave ou dados da conta, TED, TEF e cartões. A lista diz por onde o tributo de uma compra pode ser separado, e não que toda transferência por esses meios será tributada. Segundo a Lupa, um envio de R$ 100 a um amigo não sofre retenção.</p>

    <h2>O que muda em 2027</h2>
    <p>O decreto prevê uma implementação em etapas. Pelo art. 33, § 1º, na primeira etapa o split pode ser de uso facultativo e ficar restrito às operações em que o comprador é contribuinte do regime regular, isto é, a vendas entre empresas. A <a href="https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/setembro/comunicado-5" target="_blank" rel="noopener noreferrer nofollow">Receita Federal</a> abriu em 15 de outubro de 2026 a fase de testes da plataforma pública com os prestadores de serviços de pagamento e informou que ela não afeta operações reais nem consumidores.</p>
    <p>Segundo a <a href="https://agenciabrasil.ebc.com.br/radioagencia-nacional/economia/audio/2026-11/impostos-split-payment-sera-adotado-de-forma-facultativa-em-2027" target="_blank" rel="noopener noreferrer nofollow">Agência Brasil</a>, o uso será facultativo em 2027 e obrigatório para o setor varejista a partir de 2033; na mesma reportagem, um professor de contabilidade afirma que o mecanismo não muda o valor do imposto a pagar. O calendário das operações entre empresas foi tema da notícia de que a <a href="/noticias/split-payment-98-por-cento-b2b-outubro-2027-fin">Fin prevê o split em 98% das operações entre empresas em 2027</a>, e a transição da CBS, da cobertura sobre a <a href="/noticias/cbs-transicao-estimativa-creditos-plp-receita">estimativa de créditos proposta pela Receita</a>.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>O fato central do post, o de que o split payment vai tirar 20% de cada Pix a partir de 2027, é contrariado pelo texto do decreto: o mecanismo trata de tributos já devidos em compras de bens e serviços, não de uma taxa sobre a transferência, e começa facultativo e restrito a empresas. Não há na norma retenção percentual sobre transferências entre pessoas.</p>
    <p>A reforma e o seu calendário seguem em debate no governo e no Congresso, como mostra a notícia de que <a href="/noticias/durigan-descarta-adiar-reforma-tributaria-2028-receita-sem-multas">Durigan descartou adiar a reforma tributária</a>. Se as regras do split mudarem, esta checagem será atualizada. Outro boato sobre Pix já checado é o do <a href="/checagem/pix-mei-r-363-no-lugar-de-r-5-mil-conta-hipotetica">MEI que receberia R$ 363 no lugar de R$ 5 mil</a>. Veja as demais <a href="/checagem">checagens</a>.</p>
  `,
};
