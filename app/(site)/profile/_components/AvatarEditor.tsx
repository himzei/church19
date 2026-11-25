"use client";

import { useRef, useState, useTransition } from "react";
import { UserAvatar } from "@/app/_components/UserAvatar";
import { useSession } from "@/lib/auth-client";
import { removeAvatar, uploadAvatar } from "../actions";

const SIZE = 400; // 저장 크기 (정사각형)
const MAX_SOURCE_BYTES = 15 * 1024 * 1024;

/** 이미지를 가운데 기준 정사각형으로 자르고 400px로 줄여 Blob 으로 만든다 */
async function toSquare(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    bitmap,
    (bitmap.width - side) / 2,
    (bitmap.height - side) / 2,
    side,
    side,
    0,
    0,
    SIZE,
    SIZE,
  );
  bitmap.close();
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.88));
  if (blob) return blob;
  return new Promise<Blob>((res, rej) =>
    canvas.toBlob((b) => (b ? res(b) : rej(new Error("encode failed"))), "image/jpeg", 0.88),
  );
}

export function AvatarEditor({ name, image: initialImage }: { name: string; image: string | null }) {
  const [image, setImage] = useState(initialImage);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const { refetch } = useSession();

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일 다시 선택 가능하도록
    if (!file) return;
    setError(null);
    if (!file.type.startsWith("image/")) return setError("이미지 파일만 선택할 수 있습니다.");
    if (file.size > MAX_SOURCE_BYTES) return setError("15MB 이하의 사진을 선택해 주세요.");

    start(async () => {
      try {
        const blob = await toSquare(file);
        const form = new FormData();
        form.append("avatar", blob, "avatar");
        const res = await uploadAvatar(form);
        if (!res.ok) return setError(res.error);
        setImage(res.image);
        refetch(); // 헤더의 아바타도 갱신
      } catch {
        setError("이 사진은 처리할 수 없습니다. 다른 사진을 선택해 주세요.");
      }
    });
  };

  const onRemove = () =>
    start(async () => {
      setError(null);
      const res = await removeAvatar();
      if (!res.ok) return setError(res.error);
      setImage(null);
      refetch();
    });

  return (
    <div className="flex flex-col items-center text-center">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={pending}
        className="group relative rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
        aria-label="프로필 사진 변경"
      >
        <UserAvatar name={name} image={image} className="size-32 text-5xl" />
        <span className="absolute inset-0 grid place-items-center rounded-full bg-navy-deep/55 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
          {pending ? "" : "사진 변경"}
        </span>
        {pending && (
          <span className="absolute inset-0 grid place-items-center rounded-full bg-white/60">
            <span className="size-8 animate-spin rounded-full border-4 border-navy/20 border-t-navy" />
          </span>
        )}
        <span className="absolute bottom-1 right-1 grid size-9 place-items-center rounded-full border-4 border-white bg-gold text-navy-deep">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
        </span>
      </button>
      <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="hidden" />

      <p className="mt-5 text-xl font-bold text-navy">{name || "이름 없음"}</p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={pending}
          className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-navy hover:text-navy disabled:opacity-50"
        >
          사진 변경
        </button>
        {image && (
          <button
            type="button"
            onClick={onRemove}
            disabled={pending}
            className="rounded-full px-4 py-2 text-sm text-muted transition hover:text-red-600 disabled:opacity-50"
          >
            삭제
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-muted">사진은 정사각형으로 잘려 저장됩니다.</p>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
