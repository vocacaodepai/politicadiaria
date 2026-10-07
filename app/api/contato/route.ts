import { Resend } from "resend";
import { author } from "@/lib/author";

export const runtime = "nodejs";

const MAX_LEN = { name: 120, email: 190, subject: 120, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Escapa texto do usuário antes de embutir no HTML do e-mail. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return Response.json({ ok: false, error: "Corpo inválido." }, { status: 400 });
  }

  const { name, email, subject, message, company, startedAt } = body as Record<string, unknown>;

  // Honeypot: campo invisível que só bot preenche. Finge sucesso pra não entregar a armadilha.
  if (typeof company === "string" && company.trim() !== "") {
    return Response.json({ ok: true });
  }
  // Formulário respondido rápido demais (< 2s) é sinal forte de bot.
  if (typeof startedAt === "number" && Date.now() - startedAt < 2000) {
    return Response.json({ ok: false, error: "Envio muito rápido, tente novamente." }, { status: 400 });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim()
  ) {
    return Response.json({ ok: false, error: "Preencha todos os campos." }, { status: 400 });
  }
  if (
    name.length > MAX_LEN.name ||
    email.length > MAX_LEN.email ||
    subject.length > MAX_LEN.subject ||
    message.length > MAX_LEN.message
  ) {
    return Response.json({ ok: false, error: "Algum campo passou do tamanho máximo." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return Response.json({ ok: false, error: "E-mail inválido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contato: RESEND_API_KEY não configurada");
    return Response.json({ ok: false, error: "Envio indisponível no momento." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const safeName = name.trim();
  const safeEmail = email.trim();
  const safeSubject = subject.trim();
  const safeMessage = message.trim();

  try {
    const { error } = await resend.emails.send({
      from: `Política Diária <${author.email}>`,
      to: [author.email],
      replyTo: safeEmail,
      subject: `[Política Diária] ${safeSubject} — ${safeName}`,
      text: `De: ${safeName} <${safeEmail}>\nAssunto: ${safeSubject}\n\n${safeMessage}`,
      html: `
        <p><strong>De:</strong> ${escapeHtml(safeName)} &lt;${escapeHtml(safeEmail)}&gt;</p>
        <p><strong>Assunto:</strong> ${escapeHtml(safeSubject)}</p>
        <p>${escapeHtml(safeMessage).replace(/\n/g, "<br>")}</p>
      `,
    });
    if (error) {
      console.error("contato: erro do Resend", error);
      return Response.json({ ok: false, error: "Não consegui enviar agora, tente de novo em instantes." }, { status: 502 });
    }
  } catch (err) {
    console.error("contato: falha ao enviar e-mail", err);
    return Response.json({ ok: false, error: "Não consegui enviar agora, tente de novo em instantes." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
