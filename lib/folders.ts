"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export interface FolderData {
  id: number;
  name: string;
  created_at: string;
}

export async function getFolders(): Promise<FolderData[]> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function addFolder(name: string): Promise<void> {
  const supabase = createClient(await cookies());
  const { error } = await supabase.from("folders").insert({ name });

  if (error) throw error;
  revalidatePath("/", "layout");
}
