"use client";

import { createContext, useContext } from "react";

export interface Folder {
  id: string;
  name: string;
  count: number;
}

const FolderContext = createContext<Folder[]>([]);

export function FolderProvider({
  children,
  folders,
}: {
  children: React.ReactNode;
  folders: Folder[];
}) {
  return (
    <FolderContext.Provider value={folders}>{children}</FolderContext.Provider>
  );
}

export function useFolders() {
  return useContext(FolderContext);
}
