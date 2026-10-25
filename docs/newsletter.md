# Newsletter e resumo da manhã: o que configurar

O formulário fica em `/resumo` (`components/NewsletterForm.tsx`, rota `app/api/newsletter/route.ts`,
adaptador em `lib/newsletter.ts`). **Nenhuma chave está no repositório.** Sem a variável abaixo, o
formulário mostra "inscrição em breve", a API responde 503 e nada é coletado.

## Abordagem: webhook

Cada inscrição vira um `POST` JSON para a URL configurada, com `{ "email", "source", "consentAt" }`.
Serve para Zapier, Make, n8n ou uma função sua que grave o contato no provedor de e-mail
(Buttondown, Resend, Mailchimp etc.). O provedor é quem envia o e-mail de confirmação (double opt-in) e
o link de descadastro; isso deve ser ligado lá.

## Variáveis na Vercel (Project Settings > Environment Variables, Production)

| Variável | Obrigatória | Para quê |
| --- | --- | --- |
| `NEWSLETTER_WEBHOOK_URL` | sim | URL que recebe cada inscrição (https). |
| `NEWSLETTER_WEBHOOK_TOKEN` | não | Enviado como `Authorization: Bearer <token>`. |

Depois de salvar, faça um novo deploy (a página lê a variável no build). Teste com um e-mail seu e
confira se o webhook recebeu o contato.

## Privacidade (LGPD)

O formulário traz o aviso curto e a caixa de ciência obrigatória. Antes de ligar, acrescente a
newsletter (finalidade, operador de e-mail usado, exclusão por pedido) em `/politica-de-privacidade`.
E-mail não é gravado pelo site: só é repassado ao webhook.
