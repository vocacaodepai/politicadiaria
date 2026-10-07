import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage, institutionalMetadata } from "@/components/InstitutionalPage";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const PATH = "/politica-editorial";
const TITLE = "Política editorial";
const DESCRIPTION =
  "Como a Política Diária escolhe pautas, usa fontes primárias, corrige erros, trata os dados do Congresso (Câmara e Senado), avalia livros com nota de 0 a 10 e garante direito de resposta.";

export const metadata: Metadata = institutionalMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function PoliticaEditorialPage() {
  return (
    <InstitutionalPage
      label="Institucional"
      title={TITLE}
      lead="A Política Diária informa, mas não faz campanha nem dá orientação de voto. Esta página explica como cada notícia, cada dado do Congresso e cada resenha é feito, o que a redação nunca faz e como corrigimos os erros."
      path={PATH}
    >
      <h2 id="quem-responde">1. Quem responde pelo conteúdo</h2>
      <p>
        Todo o conteúdo do {site.name} é produzido e assinado pela{" "}
        <Link href={author.url}>{author.name}</Link>. Não inventamos nomes nem credenciais: se um
        texto tiver autor, revisor ou colaborador identificado, o nome aparece na página. A redação
        responde por cada erro e por cada correção.
      </p>

      <h2 id="limites">2. O que o site faz e o que nunca faz</h2>
      <p>O site existe para informar, organizar dados públicos e explicar. Por isso, nunca:</p>
      <ul>
        <li>apoia partido, candidato ou governo, nem indica voto;</li>
        <li>publica boato anônimo ou informação sem fonte identificável como se fosse fato;</li>
        <li>mistura opinião com notícia sem rotular a opinião como tal;</li>
        <li>dá opinião jurídica ou orientação eleitoral, nem substitui a consulta às fontes oficiais.</li>
      </ul>
      <p>
        Fatos e opiniões ficam separados: texto de opinião, análise ou comentário traz essa
        indicação de forma visível, e a notícia descreve o que aconteceu, com quem, quando e com
        base em quê.
      </p>

      <h2 id="pautas">3. Como as pautas são escolhidas</h2>
      <p>Uma pauta entra no site quando responde a pelo menos uma destas perguntas:</p>
      <ul>
        <li>É um fato de interesse público na política brasileira ou internacional, com fonte verificável?</li>
        <li>Ajuda o leitor a entender uma decisão, uma votação, uma lei ou um dado do Congresso?</li>
        <li>Explica o que mudou, com datas, números e o ato oficial de origem, quando houver?</li>
        <li>É um livro de política que merece uma resenha honesta e útil para quem quer ler?</li>
      </ul>
      <p>
        Sugestões de leitores contam muito: mande pela página de <Link href="/contato">contato</Link>.
        Não entram pautas compradas, textos enviados por assessorias ou empresas para publicação como
        se fossem do site nem conteúdo feito só para ranquear uma palavra-chave sem ajudar quem lê.
      </p>

      <h2 id="fontes">4. Notícias: fontes, checagem e correções</h2>
      <p>
        Cada notícia é escrita a partir de fontes primárias sempre que possível: Diário Oficial,
        Câmara dos Deputados, Senado Federal, STF, TSE, tribunais, organismos internacionais e
        documentos oficiais, além de veículos de imprensa identificados. As fontes são linkadas no
        texto ou listadas ao fim. O site não copia matérias: resume o fato, explica o contexto e
        aponta o original.
      </p>
      <ul>
        <li>Não usamos fonte anônima nem rumor como base de uma notícia.</li>
        <li>
          Quando uma informação ainda não foi confirmada por fonte oficial, o texto diz isso com
          clareza ou a informação não é publicada.
        </li>
        <li>
          Opinião, análise e comentário recebem rótulo próprio e não se misturam ao relato dos fatos.
        </li>
        <li>Se a fonte corrigir um fato, a notícia é atualizada com a correção indicada.</li>
      </ul>

      <h2 id="congresso">5. Congresso por dentro: metodologia dos dados</h2>
      <p>
        O diretório <Link href="/congresso">Congresso por dentro</Link> tem uma página para cada um
        dos 513 deputados federais e dos 81 senadores. Os dados vêm das fontes oficiais de dados
        abertos:{" "}
        <ExternalLink href="https://dadosabertos.camara.leg.br/">dadosabertos.camara.leg.br</ExternalLink>{" "}
        (Câmara dos Deputados) e{" "}
        <ExternalLink href="https://legis.senado.leg.br/dadosabertos">legis.senado.leg.br</ExternalLink>{" "}
        (Senado Federal). Não alteramos os números: organizamos e apresentamos o que o órgão publica,
        com link para a fonte.
      </p>
      <ul>
        <li>
          <strong>Atualização</strong>: os dados são recarregados periodicamente das APIs oficiais,
          em geral uma vez por dia. Cada página mostra a data da última atualização, e o dado
          exibido pode estar atrasado em relação ao que o órgão publicou depois disso.
        </li>
        <li>
          <strong>Votações</strong>: mostramos como o parlamentar votou em votações nominais
          registradas pela Casa. Votações simbólicas não registram voto individual.
        </li>
        <li>
          <strong>Gastos</strong>: despesas de cota parlamentar e verbas semelhantes, como declaradas
          pela Casa. Os valores são os informados oficialmente e podem ser retificados depois.
        </li>
        <li>
          <strong>Remuneração</strong>: o subsídio e demais valores são citados a partir de fontes
          oficiais da Câmara, do Senado e dos portais de transparência, com a fonte indicada.
        </li>
      </ul>
      <p>
        <strong>O que significa &quot;ausência em votação nominal&quot;</strong>: é o registro de que
        o parlamentar não aparece com voto computado em uma votação nominal da qual poderia
        participar. <strong>O que não significa</strong>: não prova, por si só, falta de trabalho,
        desinteresse ou irregularidade. Há ausências justificadas (licença médica, missão oficial,
        licença-maternidade ou paternidade, atividade de comissão, exercício de cargo como ministro
        ou secretário), além de obstrução e outros motivos que os dados abertos nem sempre indicam. O
        número deve ser lido com esse contexto, e nunca como nota de desempenho.
      </p>
      <p>
        <strong>Fotos</strong>: as fotos oficiais são creditadas à Câmara dos Deputados ou ao Senado
        Federal. Quando a foto oficial não está disponível, usamos imagem do Wikimedia Commons, com o
        autor e a licença indicados (por exemplo, Creative Commons) conforme exigido por cada
        licença. Se você é titular de uma imagem e quer que ela seja alterada ou retirada, escreva
        para <a href={`mailto:${author.email}`}>{author.email}</a>.
      </p>
      <p>
        <strong>Dados de pessoas</strong>: publicamos apenas informações públicas de origem oficial,
        ligadas ao mandato. Não publicamos CPF, endereço residencial nem outros dados pessoais
        sensíveis. Os detalhes estão na{" "}
        <Link href="/politica-de-privacidade">política de privacidade</Link>.
      </p>

      <h2 id="ferramentas-de-escrita">6. Ferramentas de apoio à escrita</h2>
      <p>
        A redação pode usar ferramentas automatizadas de apoio à escrita para organizar ideias,
        montar o primeiro rascunho ou apontar erros de gramática. Nada sai assim para o leitor: todo
        texto é lido, checado contra as fontes, corrigido e aprovado por uma pessoa da redação, que
        assume a responsabilidade editorial pelo que foi publicado. Se um texto sair errado, a culpa
        não é da ferramenta. Os números do Congresso vêm direto das APIs oficiais, não de texto
        gerado.
      </p>

      <h2 id="padrao-minimo">7. Padrão mínimo de cada texto</h2>
      <p>Uma notícia ou resenha nova só é publicada se cumprir estes requisitos:</p>
      <ul>
        <li>
          <strong>Resposta direta no começo</strong>: o fato principal (ou a avaliação do livro)
          aparece nos primeiros parágrafos.
        </li>
        <li>
          <strong>Fontes</strong>: afirmações verificáveis apontam para a fonte primária, e todo link
          externo é aberto e conferido antes de entrar.
        </li>
        <li>
          <strong>Contexto</strong>: datas, números e o ato oficial de origem, quando houver.
        </li>
        <li>
          <strong>Fato separado de opinião</strong>: a opinião, quando existe, vem identificada.
        </li>
        <li>
          <strong>Linguagem simples</strong>: frases curtas, sem jargão sem explicação e sem adjetivo
          de torcida.
        </li>
      </ul>
      <p>
        Textos antigos que não atendem a esse padrão são reescritos aos poucos. Quando um deles é
        reformado, recebe a data de atualização.
      </p>

      <h2 id="reviews">8. Como os livros são avaliados</h2>
      <p>
        As <Link href="/artigos">resenhas</Link> são o único tipo de artigo do site e seguem critérios
        públicos, cada um com nota de 0 a 10: clareza, profundidade, rigor e fontes, atualidade e
        leitura (se o livro prende e se é de fato lido até o fim). A nota final é a média desses
        critérios, exibida junto com pontos fortes, pontos fracos, para quem serve e o link do livro.
      </p>
      <p>
        A nota julga a qualidade da obra, não a ideologia do autor. A mesma régua vale para livros de
        qualquer campo político: um livro de que discordamos pode receber nota alta se for claro,
        bem fundamentado e honesto com as fontes, e um livro alinhado a uma opinião popular pode
        receber nota baixa se for superficial ou impreciso. Não alegamos leitura que não aconteceu.
        Nenhuma nota é vendida, negociada ou influenciada por editora, autor, anunciante ou programa
        de afiliado. Se a edição mudar de forma relevante, a resenha é revisada e a nota pode mudar.
      </p>

      <h2 id="noticias">9. Direito de resposta e contestação</h2>
      <p>
        Quem for citado em uma notícia, ou tiver dado seu apresentado no Congresso por dentro, pode
        pedir correção, esclarecimento ou direito de resposta escrevendo para{" "}
        <a href={`mailto:${author.email}`}>{author.email}</a>, com o link da página e o trecho em
        questão. Respostas que corrijam fatos são publicadas na própria página ou em nota
        vinculada a ela. Se o dado vier de erro na fonte oficial, indicamos isso e acompanhamos a
        retificação do órgão.
      </p>

      <h2 id="correcoes">10. Correções públicas</h2>
      <p>
        Erros acontecem. Quem encontrar um pode escrever para{" "}
        <a href={`mailto:${author.email}`}>{author.email}</a> com o link da página e o trecho. Erros
        confirmados são corrigidos em até 5 dias úteis. Correções de fato (um número errado, uma
        votação atribuída à pessoa errada, uma afirmação incorreta) recebem a marcação
        &quot;Atualizado em&quot; com a nova data e, quando o erro for relevante, uma nota explicando
        o que mudou. Ajustes de forma (erro de digitação, link quebrado) são feitos sem marcação. Um
        texto que se mostre errado no todo é reescrito ou retirado, e a URL passa a explicar o motivo
        em vez de sumir.
      </p>

      <h2 id="independencia">11. Independência editorial</h2>
      <p>
        O site se sustenta com anúncios do Google AdSense e com links de afiliado da Amazon, só nas
        resenhas de livros. Anunciante não escolhe pauta, não lê texto antes da publicação e não
        recebe nota ou menção em troca de investimento. Partido, governo, candidato ou parlamentar
        não pagam por conteúdo nem por posição no site. As regras completas estão em{" "}
        <Link href="/publicidade-e-afiliados">publicidade e afiliados</Link>.
      </p>

      <h2 id="imagens">12. Uso de imagens</h2>
      <p>
        As fotos de parlamentares vêm da Câmara dos Deputados e do Senado Federal, com crédito, e do
        Wikimedia Commons quando a foto oficial não está disponível, com autor e licença indicados.
        Outras imagens editoriais trazem o crédito de origem. O site não usa imagens artificiais como
        se fossem fotos reais e não usa capturas de tela de terceiros sem indicar a origem. A imagem
        de compartilhamento (a que aparece em redes sociais e mensageiros) é gerada pelo próprio
        site, com o título do texto e a marca.
      </p>

      <h2 id="datas">13. Datas de publicação e atualização</h2>
      <p>
        Toda página mostra a data de publicação. Quando há revisão de conteúdo, mostra também a data
        de atualização, e essa data é a que vai para os mecanismos de busca. Datas seguem o horário
        de Brasília; um texto nunca é publicado com data futura.
      </p>

      <h2 id="conflitos">14. Conflitos de interesse</h2>
      <p>
        A redação não tem emprego ou contrato com partidos, governos, parlamentares, editoras ou
        autores dos livros resenhados. O único vínculo comercial é o programa de afiliados da Amazon,
        descrito em publicidade e afiliados. Se isso mudar, o conflito é declarado nesta página e nos
        textos afetados.
      </p>

      <p>
        Versão desta política: 7 de outubro de 2026. Veja também{" "}
        <Link href="/sobre">sobre o site</Link> e a{" "}
        <Link href="/politica-de-privacidade">política de privacidade</Link>.
      </p>
    </InstitutionalPage>
  );
}
