import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BOARDS, isBoardKey } from "@/lib/board";
import { requireAdmin } from "@/lib/dal";
import { PostForm } from "../../_components/PostForm";

export default function NewPostPage({ params }: PageProps<"/admin/[board]/new">) {
  return (
    <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-2xl bg-white" />}>
      {params.then(({ board }) => (
        <Content board={board} />
      ))}
    </Suspense>
  );
}

async function Content({ board }: { board: string }) {
  if (!isBoardKey(board)) notFound();
  await requireAdmin(`/admin/${board}/new`);
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" }); // YYYY-MM-DD

  return (
    <>
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight text-navy">{BOARDS[board].label} · 새 글</h1>
      <PostForm
        initial={{ board, title: "", body: "", category: "", pinned: false, date: today, images: [] }}
      />
    </>
  );
}
