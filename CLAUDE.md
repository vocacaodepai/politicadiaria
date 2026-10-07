## O que é o site

**Política Diária** (www.politicadiaria.com.br) é um site brasileiro de política nacional e
internacional com três frentes:

1. **Notícias diárias** (`/noticias`): política do Brasil e do mundo, sempre com fonte primária.
2. **Congresso por dentro** (`/congresso`): quem são os 513 deputados federais e os 81
   senadores, com uma página por parlamentar (votos, ausências em votações nominais, gastos da
   cota, salário e benefícios), a partir dos dados abertos da Câmara e do Senado.
3. **Resenhas de livros** (`/artigos`, `/reviews`): **todo artigo do site é resenha de livro de
   política** (`kind: "review"`), com nota de 0 a 10 e link de afiliado da Amazon Brasil.
   Não existe artigo "guia" nem comparativo de produto.

Monetização: Google AdSense e Programa de Associados da Amazon, tag **`politicadiaria-20`**
(também em `site.amazonTag`, `lib/articles.ts`).

## Linha editorial (vale para tudo)

- **Apartidário.** Fato separado de opinião. Nenhum adjetivo sobre partido, político ou governo.
  Nada de "esquerda boa / direita má" nem o contrário. Tratar todos os campos pela mesma régua.
- A **nota de um livro julga a qualidade da obra** (clareza, profundidade, rigor e fontes,
  atualidade, leitura), nunca a posição política do autor. Livros de todos os campos entram.
- Fonte primária sempre que existir: Diário Oficial, Câmara, Senado, STF, TSE, Planalto, ONU, FMI
  etc., além de veículos de imprensa identificados. Todo link externo é aberto e conferido
  antes de entrar (não abre = não entra).
- Nunca publicar boato, "fontes anônimas" sem confirmação de veículo sério, nem acusação sem
  decisão judicial. Pessoa investigada é "investigada", réu é "réu", condenado só com decisão.
- Nunca inventar citação, número, votação ou data. Sem dado, sem frase.
- Nunca mencionar IA, Claude ou Anthropic no conteúdo do site. Sem travessão (—), sem "Em
  resumo", sem "É importante ressaltar", sem "como já discutimos".
- Autor padrão: `Equipe Política Diária` (`lib/author.ts`). Nunca inventar revisor nem
  pessoa; `author.reviewer` fica vazio até existir um profissional real.

Padrão editorial completo em `docs/padrao-editorial.md`. Leia antes de escrever.

## Categorias dos livros (`lib/types.ts`)

`politica-brasileira`, `politica-internacional`, `historia-politica`, `ideias-politicas`,
`economia-e-estado`, `democracia-e-instituicoes`, `biografias`.

## Tópicos das notícias (`newsTopics`, filtro de `/noticias`)

`brasil`, `congresso`, `justica`, `economia`, `eleicoes`, `mundo`, `americas`, `europa`,
`oriente-medio`, `asia`. Todo item novo leva `topic` (escolha pelo ângulo real) e varie os tópicos
ao longo do dia. Política internacional usa `mundo`/`americas`/`europa`/`oriente-medio`/`asia`.

## Resenha de livro (`kind: "review"`)

Campos do bloco `review` (`lib/types.ts`): `tool` (título do livro), `bookAuthor`, `publisher`,
`year`, `pages`, `score` (0-10, uma casa decimal), `criteria` (Clareza, Profundidade, Rigor e
fontes, Atualidade, Leitura, cada 0-10), `pros`, `cons`, `price` ("R$ 40 a R$ 70, verificado em
dd/mm/aaaa"), `bestFor`, `url` (Amazon), `affiliate: true`, `ctaLabel`.

- Só livro **real**, com ISBN verificado (Open Library, Google Books, site da editora). Nunca
  inventar livro, autor, ano, editora, número de páginas, citação ou trecho.
- **Nunca alegar leitura pessoal** ("li", "fiquei dias com ele"). É análise editorial a partir da
  obra, da ficha da edição, do sumário e de resenhas/fontes públicas citadas. Nunca copiar
  trecho longo: no máximo uma citação curta (até 25 palavras) com página, quando verificada.
- Livros de campos opostos pelo mesmo critério; a resenha diz o que o livro defende, quais as
  críticas a ele e para quem serve, sem concordar nem discordar.
- A nota usa a régua de `components/ScoreScaleNote.tsx`. A média dos cinco critérios (com
  pesos iguais) dá a nota final, arredondada a uma casa.

### Link e botão de compra

`review.url` é sempre `https://www.amazon.com.br/dp/<ISBN-10>?tag=politicadiaria-20`
(para livro, o ASIN é o ISBN-10; confira que a página do ISBN existe). Se só houver ISBN-13,
use `https://www.amazon.com.br/s?k=<ISBN-13>&tag=politicadiaria-20`. O `check-content` barra
qualquer `review.url` sem a tag. No corpo, pelo menos um botão de compra (classe `buy-btn`,
liberada em `lib/html.ts`):

```html
<div class="buy-btn">
  <a href="https://www.amazon.com.br/dp/<ISBN10>?tag=politicadiaria-20" rel="sponsored noopener noreferrer" target="_blank">Ver <Título> na Amazon ↗</a>
</div>
```

`rel="sponsored noopener noreferrer"` e `target="_blank"` sempre. A caixa "Transparência" já
aparece sozinha abaixo do veredito (`ReviewDisclosure`); não repita no corpo.

### Títulos

Varie o formato: "Vale a pena ler X?", "X: resenha e nota", "Os 5 livros para entender Y",
"X ou Y: qual ler primeiro", "O que X ensina sobre Z". Nunca dois iguais na mesma rodada.

## Imagens

Regra: **a melhor foto que encaixar no assunto, de qualquer fonte, começando pelo Wikimedia
Commons.** Nunca imagem gerada por IA, nunca captura de página da Amazon.

- **Notícias e resenhas** têm `imageQuery` (frase concreta em inglês, amarrada a pessoa, lugar
  ou instituição específicos: `"Supremo Tribunal Federal building"`, `"Palácio do Congresso
  Nacional"`, `"Donald Trump official portrait"`). Passa pela cascata de `lib/wikimedia.ts`
  (só CC0, CC BY, CC BY-SA e domínio público, com crédito e licença visíveis), depois
  Pexels/Pixabay, depois o gradiente de fallback. Pessoa real e instituição pedem foto real.
  Em notícia de cena concreta, 1 ou 2 imagens no corpo (`<figure><img><figcaption>`) com URL
  `upload.wikimedia.org` que a própria API retornou e legenda `Foto: <autor> / Wikimedia Commons
  (<licença>)`. Nunca inventar URL.
- **Capa de livro**: não baixar nem hospedar capa de edição (direito de autor). Use foto do
  autor (se tiver no Commons), da instituição ou do tema. `coverImage` só com imagem livre e
  atribuída (`scripts/wikimedia-cover.mjs search` e `get`).
- Em notícia, "via Política Diária" é o crédito visível; o veículo/fonte original fica citado e
  linkado no texto e na caixa "Fonte original".
- **Parlamentares**: foto oficial da API (`urlFoto` da Câmara; `UrlFotoParlamentar` do Senado),
  com crédito "Foto: Câmara dos Deputados" / "Foto: Senado Federal" e fallback no Wikimedia
  Commons (resolvido na coleta, nunca em tempo de requisição). Sem foto, avatar com iniciais.

## Notícias

- `publishedAt` (ISO 8601 com offset de Brasília, hora real de agora), `topic`, `imageQuery`,
  `sourceName` e `sourceUrl` (https, aberta e conferida) em toda notícia nova.
- Mínimo de 900 palavras e 3 `<h2>`: o fato em 2 parágrafos com a fonte citada e linkada, um h2
  de contexto, um h2 "Por que isso importa" com análise factual (o que muda, quem é afetado,
  próximos passos), e mais um ou dois desdobramentos. 3 a 6 links internos (notícias, resenhas,
  páginas de parlamentares citados em `/congresso/...`). Sem lista de fontes ao final.
- Notícias nunca são apagadas: URL indexada continua no ar.
- Cobertura obrigatória de equilíbrio: ao longo do dia, política nacional (governo, Congresso,
  STF, eleições, economia) e internacional (EUA, América Latina, Europa, Oriente Médio, Ásia).

## Congresso por dentro (`/congresso`)

- Dados em `data/congresso/` (JSON gerado por `scripts/build-congress-data.mjs`;
  `npm run congress:update`). **Nunca editar à mão.** Fontes: `dadosabertos.camara.leg.br`,
  `legis.senado.leg.br/dadosabertos`, CEAPS do Senado e fontes oficiais de remuneração (em
  `data/congresso/remuneracao.json`, com URL e data de verificação).
- Cada página de parlamentar mostra só dado público e de interesse público (nada de CPF, endereço
  residencial). "Ausência" é **ausência em votação nominal**, não falta em sessão: licenças e
  missões oficiais existem e a página explica isso. Tom neutro, sem ranking de valor.
- Texto de notícia que cita um parlamentar deve linkar a página dele quando existir.

## Rotinas diárias

As rotinas agendadas publicam sozinhas; as instruções vivem em `docs/rotinas/` e valem como
parte deste arquivo: `comum.md` (regras comuns), `noticias.md`, `livros.md`, `congresso.md`.
Rotinas de conteúdo só alteram `content/`, `public/images/covers/` (e `data/congresso/` na rotina
do Congresso); nunca `docs/`, `CLAUDE.md`, `lib/`, `app/`, `components/`, `scripts/` nem
configuração.

## Identidade visual

Marca "Plenário": frontão sobre três colunas, gradiente azul-marinho (`#1E40AF`) para âmbar
(`#F59E0B`). Geometria em `lib/logo.ts`; `node scripts/build-brand-assets.mjs` regenera
`app/icon.svg` e `public/logo*.svg`. Paleta em `app/globals.css` (tokens claro/escuro):
fundo `#F5F7FB`, texto `#0F1B33`, destaque `#1E40AF`, secundária `#A16207`, CTA âmbar
`#B45309`; escuro: fundo `#0A1224`, destaque `#60A5FA`, secundária `#FBBF24`.

## Deploy

Vercel (projeto `politicadiaria`), deploy automático a cada push na branch de produção `main`.
Domínio principal: `www.politicadiaria.com.br` (com `politicadiaria.com.br` redirecionando para
ele). O workflow do GitHub Pages é só preview manual auxiliar.

@AGENTS.md
