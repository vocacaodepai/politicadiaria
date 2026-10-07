import type { Metadata } from "next";
import { NoticiasPage, noticiasMetadata } from "@/components/listing/NoticiasPage";

export const metadata: Metadata = noticiasMetadata(1);

export default function Page() {
  return <NoticiasPage page={1} />;
}
