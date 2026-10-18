export const revalidate = 300;

import { AgendaPage, agendaMetadata } from "@/components/eleicoes/AgendaPage";

export const metadata = agendaMetadata();

export default function Page() {
  return <AgendaPage />;
}
