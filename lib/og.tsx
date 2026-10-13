import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

// Fontes lidas uma vez por processo de build (assets/fonts, licença OFL).
const fontsPromise = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/PlayfairDisplay-900.woff")),
  readFile(join(process.cwd(), "assets/fonts/PlayfairDisplay-700.woff")),
  readFile(join(process.cwd(), "assets/fonts/LibreFranklin-600.woff")),
]);

/**
 * Imagem Open Graph padrão do site (1200x630): fundo branco com filetes de
 * jornal, nome em serifa, título grande em Playfair Display e rodapé com domínio/autor.
 */
export async function renderOgImage({
  title,
  eyebrow,
  footer = "politicadiaria.com.br",
  byline,
}: {
  title: string;
  /** Rótulo pequeno acima do título (categoria, "Notícia", "Review"). */
  eyebrow?: string;
  footer?: string;
  /** Texto à direita no rodapé (ex.: "Por Equipe Política Diária · 27 set 2026"). */
  byline?: string;
}) {
  const [black, bold, label] = await fontsPromise;
  const size = title.length > 90 ? 48 : title.length > 60 ? 56 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          backgroundColor: "#FFFFFF",
          color: "#121212",
          fontFamily: "Playfair Display",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 6, backgroundColor: "#121212" }} />
          <div style={{ display: "flex", height: 2, marginTop: 4, backgroundColor: "#121212" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 22,
            }}
          >
            <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1 }}>Política Diária</span>
            {eyebrow && (
              <span
                style={{
                  fontFamily: "Libre Franklin",
                  fontSize: 20,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#1E40AF",
                }}
              >
                {eyebrow}
              </span>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: size,
            fontWeight: 700,
            lineHeight: 1.14,
            letterSpacing: -1,
            color: "#121212",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #121212",
            paddingTop: 16,
            fontFamily: "Libre Franklin",
            fontSize: 20,
            color: "#5A5A55",
          }}
        >
          <span>{footer}</span>
          {byline && <span>{byline}</span>}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Playfair Display", data: black, weight: 900, style: "normal" },
        { name: "Playfair Display", data: bold, weight: 700, style: "normal" },
        { name: "Libre Franklin", data: label, weight: 600, style: "normal" },
      ],
    }
  );
}
