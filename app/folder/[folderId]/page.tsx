import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/lib/data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const filteredLinks = links.filter((link) => link.folder === folderId);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
          <LinkGrid links={filteredLinks} />
        </main>
      </div>
    </div>
  );
}
