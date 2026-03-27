"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { folders } from "@/lib/data";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 border-r border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 flex flex-col gap-1 p-3">
      <Link
        href="/"
        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          pathname === "/"
            ? "bg-blue-600 text-white"
            : "text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-800"
        }`}
      >
        All
      </Link>
      <div className="mt-2 flex flex-col gap-1">
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/folder/${folder.id}`}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === `/folder/${folder.id}`
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-800"
            }`}
          >
            {folder.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
