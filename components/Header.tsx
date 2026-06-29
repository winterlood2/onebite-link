"use client";

import Link from "next/link";

interface Props {
  onNewFolder: () => void;
}

export default function Header({ onNewFolder }: Props) {
  return (
    <header className="sticky top-0 z-10 h-12 flex items-center justify-between px-4 bg-white/80 backdrop-blur-[8px] border-b border-[var(--border)] shrink-0">
      <Link href="/" className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </Link>
      <div className="flex items-center gap-2">
        <button
          onClick={onNewFolder}
          className="btn-secondary text-sm font-medium px-4 py-2 rounded-md"
        >
          새 폴더
        </button>
        <Link href="/new" className="btn-primary text-sm font-medium px-4 py-2 rounded-md">
          새 링크
        </Link>
      </div>
    </header>
  );
}
