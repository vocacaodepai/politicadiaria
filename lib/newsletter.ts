/**
 * Newsletter: adaptador de provedor por variáveis de ambiente (nada de chaves no repositório).
 *
 * Abordagem: webhook. Quando NEWSLETTER_WEBHOOK_URL está definida, cada inscrição vira um POST JSON
 * { email, source, consentAt } para essa URL (Zapier, Make, n8n ou uma função própria que grave no
 * provedor de e-mail). NEWSLETTER_WEBHOOK_TOKEN (opcional) vai como "Authorization: Bearer ...".
 * Sem NEWSLETTER_WEBHOOK_URL a newsletter fica desligada: o formulário mostra "inscrição em breve"
 * e a rota de API não coleta nem guarda nada.
 */
export function newsletterEnabled(): boolean {
  return Boolean(process.env.NEWSLETTER_WEBHOOK_URL);
}

export async function subscribeToNewsletter(email: string, source: string): Promise<boolean> {
  const url = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!url) return false;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.NEWSLETTER_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${process.env.NEWSLETTER_WEBHOOK_TOKEN}`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, source, consentAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok;
}
