import { apuracaoSnapshot } from "@/lib/eleicoes-extra";

/**
 * JSON público da apuração do 2º turno, lido pelo polling da página /eleicoes/apuracao.
 * Reflete data/eleicoes/ (resultados do TSE coletados por `npm run eleicoes:update`): muda a cada nova publicação
 * dos dados, sem exigir recarregar a página.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(apuracaoSnapshot(), {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=30, stale-while-revalidate=60" },
  });
}
