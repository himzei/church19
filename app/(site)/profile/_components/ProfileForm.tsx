"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useSession } from "@/lib/auth-client";
import { GENDERS, HOBBY_PRESETS, LIMITS, TALENT_PRESETS } from "@/lib/profile";
import { type ProfileInput, updateProfile } from "../actions";
import { TagPicker } from "./TagPicker";

function TextField({
  label,
  optional = true,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; optional?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-semibold text-ink">
        {label}
        <span className="font-normal text-muted">{optional ? "선택" : "필수"}</span>
      </span>
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink outline-none transition placeholder:text-muted/60 focus:border-navy focus:ring-4 focus:ring-navy/10"
      />
    </label>
  );
}

export function ProfileForm({ initial, welcome }: { initial: ProfileInput; welcome: boolean }) {
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState<ProfileInput>(initial);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();
  const { refetch } = useSession();

  const set = <K extends keyof ProfileInput>(key: K, value: ProfileInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setMessage(null);
  };
  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    start(async () => {
      const res = await updateProfile(form);
      if (!res.ok) return setMessage({ type: "error", text: res.error });
      setSaved(form);
      refetch(); // 헤더의 이름 갱신
      if (welcome) {
        router.replace("/");
        router.refresh();
        return;
      }
      setMessage({ type: "ok", text: "프로필이 저장되었습니다." });
      router.refresh();
    });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-line md:p-10">
      <section className="space-y-5">
        <h2 className="text-lg font-bold text-navy">기본 정보</h2>
        <TextField
          label="이름"
          optional={false}
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          maxLength={LIMITS.name}
          autoComplete="name"
          required
        />

        <fieldset>
          <legend className="mb-1.5 flex w-full items-center justify-between text-sm font-semibold text-ink">
            성별 <span className="font-normal text-muted">선택</span>
          </legend>
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-cream p-1">
            {GENDERS.map((g) => (
              <label
                key={g.value}
                className={`cursor-pointer rounded-lg py-2.5 text-center text-sm font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy ${
                  form.gender === g.value ? "bg-white text-navy shadow-sm" : "text-muted hover:text-navy"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g.value}
                  checked={form.gender === g.value}
                  onChange={() => set("gender", g.value)}
                  className="sr-only"
                />
                {g.label}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="mt-10 space-y-8 border-t border-line pt-10">
        <h2 className="text-lg font-bold text-navy">관심사</h2>
        <TagPicker label="취미" presets={HOBBY_PRESETS} value={form.hobbies} onChange={(v) => set("hobbies", v)} />
        <TagPicker label="특기" presets={TALENT_PRESETS} value={form.talents} onChange={(v) => set("talents", v)} />
      </section>

      {message && (
        <p
          role={message.type === "error" ? "alert" : "status"}
          className={`mt-8 rounded-xl px-4 py-3 text-sm ${
            message.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {welcome && (
          <Link
            href="/"
            className="flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold text-muted transition hover:text-navy"
          >
            나중에 할게요
          </Link>
        )}
        <button
          type="submit"
          disabled={pending || (!dirty && !welcome)}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-navy px-8 text-[15px] font-bold text-white transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending && <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
          {welcome ? "저장하고 시작하기" : "저장하기"}
        </button>
      </div>
    </form>
  );
}
