"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewFolderModal from "@/components/NewFolderModal";
import EditFolderModal from "@/components/EditFolderModal";
import ConfirmModal from "@/components/ConfirmModal";
import { addFolder, type FolderData } from "@/lib/folders";
import { FolderProvider } from "@/context/FolderContext";

interface Folder {
  id: string;
  name: string;
  count: number;
}

function toFolder(data: FolderData): Folder {
  return { id: String(data.id), name: data.name, count: 0 };
}

export default function AppLayout({
  children,
  initialFolders,
}: {
  children: React.ReactNode;
  initialFolders: FolderData[];
}) {
  const router = useRouter();
  const [prevInitialFolders, setPrevInitialFolders] = useState(initialFolders);
  const [folders, setFolders] = useState<Folder[]>(() =>
    initialFolders.map(toFolder)
  );
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const isAddingFolderRef = useRef(false);
  const [editTargetId, setEditTargetId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  if (initialFolders !== prevInitialFolders) {
    setPrevInitialFolders(initialFolders);
    setFolders(initialFolders.map(toFolder));
  }

  const editTarget = folders.find((f) => f.id === editTargetId);
  const deleteTarget = folders.find((f) => f.id === deleteTargetId);

  const handleAddFolder = async (name: string) => {
    if (isAddingFolderRef.current) return;
    isAddingFolderRef.current = true;
    setIsAddingFolder(true);
    try {
      await addFolder(name);
      setNewFolderOpen(false);
      router.refresh();
    } finally {
      isAddingFolderRef.current = false;
      setIsAddingFolder(false);
    }
  };

  const handleRenameFolder = (name: string) => {
    if (!editTargetId) return;
    setFolders((prev) =>
      prev.map((f) => (f.id === editTargetId ? { ...f, name } : f))
    );
    setEditTargetId(null);
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
        <Sidebar
          folders={folders}
          onRequestEdit={setEditTargetId}
          onRequestDelete={setDeleteTargetId}
        />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
            <FolderProvider folders={folders}>{children}</FolderProvider>
          </main>
      </div>

      {newFolderOpen && (
        <NewFolderModal
          onClose={() => setNewFolderOpen(false)}
          onSave={handleAddFolder}
          isSaving={isAddingFolder}
        />
      )}

      {editTarget && (
        <EditFolderModal
          initialName={editTarget.name}
          onClose={() => setEditTargetId(null)}
          onSave={handleRenameFolder}
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
