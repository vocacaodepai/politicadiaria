# Rotina: 3 resenhas de livros por dia com links da Shopee

Horário: 06:23 (Brasília), uma vez por dia. Nome do clone: `pd-livros-shopee`. Siga
`docs/rotinas/comum.md` e a linha editorial de `docs/rotinas/livros.md` (mesma seleção de
centro-direita e direita e de clássicos, mesma régua de nota, mesma regra de nunca alegar leitura
pessoal). Esta rotina roda **além** das 3 resenhas diárias da Amazon: são 3 por dia com a Shopee.
Leia no `CLAUDE.md` as seções "Resenha de livro", "Link e botão de compra" e "Imagens".

## Credenciais (nunca no repositório)

A busca de ofertas lê `SHOPEE_APP_ID` e `SHOPEE_APP_SECRET` de variáveis de ambiente da rotina.
Nunca escreva os valores em arquivo, commit, log, PR ou informe final. Se as variáveis não existirem,
o script avisa e a rodada **não publica** (não invente link nem imagem; conte o motivo no informe).
Para testar sem credenciais: `node scripts/shopee-offer.mjs --keyword "x" --mock` (dados fictícios,
nunca entram em `content/`).

## Pautas

- 3 livros reais por rodada, de **categorias diferentes** (alterne as 7 categorias entre os dias).
- Livros **diferentes dos já resenhados**: `ls content/articles` e `grep -h "tool:" content/articles/*.ts`
  (confira também pelo ISBN). Rejeite a pauta se o livro já tem resenha, com Amazon ou Shopee.
- Mesma pauta de autores e temas de `docs/rotinas/livros.md`. Nada de livro comunista, marxista,
  socialista ou de esquerda. A nota julga a qualidade da obra e a resenha lista as críticas feitas a ela.

## Passo a passo por livro

1. **Confirmar o livro.** WebSearch e Open Library
   (`https://openlibrary.org/api/books?bibkeys=ISBN:<isbn>&format=json&jscmd=data`) ou site da editora:
   título, autor, editora, ano, páginas e ISBN (10 e 13). Nunca invente livro, ISBN, páginas ou citação.
2. **Buscar a oferta.** `node scripts/shopee-offer.mjs --isbn <ISBN-13>`; se não vier nada, tente
   `--keyword "<título> <autor> <editora>"`. A saída traz nome, preço, `imageUrl`, `offerLink`,
   `productLink`, `shopName` e `itemId`, além de `checks` (host do link e da foto).
3. **Conferir o anúncio.** Título, autor e **edição** (editora e ano) do anúncio precisam bater com o
   livro confirmado no passo 1. Rejeite kit, box com outros títulos, edição estrangeira ou resumo/apostila
   quando o livro pedido é o original. Abra o `productLink` para conferir.
4. **Escolher a loja.** Entre os anúncios que batem, prefira loja confiável (loja oficial, "Shopee Mall",
   editora ou livraria conhecida, boa avaliação e histórico de vendas). Sem anúncio confiável que bata,
   troque o livro da pauta e conte o motivo no informe.
5. **Foto do livro.** Leia a foto pelo `imageUrl` que a API devolveu (host `cf.shopee.com.br`). Nunca
   baixe para o repositório, nunca deduza URL. Confirme com `curl -sI <imageUrl>` (HTTP 200 e
   `content-type: image/*`), baixe só para a pasta de rascunho fora do repo, abra com a ferramenta Read e
   confirme que é a capa do livro certo e da edição certa. Anote largura e altura.
6. **Link de afiliado.** `review.url` e o botão usam o `offerLink` (host `s.shopee.com.br`, https), exatamente
   como a API devolveu. Abra o link e confirme que cai no anúncio conferido no passo 3.
7. **Preencher o bloco `review`** com `store: "shopee"`:
   - `url`: o `offerLink`; `affiliate: true`; `ctaLabel: "Ver <Título> na Shopee"`.
   - `price`: faixa vista na API e no anúncio, com data: `"R$ 40 a R$ 70, verificado em dd/mm/aaaa"`.
   - `productImage`: `url` (o `imageUrl`), `alt` ("Capa do livro X, de Y, edição Editora Ano"), `asin`
     (o ISBN-10 do livro; o validador exige 10 caracteres), `width`, `height`, `source: "shopee"`,
     `verifiedAt` (hoje).
   - Demais campos e critérios como em `docs/rotinas/livros.md`.
8. **Texto da resenha.** 1.400 a 1.900 palavras, 5 a 8 h2, 6+ links internos, 2 a 4 externos, FAQ de 4 a 6,
   `keyPoints`, `sources` (padrão editorial, seção 4). No corpo, pelo menos um botão de compra:

```html
<div class="buy-btn">
  <a href="<offerLink>" rel="sponsored noopener noreferrer" target="_blank">Ver <Título> na Shopee ↗</a>
</div>
```

   O texto não pode dizer que o livro "está na Amazon". Preço, edição e disponibilidade variam por vendedor
   (a página mostra esse aviso sozinha). Nunca alegue leitura pessoal.

`npm run content:new -- artigo <slug> <categoria>` cria o esqueleto com campos da Amazon: troque `url`,
`ctaLabel` e `productImage` pelos da Shopee e acrescente `store: "shopee"`.

## Validar e publicar

`npm run check:content`, `npm run lint` e `npm run build` com zero erro (o validador barra Shopee sem
link `s.shopee.com.br`, sem `affiliate: true`, sem foto em `cf.shopee.com.br`, sem `source: "shopee"` ou
sem data no `price`). Depois siga "Publicar" de `docs/rotinas/comum.md`.

## Informe final

Quais 3 livros entraram, a loja (`shopName`) e o `itemId` de cada anúncio, se a foto foi conferida com
`curl -sI` e aberta, se lint/build/check-content passaram e o link https://www.politicadiaria.com.br
