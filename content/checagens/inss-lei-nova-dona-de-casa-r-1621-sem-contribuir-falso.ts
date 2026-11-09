import type { FactCheck } from "@/lib/types";

export const checagem: FactCheck = {
  slug: "inss-lei-nova-dona-de-casa-r-1621-sem-contribuir-falso",
  title: "Não há nova lei que pague R$ 1.621 a donas de casa que nunca contribuíram ao INSS",
  summary:
    "Posts dizem que lei garante R$ 1.621 por mês a donas de casa sem contribuição. Segundo Aos Fatos, MDS e INSS, não há lei nova: o BPC e a contribuição reduzida já existiam.",
  author: "Equipe Política Diária",
  verdict: "falso",
  quick:
    "Falso. O Aos Fatos não achou lei recente com esse pagamento. R$ 1.621 é o salário mínimo de 2026 e o BPC, que já existia, exige 65 anos ou deficiência e renda familiar baixa, não a condição de dona de casa.",
  claim: {
    text: "Publicações em redes sociais afirmam que “agora é lei” e que donas de casa de baixa renda que nunca contribuíram ao INSS passam a receber R$ 1.621 por mês, bastando comprovar renda e ter CadÚnico, mesmo que o marido ou companheiro já seja aposentado.",
    origin:
      "Posts com fotos do presidente Lula, em Facebook, Instagram e TikTok. Segundo o Aos Fatos, somavam cerca de 5 milhões de visualizações no Facebook, 495 mil no Instagram e 465 mil no TikTok.",
    firstSeen: "2026-11-09",
    attribution: "Publicações em redes sociais",
  },
  date: "2026-11-09",
  checkedAt: "2026-11-09T20:00:00-03:00",
  updated: "2026-11-09",
  topic: "Economia e benefícios",
  points: [
    {
      status: "falso",
      text: "Não há registro de lei recente que crie esse pagamento. O Aos Fatos analisou a legislação e as regras do INSS sobre aposentadoria de donas de casa e do BPC e não encontrou a norma citada nos posts.",
    },
    {
      status: "verdade",
      text: "O valor existe, mas é outra coisa. Segundo o Aos Fatos, R$ 1.621 é o salário mínimo de 2026, que é o valor pago pelo BPC (Benefício de Prestação Continuada), e não uma nova categoria de aposentadoria.",
    },
    {
      status: "atencao",
      text: "O BPC não exige contribuição ao INSS, mas tem regras. Segundo o Ministério do Desenvolvimento e Assistência Social, vale para pessoas com 65 anos ou mais ou com deficiência, com renda familiar per capita de até um quarto do salário mínimo e Cadastro Único atualizado. Ser dona de casa, por si só, não dá direito.",
    },
    {
      status: "verdade",
      text: "Donas de casa podem, sim, contribuir com alíquota reduzida. Segundo o INSS, a categoria de baixa renda paga 5% do salário mínimo (R$ 81,05 por mês), com renda familiar de até dois salários mínimos e CadÚnico atualizado; nesse caso elas pagam, não recebem sem contribuir.",
    },
    {
      status: "falso",
      text: "As fotos de Lula nos posts não têm relação com o tema. Segundo o Aos Fatos, são de abril de 2023, quando ele assinou projeto sobre o piso nacional da enfermagem.",
    },
  ],
  sources: [
    {
      label: "Benefício de Prestação Continuada (BPC) à pessoa idosa e à pessoa com deficiência",
      publisher: "Ministério do Desenvolvimento e Assistência Social (gov.br)",
      url: "https://www.gov.br/mds/pt-br/acoes-e-programas/suas/beneficios-assistenciais/beneficio-assistencial-ao-idoso-e-a-pessoa-com-deficiencia-bpc",
      kind: "primaria",
      note: "Informa que o BPC paga um salário mínimo a quem tem 65 anos ou mais ou deficiência, com renda familiar per capita de até um quarto do salário mínimo e CadÚnico atualizado, e que não é preciso ter contribuído ao INSS. A página afirma que o BPC não é aposentadoria. Página consultada em 09/11/2026.",
    },
    {
      label: "Dona de casa pode contribuir para o INSS e ter direito a benefícios",
      publisher: "INSS (gov.br)",
      url: "https://www.gov.br/inss/pt-br/assuntos/noticias/dona-de-casa-pode-contribuir-para-o-inss-e-ter-direito-a-beneficios",
      kind: "primaria",
      note: "Descreve a contribuição reduzida de 5% do salário mínimo (R$ 81,05), com renda familiar de até dois salários mínimos, dedicação exclusiva ao trabalho doméstico e CadÚnico atualizado em até dois anos. Publicada em 29/10/2026.",
      published: "2026-10-29",
    },
    {
      label: "Não há nova lei que garanta benefício do INSS a donas de casa que não contribuíram",
      publisher: "Aos Fatos",
      url: "https://www.aosfatos.org/noticias/beneficio-inss-donas-casa-nao-contribuiram/",
      kind: "agencia",
      note: "Classifica como falso: não achou lei recente, explica o BPC e a contribuição reduzida, informa o alcance dos posts e que as fotos de Lula são de abril de 2023. Publicada em 09/11/2026.",
      published: "2026-11-09",
    },
  ],
  timeline: [
    { date: "2026-10-29", text: "O INSS publica o texto que explica a contribuição reduzida de 5% do salário mínimo para donas de casa de baixa renda." },
    { date: "2026-11-09", text: "O Aos Fatos publica a checagem dos posts e informa o alcance deles nas redes." },
  ],
  content: `
    <h2>O que as fontes dizem</h2>
    <p>Posts em redes sociais dizem que uma nova lei garante R$ 1.621 por mês a donas de casa de baixa renda que nunca contribuíram ao INSS, bastando comprovar renda e ter CadÚnico. Segundo o <a href="https://www.aosfatos.org/noticias/beneficio-inss-donas-casa-nao-contribuiram/" target="_blank" rel="noopener noreferrer nofollow">Aos Fatos</a>, não há registro de lei recente com esse pagamento. O valor citado é o salário mínimo de 2026, também pago pelo BPC.</p>
    <p>O que existe hoje está em páginas oficiais. De acordo com o <a href="https://www.gov.br/mds/pt-br/acoes-e-programas/suas/beneficios-assistenciais/beneficio-assistencial-ao-idoso-e-a-pessoa-com-deficiencia-bpc" target="_blank" rel="noopener noreferrer nofollow">Ministério do Desenvolvimento e Assistência Social</a>, o BPC paga um salário mínimo a quem tem 65 anos ou mais ou deficiência, com renda familiar per capita de até um quarto do salário mínimo e Cadastro Único atualizado. A página diz que o BPC não é aposentadoria e que não é preciso ter contribuído ao INSS.</p>

    <h2>A contribuição reduzida para donas de casa</h2>
    <p>Segundo o <a href="https://www.gov.br/inss/pt-br/assuntos/noticias/dona-de-casa-pode-contribuir-para-o-inss-e-ter-direito-a-beneficios" target="_blank" rel="noopener noreferrer nofollow">INSS</a>, a dona de casa de baixa renda pode contribuir como segurada facultativa com alíquota de 5% do salário mínimo, ou R$ 81,05 por mês. As condições listadas são renda familiar de até dois salários mínimos, nenhuma renda própria, trabalho exclusivamente doméstico e CadÚnico atualizado em até dois anos. Em troca, a categoria dá acesso a benefícios como aposentadoria por idade, auxílio por incapacidade temporária e salário-maternidade, cada um com suas regras.</p>
    <p>O Aos Fatos informa também que as fotos de Lula usadas nos posts são de abril de 2023, de um evento sobre o piso da enfermagem, sem relação com aposentadoria ou assistência a donas de casa, o que foi confirmado por busca reversa de imagem.</p>

    <h2>Por que o veredito é Falso</h2>
    <p>A alegação central, a de que uma lei nova passou a pagar R$ 1.621 a donas de casa que nunca contribuíram, não encontra respaldo na legislação nem nas páginas oficiais consultadas. Há duas regras que se misturam no boato: o BPC, que não exige contribuição, mas exige 65 anos ou deficiência e renda familiar muito baixa, e a contribuição reduzida, que exige pagamento mensal. Nenhuma delas é uma lei recente nem paga o valor automaticamente a qualquer dona de casa.</p>
    <p>Quem tem dúvida sobre direito a benefício deve consultar os canais oficiais do INSS. Veja outras <a href="/checagem">checagens</a> sobre benefícios, como a do <a href="/checagem/video-servidores-inss-criticando-lula-e-de-2024-nao-de-2026">vídeo de servidores do INSS</a>.</p>
  `,
};
