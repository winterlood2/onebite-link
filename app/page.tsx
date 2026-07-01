import AppLayout from "@/components/AppLayout";
import LinkGrid from "@/components/LinkGrid";
import { readLinks } from "@/lib/store";
import { getFolders } from "@/lib/folders";

export default async function Home() {
  const [links, folders] = await Promise.all([readLinks(), getFolders()]);
  return (
    <AppLayout initialFolders={folders}>
      <LinkGrid links={links} />
    </AppLayout>
  );
}
