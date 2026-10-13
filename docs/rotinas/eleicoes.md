# Rotina: Eleições 2026 (`/eleicoes` e `/eleicoes/pesquisas`)

Vale junto com `CLAUDE.md`, `docs/padrao-editorial.md` e `docs/rotinas/comum.md`. Roda de hora em hora
(dia 4 e 25 de outubro e dias seguintes) ou uma vez por dia no restante do período.

## Escopo de arquivos permitido

Só `data/eleicoes/` (e `content/news/` quando a rotina de notícias publicar algo sobre o tema).
Nunca `lib/`, `app/`, `components/`, `scripts/`, `docs/`, `CLAUDE.md` nem configuração.

## Arquivos

| Arquivo | Origem | Quem atualiza |
| --- | --- | --- |
| `resultados.json` | portal de resultados do TSE | `npm run eleicoes:update` |
| `meta.json` | datas, fontes, calendário, avisos | script (campos `atualizadoEm`, `eleicao`, `fontesResultados`, `avisosColeta`); calendário e `fontes` à mão |
| `pesquisas.json` | institutos e imprensa, com registro no TSE | à mão, de fonte aberta conferida |
| `institutos.json` | nomes e rótulos dos institutos | à mão, quando entrar instituto novo |

## 1. Resultados (todo ciclo)

```bash
npm ci
npm run eleicoes:update
git diff --stat data/eleicoes
```

O script lê `https://resultados.tse.jus.br/oficial/ele2026/<eleição>/dados/<uf|br>/<uf|br>-c<cargo>-e<eleição>-u.json`
(cargos 1, 3, 5, 6; eleições 6257 e 6258 para presidente, 6259 e 6260 para os demais) e confere os códigos em
`/oficial/comum/config/ele-c.json`. Falha com código 1, sem sobrescrever nada, se qualquer arquivo obrigatório faltar
ou se o total de deputados eleitos não for 513.

Validações obrigatórias antes do commit:

1. A saída termina com `OK: ...` e mostra apuração, governadores em 2º turno, 54 senadores e 513 deputados.
2. No 1º turno a apuração está em 100% e o TSE marcou eleitos; no 2º turno, `presidente.turno2.apuracao.pctSecoesTotalizadas`
   sobe com o tempo. Se o percentual diminuir em relação ao commit anterior, não publique e investigue.
3. Soma dos votos dos candidatos do presidente é igual a `votos.validos`.
4. `meta.avisosColeta` descreve divergências do TSE (por exemplo, estado com "2º turno" sem arquivo publicado). Mantenha o aviso
   enquanto durar e remova quando o arquivo existir.
5. Depois de 25/10: confira que o TSE marcou `Eleito` no candidato com mais de 50% dos válidos. Só então o painel mostra o eleito.

## 2. Pesquisas do 2º turno (diário, de hora em hora no dia 24 e 25)

Em `pesquisas.json`, `segundoTurno2026`: uma entrada por pesquisa nova, com `campoInicio`, `campoFim` (ISO), `amostra`,
`margem`, `registro` (BR-xxxxx/2026 quando o PesqEle trouxer), `publicadoEm`, `materia` (URL aberta e conferida do instituto ou
veículo), `lula`, `flavio`, `indecisos` e `base` (`validos` se somar 100%, senão `totais`). Fontes de consulta: matéria do
instituto ou de veículo identificado, a compilação pública da Wikipédia (CC BY-SA) para achar links e o PesqEle
(`https://pesqele-divulgacao.tse.jus.br/`, consulta manual) para o número de registro. Abra o link e confira os números com o
texto da matéria. Link que não abre não entra. Não invente registro: use `null`.

Não publique pesquisa não registrada ou sem matéria localizável. Não calcule médias nem projeções.

## 3. Ranking de acerto

Calculado em tempo de build por `lib/eleicoes.ts` a partir de `pesquisas.json` e `resultados.json` (nada a editar). O 1º turno
já é definitivo. Para acrescentar pesquisa antiga ao histórico (2022, 2018), inclua a linha em `historico.<ano>.pesquisas`
com os mesmos campos de `primeiroTurno2026`. Valores `<1%` entram como 0. Instituto que só divulgou parte dos candidatos recebe
`completa: false`.

Depois do 2º turno, o ranking do 2º turno (erro nos dois candidatos e na diferença) pode ser acrescentado: pede mudança de
código, então abra pedido ao coordenador.

## 4. Calendário

`meta.json > calendario`. Cada item precisa de fonte aberta (`fonte.url`) ou `confirmada: false`. Pendente: data exata da
diplomação (imprensa cita 18/12, uma publicação cita 19/12), a conferir no calendário eleitoral do TSE. Ao confirmar, troque
`data` para a data ISO, `confirmada` para `true` e inclua a fonte.

## 5. Publicar

```bash
npm run lint && npm run build
```

Commit só dos arquivos de `data/eleicoes/`, mensagem em português ("Eleições: apuração de <data> às <hh:mm>"), push para `main`.
Notícias sobre o tema seguem `docs/rotinas/noticias.md` e devem linkar `/eleicoes` e, se citarem pesquisa, `/eleicoes/pesquisas`.

## Linha editorial

Mesma régua para todos os candidatos e partidos: números e fonte, sem adjetivos. Cores neutras, sem cor de partido. Ranking de
institutos mostra distância entre pesquisa e resultado, sem juízo de valor. Pesquisa é retrato do momento, não previsão.
