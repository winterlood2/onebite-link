import LinkCard from "./LinkCard";

interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  image?: string | null;
  folder: string;
}

export default function LinkGrid({ links }: { links: Link[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
