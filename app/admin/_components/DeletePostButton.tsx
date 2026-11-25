"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deletePost } from "../actions";

/** 글 삭제 (댓글·첨부 사진도 함께 삭제). redirectTo 가 있으면 삭제 후 그 주소로 이동 */
export function DeletePostButton({ id, title, redirectTo }: { id: string; title: string; redirectTo?: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`‘${title}’ 글을 삭제할까요?\n댓글과 첨부 사진도 함께 삭제되며 되돌릴 수 없습니다.`)) return;
        start(async () => {
          const res = await deletePost(id);
          if (!res.ok) return alert(res.error);
          if (redirectTo) router.replace(redirectTo);
        });
      }}
      className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-40"
    >
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}
