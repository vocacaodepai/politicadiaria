"use client";

import Link from "next/link";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

/** Formulário da newsletter. Com `enabled=false` mostra só "inscrição em breve" e não coleta nada. */
export function NewsletterForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [startedAt] = useState(() => Date.now());

  if (!enabled) {
    return (
      <div className="border border-border bg-surface p-5">
        <p className="font-display text-lg font-bold">Newsletter: inscrição em breve</p>
        <p className="mt-1 text-sm text-muted">Ainda não coletamos e-mails. Enquanto isso, acompanhe pelo feed RSS.</p>
      </div>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const d = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(d.get("email") ?? ""),
          consent: d.get("consent") === "on",
          company: String(d.get("company") ?? ""),
          startedAt,
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Não consegui registrar agora.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Falha de conexão. Tente de novo em instantes.");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="border border-border bg-surface p-5 font-semibold">
        Inscrição registrada. Obrigado.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="border border-border bg-surface p-5" aria-label="Receber o resumo por e-mail">
      <p className="font-display text-lg font-bold">Receba o resumo por e-mail</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="nl-email">E-mail</label>
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="seu@email.com"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-base outline-none focus:border-accent"
        />
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-11 shrink-0 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Inscrever"}
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2 text-xs text-muted">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-[var(--accent)]" />
        <span>
          Concordo em receber o resumo por e-mail e li o aviso de privacidade abaixo.
        </span>
      </label>
      <p className="mt-2 text-xs text-muted">
        Aviso de privacidade (LGPD): usamos seu e-mail só para enviar o resumo, não vendemos nem repassamos a terceiros além do
        serviço que envia as mensagens, e você pode pedir a exclusão a qualquer momento pela página de{" "}
        <Link href="/contato" className="underline">contato</Link>. Detalhes na{" "}
        <Link href="/politica-de-privacidade" className="underline">política de privacidade</Link>.
      </p>
      {status === "error" && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
