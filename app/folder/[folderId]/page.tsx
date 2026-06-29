import AppLayout from "@/components/AppLayout";
import LinkGrid from "@/components/LinkGrid";
import { links } from "@/lib/data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const filteredLinks = links.filter((link) => link.folder === folderId);

  return (
    <AppLayout>
      <LinkGrid links={filteredLinks} />
    </AppLayout>
  );
}
