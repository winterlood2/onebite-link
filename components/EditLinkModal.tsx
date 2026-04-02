"use client";

import { useState } from "react";
import { useLinks } from "@/contexts/LinkContext";
import { useFolders } from "@/contexts/FolderContext";

type Props = {
  linkId: number;
  currentTitle: string;
  currentDescription: string;
  currentFolder: string;
  onClose: () => void;
};

export default function EditLinkModal({
  linkId,
  currentTitle,
  currentDescription,
  currentFolder,
  onClose,
}: Props) {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);
  const [folder, setFolder] = useState(currentFolder);

  const { updateLink } = useLinks();
  const { folders } = useFolders();

  function handleSave() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    updateLink(linkId, { title: trimmedTitle, description: description.trim(), folder });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] rounded-[10px] shadow-lg p-6 w-96 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">링크 수정</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">폴더</label>
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="input-base"
          >
            {folders.map((f) => (
              <option key={f.id} value={f.name}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">제목</label>
          <input
            className="input-base"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">설명</label>
          <textarea
            className="input-base resize-none"
            placeholder="설명"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium rounded-[6px] text-[var(--text-sub)] nav-item transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="btn-accent px-4 py-1.5 text-sm font-medium rounded-[6px]"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
