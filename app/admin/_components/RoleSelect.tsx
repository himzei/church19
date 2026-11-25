"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { setUserRole } from "../actions";

export function RoleSelect({
  userId,
  name,
  role,
  disabled,
}: {
  userId: string;
  name: string;
  role: "user" | "admin";
  disabled?: boolean;
}) {
  const [value, setValue] = useState(role);
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <select
      value={value}
      disabled={disabled || pending}
      title={disabled ? "자기 자신의 권한은 바꿀 수 없습니다" : undefined}
      aria-label={`${name} 권한`}
      onChange={(e) => {
        const next = e.target.value as "user" | "admin";
        const msg = next === "admin" ? `${name}님을 관리자로 지정할까요?` : `${name}님의 관리자 권한을 해제할까요?`;
        if (!confirm(msg)) return;
        setValue(next);
        start(async () => {
          const res = await setUserRole(userId, next);
          if (!res.ok) {
            setValue(role);
            alert(res.error);
          }
          router.refresh();
        });
      }}
      className={`h-9 rounded-lg border px-2 text-sm font-semibold outline-none disabled:opacity-60 ${
        value === "admin" ? "border-gold bg-gold/10 text-gold-dark" : "border-line bg-white text-ink"
      }`}
    >
      <option value="user">로그인 사용자</option>
      <option value="admin">관리자</option>
    </select>
  );
}
