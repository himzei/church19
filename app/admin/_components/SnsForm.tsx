"use client";

import { useState, useTransition } from "react";
import { SnsIcon } from "@/app/_components/SnsIcons";
import { SNS, SNS_KEYS, type SnsKey, type SnsLinks } from "@/lib/sns";
import { saveSnsLinks } from "../actions";

export function SnsForm({ initial }: { initial: SnsLinks }) {
  const empty = Object.fromEntries(SNS_KEYS.map((k) => [k, initial[k] ?? ""])) as Record<SnsKey, string>;
  const [form, setForm] = useState(empty);
  const [saved, setSaved] = useState(empty);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const dirty = SNS_KEYS.some((k) => form[k] !== saved[k]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    start(async () => {
      const res = await saveSnsLinks(form);
      if (!res.ok) return setMessage({ ok: false, text: res.error });
      // 서버에서 정리한 주소(https 붙이기 등)로 갱신
      const next = Object.fromEntries(SNS_KEYS.map((k) => [k, res.links[k] ?? ""])) as Record<SnsKey, string>;
      setForm(next);
      setSaved(next);
      setMessage({ ok: true, text: "저장했습니다. 사이트에 바로 반영됩니다." });
    });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line md:p-8">
      <h2 className="text-lg font-bold text-navy">SNS 바로가기</h2>
      <p className="mt-1 text-sm text-muted">주소를 비워 두면 그 아이콘은 사이트에 표시되지 않습니다.</p>

      <div className="mt-6 space-y-5">
        {SNS_KEYS.map((k) => (
          <label key={k} className="flex items-center gap-4">
            <SnsIcon name={k} className="size-11 shrink-0" />
            <span className="block flex-1">
              <span className="mb-1.5 block text-sm font-semibold text-ink">{SNS[k].label}</span>
              <input
                type="text"
                inputMode="url"
                value={form[k]}
                onChange={(e) => {
                  setForm((f) => ({ ...f, [k]: e.target.value }));
                  setMessage(null);
                }}
                placeholder={SNS[k].placeholder}
                className="h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink outline-none transition placeholder:text-muted/50 focus:border-navy focus:ring-4 focus:ring-navy/10"
              />
            </span>
          </label>
        ))}
      </div>

      {message && (
        <p
          role={message.ok ? "status" : "alert"}
          className={`mt-6 rounded-xl px-4 py-3 text-sm ${message.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {message.text}
        </p>
      )}

      <div className="mt-8 flex justify-end border-t border-line pt-6">
        <button
          type="submit"
          disabled={pending || !dirty}
          className="h-12 rounded-xl bg-navy px-8 text-[15px] font-bold text-white transition hover:bg-navy-deep disabled:opacity-50"
        >
          {pending ? "저장 중…" : "저장하기"}
        </button>
      </div>
    </form>
  );
}
