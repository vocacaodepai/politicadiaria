# Padrão editorial da Política Diária

Vale para todo item em `content/articles/<slug>.ts` (resenhas de livro) e
`content/news/<slug>.ts` (notícias). O script `npm run check:content` confere a parte
mecânica; o resto é responsabilidade de quem escreve.

## 1. Voz e propósito

- Ajudar o leitor comum a entender a política do Brasil e do mundo: o que aconteceu, por que
  importa, quem decide, o que vem depois. Nunca vira site de opinião nem de torcida.
- Assinatura: Equipe Política Diária. Tom de repórter explicando para um amigo atento: frases
  curtas, português do Brasil natural, zero jargão sem explicação.
- Concreto: datas, números de projeto de lei, placar de votação, valores em R$, nome e cargo.
- Honestidade acima de tudo:
  - Nenhum número sem fonte na mesma frase ou parágrafo.
  - Nenhuma citação que não esteja na fonte aberta. Nenhuma "fonte anônima" sem veículo sério.
  - Nenhuma alegação de leitura pessoal de livro; resenha se apresenta como análise editorial.
  - Nenhuma URL inventada. Todo link externo é aberto e conferido antes de entrar.
  - Acusação só com decisão judicial ou fato documentado; investigado é investigado.
- Equilíbrio: ouvir/mostrar os lados com a mesma régua, atribuir opinião a quem a emitiu
  ("segundo o ministro...", "para a oposição...", "para o governo...").

## 2. Proibições de estilo

- Travessão (—) nunca. Use dois-pontos, vírgula, parênteses ou ponto.
- Aberturas e fechos de assistente: "Claro!", "Em resumo", "É importante ressaltar",
  "Vale destacar", "Nesse sentido", "Dito isso".
- Estrutura "não é apenas X, é Y". Adjetivos vazios (incrível, revolucionário, polêmico por
  padrão, escândalo, bomba, "caos"). Nada de manchete caça-clique.
- Frases-fórmula de link: "como já discutimos em". Link entra natural na frase.
- Parágrafos com mais de 4 frases.
- Rótulos ideológicos pejorativos ou elogiosos. Descreva posição, não carimbe pessoa.

## 3. Notícia (`NewsItem`)

```ts
export const item: NewsItem = {
  slug: "keyword-curta-sem-acento",
  title: "55 a 75 caracteres, factual, sem clickbait",
  summary: "140 a 158 caracteres (meta description)",
  author: "Equipe Política Diária",
  sourceName: "Nome da fonte",
  sourceUrl: "https://...",        // aberta e conferida
  date: "AAAA-MM-DD",              // dia do fato, nunca futuro
  publishedAt: "2026-10-07T14:32:00-03:00", // hora real, Brasília
  topic: "brasil",                 // ver newsTopics
  imageQuery: "Supremo Tribunal Federal building",
  content: `...HTML...`,
  faq: [{ question: "...", answer: "40 a 80 palavras" }], // opcional, 2 ou 3
};
```

- `content`: 900+ palavras, 3+ `<h2>`. Abertura em 2 parágrafos com o fato (quem, o quê, quando,
  onde) e a fonte citada e linkada (`rel="noopener noreferrer nofollow"`). Depois: contexto
  (histórico, números, o que diz a lei), "Por que isso importa" (análise factual do efeito),
  desdobramentos e o que observar a seguir. 3 a 6 links internos. Sem lista de fontes no fim.
- Internacional: situar o leitor brasileiro (relação com o Brasil, comércio, diplomacia).
- Tags permitidas: p, h2, h3, h4, ul, ol, li, a, strong, em, b, i, br, hr, blockquote, code, pre,
  table, thead, tbody, tr, th, td, div, span, img, figure, figcaption, small, mark, sup, sub, dl,
  dt, dd, cite, abbr, kbd. Nada de `style=`, `<script>`, `<iframe>`, `on*=`.
- Caixas: `<div class="callout-box callout-tip"><span class="callout-label">Dica</span><p>...</p></div>`
  (`callout-ok`, `callout-warn`, `callout-bad`, `callout-tip`), no máximo 3.
- `content` é template literal: nada de crase nem `${}` dentro.

## 4. Resenha de livro (`Article` com `kind: "review"`)

```ts
export const article: Article = {
  slug, title (50-65), seoTitle (até 60), excerpt e metaDescription (140-158),
  category, date, readTime = Math.max(1, Math.round(palavras / 200)),
  imageQuery, seed (sequencial, maior que todos), kind: "review",
  author: "Equipe Política Diária", keyPoints (3), sources (2-5),
  review: { tool, bookAuthor, publisher, year, pages, score, criteria[5], pros, cons,
            price, bestFor, url, affiliate: true, ctaLabel },
  content, faq (4-6),
};
```

- Corpo de 1.400 a 1.900 palavras, 5 a 8 `<h2>`, 6+ links internos (outras resenhas, notícias
  e páginas do Congresso quando o tema pedir) e 2 a 4 externos (editora, instituição, Biblioteca
  Nacional, imprensa). Estrutura: veredito em 30 segundos; de que trata e a tese central; sobre
  o autor (só fatos verificáveis); o que o livro faz bem; limites e críticas feitas à obra; a
  quem serve e a quem não serve; edição indicada e preço (com "verificado em dd/mm/aaaa");
  livros para ler depois; nota final e critérios; FAQ.
- Nota: média dos cinco critérios, uma casa decimal. A nota julga a obra, não a ideologia.
- Botão `buy-btn` com link de afiliado no meio do corpo (ver CLAUDE.md).
- `faq`: perguntas como a pessoa digita ("X vale a pena?", "qual a melhor edição?", "por onde
  começar?"), respostas de 40 a 80 palavras. `keyPoints`: 3 frases completas.

## 5. Links

- Internos só para slugs que existem (`ls content/articles content/news`; páginas de
  parlamentares `/congresso/deputados/<slug>` só se o arquivo existir em `data/congresso`).
  Texto-âncora natural, nunca "clique aqui".
- Externos `https`, com `rel="noopener noreferrer"`; afiliado com `rel="sponsored noopener noreferrer"`.

## 6. Antes de publicar

1. `npm run check:content` sem ERRO.
2. Reler como leitor: a manchete bate com o texto? Alguém discordaria de algum fato? Há fonte?
3. Sem travessão, sem frase-fórmula, sem número sem fonte, sem adjetivo partidário.

Notícias nunca são apagadas: URL indexada continua no ar. Correção entra no texto com nota
"Atualizado em dd/mm/aaaa: ..." e `updated` no item quando existir.
