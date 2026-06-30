"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";
import EditLinkModal from "@/components/EditLinkModal";
import { deleteLink } from "@/lib/actions";

interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  image?: string | null;
  folder: string;
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: { link: Link }) {
  const domain = getDomain(link.url);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteLink(link.id);
      router.refresh();
      setShowConfirm(false);
    });
  };

  return (
    <div className="relative group">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link flex flex-col"
      >
        <div className="h-32 bg-[var(--bg)] flex items-center justify-center overflow-hidden">
          {link.image ? (
            <img
              src={link.image}
              alt={link.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement("img");
                  fallback.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
                  fallback.alt = link.title;
                  fallback.className = "w-10 h-10 rounded-md";
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
              alt={link.title}
              className="w-10 h-10 rounded-md"
            />
          )}
        </div>
        <div className="p-4 flex flex-col gap-1">
          <h3 className="font-semibold text-[var(--text)] text-sm truncate">
            {link.title}
          </h3>
          <p className="text-xs text-[var(--text-sub)] truncate">{domain}</p>
          {link.description && (
            <p className="text-xs text-[var(--text-sub)] mt-1 line-clamp-2">
              {link.description}
            </p>
          )}
        </div>
      </a>

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowEdit(true);
          }}
          aria-label={`${link.title} 수정`}
          className="p-1.5 rounded-md bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--accent)] hover:border-[var(--accent)] cursor-pointer transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowConfirm(true);
          }}
          disabled={isPending}
          aria-label={`${link.title} 삭제`}
          className="p-1.5 rounded-md bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--error)] hover:border-[var(--error)] cursor-pointer transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      {showEdit && (
        <EditLinkModal link={link} onClose={() => setShowEdit(false)} />
      )}

      {showConfirm && (
        <ConfirmModal
          title="링크 삭제"
          message={`"${link.title}"을(를) 삭제할까요?`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
