"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { authErrorMessage, Field, SubmitButton } from "./fields";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackURL = safeCallback(params.get("callbackURL"));
  const socialError = params.get("error");

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(
    socialError ? authErrorMessage(socialError) : null,
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setPending(true);
    setError(null);

    const { error } = await signIn.email({
      email: String(form.get("email")).trim(),
      password: String(form.get("password")),
      rememberMe: form.get("remember") === "on",
    });

    if (error) {
      setError(authErrorMessage(error.code, error.message));
      setPending(false);
      return;
    }
    router.replace(callbackURL);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field
        label="이메일"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="example@email.com"
        required
      />
      <Field
        label="비밀번호"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="비밀번호를 입력하세요"
        required
      />

      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
        <input type="checkbox" name="remember" defaultChecked className="size-4 accent-navy" />
        로그인 상태 유지
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <SubmitButton pending={pending}>{pending ? "로그인 중…" : "로그인"}</SubmitButton>

      <p className="text-center text-sm text-muted">
        아직 회원이 아니신가요?{" "}
        <Link href="/signup" className="font-semibold text-navy underline-offset-4 hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}

/** 외부 사이트로의 오픈 리다이렉트를 막고, 내부 경로만 허용 */
export function safeCallback(url: string | null) {
  return url && url.startsWith("/") && !url.startsWith("//") ? url : "/";
}
