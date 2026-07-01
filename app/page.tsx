import AppLayout from "@/components/AppLayout";
import LinkGrid from "@/components/LinkGrid";
import { getLinks } from "@/lib/links";
import { toLinkView } from "@/lib/link-view";
import { getFolders } from "@/lib/folders";

export default async function Home() {
  const [links, folders] = await Promise.all([getLinks(), getFolders()]);
  return (
    <AppLayout initialFolders={folders}>
      <LinkGrid links={links.map(toLinkView)} />
    </AppLayout>
  );
}
