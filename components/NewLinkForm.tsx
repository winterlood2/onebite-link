"use client";

import { useState } from "react";
import { folders } from "@/lib/data";

export default function NewLinkForm() {
  const [url, setUrl] = useState("");
  const [folder, setFolder] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: save link
    console.log({ url, folder });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6 max-w-lg w-full"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="url"
          className="text-sm font-medium text-gray-700 dark:text-zinc-300"
        >
          링크
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-gray-700 dark:text-zinc-300"
        >
          폴더
        </label>
        <select
          id="folder"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          required
          className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            폴더를 선택하세요
          </option>
          {folders.map((f) => (
            <option key={f.id} value={f.name}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        저장
      </button>
    </form>
  );
}
