import AppLayout from "@/components/AppLayout";
import LinkGrid from "@/components/LinkGrid";
import { getLinks } from "@/lib/links";
import { toLinkView } from "@/lib/link-view";
import { getFolders } from "@/lib/folders";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const [links, folders] = await Promise.all([getLinks(), getFolders()]);
  const filteredLinks = links
    .filter((link) => String(link.folder_id ?? "") === folderId)
    .map(toLinkView);

  return (
    <AppLayout initialFolders={folders}>
      <LinkGrid links={filteredLinks} />
    </AppLayout>
  );
}
