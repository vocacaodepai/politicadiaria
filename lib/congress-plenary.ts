/**
 * Utilitários puros (sem fs) da visão de plenário: layout de hemiciclo e paleta por partido.
 * Seguros para componentes de cliente.
 */

export type PlenaryRow = {
  /** slug; o id é o número final */
  s: string;
  n: string;
  p: string;
  u: string;
  /** bloco parlamentar (Senado) */
  b?: string;
  /** URL de foto fora do padrão oficial; 0 = sem foto */
  f?: string | 0;
  /** condição quando não é titular */
  c?: string;
};

export type PlenaryData = {
  atualizadoEm: string;
  legislatura: number;
  camara: PlenaryRow[];
  senado: PlenaryRow[];
  federacoes: { nome: string; partidos: string[] }[];
};

export type Seat = { x: number; y: number };

export type Hemicycle = { seats: Seat[]; dot: number; width: number; height: number; rows: number };

const VIEW_W = 1000;
const MARGIN = 14;

/**
 * Hemiciclo clássico: fileiras concêntricas, cada uma com assentos proporcionais ao raio.
 * Os assentos são ordenados pelo ângulo (da esquerda para a direita), de modo que cada
 * partido ocupa uma fatia contínua. Devolve exatamente `n` posições.
 */
export function hemicycleLayout(n: number): Hemicycle {
  const inner = 0.32;
  // Escolhe o número de fileiras que deixa o espaçamento radial parecido com o angular.
  let best = { rows: 3, score: Infinity };
  for (let rows = 2; rows <= Math.max(2, Math.min(20, Math.floor(n / 2))); rows++) {
    const step = (1 - inner) / (rows - 1);
    const sumR = rows * inner + (step * rows * (rows - 1)) / 2;
    const arc = (Math.PI * sumR) / n;
    const score = Math.abs(Math.log(arc / step));
    if (score < best.score) best = { rows, score };
  }
  const rows = best.rows;
  const radii = Array.from({ length: rows }, (_, i) => inner + ((1 - inner) * i) / (rows - 1));
  const sumR = radii.reduce((a, b) => a + b, 0);
  const counts = radii.map((r) => Math.max(1, Math.floor((n * r) / sumR)));
  let diff = n - counts.reduce((a, b) => a + b, 0);
  // Distribui o resto começando pelas fileiras externas, que são mais largas.
  for (let i = rows - 1; diff > 0; i = i === 0 ? rows - 1 : i - 1, diff--) counts[i]++;
  for (let guard = 0, i = rows - 1; diff < 0 && guard < 10_000; guard++, i = i === 0 ? rows - 1 : i - 1) {
    if (counts[i] > 1) {
      counts[i]--;
      diff++;
    }
  }

  const raw: { a: number; r: number }[] = [];
  radii.forEach((r, i) => {
    const m = counts[i];
    for (let j = 0; j < m; j++) raw.push({ a: m === 1 ? Math.PI / 2 : (Math.PI * j) / (m - 1), r });
  });
  raw.sort((p, q) => p.a - q.a || p.r - q.r);

  const R = (VIEW_W - 2 * MARGIN) / 2;
  const cx = VIEW_W / 2;
  const cy = MARGIN + R;
  const step = ((1 - inner) / (rows - 1)) * R;
  const arcMin = Math.min(...radii.map((r, i) => (Math.PI * r * R) / Math.max(1, counts[i] - 1)));
  const dot = Math.max(3, Math.min(step, arcMin) * 0.4);
  const seats = raw.map(({ a, r }) => ({ x: round(cx - Math.cos(a) * r * R), y: round(cy - Math.sin(a) * r * R) }));
  return { seats, dot: round(dot), width: VIEW_W, height: Math.round(cy + dot + MARGIN / 2), rows };
}

const round = (v: number) => Math.round(v * 10) / 10;

/** Matiz estável por partido (ângulo áureo sobre a posição na lista alfabética global). */
export function partyHue(index: number): number {
  return Math.round((index * 137.508 + 212) % 360);
}

/** Uma de três faixas de luminosidade, para separar fatias vizinhas de matiz parecido. */
export function partyBand(index: number): 0 | 1 | 2 {
  return (index % 3) as 0 | 1 | 2;
}

export const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function idFromRowSlug(slug: string): number | null {
  const m = /-(\d+)$/.exec(slug);
  return m ? Number(m[1]) : null;
}

export function officialPhoto(casa: "camara" | "senado", row: PlenaryRow): { url: string } | null {
  if (row.f === 0) return null;
  if (typeof row.f === "string") return { url: row.f };
  const id = idFromRowSlug(row.s);
  if (id === null) return null;
  return {
    url: casa === "camara" ? `https://www.camara.leg.br/internet/deputado/bandep/${id}.jpg` : `https://www.senado.leg.br/senadores/img/fotos-oficiais/senador${id}.jpg`,
  };
}
