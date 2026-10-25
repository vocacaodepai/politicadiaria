import { newsletterEnabled, subscribeToNewsletter } from "@/lib/newsletter";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!newsletterEnabled()) {
    return Response.json({ ok: false, error: "Inscrição em breve." }, { status: 503 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }
  const { email, consent, company, startedAt } = (body ?? {}) as Record<string, unknown>;
  // Honeypot e envio rápido demais: finge sucesso / recusa, sem repassar nada.
  if (typeof company === "string" && company.trim() !== "") return Response.json({ ok: true });
  if (typeof startedAt === "number" && Date.now() - startedAt < 1500) {
    return Response.json({ ok: false, error: "Envio muito rápido, tente novamente." }, { status: 400 });
  }
  if (typeof email !== "string" || email.length > 190 || !EMAIL_RE.test(email.trim())) {
    return Response.json({ ok: false, error: "E-mail inválido." }, { status: 400 });
  }
  if (consent !== true) {
    return Response.json({ ok: false, error: "Marque a ciência do aviso de privacidade." }, { status: 400 });
  }
  try {
    const ok = await subscribeToNewsletter(email.trim().toLowerCase(), "resumo-da-manha");
    if (!ok) return Response.json({ ok: false, error: "Não foi possível registrar agora." }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Não foi possível registrar agora." }, { status: 502 });
  }
}
