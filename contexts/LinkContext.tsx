"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

export type Link = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

type LinkContextType = {
  links: Link[];
  addLink: (link: Omit<Link, "id">) => Promise<void>;
  deleteLink: (id: number) => void;
  updateLink: (id: number, fields: Pick<Link, "title" | "description" | "folder_id">) => Promise<void>;
};

const LinkContext = createContext<LinkContextType | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setLinks(data);
      });
  }, []);

  async function addLink(link: Omit<Link, "id">) {
    const supabase = createClient();
    const { data } = await supabase
      .from("links")
      .insert(link)
      .select("id, url, title, description, thumbnail_url, folder_id")
      .single();
    if (data) setLinks((prev) => [data, ...prev]);
  }

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  async function updateLink(id: number, fields: Pick<Link, "title" | "description" | "folder_id">) {
    const supabase = createClient();
    await supabase.from("links").update(fields).eq("id", id);
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
