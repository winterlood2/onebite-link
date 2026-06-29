import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "@/lib/data";

export default function NewPage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
          <NewLinkForm />
        </main>
      </div>
    </div>
  );
}
