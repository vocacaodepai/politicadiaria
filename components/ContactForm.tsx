"use client";

import { useState } from "react";

const SUBJECTS = [
  "Correção",
  "Sugestão de pauta",
  "Parceria",
  "Imprensa",
  "Dados pessoais (LGPD)",
  "Outro assunto",
] as const;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
      startedAt,
    };

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Não consegui enviar agora, tente de novo em instantes.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Falha de conexão. Tente de novo em instantes.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-border bg-surface p-5 text-sm">
        <p className="font-semibold text-foreground">Mensagem enviada.</p>
        <p className="mt-1 text-muted">
          Chegou por aqui. Resposta em até 5 dias úteis (pedidos LGPD: até 15 dias).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Campo-armadilha para bot: invisível para humano, nunca deve ser preenchido. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="company">Não preencha este campo</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="label-mono block text-muted">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={120}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="email" className="label-mono block text-muted">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={190}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="subject" className="label-mono block text-muted">
          Assunto
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue={defaultSubject ?? ""}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-accent"
        >
          <option value="" disabled>
            Escolha um assunto
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label-mono block text-muted">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={4000}
          rows={6}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-accent"
        />
      </div>

      {status === "error" && error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
