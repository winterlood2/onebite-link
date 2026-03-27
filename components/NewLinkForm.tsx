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
      className="flex flex-col gap-5 bg-[var(--card)] rounded-[8px] border border-[var(--border)] p-6 w-full max-w-lg"
    >
      <h2 className="text-xl font-semibold text-[var(--text)]">새 링크 추가</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
          링크
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="input-base"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
          폴더
        </label>
        <select
          id="folder"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          required
          className="input-base"
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
        className="btn-accent mt-1 px-4 py-2 text-sm font-medium rounded-[6px]"
      >
        저장
      </button>
    </form>
  );
}
