"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type Item = { href: string; label: string; description?: string };

/**
 * Menu lateral do mobile em <dialog> nativo (showModal): foco preso, Esc fecha,
 * foco devolvido ao botão e nada de containing block do header com backdrop-filter.
 */
export function MobileMenu({
  primary,
  categories,
  institutional,
}: {
  primary: Item[];
  categories: Item[];
  institutional: Item[];
}) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Guarda em qual rota o menu foi aberto: ao navegar, ele se considera fechado.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenedAt(pathname)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground lg:hidden"
        aria-label="Abrir menu"
        aria-expanded={open}
        aria-controls="menu-mobile"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        id="menu-mobile"
        aria-label="Menu"
        onClose={() => setOpenedAt(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpenedAt(null);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/60 backdrop:backdrop-blur-sm lg:hidden"
      >
        <div className="ml-auto flex h-full w-[86%] max-w-sm flex-col overflow-y-auto border-l border-border bg-surface p-5 text-foreground shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="label-mono text-muted">Menu</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpenedAt(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground"
                aria-label="Fechar menu"
                autoFocus
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="mt-6 space-y-1" aria-label="Principal">
            {primary.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="block rounded-lg px-3 py-2.5 font-display text-lg font-semibold hover:bg-surface-2"
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <p className="label-mono mt-6 px-3 text-muted">Temas dos livros</p>
          <nav className="mt-2 space-y-1" aria-label="Categorias">
            {categories.map((c) => (
              <Link key={c.href} href={c.href} className="block rounded-lg px-3 py-2 hover:bg-surface-2">
                <span className="block text-[15px] font-medium">{c.label}</span>
                {c.description && <span className="block text-xs text-muted">{c.description}</span>}
              </Link>
            ))}
          </nav>

          <p className="label-mono mt-6 px-3 text-muted">Institucional</p>
          <nav className="mt-2 space-y-1 pb-8" aria-label="Institucional">
            {institutional.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      </dialog>
    </>
  );
}
