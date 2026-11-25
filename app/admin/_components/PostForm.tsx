"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { BOARDS, POST_LIMITS } from "@/lib/board";
import { discardImages, type PostInput, savePost, uploadBoardImage } from "../actions";

/** 업로드 전에 브라우저에서 사진 크기 줄이기 (긴 변 1920px, WEBP — 지원하지 않으면 JPEG). GIF 는 움직임 보존을 위해 그대로 */
async function shrink(file: File): Promise<Blob> {
  if (file.type === "image/gif") return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, POST_LIMITS.imageMaxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const toBlob = (type: string) => new Promise<Blob | null>((r) => canvas.toBlob(r, type, 0.85));
  const webp = await toBlob("image/webp");
  return webp?.type === "image/webp" ? webp : ((await toBlob("image/jpeg")) ?? file);
}

export function PostForm({ initial }: { initial: PostInput }) {
  const cfg = BOARDS[initial.board];
  const [form, setForm] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(0);
  const [pending, start] = useTransition();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  // 이번에 새로 올린 사진 — 저장하지 않고 나가면 저장소에서 정리한다
  const fresh = useRef<Set<string>>(new Set());

  const set = <K extends keyof PostInput>(k: K, v: PostInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setError(null);
  };

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const room = cfg.images.max - form.images.length;
    const list = Array.from(files).slice(0, Math.max(0, room));
    if (list.length < files.length) setError(`사진은 최대 ${cfg.images.max}장까지 올릴 수 있습니다.`);
    setUploading((n) => n + list.length);
    // 순서를 지키기 위해 한 장씩 차례로 올린다
    for (const file of list) {
      try {
        const blob = await shrink(file);
        const fd = new FormData();
        fd.set("board", form.board);
        fd.set("file", blob, file.name);
        const res = await uploadBoardImage(fd);
        if (!res.ok) setError(`${file.name}: ${res.error}`);
        else {
          fresh.current.add(res.url);
          setForm((f) => ({ ...f, images: [...f.images, res.url] }));
        }
      } catch {
        setError(`${file.name}: 이 사진은 처리할 수 없습니다.`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = (url: string) => {
    set("images", form.images.filter((u) => u !== url));
    // 방금 올린 사진이면 바로 정리 (기존 사진은 저장할 때 서버가 정리)
    if (fresh.current.delete(url)) void discardImages([url]);
  };

  const move = (i: number, d: -1 | 1) => {
    const next = [...form.images];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    set("images", next);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    start(async () => {
      const res = await savePost(form);
      if (!res.ok) return setError(res.error);
      fresh.current.clear();
      router.push(`/admin/${form.board}`);
    });
  };

  const onCancel = () => {
    if (fresh.current.size) void discardImages([...fresh.current]);
  };

  const input =
    "w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink outline-none transition focus:border-navy focus:ring-4 focus:ring-navy/10";
  const busy = pending || uploading > 0;

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line md:p-8">
      <div className="grid gap-5 md:grid-cols-[1fr_200px]">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">제목</span>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            maxLength={POST_LIMITS.title}
            required
            className={`${input} h-12`}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">{form.board === "bulletin" ? "예배일" : "게시일"}</span>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required className={`${input} h-12`} />
        </label>
      </div>

      {(cfg.category || cfg.pinnable) && (
        <div className="flex flex-wrap items-end gap-6">
          {cfg.category && (
            <label className="block w-60">
              <span className="mb-1.5 block text-sm font-semibold text-ink">
                {cfg.category} <span className="font-normal text-muted">선택</span>
              </span>
              <input
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                maxLength={POST_LIMITS.category}
                placeholder="예: 섬김, 선교, 행사"
                list="category-presets"
                className={`${input} h-12`}
              />
              <datalist id="category-presets">
                {["행사", "소그룹", "섬김", "선교", "교회학교", "청년부"].map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
          )}
          {cfg.pinnable && (
            <label className="flex h-12 cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink">
              <input
                type="checkbox"
                checked={form.pinned}
                onChange={(e) => set("pinned", e.target.checked)}
                className="size-5 accent-navy"
              />
              목록 맨 위에 고정 (공지)
            </label>
          )}
        </div>
      )}

      <label className="block">
        <span className="mb-1.5 flex justify-between text-sm font-semibold text-ink">
          내용 {!cfg.bodyRequired && <span className="font-normal text-muted">선택</span>}
        </span>
        <textarea
          value={form.body}
          onChange={(e) => set("body", e.target.value)}
          maxLength={POST_LIMITS.body}
          rows={12}
          required={cfg.bodyRequired}
          placeholder={cfg.bodyHint}
          className={`${input} resize-y py-3 leading-7`}
        />
      </label>

      <fieldset>
        <legend className="mb-1.5 flex w-full justify-between text-sm font-semibold text-ink">
          사진
          <span className="font-normal text-muted">
            {form.images.length}/{cfg.images.max}장 {cfg.images.required ? "· 필수" : "· 선택"}
          </span>
        </legend>
        <p className="mb-3 text-xs text-muted">{cfg.images.hint} 큰 사진은 자동으로 줄여서 올립니다.</p>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {form.images.map((src, i) => (
            <li key={src} className="group relative aspect-square overflow-hidden rounded-xl bg-cream ring-1 ring-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`사진 ${i + 1}`} className="size-full object-cover" />
              {i === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-navy px-2 py-0.5 text-[11px] font-bold text-white">대표</span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-linear-to-t from-black/70 to-transparent p-2">
                <span className="flex gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`사진 ${i + 1} 앞으로`}
                    className="grid size-7 place-items-center rounded-full bg-white/90 text-sm text-navy disabled:opacity-30">‹</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === form.images.length - 1} aria-label={`사진 ${i + 1} 뒤로`}
                    className="grid size-7 place-items-center rounded-full bg-white/90 text-sm text-navy disabled:opacity-30">›</button>
                </span>
                <button type="button" onClick={() => removeImage(src)} aria-label={`사진 ${i + 1} 삭제`}
                  className="grid size-7 place-items-center rounded-full bg-red-600 text-sm font-bold text-white">×</button>
              </div>
            </li>
          ))}
          {Array.from({ length: uploading }, (_, i) => (
            <li key={`up-${i}`} className="grid aspect-square place-items-center rounded-xl bg-cream ring-1 ring-line">
              <span className="size-6 animate-spin rounded-full border-2 border-navy/20 border-t-navy" />
            </li>
          ))}
          {form.images.length + uploading < cfg.images.max && (
            <li>
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-line text-sm font-semibold text-muted transition hover:border-navy hover:text-navy">
                <span className="text-2xl leading-none">+</span>
                사진 추가
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="sr-only"
                  onChange={(e) => onFiles(e.target.files)}
                />
              </label>
            </li>
          )}
        </ul>
      </fieldset>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
        <Link
          href={`/admin/${form.board}`}
          onClick={onCancel}
          className="flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold text-muted hover:text-navy"
        >
          취소
        </Link>
        <button
          type="submit"
          disabled={busy}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-navy px-8 text-[15px] font-bold text-white transition hover:bg-navy-deep disabled:opacity-50"
        >
          {pending && <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
          {uploading > 0 ? "사진 올리는 중…" : initial.id ? "수정 완료" : "등록하기"}
        </button>
      </div>
    </form>
  );
}
