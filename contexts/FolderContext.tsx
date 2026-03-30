"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { folders as initialFolders } from "@/lib/data";

type Folder = { id: number; name: string };

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => void;
  deleteFolder: (id: number) => void;
  renameFolder: (id: number, name: string) => void;
};

const FolderContext = createContext<FolderContextType | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  function addFolder(name: string) {
    const newFolder: Folder = {
      id: Date.now(),
      name,
    };
    setFolders((prev) => [...prev, newFolder]);
  }

  function deleteFolder(id: number) {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  function renameFolder(id: number, name: string) {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder, deleteFolder, renameFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders must be used within FolderProvider");
  return ctx;
}
