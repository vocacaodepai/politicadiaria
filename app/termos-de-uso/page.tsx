import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage, institutionalMetadata } from "@/components/InstitutionalPage";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";

const PATH = "/termos-de-uso";
const TITLE = "Termos de Uso";
const DESCRIPTION =
  "Regras de uso da Política Diária: conteúdo informativo, sem aconselhamento jurídico ou eleitoral, direitos autorais, links externos, publicidade e afiliados, limitação de responsabilidade e foro no Brasil.";

export const metadata: Metadata = institutionalMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function TermosDeUsoPage() {
  return (
    <InstitutionalPage
      label="Institucional"
      title={TITLE}
      lead="Ao navegar na Política Diária você concorda com estas regras. Elas são curtas de propósito: dizem o que você pode fazer com o conteúdo, o que o site promete e o que ele não promete."
      path={PATH}
    >
      <h2 id="aceitacao">1. Aceitação</h2>
      <p>
        Estes termos regulam o uso do site {site.name}, disponível em {site.url} e editado pela{" "}
        <Link href={author.url}>{author.name}</Link>. Ao acessar qualquer página, você aceita estes
        termos e a <Link href="/politica-de-privacidade">política de privacidade</Link>. Se não
        concordar com alguma regra, a saída é simplesmente não usar o site.
      </p>

      <h2 id="conteudo-informativo">2. Conteúdo informativo, não consultoria</h2>
      <p>
        Tudo o que é publicado aqui (notícias, dados do Congresso por dentro, resenhas de livros e
        demais páginas) tem finalidade informativa e educacional. O conteúdo não constitui
        aconselhamento jurídico, eleitoral, financeiro ou profissional de qualquer natureza, nem
        orientação de voto. Para decisões que dependam de interpretação da lei, consulte um
        profissional habilitado e as fontes oficiais.
      </p>
      <p>
        <strong>Dados do Congresso:</strong> as informações sobre deputados e senadores vêm dos dados
        abertos da Câmara dos Deputados e do Senado Federal e podem conter atrasos ou erros da própria
        fonte. Uma ausência em votação nominal, por exemplo, não indica por si só falta de trabalho
        ou irregularidade. Em caso de dúvida, consulte o portal oficial. A metodologia está na{" "}
        <Link href="/politica-editorial">política editorial</Link>.
      </p>
      <p>
        Valores, números e prazos são os observados na data de publicação ou de atualização e podem
        mudar sem aviso. Preços de livros na Amazon variam, e o valor exato aparece na página da
        loja. Confirme sempre na fonte oficial antes de tomar uma decisão.
      </p>

      <h2 id="propriedade-intelectual">3. Propriedade intelectual</h2>
      <p>
        Os textos, a marca {site.name}, o logotipo, a identidade visual e o código do site são
        protegidos pela legislação brasileira de direitos autorais (Lei 9.610/1998) e de propriedade
        industrial. As fotos de parlamentares pertencem à Câmara dos Deputados, ao Senado Federal ou aos autores
        indicados no Wikimedia Commons, e são usadas conforme as licenças de cada origem, com crédito
        em cada imagem. Os dados abertos são usados conforme os termos dos portais oficiais.
      </p>
      <p>Você pode, sem pedir autorização:</p>
      <ul>
        <li>ler, salvar e imprimir páginas para uso pessoal;</li>
        <li>compartilhar links para qualquer página, em qualquer canal;</li>
        <li>citar trechos curtos, com indicação clara da fonte e link para a página original.</li>
      </ul>
      <p>Você não pode, sem autorização prévia por escrito:</p>
      <ul>
        <li>reproduzir artigos inteiros ou partes substanciais em outro site, app, newsletter ou material impresso;</li>
        <li>usar o conteúdo para alimentar produtos automatizados ou fazer republicação em massa;</li>
        <li>usar a marca ou o logotipo de forma que sugira vínculo ou endosso.</li>
      </ul>
      <p>
        Pedidos de licenciamento e de uso em outros veículos podem ser enviados pela página de{" "}
        <Link href="/contato">contato</Link>.
      </p>

      <h2 id="links-externos">4. Links para sites de terceiros</h2>
      <p>
        O site linka para fontes de notícias, páginas de órgãos oficiais, instituições de pesquisa e outros sites de
        terceiros. Esses links existem para dar contexto e permitir que você confira a fonte. O{" "}
        {site.name} não controla esses sites, não responde pelo conteúdo deles nem pelas suas
        políticas de privacidade, e um link não significa recomendação, exceto quando o texto disser
        isso expressamente.
      </p>

      <h2 id="publicidade-e-afiliados">5. Publicidade e links de afiliado</h2>
      <p>
        O site pode exibir anúncios de terceiros, em especial do Google AdSense, identificados como
        publicidade. Também pode conter links de afiliado da Amazon nas resenhas de livros: se você
        comprar por um deles, o site pode receber uma comissão, sem custo adicional para você. Esses
        links são sinalizados na página e não influenciam nota nem opinião. As regras completas estão em{" "}
        <Link href="/publicidade-e-afiliados">publicidade e afiliados</Link>. Os anunciantes são
        responsáveis pelos próprios produtos, ofertas e páginas de destino.
      </p>

      <h2 id="uso-aceitavel">6. Uso aceitável</h2>
      <p>Ao usar o site, você se compromete a não:</p>
      <ul>
        <li>tentar acessar áreas, dados ou sistemas que não estejam abertos ao público;</li>
        <li>sobrecarregar o site com raspagem automatizada agressiva ou requisições abusivas;</li>
        <li>clicar em anúncios de forma artificial ou incentivar terceiros a fazê-lo;</li>
        <li>usar o conteúdo para fins ilegais ou para enganar outras pessoas.</li>
      </ul>

      <h2 id="limitacao-de-responsabilidade">7. Limitação de responsabilidade</h2>
      <p>
        O conteúdo é oferecido &quot;como está&quot;, com o cuidado descrito na{" "}
        <Link href="/politica-editorial">política editorial</Link>, mas sem garantia de que esteja
        completo, atualizado ou livre de erros. Na medida permitida pela lei, o {site.name} e a sua
        redação não respondem por perdas ou danos decorrentes do uso ou da impossibilidade de uso do
        site, de decisões de voto, compra, investimento ou de qualquer outra natureza tomadas com base no conteúdo, de livros ou outros itens comprados por meio dos links, de indisponibilidade temporária ou de
        conteúdo de sites de terceiros. Nada nestes termos afasta direitos que o Código de Defesa do
        Consumidor ou outra lei garantam a você e que não possam ser afastados por contrato.
      </p>

      <h2 id="correcoes">8. Correções e retirada de conteúdo</h2>
      <p>
        Erros apontados por leitores são checados e corrigidos, com a data de atualização registrada
        na página. Titulares de direitos que identifiquem uso indevido de material podem pedir a
        remoção pelo e-mail <a href={`mailto:${author.email}`}>{author.email}</a>, informando o
        material, a página e a base do pedido.
      </p>

      <h2 id="alteracoes">9. Alterações destes termos</h2>
      <p>
        Estes termos podem ser atualizados para refletir mudanças no site ou na lei. A versão em
        vigor é sempre a publicada nesta página, com a data no topo. Seguir usando o site depois de
        uma alteração significa aceitar a versão nova.
      </p>

      <h2 id="lei-e-foro">10. Lei aplicável e foro</h2>
      <p>
        Estes termos são regidos pelas leis da República Federativa do Brasil. Para resolver qualquer
        disputa relacionada ao site, fica eleito o foro da comarca de domicílio da redação, no Brasil, ressalvado
        o direito do consumidor de acionar o foro do próprio domicílio quando a lei assim permitir.
      </p>

      <h2 id="contato">11. Contato</h2>
      <p>
        Dúvidas sobre estes termos: <a href={`mailto:${author.email}`}>{author.email}</a>. Versão
        destes termos: 1 de outubro de 2026.
      </p>
    </InstitutionalPage>
  );
}
