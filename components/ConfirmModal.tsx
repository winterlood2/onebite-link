"use client";

interface Props {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ title, message, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-[var(--card-bg)] border border-[var(--border)] rounded-lg w-full max-w-sm p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-[var(--text)]">{title}</h2>
          <p className="text-sm text-[var(--text-sub)]">{message}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="btn-secondary text-sm font-medium px-4 py-2 rounded-md"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger px-4 py-2 rounded-md"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
