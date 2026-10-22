/**
 * Selo de verificação das notícias.
 *
 * Se a notícia traz `verification`, vale o que está nela. Se não traz (notícias antigas),
 * o nível é calculado: fonte em domínio oficial = primária; texto com links para 2 ou mais
 * veículos distintos = imprensa; caso contrário, fonte única atribuída. O selo calculado
 * é marcado como `derived` e a página avisa que a classificação é automática.
 */
import type { NewsItem, VerificationLevel } from "@/lib/types";

const OFFICIAL_SUFFIXES = [".gov.br", ".leg.br", ".jus.br", ".mil.br", ".mp.br", ".def.br", ".gov", ".europa.eu"];
const OFFICIAL_HOSTS = new Set(["un.org", "news.un.org", "imf.org", "worldbank.org", "oecd.org", "who.int", "wto.org", "nato.int", "bcb.gov.br"]);

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\d*\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function isOfficialHost(host: string): boolean {
  if (!host) return false;
  if (OFFICIAL_HOSTS.has(host)) return true;
  return OFFICIAL_SUFFIXES.some((s) => host.endsWith(s));
}

export const verificationMeta: Record<VerificationLevel, { label: string; text: string }> = {
  primaria: { label: "Fonte primária conferida", text: "Os fatos centrais foram checados em documento ou página de órgão oficial." },
  imprensa: { label: "Apoiada em imprensa identificada", text: "Os fatos vêm de veículos de imprensa identificados, citados e linkados no texto." },
  unica: { label: "Fonte única, atribuída", text: "Os fatos vêm de uma única fonte, atribuída no texto. Ainda não há segunda confirmação aberta." },
};

export type ResolvedVerification = {
  level: VerificationLevel;
  label: string;
  text: string;
  notes?: string;
  unverified: string[];
  derived: boolean;
};

function externalHosts(html: string): Set<string> {
  const hosts = new Set<string>();
  const re = /href="(https?:\/\/[^"]+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const h = hostOf(m[1]);
    if (h && !h.endsWith("politicadiaria.com.br") && !h.includes("amazon.com.br")) hosts.add(h);
  }
  return hosts;
}

export function computeLevel(n: Pick<NewsItem, "sourceUrl" | "content">): VerificationLevel {
  if (isOfficialHost(hostOf(n.sourceUrl))) return "primaria";
  const hosts = externalHosts(n.content ?? "");
  const src = hostOf(n.sourceUrl);
  if (src) hosts.add(src);
  return hosts.size >= 2 ? "imprensa" : "unica";
}

export function resolveVerification(n: NewsItem): ResolvedVerification {
  const v = n.verification;
  const level = v?.level ?? computeLevel(n);
  return {
    level,
    ...verificationMeta[level],
    notes: v?.notes,
    unverified: v?.unverified ?? [],
    derived: !v,
  };
}
