"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFolders } from "@/contexts/FolderContext";
import DeleteFolderModal from "./DeleteFolderModal";

type DeleteTarget = { id: number; name: string };

export default function Sidebar() {
  const pathname = usePathname();
  const { folders } = useFolders();
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  return (
    <>
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
          {folders.map((folder) => {
            const isActive = pathname === `/folder/${folder.id}`;
            return (
              <div key={folder.id} className="group relative flex items-center">
                <Link
                  href={`/folder/${folder.id}`}
                  className={`flex-1 px-3 py-2 rounded-[6px] text-sm transition-colors pr-8 ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--text)] nav-item"
                  }`}
                >
                  {folder.name}
                </Link>
                <button
                  onClick={() => setDeleteTarget({ id: folder.id, name: folder.name })}
                  className={`absolute right-1.5 p-1 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity ${
                    isActive
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-[var(--text-sub)] hover:text-red-500 hover:bg-[var(--hover-bg)]"
                  }`}
                  title="폴더 삭제"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </aside>
      {deleteTarget && (
        <DeleteFolderModal
          folderId={deleteTarget.id}
          folderName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
