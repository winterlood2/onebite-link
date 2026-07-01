"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { readLinks, writeLinks } from "./store";

export async function addLink(data: {
  title: string;
  url: string;
  description: string;
  image: string | null;
  folderId: number | null;
}) {
  const supabase = createClient(await cookies());
  const { error } = await supabase.from("links").insert({
    url: data.url,
    title: data.title,
    description: data.description,
    thumbnail_url: data.image,
    folder_id: data.folderId,
  });

  if (error) throw error;
  revalidatePath("/", "layout");
}

export async function deleteLink(id: string) {
  const links = await readLinks();
  await writeLinks(links.filter((l) => l.id !== id));
  revalidatePath("/");
}

export async function updateLink(
  id: string,
  data: { title: string; description: string; folder: string }
) {
  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("links")
    .update({
      title: data.title,
      description: data.description,
      folder_id: data.folder ? Number(data.folder) : null,
    })
    .eq("id", Number(id));

  if (error) throw error;
  revalidatePath("/", "layout");
}
