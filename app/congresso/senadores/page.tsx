import { DirectoryPage, directoryMetadata } from "@/components/congresso/DirectoryPage";

export const metadata = directoryMetadata("senado");

export default function Page() {
  return <DirectoryPage casa="senado" />;
}
