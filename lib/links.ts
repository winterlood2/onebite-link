"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export interface LinkRow {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
  created_at: string;
}

export async function getLinks(): Promise<LinkRow[]> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
