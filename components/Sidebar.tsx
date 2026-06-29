"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Folder {
  id: string;
  name: string;
  count: number;
}

interface Props {
  folders: Folder[];
  onRequestEdit: (id: string) => void;
  onRequestDelete: (id: string) => void;
}

export default function Sidebar({ folders, onRequestEdit, onRequestDelete }: Props) {
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
          <div key={folder.id} className="group relative">
            <Link
              href={`/folder/${folder.id}`}
              className={`px-3 py-2 rounded-md text-sm font-medium flex justify-between items-center ${
                isActive
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text)] nav-item"
              }`}
            >
              <span>{folder.name}</span>
              <span className={`text-xs transition-opacity group-hover:opacity-0 ${isActive ? "text-white/70" : "text-[var(--text-sub)]"}`}>
                {folder.count}
              </span>
            </Link>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
              <button
                onClick={() => onRequestEdit(folder.id)}
                className="folder-action-btn"
                aria-label={`${folder.name} 폴더 수정`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </button>
              <button
                onClick={() => onRequestDelete(folder.id)}
                className="folder-action-btn folder-action-delete"
                aria-label={`${folder.name} 폴더 삭제`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
