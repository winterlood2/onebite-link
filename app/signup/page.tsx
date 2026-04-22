"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isFormFilled = email.trim() !== "" && password !== "" && passwordConfirm !== "";

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;

    if (password !== passwordConfirm) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      if (error.message.includes("already registered") || error.message.includes("already been registered")) {
        showToast("이미 사용 중인 이메일입니다.");
      } else if (error.message.includes("invalid") || error.message.includes("email")) {
        showToast("유효하지 않은 이메일 주소입니다.");
      } else if (error.message.includes("password") || error.message.includes("weak")) {
        showToast("비밀번호는 6자 이상이어야 합니다.");
      } else {
        showToast("회원가입에 실패했습니다. 다시 시도해 주세요.");
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
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="input-base"
          />
          <button
            type="submit"
            disabled={!isFormFilled || loading}
            className="btn-accent w-full py-2 rounded-md text-sm font-medium mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "처리 중..." : "회원가입"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-3">
          회원가입 시{" "}
          <Link href="/privacy" className="underline hover:text-gray-500">
            개인정보 처리방침
          </Link>
          에 동의하는 것으로 간주됩니다.
        </p>

        <p className="text-center text-sm text-[var(--text-sub)] mt-3">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
