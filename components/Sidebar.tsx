"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFolders } from "@/contexts/FolderContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { folders } = useFolders();

  return (
    <aside className="w-52 shrink-0 border-r border-[var(--border)] bg-[var(--card)] flex flex-col gap-0.5 p-3">
      <Link
        href="/"
        className={`block px-3 py-2 rounded-[6px] text-sm font-medium transition-colors ${
          pathname === "/"
            ? "bg-[var(--accent)] text-white"
            : "text-[var(--text)] nav-item"
        }`}
      >
        전체
      </Link>
      <div className="mt-2 flex flex-col gap-0.5">
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/folder/${folder.id}`}
            className={`block px-3 py-2 rounded-[6px] text-sm transition-colors ${
              pathname === `/folder/${folder.id}`
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--text)] nav-item"
            }`}
          >
            {folder.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
