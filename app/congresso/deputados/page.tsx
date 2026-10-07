import { DirectoryPage, directoryMetadata } from "@/components/congresso/DirectoryPage";

export const metadata = directoryMetadata("camara");

export default function Page() {
  return <DirectoryPage casa="camara" />;
}
