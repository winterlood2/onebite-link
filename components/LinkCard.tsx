type LinkCardProps = {
  title: string;
  url: string;
  description: string;
  folder: string;
};

export default function LinkCard({ title, url, description, folder }: LinkCardProps) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium">
          {folder}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
        {title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2">
        {description}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-500 hover:underline truncate mt-auto"
      >
        {url}
      </a>
    </div>
  );
}
