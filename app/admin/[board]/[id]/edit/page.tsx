import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BOARDS, isBoardKey } from "@/lib/board";
import { requireAdmin } from "@/lib/dal";
import { getPost } from "@/lib/posts";
import { DeletePostButton } from "../../../_components/DeletePostButton";
import { PostForm } from "../../../_components/PostForm";

export default function EditPostPage({ params }: PageProps<"/admin/[board]/[id]/edit">) {
  return (
    <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-2xl bg-white" />}>
      {params.then(({ board, id }) => (
        <Content board={board} id={id} />
      ))}
    </Suspense>
  );
}

async function Content({ board, id }: { board: string; id: string }) {
  if (!isBoardKey(board)) notFound();
  await requireAdmin(`/admin/${board}/${id}/edit`);
  const post = await getPost(id);
  if (!post || post.board !== board) notFound();

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">{BOARDS[board].label} · 글 수정</h1>
        <DeletePostButton id={post.id} title={post.title} redirectTo={`/admin/${board}`} />
      </div>
      <PostForm
        initial={{
          id: post.id,
          board,
          title: post.title,
          body: post.body,
          category: post.category ?? "",
          pinned: post.pinned,
          date: post.date,
          images: post.images,
        }}
      />
    </>
  );
}
