"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Botões de compartilhar: WhatsApp primeiro (é o Brasil), X, LinkedIn e
 * copiar link com o aviso "Copiado". `url` deve ser absoluta.
 */
export function ShareBar({ url, title, className = "" }: { url: string; title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copie o link:", url);
      return;
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    { label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
  ];
  const btn =
    "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] font-medium text-muted transition hover:border-accent hover:text-accent";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} role="group" aria-label="Compartilhar">
      <span className="label-mono mr-1 text-muted">Compartilhar</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`Compartilhar no ${l.label}`}>
          {l.label}
        </a>
      ))}
      <button type="button" onClick={copyLink} className={btn} aria-live="polite">
        {copied ? "Copiado" : "Copiar link"}
      </button>
    </div>
  );
}
