/**
 * Marca da Política Diária: nome em serifa de alto contraste (como cabeçalho de
 * jornal) e um monograma "PD" para favicon e redes sociais. Sem símbolo, sem
 * degradê. O wordmark do site é texto (Playfair Display); o monograma é SVG
 * com fonte serifada de sistema, para renderizar em qualquer lugar.
 */
export const LOGO_VIEWBOX = "0 0 32 32";
const SERIF = "Georgia, 'Times New Roman', serif";

/**
 * SVG do monograma como string (favicon, OG e arquivos em public/).
 * `background` desenha o quadrado atrás (sem cantos arredondados).
 */
export function logoIconSvg({
  size = 32,
  color = "#121212",
  background,
}: {
  size?: number;
  color?: string;
  background?: string;
} = {}): string {
  const bg = background ? `<rect width="32" height="32" fill="${background}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${LOGO_VIEWBOX}" role="img" aria-label="Política Diária">${bg}<text x="16" y="23.2" text-anchor="middle" font-family="${SERIF}" font-weight="700" font-size="19" letter-spacing="-1" fill="${color}">PD</text><path d="M7 26.6H25" stroke="${color}" stroke-width="1.2"/></svg>`;
}
