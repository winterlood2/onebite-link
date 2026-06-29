"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Folder {
  id: string;
  name: string;
  count: number;
}

export default function Sidebar({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--card-bg)] flex flex-col gap-1 p-3 overflow-y-auto">
      <Link
        href="/"
        className={`px-3 py-2 rounded-md text-sm font-medium flex justify-between items-center ${
          pathname === "/"
            ? "bg-[var(--accent)] text-white"
            : "text-[var(--text)] nav-item"
        }`}
      >
        전체
      </Link>
      <p className="text-xs text-[var(--text-sub)] font-semibold px-3 mt-4 mb-1 uppercase tracking-wider">
        폴더
      </p>
      {folders.map((folder) => {
        const isActive = pathname === `/folder/${folder.id}`;
        return (
          <Link
            key={folder.id}
            href={`/folder/${folder.id}`}
            className={`px-3 py-2 rounded-md text-sm font-medium flex justify-between items-center ${
              isActive
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--text)] nav-item"
            }`}
          >
            <span>{folder.name}</span>
            <span className={`text-xs ${isActive ? "text-white/70" : "text-[var(--text-sub)]"}`}>
              {folder.count}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
