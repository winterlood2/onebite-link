"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isFormFilled = email.trim() !== "" && password !== "";

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      if (error.message.includes("Invalid login credentials") || error.message.includes("invalid_credentials")) {
        showToast("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (error.message.includes("Email not confirmed")) {
        showToast("이메일 인증이 완료되지 않았습니다.");
      } else {
        showToast("로그인에 실패했습니다. 다시 시도해 주세요.");
      }
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--text)] text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-8">
          한입 링크
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-base"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-base"
          />
          <button
            type="submit"
            disabled={!isFormFilled || loading}
            className="btn-accent w-full py-2 rounded-md text-sm font-medium mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "처리 중..." : "로그인"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--text-sub)] mt-4">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-[var(--accent)] hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
