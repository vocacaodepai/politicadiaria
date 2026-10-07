export const dynamic = "force-static";

/**
 * ads.txt (IAB Tech Lab): lista quem está autorizado a vender inventário de
 * anúncios deste site. Uma linha por vendedor autorizado. Editar aqui, não
 * criar um arquivo estático em public/, para manter tudo versionado junto
 * com o resto da configuração de anúncios.
 */
const ENTRIES = ["google.com, pub-5212610948635761, DIRECT, f08c47fec0942fa0"];

export function GET() {
  return new Response(ENTRIES.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
