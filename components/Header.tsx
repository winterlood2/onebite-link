import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-12 flex items-center justify-between px-4 bg-white/80 backdrop-blur-[8px] border-b border-[var(--border)] shrink-0">
      <Link href="/" className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="btn-primary flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-md"
      >
        + Add Link
      </Link>
    </header>
  );
}
