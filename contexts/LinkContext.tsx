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
};

const LinkContext = createContext<LinkContextType | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  function addLink(link: Omit<Link, "id">) {
    const newLink: Link = { id: Date.now(), ...link };
    setLinks((prev) => [newLink, ...prev]);
  }

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinks must be used within LinkProvider");
  return ctx;
}
