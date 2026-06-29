"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewFolderModal from "@/components/NewFolderModal";
import { folders as initialFolders } from "@/lib/data";

interface Folder {
  id: string;
  name: string;
  count: number;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddFolder = (name: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setFolders((prev) => [...prev, { id, name, count: 0 }]);
    setModalOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header onNewFolder={() => setModalOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">{children}</main>
      </div>
      {modalOpen && (
        <NewFolderModal
          onClose={() => setModalOpen(false)}
          onSave={handleAddFolder}
        />
      )}
    </div>
  );
}
