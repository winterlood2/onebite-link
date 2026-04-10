"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

type Folder = { id: number; name: string };

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
  renameFolder: (id: number, name: string) => Promise<void>;
};

const FolderContext = createContext<FolderContextType | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setFolders(data);
      });
  }, []);

  async function addFolder(name: string) {
    const supabase = createClient();
    const { data } = await supabase
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();
    if (data) setFolders((prev) => [...prev, data]);
  }

  async function deleteFolder(id: number) {
    const supabase = createClient();
    await supabase.from("folders").delete().eq("id", id);
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  async function renameFolder(id: number, name: string) {
    const supabase = createClient();
    await supabase.from("folders").update({ name }).eq("id", id);
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
