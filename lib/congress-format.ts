/** Utilitários puros (sem fs): seguros para componentes de cliente. */

export function partySlug(sigla: string): string {
  return sigla
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ---------------------------------------------------------------- formatos */

export const UF_NAMES: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará", DF: "Distrito Federal",
  ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais",
  PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
};

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const brl0 = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const formatBRL = (v: number) => brl.format(v);
export const formatBRLShort = (v: number) => brl0.format(v);
export const formatInt = (v: number) => v.toLocaleString("pt-BR");
export const formatPct = (v: number, digits = 1) => `${v.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
export const pct = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0);

export function formatBirth(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "long", year: "numeric" });
}

export function initials(name: string): string {
  const parts = name.split(/\s+/).filter((p) => p.length > 2 || /^[A-ZÀ-Ú]/.test(p));
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  return `${m}/${y}`;
}

/** Rede social a partir da URL (rótulo neutro). */
export function socialLabel(url: string): string {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("twitter") || h === "x.com") return "X (Twitter)";
    if (h.includes("facebook")) return "Facebook";
    if (h.includes("youtube")) return "YouTube";
    if (h.includes("tiktok")) return "TikTok";
    if (h.includes("linkedin")) return "LinkedIn";
    if (h.includes("kwai")) return "Kwai";
    if (h.includes("t.me") || h.includes("telegram")) return "Telegram";
    return h;
  } catch {
    return "Link";
  }
}

export function safeExternalUrl(url: string): string | null {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}
