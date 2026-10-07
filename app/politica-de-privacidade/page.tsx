import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage, institutionalMetadata } from "@/components/InstitutionalPage";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";

const PATH = "/politica-de-privacidade";
const TITLE = "Política de Privacidade";
const DESCRIPTION =
  "Como a Política Diária trata dados pessoais conforme a LGPD: logs de hospedagem, cookies de publicidade do Google AdSense só com consentimento, seus direitos e como exercê-los.";

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

export default function PoliticaPrivacidadePage() {
  return (
    <InstitutionalPage
      label="Institucional"
      title={TITLE}
      lead="Esta política explica, em linguagem direta, quais dados a Política Diária coleta quando você navega, por que coleta, com quem compartilha e o que você pode fazer a respeito, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018)."
      path={PATH}
    >
      <p>
        Resumo para quem tem pressa: o site não pede cadastro, não tem login e não vende dados. O que
        existe são os registros técnicos de acesso da hospedagem, uma medição de audiência sem
        cookies e, quando os anúncios estiverem ativos, os cookies de publicidade do Google, que só
        são usados para personalização se você aceitar no aviso de cookies.
      </p>

      <h2 id="controlador">1. Quem é o responsável pelos seus dados</h2>
      <p>
        O controlador dos dados tratados neste site é o {site.name} ({site.url}), site editado pela{" "}
        redação da Política Diária (<Link href={author.url}>{author.name}</Link>), que também
        exerce a função de encarregado pelo tratamento de dados pessoais (a figura que a LGPD chama
        de encarregado ou DPO). O canal para qualquer assunto de privacidade é o e-mail{" "}
        <a href={`mailto:${author.email}`}>{author.email}</a>.
      </p>

      <h2 id="dados-coletados">2. Quais dados são coletados</h2>
      <h3 id="logs">2.1 Registros de acesso (logs de hospedagem)</h3>
      <p>
        O site é hospedado na Vercel. Como qualquer servidor web, a hospedagem registra dados
        técnicos de cada requisição: endereço IP, data e hora, página acessada, navegador e sistema
        operacional (user agent) e a página de origem (referrer). Esses registros servem para manter o
        site no ar, detectar abusos e diagnosticar erros. Eles são mantidos pela Vercel por prazo
        curto e não são cruzados com nenhuma outra informação sua.
      </p>
      <h3 id="analytics">2.2 Medição de audiência</h3>
      <p>
        O site usa duas ferramentas de medição. O Vercel Web Analytics funciona sem cookies e sem
        identificar pessoas: conta visitas de forma agregada a partir de um identificador temporário
        derivado da requisição, que não é armazenado no seu dispositivo. O Google Analytics 4 só é
        carregado se estiver configurado no site e depois da sua escolha no aviso de cookies. Se você aceitar, ele
        grava cookies próprios (como o _ga) para reconhecer visitas repetidas e medir quais páginas
        são lidas, com o endereço IP anonimizado. Se você escolher “Só o essencial”, o Google
        Analytics roda em modo de consentimento negado: não grava cookies nem identificadores no seu
        navegador e recebe apenas sinais agregados. Não há pixel de rede social.
      </p>
      <h3 id="cookies-publicidade">2.3 Cookies de publicidade (Google AdSense)</h3>
      <p>
        O site é preparado para exibir anúncios do Google AdSense. Quando os anúncios estiverem
        ativos, o Google e os parceiros dele (incluindo a rede DoubleClick) podem gravar cookies e
        identificadores no seu navegador para exibir anúncios, medir se foram vistos e evitar
        fraude. Com o seu consentimento, esses cookies também são usados para personalizar os
        anúncios com base nas suas visitas a este e a outros sites. Sem consentimento, o site pede ao
        Google anúncios não personalizados, que não usam o seu histórico de navegação.
      </p>
      <p>
        O Google explica como usa esses dados em{" "}
        <ExternalLink href="https://policies.google.com/technologies/partner-sites">
          Como o Google usa informações de sites ou apps que usam nossos serviços
        </ExternalLink>
        . Você pode ajustar a personalização de anúncios da sua conta Google em{" "}
        <ExternalLink href="https://adssettings.google.com/">adssettings.google.com</ExternalLink>.
      </p>
      <h3 id="preferencias-locais">2.4 Preferências guardadas no seu navegador</h3>
      <p>
        O site guarda no armazenamento local do navegador (não em cookie) duas preferências: o tema
        escolhido (claro ou escuro) e a sua resposta ao aviso de cookies. Elas ficam só no seu
        dispositivo e nunca são enviadas ao servidor.
      </p>
      <h3 id="email">2.5 Quando você escreve para o site</h3>
      <p>
        Se você mandar um e-mail ou preencher o formulário de contato, o nome, o endereço de e-mail
        e o conteúdo da mensagem são usados só para responder e ficam guardados pelo tempo
        necessário para tratar o pedido. O formulário envia a mensagem por meio do serviço de e-mail
        Resend, que a entrega à caixa de entrada da redação.
      </p>
      <p>
        O site não pede documentos, dados bancários nem senhas no formulário, e você não deve
        enviá-los. Descreva a sua dúvida de forma geral, sem informações pessoais sensíveis.
      </p>

      <h3 id="dados-de-parlamentares">2.6 Dados de parlamentares e agentes públicos</h3>
      <p>
        O Congresso por dentro publica informações de deputados federais e senadores: nome, partido,
        estado, votações, ausências em votações nominais, gastos de cota parlamentar, remuneração e
        foto oficial. São dados públicos, de origem oficial (dados abertos da Câmara dos Deputados e
        do Senado Federal), tratados com base no interesse público e na finalidade de transparência,
        como admite o art. 7º, § 3º, da LGPD para dados pessoais de acesso público. O site não
        publica CPF, endereço residencial, telefone pessoal nem qualquer dado pessoal sensível.
        Quem constar nessas páginas e identificar um dado errado ou que não deva ser público pode
        pedir correção pelo e-mail <a href={`mailto:${author.email}`}>{author.email}</a>.
      </p>

      <h2 id="bases-legais">3. Bases legais (art. 7º da LGPD)</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tratamento</th>
              <th>Base legal</th>
              <th>Finalidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Logs de hospedagem</td>
              <td>Legítimo interesse (art. 7º, IX)</td>
              <td>Segurança, disponibilidade e diagnóstico de erros</td>
            </tr>
            <tr>
              <td>Medição de audiência sem cookies (Vercel)</td>
              <td>Legítimo interesse (art. 7º, IX)</td>
              <td>Saber quais conteúdos são lidos, de forma agregada</td>
            </tr>
            <tr>
              <td>Cookies do Google Analytics</td>
              <td>Consentimento (art. 7º, I)</td>
              <td>Medir visitas repetidas e páginas lidas, com IP anonimizado</td>
            </tr>
            <tr>
              <td>Cookies de publicidade personalizada</td>
              <td>Consentimento (art. 7º, I)</td>
              <td>Exibir anúncios relevantes e sustentar o site</td>
            </tr>
            <tr>
              <td>Anúncios não personalizados</td>
              <td>Legítimo interesse (art. 7º, IX)</td>
              <td>Exibir anúncios sem perfil de interesse, com medição básica</td>
            </tr>
            <tr>
              <td>Dados públicos de parlamentares (Câmara e Senado)</td>
              <td>Dados de acesso público e interesse público (art. 7º, § 3º) e exercício regular de atividade jornalística (art. 4º, II, a)</td>
              <td>Transparência e informação sobre o mandato, a partir de dados abertos oficiais</td>
            </tr>
            <tr>
              <td>Resposta a e-mails e ao formulário de contato</td>
              <td>Execução de procedimento a pedido do titular (art. 7º, V)</td>
              <td>Atender correções, sugestões e pedidos LGPD</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="consentimento">4. Como aceitar, recusar ou mudar de ideia sobre cookies</h2>
      <p>
        Enquanto os anúncios estiverem ativos, na primeira visita aparece um aviso de cookies com as
        opções de aceitar ou recusar a publicidade personalizada. Nenhum script de anúncio é
        carregado antes da sua escolha. Para mudar a decisão depois, use o link
        &quot;Preferências de cookies&quot; no rodapé de qualquer página, que reabre o aviso. Você
        também pode apagar os cookies pelo próprio navegador e desativar a personalização na sua
        conta Google, em{" "}
        <ExternalLink href="https://adssettings.google.com/">adssettings.google.com</ExternalLink>.
      </p>
      <p>
        Se os anúncios ainda não estiverem ativos, o aviso não aparece, porque não há nenhum cookie
        de terceiros para consentir.
      </p>

      <h2 id="compartilhamento">5. Com quem os dados são compartilhados</h2>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> (hospedagem, entrega das páginas e medição de audiência): recebe
          os registros técnicos de acesso.
        </li>
        <li>
          <strong>Resend</strong> (envio de e-mail): recebe o conteúdo do formulário de contato para
          entregá-lo à redação.
        </li>
        <li>
          <strong>Google LLC</strong> (Google AdSense e rede DoubleClick): recebe os dados de cookies de
          publicidade descritos na seção 2.3, quando os anúncios estiverem ativos.
        </li>
        <li>
          <strong>Câmara dos Deputados, Senado Federal e Wikimedia Commons</strong>: fontes das fotos
          de parlamentares e de imagens dos textos. Ao carregar uma foto, o seu navegador faz uma requisição direta ao servidor deles, que pode
          registrar o seu IP como qualquer servidor de imagens. Eles não recebem nenhuma outra
          informação sua e não usam cookies neste site.
        </li>
      </ul>
      <p>
        O site não vende dados pessoais e não os compartilha com mais ninguém, salvo obrigação legal
        ou ordem de autoridade competente.
      </p>

      <h2 id="transferencia-internacional">6. Transferência internacional</h2>
      <p>
        Vercel, Google, Resend e Wikimedia operam servidores fora do Brasil, principalmente nos Estados
        Unidos e na Europa. Isso significa que os dados descritos acima podem ser processados fora do
        país, com base nas cláusulas contratuais e nos compromissos de proteção de dados desses
        fornecedores, conforme o art. 33 da LGPD.
      </p>

      <h2 id="retencao">7. Por quanto tempo os dados ficam guardados</h2>
      <ul>
        <li>Logs de hospedagem: pelo prazo padrão da Vercel, de curta duração, e depois descartados.</li>
        <li>Dados de audiência: só de forma agregada, sem identificação individual.</li>
        <li>
          Cookies de publicidade: pelo prazo definido pelo Google em cada cookie, que você pode
          encurtar apagando-os no navegador.
        </li>
        <li>E-mails e mensagens do formulário: pelo tempo necessário para tratar o pedido e comprovar o atendimento.</li>
        <li>Preferências locais (tema e consentimento): até você limpar os dados do navegador.</li>
      </ul>

      <h2 id="seus-direitos">8. Seus direitos (art. 18 da LGPD)</h2>
      <p>Você pode pedir, a qualquer momento e sem custo:</p>
      <ul>
        <li>confirmação de que existe tratamento de dados seus e acesso a eles;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
        <li>portabilidade, quando aplicável;</li>
        <li>informação sobre com quem os dados foram compartilhados;</li>
        <li>informação sobre a possibilidade de não dar consentimento e as consequências disso;</li>
        <li>revogação do consentimento, que vale dali em diante.</li>
      </ul>
      <p>
        Para exercer qualquer um desses direitos, escreva para{" "}
        <a href={`mailto:${author.email}`}>{author.email}</a> com o assunto &quot;Dados pessoais
        (LGPD)&quot;. Como o site não mantém cadastro, pode ser necessário pedir alguma informação
        para confirmar que a solicitação é sua. O prazo de resposta é de até 15 dias. Se você
        entender que o pedido não foi atendido, pode registrar reclamação na Autoridade Nacional de
        Proteção de Dados (ANPD), em{" "}
        <ExternalLink href="https://www.gov.br/anpd/">gov.br/anpd</ExternalLink>.
      </p>

      <h2 id="menores">9. Crianças e adolescentes</h2>
      <p>
        O conteúdo do site é voltado a adultos interessados em política e não é direcionado a menores de 13 anos. Nenhum dado
        de menor é coletado de forma intencional. Se um responsável identificar dados de uma criança
        aqui, basta avisar pelo e-mail para que sejam removidos.
      </p>

      <h2 id="seguranca">10. Segurança</h2>
      <p>
        O site é servido apenas por HTTPS, não guarda banco de dados de visitantes e usa cabeçalhos
        de segurança (como Content Security Policy) para limitar quais domínios podem carregar
        scripts nas páginas. Nenhum sistema é infalível, mas a superfície aqui é pequena de
        propósito: quanto menos dado coletado, menos dado para proteger.
      </p>

      <h2 id="links-externos">11. Links para outros sites</h2>
      <p>
        Artigos e notícias linkam para sites de terceiros, como órgãos públicos (Câmara, Senado, tribunais), fontes de notícias, instituições de pesquisa e páginas de livros, inclusive a Amazon nos links de afiliado. Cada um tem a própria política de privacidade, e esta política não
        se aplica a eles.
      </p>

      <h2 id="alteracoes">12. Alterações nesta política</h2>
      <p>
        Esta política pode mudar quando o site ganhar novos recursos ou quando a legislação mudar.
        A data da versão em vigor aparece no topo da página. Mudanças relevantes, como a ativação
        dos anúncios, também serão refletidas no aviso de cookies.
      </p>
      <p>
        Versão desta política: 7 de outubro de 2026. Dúvidas:{" "}
        <a href={`mailto:${author.email}`}>{author.email}</a>. Veja também os{" "}
        <Link href="/termos-de-uso">termos de uso</Link> e a página{" "}
        <Link href="/publicidade-e-afiliados">publicidade e afiliados</Link>.
      </p>
    </InstitutionalPage>
  );
}
