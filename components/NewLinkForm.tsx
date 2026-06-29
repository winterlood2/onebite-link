"use client";

import { useState } from "react";

export default function NewLinkForm() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 저장 로직
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[var(--card-bg)] rounded-lg border border-[var(--border)] p-8 flex flex-col gap-6"
      >
        <h2 className="text-xl font-semibold text-[var(--text)]">새 링크 추가</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
            링크 주소
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="input-field"
          />
        </div>
        <button
          type="submit"
          className="btn-primary text-sm font-medium py-2.5 rounded-md cursor-pointer"
        >
          저장
        </button>
      </form>
    </div>
  );
}
