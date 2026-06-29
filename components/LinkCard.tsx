interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  folder: string;
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: { link: Link }) {
  const domain = getDomain(link.url);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-link flex flex-col"
    >
      <div className="h-24 bg-[var(--bg)] flex items-center justify-center">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt={link.title}
          className="w-10 h-10 rounded-md"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-[var(--text)] text-sm truncate">
          {link.title}
        </h3>
        <p className="text-xs text-[var(--text-sub)] truncate">{domain}</p>
        {link.description && (
          <p className="text-xs text-[var(--text-sub)] mt-1 line-clamp-2">
            {link.description}
          </p>
        )}
      </div>
    </a>
  );
}
