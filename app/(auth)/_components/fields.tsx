"use client";

import { useId, useState } from "react";

export function Field({
  label,
  hint,
  error,
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? `${id}-msg` : undefined}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-ink outline-none transition placeholder:text-muted/60 focus:ring-4 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-line focus:border-navy focus:ring-navy/10"
          } ${isPassword ? "pr-16" : ""}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-muted hover:text-navy"
            aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {show ? "숨기기" : "보기"}
          </button>
        )}
      </div>
      {(error || hint) && (
        <p id={`${id}-msg`} className={`mt-1.5 text-xs ${error ? "text-red-600" : "text-muted"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-7 flex items-center gap-4 text-xs text-muted">
      <span className="h-px flex-1 bg-line" />
      {children}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy text-[15px] font-bold text-white transition hover:bg-navy-deep disabled:cursor-wait disabled:opacity-70"
    >
      {pending && <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
      {children}
    </button>
  );
}

/** Better Auth 에러 코드를 한국어 메시지로 변환 */
export function authErrorMessage(code?: string, fallback?: string) {
  const messages: Record<string, string> = {
    INVALID_EMAIL_OR_PASSWORD: "이메일 또는 비밀번호가 올바르지 않습니다.",
    INVALID_EMAIL: "올바른 이메일 형식이 아닙니다.",
    INVALID_PASSWORD: "비밀번호가 올바르지 않습니다.",
    USER_ALREADY_EXISTS: "이미 가입된 이메일입니다. 로그인해 주세요.",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "이미 가입된 이메일입니다. 다른 이메일을 사용해 주세요.",
    PASSWORD_TOO_SHORT: "비밀번호는 8자 이상이어야 합니다.",
    PASSWORD_TOO_LONG: "비밀번호가 너무 깁니다.",
    // 소셜 로그인 콜백 에러 (?error=)
    access_denied: "로그인이 취소되었습니다.",
    email_not_found: "소셜 계정에서 이메일 정보를 받지 못했습니다.",
    account_not_linked: "같은 이메일로 가입된 다른 계정이 있습니다. 기존 방식으로 로그인해 주세요.",
    state_mismatch: "로그인 요청이 만료되었습니다. 다시 시도해 주세요.",
    invalid_code: "로그인 요청이 만료되었습니다. 다시 시도해 주세요.",
  };
  return (code && messages[code]) || fallback || "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";
}
