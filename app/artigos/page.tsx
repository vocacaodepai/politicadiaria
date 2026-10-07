import type { Metadata } from "next";
import { ArtigosPage, artigosMetadata } from "@/components/listing/ArtigosPage";

export const metadata: Metadata = artigosMetadata(1);

export default function Page() {
  return <ArtigosPage page={1} />;
}
