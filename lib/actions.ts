"use server";

import { revalidatePath } from "next/cache";
import { readLinks, writeLinks } from "./store";

export async function addLink(data: {
  title: string;
  url: string;
  description: string;
  image: string | null;
  folder: string;
}) {
  const links = await readLinks();
  const id = Math.random().toString(36).slice(2, 9);
  links.unshift({ id, ...data });
  await writeLinks(links);
  revalidatePath("/");
}

export async function deleteLink(id: string) {
  const links = await readLinks();
  await writeLinks(links.filter((l) => l.id !== id));
  revalidatePath("/");
}
