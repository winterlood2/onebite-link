import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-8">
          한입 링크
        </h1>

        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="이메일"
            className="input-base"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="input-base"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="input-base"
          />
          <button type="submit" className="btn-accent w-full py-2 rounded-md text-sm font-medium mt-1">
            회원가입
          </button>
        </form>

        <p className="text-center text-sm text-[var(--text-sub)] mt-4">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
