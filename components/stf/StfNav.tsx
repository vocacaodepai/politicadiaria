import Link from "next/link";

type Current = "composicao" | "julgamentos" | "agenda";

const seg = (active: boolean) =>
  `inline-flex h-10 items-center border px-4 font-mono text-xs font-semibold uppercase tracking-wide transition ${
    active ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-foreground hover:border-foreground"
  }`;

/** Seletor "Composição | Julgamentos | Agenda" das páginas do Supremo. */
export function StfNav({ current }: { current: Current }) {
  const items: { id: Current; href: string; label: string }[] = [
    { id: "composicao", href: "/stf", label: "Composição" },
    { id: "julgamentos", href: "/stf/julgamentos", label: "Julgamentos" },
    { id: "agenda", href: "/stf/agenda", label: "Agenda" },
  ];
  return (
    <nav aria-label="Seções do Supremo" className="inline-flex flex-wrap">
      {items.map((it, i) => (
        <Link key={it.id} href={it.href} className={`${seg(current === it.id)} ${i ? "-ml-px" : ""}`} aria-current={current === it.id ? "page" : undefined}>
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
