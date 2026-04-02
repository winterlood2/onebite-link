"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { links as initialLinks } from "@/lib/data";

export type Link = {
  id: number;
  title: string;
  url: string;
  description: string;
  folder: string;
  thumbnail?: string;
};

type LinkContextType = {
  links: Link[];
  addLink: (link: Omit<Link, "id">) => void;
  deleteLink: (id: number) => void;
  updateLink: (id: number, fields: Pick<Link, "title" | "description" | "folder">) => void;
};

const LinkContext = createContext<LinkContextType | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  function addLink(link: Omit<Link, "id">) {
    const newLink: Link = { id: Date.now(), ...link };
    setLinks((prev) => [newLink, ...prev]);
  }

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function updateLink(id: number, fields: Pick<Link, "title" | "description" | "folder">) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...fields } : l)));
  }

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink, updateLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinks must be used within LinkProvider");
  return ctx;
}
