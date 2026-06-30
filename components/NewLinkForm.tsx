"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addLink } from "@/lib/actions";
import { useFolders } from "@/context/FolderContext";

export default function NewLinkForm() {
  const [url, setUrl] = useState("");
  const [folder, setFolder] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const folders = useFolders();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/og?url=${encodeURIComponent(url)}`
        );
        const og = await res.json();

        if (!res.ok) {
          setError("링크 정보를 가져오는 데 실패했습니다.");
          return;
        }

        await addLink({
          title: og.title || url,
          url: og.url || url,
          description: og.description || "",
          image: og.image || null,
          folder,
        });

        router.push("/");
      } catch {
        setError("링크를 저장하는 중 오류가 발생했습니다.");
      }
    });
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
            disabled={isPending}
            className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
            폴더
          </label>
          <select
            id="folder"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            disabled={isPending}
            className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">폴더 없음</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-sm text-[var(--error)]">{error}</p>
        )}

        {isPending && (
          <p className="text-sm text-[var(--text-sub)]">
            링크 정보를 불러오는 중...
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary text-sm font-medium py-2.5 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "저장 중..." : "저장"}
        </button>
      </form>
    </div>
  );
}
