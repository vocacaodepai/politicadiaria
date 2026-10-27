# Rotina: Promessas (`/promessas`)

Vale junto com `CLAUDE.md`, `docs/padrao-editorial.md` e `docs/rotinas/comum.md`. Roda uma vez por dia
depois da eleição e, a partir da posse (05/01/2027), uma vez por dia até o fim do mandato. Antes da posse
a rotina só confere `meta.json` e não muda nenhum status.

## Escopo de arquivos permitido

Só `data/promessas/` (`meta.json`, `lula.json`, `flavio.json`). Nunca `lib/`, `app/`, `components/`,
`scripts/`, `docs/`, `CLAUDE.md` nem configuração. Rodar `npm run check:promessas` é permitido.

## Arquivos

| Arquivo | Conteúdo | Quem atualiza |
| --- | --- | --- |
| `meta.json` | `eleito` (`null`, `"lula"` ou `"flavio"`), `posse`, `atualizadoEm`, planos, "não fará", checagens de agências, limites | à mão ou pela rotina, de fonte aberta conferida |
| `lula.json`, `flavio.json` | uma entrada por proposta, com `status` e `historico` | rotina (só `status`, `historico` e `notas`) |

Os campos `texto`, `citacao`, `fonte`, `meta` e `prazo` de uma proposta não mudam depois de gravados: são o que o
plano disse. Correção de transcrição vale, desde que a citação seja conferida de novo no PDF.

## 1. Quem foi eleito (uma vez)

Só depois que o TSE marcar `Eleito` (ver `docs/rotinas/eleicoes.md`), preencha `"eleito"` em `meta.json`
com `"lula"` ou `"flavio"` e atualize `atualizadoEm`. O painel passa a destacar o eleito e a marcar o outro como
"arquivo da campanha, sem acompanhamento". Nenhuma proposta do candidato não eleito recebe histórico nem status
diferente de `prometida`: o validador barra.

## 2. Verificação diária (só do eleito, a partir da posse)

Para cada proposta do eleito, na ordem do arquivo:

1. Abra o `indicador.url` e, se houver, as fontes já usadas no `historico`. Procure o fato novo em fonte oficial:
   Diário Oficial da União (Imprensa Nacional), Câmara, Senado, Planalto, ministério ou agência responsável, IBGE,
   Banco Central, Tesouro, INEP, DataSUS, INPE, ANP, Portal da Transparência. Imprensa identificada só serve para achar o fato e para
   confirmar uma tramitação; a fonte do histórico deve ser oficial sempre que existir.
2. Só mude o status se houver fato novo com data e fonte aberta e conferida (o link abre e mostra o que o resumo diz).
3. Registre em `historico` uma entrada nova no fim da lista.
4. Atualize `status` para o mesmo valor da última entrada e `atualizadoEm` em `meta.json`.

## Status e quando mudam

| Status | Quando |
| --- | --- |
| `prometida` | estado inicial; nada oficial aconteceu depois da posse |
| `em tramitacao` | projeto, PEC, medida provisória ou ato formal protocolado e em análise (número e link da Câmara, Senado ou DOU) |
| `em andamento` | ato oficial publicado ou execução comprovada em fonte oficial, sem a meta fechada |
| `entregue` | a meta do documento foi atingida segundo o indicador oficial ou ato oficial que a cumpre |
| `contrariada` | ato oficial ou dado verificável que contraria a promessa, com fonte oficial (`.gov.br`, `.leg.br`, `.jus.br`, `.mil.br`). Nunca por opinião, discurso ou imprensa |
| `sem dados` | não há fonte oficial aberta para medir. Registre o motivo no resumo |

O validador exige: nenhum status além de `prometida` sem entrada de histórico com fonte, última entrada igual ao
`status`, datas em ordem, nunca antes da posse, nunca no futuro.

## Formato do histórico

```json
{
  "data": "2027-02-10",
  "status": "em tramitacao",
  "resumo": "Frase factual, sem adjetivo: o que foi publicado ou enviado, por quem e com qual número.",
  "fonte": { "nome": "Câmara dos Deputados, PEC 00/2027", "url": "https://www.camara.leg.br/..." }
}
```

Resumo em 1 ou 2 frases, no tempo passado, só com o que a fonte diz. Sem travessão, sem adjetivo sobre partido,
político ou governo, sem causa e sem previsão.

## Neutralidade (vale para qualquer eleito)

- Mesma régua para Lula, Flávio ou quem for eleito: mesmos status, mesmas fontes, mesmo rigor de prova.
- Nada de nota, placar de "cumpriu" contra "descumpriu" nem ranking de governo. O painel mostra contadores por status e nada mais.
- Promessa que o eleito cumpre e promessa que contraria entram com a mesma frequência de verificação.
- Fato favorável e fato desfavorável entram com a mesma exigência de fonte. Sem fonte, não entra.
- Nunca mencionar IA, Claude ou Anthropic no conteúdo.

## Validar

1. `npm run check:promessas` com zero ERRO (também roda dentro de `npm run check:content`).
2. `npm run lint` e `npm run build`.

## O que reportar

Ao final, uma linha por proposta alterada (id, status anterior, status novo, fonte) e a contagem por status. Se
nenhuma proposta mudou, diga isso e não faça commit. Registre propostas que ficaram sem fonte oficial para o dono decidir.
