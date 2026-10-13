"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { hemicycleLayout, norm, officialPhoto, partyBand, partyHue, type PlenaryData, type PlenaryRow } from "@/lib/congress-plenary";
import { UF_NAMES } from "@/lib/congress-format";
import { ParliamentarianPhoto } from "./Photo";

type Casa = "camara" | "senado";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const PATHS: Record<Casa, string> = { camara: "/congresso/deputados", senado: "/congresso/senadores" };
const NOUN: Record<Casa, { plural: string; singular: string; credit: string }> = {
  camara: { plural: "deputados federais", singular: "deputado federal", credit: "Câmara dos Deputados" },
  senado: { plural: "senadores", singular: "senador", credit: "Senado Federal" },
};

let dataPromise: Promise<PlenaryData> | null = null;
function loadData(): Promise<PlenaryData> {
  if (!dataPromise) {
    dataPromise = fetch(`${BASE}/data/congresso/plenario.json`).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });
    dataPromise.catch(() => {
      dataPromise = null;
    });
  }
  return dataPromise;
}

type Entry = PlenaryRow & { i: number };
type Group = { sigla: string; hue: number; band: 0 | 1 | 2; start: number; n: number };

const field = "h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground";
const seg = (active: boolean) =>
  `inline-flex h-10 items-center border px-4 font-mono text-xs font-semibold uppercase tracking-wide transition ${
    active ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-foreground hover:border-foreground"
  }`;

export function PlenaryExplorer() {
  const router = useRouter();
  const [data, setData] = useState<PlenaryData | null>(null);
  const [error, setError] = useState(false);
  const [casa, setCasa] = useState<Casa>("camara");
  const [view, setView] = useState<"plenario" | "lista">("plenario");
  const [party, setParty] = useState("");
  const [uf, setUf] = useState("");
  const [grupo, setGrupo] = useState("");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<number | null>(null);
  const [hover, setHover] = useState<{ i: number; x: number; y: number; w: number } | null>(null);
  const [ready, setReady] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef<string>("mouse");

  useEffect(() => {
    let live = true;
    loadData()
      .then((d) => {
        if (!live) return;
        // Estado inicial a partir do endereço (?casa=senado&partido=PT&uf=SP&vista=lista)
        const p = new URLSearchParams(window.location.search);
        const c = p.get("casa");
        if (c === "senado" || c === "camara") setCasa(c);
        setParty(p.get("partido") ?? "");
        setUf((p.get("uf") ?? "").toUpperCase());
        setGrupo(p.get("grupo") ?? "");
        if (p.get("vista") === "lista") setView("lista");
        setData(d);
        setReady(true);
      })
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const p = new URLSearchParams();
    if (casa !== "camara") p.set("casa", casa);
    if (party) p.set("partido", party);
    if (uf) p.set("uf", uf);
    if (grupo) p.set("grupo", grupo);
    if (view === "lista") p.set("vista", "lista");
    const qs = p.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, [ready, casa, party, uf, grupo, view]);

  // Índice global (ordem alfabética das siglas das duas Casas) para cores estáveis.
  const hueIndex = useMemo(() => {
    const all = new Set<string>();
    if (data) for (const r of [...data.camara, ...data.senado]) all.add(r.p);
    return new Map([...all].sort((a, b) => a.localeCompare(b, "pt-BR")).map((s, i) => [s, i]));
  }, [data]);

  const { entries, groups } = useMemo(() => {
    const rows = data ? data[casa] : [];
    const size = new Map<string, number>();
    for (const r of rows) size.set(r.p, (size.get(r.p) ?? 0) + 1);
    const sorted = [...rows].sort(
      (a, b) => (size.get(b.p) ?? 0) - (size.get(a.p) ?? 0) || a.p.localeCompare(b.p, "pt-BR") || a.u.localeCompare(b.u) || a.n.localeCompare(b.n, "pt-BR"),
    );
    const es: Entry[] = sorted.map((r, i) => ({ ...r, i }));
    const gs: Group[] = [];
    for (const e of es) {
      const last = gs[gs.length - 1];
      if (last && last.sigla === e.p) last.n++;
      else {
        const idx = hueIndex.get(e.p) ?? 0;
        gs.push({ sigla: e.p, hue: partyHue(idx), band: partyBand(idx), start: e.i, n: 1 });
      }
    }
    return { entries: es, groups: gs };
  }, [data, casa, hueIndex]);

  const layout = useMemo(() => hemicycleLayout(Math.max(entries.length, 2)), [entries.length]);

  const federacao = useMemo(() => data?.federacoes.find((f) => f.nome === grupo) ?? null, [data, grupo]);
  const grupoOptions = useMemo(() => {
    if (!data) return [] as string[];
    if (casa === "senado") return [...new Set(data.senado.map((r) => r.b).filter((b): b is string => !!b))].sort((a, b) => a.localeCompare(b, "pt-BR"));
    return data.federacoes.map((f) => f.nome);
  }, [data, casa]);

  const on = useMemo(() => {
    const nq = norm(q.trim());
    const members = federacao ? new Set(federacao.partidos) : null;
    return entries.map(
      (e) =>
        (!party || e.p === party) &&
        (!uf || e.u === uf) &&
        (!grupo || (casa === "senado" ? e.b === grupo : !!members?.has(e.p))) &&
        (!nq || norm(e.n).includes(nq)),
    );
  }, [entries, party, uf, grupo, casa, federacao, q]);
  const filtered = party !== "" || uf !== "" || grupo !== "" || q.trim() !== "";
  const matched = useMemo(() => on.filter(Boolean).length, [on]);

  const parties = useMemo(() => [...groups].sort((a, b) => a.sigla.localeCompare(b.sigla, "pt-BR")), [groups]);
  const ufs = useMemo(() => Object.keys(UF_NAMES).filter((u) => entries.some((e) => e.u === u)), [entries]);

  const changeCasa = (c: Casa) => {
    setCasa(c);
    setParty("");
    setUf("");
    setGrupo("");
    setQ("");
    setSel(null);
    setHover(null);
  };

  const clearAll = () => {
    setParty("");
    setUf("");
    setGrupo("");
    setQ("");
  };

  const open = useCallback(
    (e: Entry) => {
      router.push(`${PATHS[casa]}/${e.s}`);
    },
    [router, casa],
  );

  /** Assento mais próximo do ponto (em px de tela); permite tocar "perto" de um ponto minúsculo. */
  const seatAt = useCallback(
    (clientX: number, clientY: number): number | null => {
      const svg = svgRef.current;
      if (!svg) return null;
      const box = svg.getBoundingClientRect();
      const k = box.width / layout.width;
      const px = (clientX - box.left) / k;
      const py = (clientY - box.top) / k;
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < layout.seats.length; i++) {
        const s = layout.seats[i];
        const d = (s.x - px) ** 2 + (s.y - py) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      const reach = Math.max(layout.dot * 2.2, 16 / k);
      return best >= 0 && bestD <= reach * reach ? best : null;
    },
    [layout],
  );

  const onMove = (ev: PointerEvent<SVGSVGElement>) => {
    pointerType.current = ev.pointerType;
    if (ev.pointerType !== "mouse" && ev.buttons === 0) return;
    const i = seatAt(ev.clientX, ev.clientY);
    const wrap = wrapRef.current?.getBoundingClientRect();
    if (i === null || !wrap || !on[i]) {
      setHover(null);
      return;
    }
    setHover({ i, x: ev.clientX - wrap.left, y: ev.clientY - wrap.top, w: wrap.width });
    if (ev.pointerType !== "mouse") setSel(i);
  };

  const onClick = (ev: React.MouseEvent<SVGSVGElement>) => {
    const i = seatAt(ev.clientX, ev.clientY);
    if (i === null || !on[i]) {
      setSel(null);
      return;
    }
    const touchLike = pointerType.current !== "mouse";
    if (touchLike && sel !== i) {
      setSel(i);
      return;
    }
    open(entries[i]);
  };

  const onKey = (ev: KeyboardEvent<SVGSVGElement>) => {
    const idxs = on.reduce<number[]>((acc, v, i) => (v ? (acc.push(i), acc) : acc), []);
    if (!idxs.length) return;
    const pos = sel === null ? -1 : idxs.indexOf(sel);
    let next: number | null = null;
    if (ev.key === "ArrowRight" || ev.key === "ArrowDown") next = idxs[Math.min(idxs.length - 1, pos + 1)];
    else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") next = idxs[Math.max(0, pos < 0 ? 0 : pos - 1)];
    else if (ev.key === "Home") next = idxs[0];
    else if (ev.key === "End") next = idxs[idxs.length - 1];
    else if (ev.key === "Enter" && sel !== null) {
      ev.preventDefault();
      open(entries[sel]);
      return;
    } else if (ev.key === "Escape") {
      setSel(null);
      return;
    }
    if (next !== null) {
      ev.preventDefault();
      setSel(next);
    }
  };

  if (error) {
    return (
      <div className="border border-border bg-surface p-6 text-sm">
        <p className="font-semibold">Não foi possível carregar a visão de plenário agora.</p>
        <p className="mt-1 text-muted">
          Use a lista completa: <Link className="text-accent underline" href="/congresso/deputados">deputados</Link> ou <Link className="text-accent underline" href="/congresso/senadores">senadores</Link>.
        </p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="border border-border bg-surface p-6" role="status" aria-live="polite">
        <p className="label-mono text-muted">Carregando o plenário…</p>
        <div className="mt-4 h-48 animate-pulse bg-surface-2" aria-hidden="true" />
      </div>
    );
  }

  const noun = NOUN[casa];
  const shown = hover ? entries[hover.i] : null;
  const chosen = sel !== null ? entries[sel] : null;
  const groupLabel = casa === "senado" ? "Bloco parlamentar" : "Federação";
  const tipLeft = hover ? Math.min(Math.max(hover.x, 110), Math.max(110, hover.w - 110)) : 0;
  const summary = groups
    .slice(0, 5)
    .map((g) => `${g.sigla} ${g.n}`)
    .join(", ");

  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <div role="group" aria-label="Casa legislativa" className="inline-flex">
          <button type="button" className={seg(casa === "camara")} aria-pressed={casa === "camara"} onClick={() => changeCasa("camara")}>
            Câmara · 513
          </button>
          <button type="button" className={`${seg(casa === "senado")} -ml-px`} aria-pressed={casa === "senado"} onClick={() => changeCasa("senado")}>
            Senado · 81
          </button>
        </div>
        <div role="group" aria-label="Forma de visualização" className="inline-flex">
          <button type="button" className={seg(view === "plenario")} aria-pressed={view === "plenario"} onClick={() => setView("plenario")}>
            Hemiciclo
          </button>
          <button type="button" className={`${seg(view === "lista")} -ml-px`} aria-pressed={view === "lista"} onClick={() => setView("lista")}>
            Lista acessível
          </button>
        </div>
      </div>

      <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <label className="col-span-2 block lg:col-span-1">
          <span className="label-mono text-muted">Nome</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Destacar por nome" className={`${field} mt-1 w-full`} autoComplete="off" />
        </label>
        <label className="block">
          <span className="label-mono text-muted">Partido</span>
          <select value={party} onChange={(e) => setParty(e.target.value)} className={`${field} mt-1 w-full`}>
            <option value="">Todos</option>
            {parties.map((g) => (
              <option key={g.sigla} value={g.sigla}>
                {g.sigla} ({g.n})
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="label-mono text-muted">Estado (UF)</span>
          <select value={uf} onChange={(e) => setUf(e.target.value)} className={`${field} mt-1 w-full`}>
            <option value="">Todos</option>
            {ufs.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
        <label className="col-span-2 block lg:col-span-1">
          <span className="label-mono text-muted">{groupLabel}</span>
          <select value={grupo} onChange={(e) => setGrupo(e.target.value)} className={`${field} mt-1 w-full`}>
            <option value="">Todos</option>
            {grupoOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </form>

      <p className="mt-4 flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted" aria-live="polite">
        <span>
          {filtered ? (
            <>
              <strong className="text-foreground">{matched}</strong> de {entries.length} {noun.plural} destacados
            </>
          ) : (
            <>
              {entries.length} {noun.plural} em exercício
            </>
          )}
        </span>
        {filtered && (
          <button type="button" onClick={clearAll} className="text-accent underline">
            Limpar filtros
          </button>
        )}
      </p>

      {view === "plenario" ? (
        <>
          <div ref={wrapRef} className="relative mt-3 border border-border bg-surface p-2 sm:p-4">
            <div className="overflow-x-auto" style={{ touchAction: "pan-y" }}>
              <svg
                ref={svgRef}
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                className="plen-svg mx-auto block h-auto w-full"
                style={{ maxWidth: 860 }}
                role="group"
                aria-label={`Hemiciclo com ${entries.length} ${noun.plural}, agrupados por partido. Use as setas do teclado para percorrer e Enter para abrir a ficha. Há também a lista acessível.`}
                tabIndex={0}
                onPointerMove={onMove}
                onPointerDown={(e) => {
                  pointerType.current = e.pointerType;
                }}
                onPointerLeave={() => setHover(null)}
                onClick={onClick}
                onKeyDown={onKey}
              >
                {groups.map((g) => (
                  <g key={g.sigla} className="plen-c plen-party" data-band={g.band} style={{ "--plen-h": g.hue } as CSSProperties}>
                    {entries.slice(g.start, g.start + g.n).map((e) => (
                      <circle
                        key={e.s}
                        cx={layout.seats[e.i].x}
                        cy={layout.seats[e.i].y}
                        r={layout.dot}
                        className="plen-dot"
                        data-off={on[e.i] ? undefined : ""}
                        data-sel={sel === e.i ? "" : undefined}
                      />
                    ))}
                  </g>
                ))}
                {sel !== null && <circle cx={layout.seats[sel].x} cy={layout.seats[sel].y} r={layout.dot * 2} className="plen-ring" />}
              </svg>
            </div>

            {shown && hover && (
              <div className="plen-tip pointer-events-none absolute z-10 flex w-[13.5rem] items-center gap-2.5 border border-foreground bg-surface p-2 shadow-lg" style={{ left: tipLeft, top: Math.max(8, hover.y - 14), transform: "translate(-50%, -100%)" }} role="presentation">
                <ParliamentarianPhoto photo={officialPhoto(casa, shown)} name={shown.n} size={40} />
                <span className="min-w-0 text-left">
                  <span className="block truncate font-display text-sm font-bold leading-tight">{shown.n}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {shown.p} · {shown.u}
                  </span>
                  {shown.c && <span className="block text-[11px] text-muted">{shown.c}</span>}
                </span>
              </div>
            )}

            <p className="mt-2 text-center text-[11px] leading-snug text-muted">
              Cada ponto é {casa === "camara" ? "um deputado" : "um senador"}. A posição segue o tamanho da bancada, da maior para a menor, e <strong className="font-semibold text-foreground">não indica posição política</strong>.
            </p>
          </div>

          <div className="mt-3 min-h-[5.5rem] border border-border bg-surface-2/50 p-3" aria-live="polite">
            {chosen ? (
              <div className="flex items-center gap-3">
                <ParliamentarianPhoto photo={officialPhoto(casa, chosen)} name={chosen.n} size={52} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-lg font-bold leading-tight">{chosen.n}</p>
                  <p className="text-sm text-muted">
                    {chosen.p} · {UF_NAMES[chosen.u] ?? chosen.u}
                    {chosen.b ? ` · ${chosen.b}` : ""}
                    {chosen.c ? ` · ${chosen.c}` : ""}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">{chosen.f === undefined ? `Foto: ${noun.credit}` : chosen.f === 0 ? "Sem foto oficial disponível" : "Foto e crédito na ficha"}</p>
                </div>
                <Link href={`${PATHS[casa]}/${chosen.s}`} className="shrink-0 border border-foreground px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide hover:bg-foreground hover:text-background">
                  Abrir ficha
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted">
                Passe o mouse sobre um ponto para ver quem é e clique para abrir a ficha. No celular, toque no ponto (ou arraste o dedo) e depois em “Abrir ficha”. Com o teclado, foque o gráfico e use as setas.
              </p>
            )}
          </div>
        </>
      ) : null}

      {view === "plenario" ? (
        <div className="mt-5">
          <h2 className="label-mono text-muted">Legenda: clique em um partido para destacá-lo</h2>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {groups.map((g) => {
              const active = party === g.sigla;
              return (
                <li key={g.sigla}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setParty(active ? "" : g.sigla)}
                    className={`plen-c plen-chip inline-flex items-center gap-1.5 border px-2 py-1 text-xs transition ${active ? "border-foreground bg-surface-2 font-semibold" : "border-border bg-surface hover:border-foreground"}`}
                    data-band={g.band}
                    style={{ "--plen-h": g.hue } as CSSProperties}
                  >
                    <span className="plen-swatch inline-block h-3 w-3 rounded-full" aria-hidden="true" />
                    <span>{g.sigla}</span>
                    <span className="font-mono text-muted">{g.n}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <ListView entries={entries} groups={groups} on={on} casa={casa} />
      )}

      <p className="sr-only" aria-live="polite">
        {chosen ? `${chosen.n}, ${chosen.p}, ${chosen.u}. Pressione Enter para abrir a ficha.` : ""}
      </p>
      <p className="mt-4 text-xs text-muted">
        Maiores bancadas: {summary}. Dados oficiais de {data.atualizadoEm.split("-").reverse().join("/")}, 57ª legislatura.
      </p>
    </div>
  );
}

function ListView({ entries, groups, on, casa }: { entries: Entry[]; groups: Group[]; on: boolean[]; casa: Casa }) {
  return (
    <div className="mt-5 space-y-5">
      {groups.map((g) => {
        const rows = entries.slice(g.start, g.start + g.n).filter((e) => on[e.i]);
        if (!rows.length) return null;
        return (
          <section key={g.sigla} aria-labelledby={`pl-${g.sigla}`}>
            <h2 id={`pl-${g.sigla}`} className="plen-c flex items-center gap-2 border-b border-foreground pb-1 font-display text-lg font-bold" data-band={g.band} style={{ "--plen-h": g.hue } as CSSProperties}>
              <span className="plen-swatch inline-block h-3 w-3 rounded-full" aria-hidden="true" />
              {g.sigla}
              <span className="font-mono text-xs font-normal text-muted">
                {rows.length === g.n ? g.n : `${rows.length} de ${g.n}`}
              </span>
            </h2>
            <ul className="mt-2 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((e) => (
                <li key={e.s}>
                  <Link href={`${PATHS[casa]}/${e.s}`} className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
                    {e.n}
                  </Link>{" "}
                  <span className="text-muted">
                    ({e.u}
                    {e.c ? `, ${e.c.toLowerCase()}` : ""})
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
