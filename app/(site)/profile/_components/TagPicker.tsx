"use client";

import { useState } from "react";
import { LIMITS } from "@/lib/profile";

/** 추천 항목을 눌러 고르거나 직접 입력해 추가하는 태그 선택기 */
export function TagPicker({
  label,
  presets,
  value,
  onChange,
}: {
  label: string;
  presets: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const full = value.length >= LIMITS.tags;
  const custom = value.filter((v) => !presets.includes(v));

  const toggle = (tag: string) =>
    onChange(value.includes(tag) ? value.filter((v) => v !== tag) : full ? value : [...value, tag]);

  const add = () => {
    const t = draft.replace(/,/g, " ").trim().slice(0, LIMITS.tag);
    if (t && !value.includes(t) && !full) onChange([...value, t]);
    setDraft("");
  };

  const chip = (tag: string, on: boolean, removable = false) => (
    <button
      key={tag}
      type="button"
      onClick={() => toggle(tag)}
      aria-pressed={on}
      disabled={!on && full}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
        on
          ? "border-navy bg-navy text-white"
          : "border-line bg-white text-ink hover:border-navy hover:text-navy"
      }`}
    >
      {tag}
      {removable && <span className="ml-1.5 text-white/60">×</span>}
    </button>
  );

  return (
    <fieldset>
      <legend className="mb-1.5 flex w-full items-center justify-between text-sm font-semibold text-ink">
        {label} <span className="font-normal text-muted">선택</span>
      </legend>
      <p className="mb-3 text-xs text-muted">
        여러 개 선택할 수 있어요 ({value.length}/{LIMITS.tags})
      </p>
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => chip(p, value.includes(p)))}
        {custom.map((c) => chip(c, true, true))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              add();
            }
          }}
          maxLength={LIMITS.tag}
          disabled={full}
          placeholder={full ? "최대 개수에 도달했어요" : "직접 입력 후 Enter"}
          aria-label={`${label} 직접 입력`}
          className="h-10 flex-1 rounded-xl border border-line px-3.5 text-sm outline-none transition focus:border-navy focus:ring-4 focus:ring-navy/10 disabled:bg-cream"
        />
        <button
          type="button"
          onClick={add}
          disabled={full || !draft.trim()}
          className="h-10 rounded-xl border border-navy px-4 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white disabled:opacity-40"
        >
          추가
        </button>
      </div>
    </fieldset>
  );
}
