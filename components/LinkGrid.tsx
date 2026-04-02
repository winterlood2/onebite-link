"use client";

import LinkCard from "@/components/LinkCard";
import { useLinks } from "@/contexts/LinkContext";
import { useFolders } from "@/contexts/FolderContext";

type LinkGridProps = {
  folderId?: string;
};

export default function LinkGrid({ folderId }: LinkGridProps) {
  const { links } = useLinks();
  const { folders } = useFolders();

  const filtered = folderId
    ? (() => {
        const folder = folders.find((f) => f.id === Number(folderId));
        return folder ? links.filter((l) => l.folder === folder.name) : [];
      })()
    : links;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((link) => (
        <LinkCard key={link.id} {...link} />
      ))}
    </div>
  );
}
