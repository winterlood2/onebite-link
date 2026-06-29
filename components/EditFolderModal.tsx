"use client";

import { useState } from "react";

interface Props {
  initialName: string;
  onClose: () => void;
  onSave: (name: string) => void;
}

export default function EditFolderModal({ initialName, onClose, onSave }: Props) {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-[var(--card-bg)] border border-[var(--border)] rounded-lg w-full max-w-sm p-6 flex flex-col gap-4">
        <h2 className="text-base font-semibold text-[var(--text)]">폴더 이름 수정</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-sm font-medium px-4 py-2 rounded-md"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="btn-primary px-4 py-2 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
