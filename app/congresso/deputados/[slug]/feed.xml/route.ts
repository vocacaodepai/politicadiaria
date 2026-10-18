import { FEED_HEADERS, deputyFeed } from "@/lib/congress-feed";
import { deputyParams, getDeputy } from "@/lib/congress";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return deputyParams();
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getDeputy(slug);
  if (!p) return new Response("Não encontrado", { status: 404 });
  return new Response(deputyFeed(p), { headers: FEED_HEADERS });
}
