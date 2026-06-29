import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/lib/data";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
          <LinkGrid links={links} />
        </main>
      </div>
    </div>
  );
}
