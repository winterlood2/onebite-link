import Link from "next/link";

export default function Header() {
  return (
    <header className="header-nav flex items-center justify-between px-4 h-12 border-b border-[var(--border)] shrink-0">
      <span className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </span>
      <Link
        href="/new"
        className="btn-accent px-4 py-1.5 text-sm font-medium rounded-[6px]"
      >
        + 새 링크
      </Link>
    </header>
  );
}
