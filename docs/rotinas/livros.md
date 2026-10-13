# Rotina: 3 resenhas de livros por dia

Horário: 05:23 (Brasília), uma vez por dia. Nome do clone: `pd-livros`. Siga
`docs/rotinas/comum.md`. Leia no `CLAUDE.md` as seções "Resenha de livro", "Link e botão de
compra" e "Imagens". Todo artigo do site é resenha de livro (`kind: "review"`).

## Pautas

- 3 livros reais de política por rodada, de **categorias diferentes**. Alterne as 7 categorias
  entre os dias.
- **LINHA EDITORIAL (regra do dono do site, declarada ao leitor em /politica-editorial):** a seleção
  é de **centro-direita e direita**: liberalismo clássico e econômico, conservadorismo,
  libertarianismo, tradição ocidental, livre mercado, defesa da liberdade individual, família,
  religião e instituições, geopolítica realista, história política e biografias. **NÃO publique
  livros comunistas, marxistas, socialistas ou de esquerda** (nem obras de propaganda de
  qualquer campo). Clássicos e obras de referência necessárias para entender o poder (Maquiavel,
  Tocqueville, Burke, Weber, Hobbes, Locke...) entram.
- Pautas: Burke, Tocqueville, Hayek, Mises, Friedman, Russell Kirk, Roger Scruton, Thomas Sowell,
  Olavo de Carvalho (obras políticas, com as críticas feitas), Ludwig von Mises, Eric Voegelin,
  Raymond Aron, Bertrand de Jouvenel, Tim Marshall, Kissinger, Fukuyama, Huntington, Mearsheimer,
  Niall Ferguson, Jordan Peterson, Ayn Rand, Carlos Lacerda, Roberto Campos, Mário Vargas Llosa,
  Bruno Garschagen, Luiz Felipe Pondé, Antônio Paim, Ives Gandra, biografias de líderes e
  estadistas (Churchill, Thatcher, Reagan, Lincoln...), história do Brasil e do mundo com rigor.
  Prefira edições em português disponíveis na Amazon Brasil. Confira sempre que o livro é real,
  o autor e o ISBN.
- A nota continua julgando **a qualidade da obra**, e a resenha **lista as críticas feitas ao
  livro**. Tom sóbrio: descrever o que o livro defende, sem propaganda partidária e sem atacar
  pessoas.
- Rejeite livro que já tem resenha (`ls content/articles`).
- Use WebSearch para confirmar que o livro existe, editora, ano, páginas e ISBN. Confirme o
  ISBN-10 em Open Library (`https://openlibrary.org/api/books?bibkeys=ISBN:<isbn>&format=json&jscmd=data`)
  ou site da editora, e abra `https://www.amazon.com.br/dp/<ISBN10>` com WebFetch para ver se o
  título bate (se a Amazon bloquear a leitura, use o link de busca por ISBN-13 do CLAUDE.md).
  Nunca invente livro, ISBN, páginas ou citação.

## Escrever

- `npm run content:new -- artigo <slug> <categoria>` cria o esqueleto (já com o bloco `review`).
- Siga `docs/padrao-editorial.md` seção 4: 1.400 a 1.900 palavras, 5 a 8 h2, 6+ links internos
  (outras resenhas, notícias, `/congresso`), 2 a 4 externos, FAQ de 4 a 6, keyPoints, sources.
- Nota pelos cinco critérios com pesos iguais; justifique cada critério no texto. Aponte as
  principais críticas feitas à obra e o público ideal. Nunca alegue leitura pessoal.
- `imageQuery`: autor (se houver foto no Commons), instituição ou tema; nunca capa de edição.
- Título variado entre os três da rodada (ver CLAUDE.md "Títulos").

## Informe final

Quais 3 livros entraram, se lint/build/check-content passaram e o link
https://www.politicadiaria.com.br
