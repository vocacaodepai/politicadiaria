#!/usr/bin/env node
/** Gera app/icon.svg e os SVGs de public/ a partir do monograma em lib/logo.ts. */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const SERIF = "Georgia, 'Times New Roman', serif";

function svg({ color, background, size = 32 }) {
  const bg = background ? `<rect width="32" height="32" fill="${background}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" role="img" aria-label="Política Diária">${bg}<text x="16" y="23.2" text-anchor="middle" font-family="${SERIF}" font-weight="700" font-size="19" letter-spacing="-1" fill="${color}">PD</text><path d="M7 26.6H25" stroke="${color}" stroke-width="1.2"/></svg>`;
}

const out = {
  "app/icon.svg": svg({ color: "#FFFFFF", background: "#121212" }),
  "public/logo.svg": svg({ color: "#121212", size: 512 }),
  "public/logo-dark.svg": svg({ color: "#FFFFFF", size: 512 }),
  "public/logo-mono.svg": svg({ color: "#121212", size: 512 }),
  "public/logo-icon.svg": svg({ color: "#121212", size: 512 }),
  "public/logo-icon-dark.svg": svg({ color: "#FFFFFF", background: "#121212", size: 512 }),
};
for (const [f, c] of Object.entries(out)) writeFileSync(resolve(ROOT, f), c + "\n");
console.log("brand assets:", Object.keys(out).join(", "));
