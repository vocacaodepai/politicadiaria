import { DiaEleicaoPage, diaEleicaoMetadata } from "@/components/eleicoes/DiaEleicaoPage";

export const metadata = diaEleicaoMetadata();

/** ISR: a página é regenerada no máximo a cada 30 s; os fetch ao TSE usam a mesma janela (lib/apuracao.ts). */
export const revalidate = 30;

export default function Page() {
  return <DiaEleicaoPage />;
}
