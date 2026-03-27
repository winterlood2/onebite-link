type LinkCardProps = {
  title: string;
  url: string;
  description: string;
  folder: string;
};

export default function LinkCard({ title, url, description, folder }: LinkCardProps) {
  return (
    <div className="card-hover flex flex-col gap-3 p-4 bg-[var(--card)] rounded-[8px] border border-[var(--border)] transition-colors">
      <span className="self-start text-[13px] px-2 py-0.5 rounded-[4px] bg-[var(--hover-bg)] text-[var(--text)]">
        {folder}
      </span>
      <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-1">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-sub)] line-clamp-2 leading-relaxed">
        {description}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[var(--accent)] hover:underline truncate mt-auto transition-colors"
      >
        {url}
      </a>
    </div>
  );
}
