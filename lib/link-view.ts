import type { LinkRow } from "@/lib/links";

export interface LinkView {
  id: string;
  title: string;
  url: string;
  description: string;
  image: string | null;
  folder: string;
}

export function toLinkView(row: LinkRow): LinkView {
  return {
    id: String(row.id),
    title: row.title ?? row.url,
    url: row.url,
    description: row.description ?? "",
    image: row.thumbnail_url,
    folder: row.folder_id != null ? String(row.folder_id) : "",
  };
}
