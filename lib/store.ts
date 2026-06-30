import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "links.json");

export interface LinkData {
  id: string;
  title: string;
  url: string;
  description: string;
  image: string | null;
  folder: string;
}

export async function readLinks(): Promise<LinkData[]> {
  try {
    const content = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(content) as LinkData[];
  } catch {
    return [];
  }
}

export async function writeLinks(links: LinkData[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2), "utf-8");
}
