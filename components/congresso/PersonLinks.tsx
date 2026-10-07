export function PersonLinks({ links }: { links: { label: string; url: string }[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2 text-xs">
      {links.map((l) => (
        <li key={l.url}>
          <a
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border bg-surface px-3 py-1.5 font-mono font-medium text-muted transition hover:border-accent/50 hover:text-accent"
          >
            {l.label} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}
