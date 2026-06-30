"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/context/FolderContext";
import { updateLink } from "@/lib/actions";

interface Link {
  id: string;
  title: string;
  description: string;
  folder: string;
}

interface Props {
  link: Link;
  onClose: () => void;
}

export default function EditLinkModal({ link, onClose }: Props) {
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [folder, setFolder] = useState(link.folder);
  const [isPending, startTransition] = useTransition();
  const folders = useFolders();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      await updateLink(link.id, {
        title: title.trim(),
        description: description.trim(),
        folder,
      });
      router.refresh();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-[var(--card-bg)] border border-[var(--border)] rounded-lg w-full max-w-sm p-6 flex flex-col gap-4">
        <h2 className="text-base font-semibold text-[var(--text)]">링크 수정</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">폴더</label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              disabled={isPending}
              className="input-field"
            >
              <option value="">폴더 없음</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">제목</label>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              rows={3}
              className="input-field resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="btn-secondary text-sm font-medium px-4 py-2 rounded-md"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isPending}
              className="btn-primary px-4 py-2 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
