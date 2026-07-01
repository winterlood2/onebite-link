import AppLayout from "@/components/AppLayout";
import LinkGrid from "@/components/LinkGrid";
import { readLinks } from "@/lib/store";
import { getFolders } from "@/lib/folders";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const [links, folders] = await Promise.all([readLinks(), getFolders()]);
  const filteredLinks = links.filter((link) => link.folder === folderId);

  return (
    <AppLayout initialFolders={folders}>
      <LinkGrid links={filteredLinks} />
    </AppLayout>
  );
}
