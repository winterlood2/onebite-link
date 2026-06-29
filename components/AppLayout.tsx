"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewFolderModal from "@/components/NewFolderModal";
import ConfirmModal from "@/components/ConfirmModal";
import { folders as initialFolders } from "@/lib/data";

interface Folder {
  id: string;
  name: string;
  count: number;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const deleteTarget = folders.find((f) => f.id === deleteTargetId);

  const handleAddFolder = (name: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setFolders((prev) => [...prev, { id, name, count: 0 }]);
    setNewFolderOpen(false);
  };

  const handleDeleteFolder = () => {
    if (!deleteTargetId) return;
    setFolders((prev) => prev.filter((f) => f.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header onNewFolder={() => setNewFolderOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} onRequestDelete={setDeleteTargetId} />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">{children}</main>
      </div>

      {newFolderOpen && (
        <NewFolderModal
          onClose={() => setNewFolderOpen(false)}
          onSave={handleAddFolder}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          title="폴더 삭제"
          message={`"${deleteTarget.name}" 폴더를 삭제할까요?`}
          onConfirm={handleDeleteFolder}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </div>
  );
}
