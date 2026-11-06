import { getDebate } from "@/lib/debate-ao-vivo";

// Serve o JSON do build atual. A página consulta esta rota a cada 60 s e passa a mostrar
// a versão nova assim que um novo deploy com o JSON atualizado entra no ar.
export const dynamic = "force-static";

export function GET() {
  return Response.json(getDebate(), {
    headers: { "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
