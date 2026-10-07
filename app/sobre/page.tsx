import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage, institutionalMetadata } from "@/components/InstitutionalPage";
import { categories, site } from "@/lib/articles";
import { author } from "@/lib/author";

const PATH = "/sobre";
const TITLE = "Sobre a Política Diária";
const DESCRIPTION =
  "A Política Diária é um site independente e apartidário: notícias de política do Brasil e do mundo, o diretório Congresso por dentro com dados abertos de deputados e senadores e resenhas de livros de política.";

export const metadata: Metadata = institutionalMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function SobrePage() {
  return (
    <InstitutionalPage
      label="Institucional"
      title={TITLE}
      lead="Notícias de política do Brasil e do mundo, dados abertos de cada parlamentar e resenhas de livros, em português claro, sem torcida e com as fontes à vista."
      path={PATH}
    >
      <h2 id="o-que-e">O que é a Política Diária</h2>
      <p>
        A {site.name} é escrita pela <Link href={author.url}>{author.name}</Link> para quem quer
        entender o que acontece em Brasília e no mundo sem precisar escolher um lado antes de ler.
        Quem votou o quê, quanto cada parlamentar custa, o que mudou numa lei, que livro ajuda a
        entender um período da história. A proposta é explicar com calma, separar fato de opinião e
        mostrar de onde vem cada informação.
      </p>
      <p>
        O conteúdo se divide em três frentes: <Link href="/noticias">notícias</Link> diárias sobre
        política brasileira e internacional; o <Link href="/congresso">Congresso por dentro</Link>,
        um diretório com uma página para cada um dos 513 deputados federais e dos 81 senadores, com
        votações, ausências em votações nominais, gastos e remuneração a partir dos dados abertos da
        Câmara e do Senado; e as <Link href="/artigos">resenhas</Link> de livros de política, com
        nota de 0 a 10 e critérios públicos.
      </p>

      <h2 id="para-quem">Para quem escrevemos</h2>
      <p>
        Para eleitores, estudantes, professores, jornalistas e qualquer pessoa que queira consultar
        um dado público sem ter de procurar em vários portais. Não importa a sua posição política: o
        mesmo critério vale para todos os partidos, governos e autores. As categorias do site
        refletem os assuntos mais procurados:
      </p>
      <ul>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/categoria/${c.slug}`}>{c.label}</Link>: {c.description}
          </li>
        ))}
      </ul>

      <h2 id="como-o-conteudo-e-feito">Como o conteúdo é feito</h2>
      <p>
        Cada texto parte de fontes primárias, como o Diário Oficial, a Câmara dos Deputados, o
        Senado Federal, o STF, o TSE e organismos internacionais, além de veículos de imprensa
        identificados. As fontes ficam linkadas no texto ou listadas ao fim. O texto é escrito,
        checado e aprovado pela redação, que responde por ele. Boatos anônimos não viram notícia.
      </p>
      <p>
        Um ponto importante, dito com transparência: a redação não tem um revisor externo
        identificado. Se algum dia um texto for revisado por um profissional da área, o nome dele
        aparecerá na própria página. Enquanto isso não ocorrer, não há selo de revisão. Quando um
        texto é corrigido ou ampliado, ele ganha a marcação &quot;Atualizado em&quot; com a nova
        data. Os detalhes estão na <Link href="/politica-editorial">política editorial</Link>.
      </p>

      <h2 id="o-que-o-site-nao-faz">O que o site não faz</h2>
      <ul>
        <li>Não apoia partido, candidato nem governo, e não indica voto.</li>
        <li>
          Não dá opinião jurídica nem orientação eleitoral: o conteúdo é informativo.
        </li>
        <li>
          Não publica dados pessoais sensíveis de parlamentares, como CPF ou endereço residencial,
          apenas informações públicas de origem oficial.
        </li>
        <li>Não publica conteúdo pago disfarçado de notícia ou de resenha.</li>
      </ul>

      <h2 id="como-o-site-se-sustenta">Como o site se sustenta</h2>
      <p>
        O acesso é gratuito. A receita vem (ou virá) de anúncios do Google AdSense e de links de
        afiliado da Amazon, que aparecem somente nas <Link href="/artigos">resenhas de livros</Link>,
        sempre sinalizados. Anúncio e afiliado não interferem em pauta, nota ou opinião. Explicamos
        tudo em <Link href="/publicidade-e-afiliados">publicidade e afiliados</Link>.
      </p>

      <h2 id="como-falar-conosco">Como falar com a gente</h2>
      <p>
        Encontrou um erro, um dado de parlamentar incorreto, tem uma sugestão de pauta ou quer propor
        uma parceria? Escreva para <a href={`mailto:${author.email}`}>{author.email}</a>. Respondemos
        em até 5 dias úteis. A página de <Link href="/contato">contato</Link> explica o que mandar em
        cada caso, incluindo pedidos relacionados aos seus dados pessoais.
      </p>
    </InstitutionalPage>
  );
}
