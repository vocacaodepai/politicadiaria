#!/usr/bin/env node
/** Gera app/icon.svg e os SVGs de public/ a partir da geometria em lib/logo.ts. */
import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const src = readFileSync(resolve(ROOT, "lib/logo.ts"), "utf8");
const blades = [.../LOGO_BLADES = \[([\s\S]*?)\] as const/.exec(src)[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const ground = /LOGO_GROUND = "([^"]+)"/.exec(src)[1];
const from = /from: "(#[0-9A-Fa-f]{6})"/.exec(src)[1];
const to = /to: "(#[0-9A-Fa-f]{6})"/.exec(src)[1];

function svg({ color, mono, background, size = 32 }) {
  const fill = mono ? color : "url(#pd-g)";
  const defs = mono
    ? ""
    : `<defs><linearGradient id="pd-g" x1="0" y1="1" x2="0.35" y2="0"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>`;
  const bg = background ? `<rect width="32" height="32" rx="7" fill="${background}"/>` : "";
  const g = background ? `<g transform="translate(3.2 3.2) scale(0.8)">` : "<g>";
  const paths = blades.map((d) => `<path d="${d}" fill="${fill}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" role="img" aria-label="Política Diária">${defs}${bg}${g}${paths}<path d="${ground}" stroke="${color}" stroke-width="2.4" stroke-linecap="round" fill="none"/></g></svg>`;
}

const out = {
  "app/icon.svg": svg({ color: "#FFFFFF", background: "#0A1224" }),
  "public/logo.svg": svg({ color: "#0F1B33", size: 512 }),
  "public/logo-dark.svg": svg({ color: "#FFFFFF", size: 512 }),
  "public/logo-mono.svg": svg({ color: "#0F1B33", mono: true, size: 512 }),
  "public/logo-icon.svg": svg({ color: "#0F1B33", size: 512 }),
  "public/logo-icon-dark.svg": svg({ color: "#FFFFFF", background: "#0A1224", size: 512 }),
};
for (const [f, c] of Object.entries(out)) writeFileSync(resolve(ROOT, f), c + "\n");
console.log("brand assets:", Object.keys(out).join(", "));
