import AppLayout from "@/components/AppLayout";
import LinkGrid from "@/components/LinkGrid";
import { readLinks } from "@/lib/store";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const links = await readLinks();
  const filteredLinks = links.filter((link) => link.folder === folderId);

  return (
    <AppLayout>
      <LinkGrid links={filteredLinks} />
    </AppLayout>
  );
}
