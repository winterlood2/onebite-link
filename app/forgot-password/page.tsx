"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      showToast("이메일 발송에 실패했습니다. 다시 시도해 주세요.");
      return;
    }

    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--text)] text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-2">
          한입 링크
        </h1>
        <p className="text-sm text-[var(--text-sub)] text-center mb-8">비밀번호 찾기</p>

        {sent ? (
          <div className="text-center">
            <p className="text-sm text-[var(--text)] mb-1">이메일을 발송했습니다.</p>
            <p className="text-sm text-[var(--text-sub)]">
              받은 편지함에서 비밀번호 재설정 링크를 확인해 주세요.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-base"
            />
            <button
              type="submit"
              disabled={!email.trim() || loading}
              className="btn-accent w-full py-2 rounded-md text-sm font-medium mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "발송 중..." : "비밀번호 재설정 링크 발송"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-[var(--text-sub)] mt-4">
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
