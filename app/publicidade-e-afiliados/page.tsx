import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage, institutionalMetadata } from "@/components/InstitutionalPage";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";

const PATH = "/publicidade-e-afiliados";
const TITLE = "Publicidade e afiliados";
const DESCRIPTION =
  "Como a Política Diária se sustenta: anúncios do Google AdSense e links de afiliado da Amazon nas resenhas de livros, sempre sinalizados e sem mudar nota nem opinião.";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export const metadata: Metadata = institutionalMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function PublicidadeEAfiliadosPage() {
  return (
    <InstitutionalPage
      label="Institucional"
      title={TITLE}
      lead="O acesso à Política Diária é gratuito. Esta página explica de onde vem o dinheiro que mantém o site no ar, como cada anúncio ou link comercial é identificado e por que nada disso muda o que é escrito."
      path={PATH}
    >
      <h2 id="como-o-site-se-sustenta">1. Como o site se sustenta</h2>
      <p>
        O {site.name} não cobra assinatura, não vende curso nem consultoria e não tem área paga. A receita vem de
        duas fontes:
      </p>
      <ul>
        <li>
          <strong>Google AdSense</strong> (a ser ativado): anúncios servidos pelo Google nas páginas do
          site. O Google escolhe o anúncio, não a redação. O site recebe uma fração pequena do que o
          anunciante paga.
        </li>
        <li>
          <strong>Programa de Associados da Amazon</strong>: nas <Link href="/artigos">resenhas de livros</Link>, o link para comprar o livro
          na Amazon é um link de afiliado (tag politicadiaria-20) e pode gerar comissão para o site,
          sem custo adicional para você. Como Associado da Amazon, a {site.name} ganha com compras
          qualificadas.
        </li>
      </ul>
      <p>Não há conteúdo patrocinado, publieditorial nem &quot;matéria paga&quot;, e não haverá. Partido, governo, candidato e parlamentar também não pagam por espaço, nota ou destaque. Como compromisso editorial, não colocamos anúncio acima do título da página.</p>

      <h2 id="como-os-anuncios-sao-identificados">2. Como os anúncios são identificados</h2>
      <p>
        Todo bloco de anúncio é rotulado como &quot;Publicidade&quot; e fica visualmente separado do
        texto. Anúncios nunca aparecem acima do título da página, nunca se disfarçam de link do
        conteúdo e não são exibidos em páginas sem conteúdo editorial, como a de contato, a de erro
        404, a busca e estas páginas institucionais. Quando não há anúncio configurado, não há
        caixa vazia: o espaço simplesmente não existe.
      </p>
      <p>
        A redação não vê nem aprova cada anúncio individualmente: eles são escolhidos pelo Google. Se
        um anúncio parecer enganoso, ofensivo ou inadequado, avise pelo e-mail{" "}
        <a href={`mailto:${author.email}`}>{author.email}</a> com uma captura de tela, para que ele
        seja bloqueado nas configurações do AdSense.
      </p>

      <h2 id="afiliados-nao-mudam-a-nota">3. Afiliado não muda nota nem opinião</h2>
      <p>
        A ordem é sempre esta: primeiro a análise, com nota e opinião fechadas pelos critérios da{" "}
        <Link href="/politica-editorial">política editorial</Link>; só depois se verifica se o
        livro tem link de afiliado. Um livro com comissão não ganha nota melhor, não aparece mais
        vezes e não deixa de ter os pontos fracos listados. Um livro sem comissão não deixa de ser
        recomendado por isso. A nota julga a qualidade da obra, não a ideologia do autor, e vale a
        mesma régua para todos os campos políticos. Se o livro mais indicado para um caso for outro,
        sem link de afiliado, o texto diz que é esse outro.
      </p>

      <h2 id="sinalizacao">4. Como um link de afiliado é sinalizado</h2>
      <ul>
        <li>
          Toda resenha com link de afiliado traz um aviso visível no topo, antes do texto, dizendo
          que a página contém esse tipo de link e que ele pode gerar comissão.
        </li>
        <li>
          Os links levam o atributo <code>rel=&quot;sponsored&quot;</code>, que informa aos
          mecanismos de busca que se trata de um link comercial, além de{" "}
          <code>noopener</code> por segurança.
        </li>
        <li>
          O preço informado, quando houver, é o preço público do livro no momento da escrita da
          resenha, sem inflar para justificar a comissão. O preço pode mudar a qualquer momento na
          Amazon; o valor exato sempre aparece atualizado na própria página do produto.
        </li>
        <li>
          Um link de afiliado só aparece nas resenhas de livros. Nunca em notícia, nem nas páginas de parlamentares do Congresso por dentro.
        </li>
        <li>
          As capas de livros usadas nas resenhas vêm de fontes que permitem o uso, com crédito
          quando exigido, nunca capturadas à força da página de venda da Amazon.
        </li>
      </ul>

      <h2 id="cookies">5. Cookies de anúncio e como recusar</h2>
      <p>
        Os anúncios do Google podem usar cookies para medir exibições e, com o seu consentimento,
        para personalizar o que é mostrado. Na primeira visita com anúncios ativos aparece um aviso
        com as opções de aceitar ou recusar. Quem recusa continua vendo anúncios, mas não
        personalizados. A escolha pode ser mudada a qualquer momento pelo link &quot;Preferências
        de cookies&quot; no rodapé. Os detalhes, incluindo os links do Google para gerenciar a
        personalização, estão na <Link href="/politica-de-privacidade">política de privacidade</Link>.
      </p>

      <h2 id="conformidade">6. Regras que o site segue</h2>
      <ul>
        <li>
          <ExternalLink href="https://support.google.com/adsense/answer/48182">
            Políticas do programa Google AdSense
          </ExternalLink>
          , incluindo as regras de posicionamento e de rotulagem de anúncios.
        </li>
        <li>
          <ExternalLink href="https://developers.google.com/search/docs/essentials/spam-policies">
            Políticas de spam da Busca do Google
          </ExternalLink>
          , em especial sobre links pagos e conteúdo em escala.
        </li>
        <li>
          Código Brasileiro de Autorregulamentação Publicitária do{" "}
          <ExternalLink href="https://conar.org.br/">CONAR</ExternalLink>: publicidade identificável
          como tal e separada do conteúdo editorial.
        </li>
        <li>
          Código de Defesa do Consumidor, que exige que a publicidade seja veiculada de forma que o
          consumidor a identifique fácil e imediatamente (art. 36).
        </li>
        <li>
          Lei Geral de Proteção de Dados, para o consentimento de cookies de publicidade.
        </li>
      </ul>

      <h2 id="o-que-nao-e-aceito">7. O que não é aceito</h2>
      <ul>
        <li>Pagamento por nota, por posição em ranking, por menção em texto ou por cobertura favorável a partido ou político.</li>
        <li>Texto enviado por empresa para publicar como se fosse do site.</li>
        <li>Links inseridos em artigos antigos mediante pagamento (&quot;link building&quot;).</li>
        <li>Anúncios que imitem o layout do site ou o rótulo de conteúdo editorial.</li>
      </ul>

      <h2 id="propostas">8. Propostas comerciais</h2>
      <p>
        Propostas de parceria podem ser enviadas pela página de{" "}
        <Link href="/contato">contato</Link>, com o assunto &quot;Parceria&quot;. Só são
        consideradas as que cabem nas regras acima.
      </p>

      <p>
        Versão desta página: 7 de outubro de 2026. Veja também os{" "}
        <Link href="/termos-de-uso">termos de uso</Link>.
      </p>
    </InstitutionalPage>
  );
}
