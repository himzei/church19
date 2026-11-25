"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { authErrorMessage, Field, SubmitButton } from "./fields";

type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "terms", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: FormData): Errors {
  const errors: Errors = {};
  const name = String(f.get("name")).trim();
  const email = String(f.get("email")).trim();
  const password = String(f.get("password"));
  const confirm = String(f.get("confirm"));

  if (name.length < 2) errors.name = "이름을 2자 이상 입력해 주세요.";
  if (!EMAIL_RE.test(email)) errors.email = "올바른 이메일 주소를 입력해 주세요.";
  if (password.length < 8) errors.password = "비밀번호는 8자 이상이어야 합니다.";
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password))
    errors.password = "영문과 숫자를 함께 사용해 주세요.";
  if (confirm !== password) errors.confirm = "비밀번호가 일치하지 않습니다.";
  if (f.get("terms") !== "on" || f.get("privacy") !== "on" || f.get("age") !== "on")
    errors.terms = "필수 항목에 모두 동의해 주세요.";
  return errors;
}

export function SignupForm() {
  const router = useRouter();
  const socialError = useSearchParams().get("error");

  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(
    socialError ? authErrorMessage(socialError) : null,
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const v = validate(form);
    setErrors(v);
    setFormError(null);
    if (Object.keys(v).length > 0) return;

    setPending(true);
    const { error } = await signUp.email({
      name: String(form.get("name")).trim(),
      email: String(form.get("email")).trim(),
      password: String(form.get("password")),
    });

    if (error) {
      const message = authErrorMessage(error.code, error.message);
      if (error.code?.startsWith("USER_ALREADY_EXISTS")) setErrors({ email: message });
      else setFormError(message);
      setPending(false);
      return;
    }
    // autoSignIn: 가입과 동시에 로그인됨 → 첫 로그인이므로 프로필 입력으로 이동
    router.replace("/profile?welcome=1");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field label="이름" name="name" autoComplete="name" placeholder="홍길동" error={errors.name} />
      <Field
        label="이메일"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="example@email.com"
        error={errors.email}
      />
      <Field
        label="비밀번호"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="8자 이상, 영문·숫자 포함"
        hint="8자 이상, 영문과 숫자를 함께 사용하세요."
        error={errors.password}
      />
      <Field
        label="비밀번호 확인"
        name="confirm"
        type="password"
        autoComplete="new-password"
        placeholder="비밀번호를 한 번 더 입력하세요"
        error={errors.confirm}
      />

      <fieldset className="space-y-2.5 rounded-xl border border-line bg-cream/60 p-4 text-sm">
        <legend className="sr-only">약관 동의</legend>
        <label className="flex cursor-pointer items-center gap-2 font-semibold text-ink">
          <input
            type="checkbox"
            className="size-4 accent-navy"
            onChange={(e) => {
              const fs = e.currentTarget.closest("fieldset");
              fs?.querySelectorAll<HTMLInputElement>("input[data-agree]").forEach((c) => {
                c.checked = e.currentTarget.checked;
              });
            }}
          />
          전체 동의
        </label>
        <hr className="border-line" />
        <label className="flex cursor-pointer items-center gap-2 text-muted">
          <input type="checkbox" name="age" data-agree className="size-4 accent-navy" />
          <span>
            <span className="text-navy">[필수]</span> 만 14세 이상입니다
          </span>
        </label>
        <div className="flex items-center justify-between gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-muted">
            <input type="checkbox" name="terms" data-agree className="size-4 accent-navy" />
            <span>
              <span className="text-navy">[필수]</span> 이용약관 동의
            </span>
          </label>
          <Link href="/terms" target="_blank" className="shrink-0 text-xs text-muted underline hover:text-navy">
            보기
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-muted">
            <input type="checkbox" name="privacy" data-agree className="size-4 accent-navy" />
            <span>
              <span className="text-navy">[필수]</span> 개인정보 수집·이용 동의
            </span>
          </label>
          <Link href="/privacy" target="_blank" className="shrink-0 text-xs text-muted underline hover:text-navy">
            보기
          </Link>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-muted">
          <input type="checkbox" name="marketing" data-agree className="size-4 accent-navy" />
          <span>[선택] 교회 소식 및 행사 안내 수신</span>
        </label>
        {errors.terms && <p className="text-xs text-red-600">{errors.terms}</p>}
      </fieldset>

      {formError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      )}

      <SubmitButton pending={pending}>{pending ? "가입 중…" : "가입하기"}</SubmitButton>

      <p className="text-center text-sm text-muted">
        이미 회원이신가요?{" "}
        <Link href="/login" className="font-semibold text-navy underline-offset-4 hover:underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
