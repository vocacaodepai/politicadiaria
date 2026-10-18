import { FEED_HEADERS, senatorFeed } from "@/lib/congress-feed";
import { senatorParams, getSenator } from "@/lib/congress";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return senatorParams();
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getSenator(slug);
  if (!p) return new Response("Não encontrado", { status: 404 });
  return new Response(senatorFeed(p), { headers: FEED_HEADERS });
}
