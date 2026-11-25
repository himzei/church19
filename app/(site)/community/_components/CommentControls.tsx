"use client";

import { useState, useTransition } from "react";
import { UserAvatar } from "@/app/_components/UserAvatar";
import { POST_LIMITS } from "@/lib/board";
import { addComment, deleteComment } from "../actions";

export function CommentForm({ postId, name, image }: { postId: string; name: string; image: string | null }) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    start(async () => {
      const res = await addComment(postId, body);
      if (!res.ok) return setError(res.error);
      setBody("");
      setError(null);
    });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-xl bg-white p-4 ring-1 ring-line focus-within:ring-navy">
      <div className="flex gap-3">
        <UserAvatar name={name} image={image} className="size-9 text-sm" />
        <label className="flex-1">
          <span className="sr-only">댓글</span>
          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setError(null);
            }}
            maxLength={POST_LIMITS.comment}
            rows={3}
            placeholder={`${name || "성도"}님, 따뜻한 댓글을 남겨 주세요.`}
            className="w-full resize-y bg-transparent text-[15px] leading-7 text-ink outline-none placeholder:text-muted/70"
          />
        </label>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p role={error ? "alert" : undefined} className="text-sm text-red-600">
          {error ?? <span className="text-xs text-muted">{body.length}/{POST_LIMITS.comment}</span>}
        </p>
        <button
          type="submit"
          disabled={pending || !body.trim()}
          className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white transition hover:bg-navy-deep disabled:opacity-40"
        >
          {pending ? "등록 중…" : "댓글 등록"}
        </button>
      </div>
    </form>
  );
}

export function DeleteCommentButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("댓글을 삭제할까요?")) return;
        start(async () => {
          const res = await deleteComment(id);
          if (!res.ok) alert(res.error);
        });
      }}
      className="shrink-0 text-xs text-muted transition hover:text-red-600 disabled:opacity-40"
    >
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}
