/**
 * Geometria da marca "Plenário": um frontão sobre três colunas e uma linha de
 * base, em alusão às casas legislativas. As formas levam o gradiente azul para
 * dourado; a base herda a cor do texto. viewBox 0 0 32 32.
 * Usada pelo componente <Logo/>, pelo favicon e pela imagem Open Graph.
 */
export const LOGO_VIEWBOX = "0 0 32 32";
export const LOGO_BLADES = [
  // frontão
  "M16 3.5L28.5 11H3.5Z",
  // colunas
  "M6.5 13.2H10V23.2H6.5Z",
  "M14.25 13.2H17.75V23.2H14.25Z",
  "M22 13.2H25.5V23.2H22Z",
] as const;
export const LOGO_GROUND = "M4 27.6H28";
/** Do pé da folha (verde-folha) até a ponta (lima). */
export const LOGO_GRADIENT = { from: "#1E40AF", to: "#F59E0B" };

/**
 * SVG da marca como string (para favicon, OG image e arquivos em public/).
 * `mono` desliga o gradiente; `background` desenha o quadrado arredondado atrás.
 */
export function logoIconSvg({
  size = 32,
  color = "#0F1B33",
  mono = false,
  background,
}: {
  size?: number;
  color?: string;
  mono?: boolean;
  background?: string;
} = {}): string {
  const fill = mono ? color : "url(#pd-g)";
  const defs = mono
    ? ""
    : `<defs><linearGradient id="pd-g" x1="0" y1="1" x2="0.35" y2="0"><stop offset="0" stop-color="${LOGO_GRADIENT.from}"/><stop offset="1" stop-color="${LOGO_GRADIENT.to}"/></linearGradient></defs>`;
  const bg = background ? `<rect width="32" height="32" rx="7" fill="${background}"/>` : "";
  const inner = background ? `<g transform="translate(3.2 3.2) scale(0.8)">` : "<g>";
  const blades = LOGO_BLADES.map((d) => `<path d="${d}" fill="${fill}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${LOGO_VIEWBOX}" role="img" aria-label="Política Diária">${defs}${bg}${inner}${blades}<path d="${LOGO_GROUND}" stroke="${color}" stroke-width="2.4" stroke-linecap="round" fill="none"/></g></svg>`;
}
