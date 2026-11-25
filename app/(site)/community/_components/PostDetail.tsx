import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SubPage } from "@/app/_components/SubPage";
import { UserAvatar } from "@/app/_components/UserAvatar";
import { BOARDS, type BoardKey, boardHref, formatDate, postHref } from "@/lib/board";
import { getCurrentUser } from "@/lib/dal";
import { getComments, getPost } from "@/lib/posts";
import { PostFigure } from "./BoardParts";
import { CommentForm, DeleteCommentButton } from "./CommentControls";

/** 상세 페이지 <title> */
export async function postMetadata(board: BoardKey, params: Promise<{ id: string }>): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  const label = BOARDS[board].label;
  return { title: post && post.board === board ? `${post.title} | ${label} | church19` : `${label} | church19` };
}

/** 나눔터 글 상세 (공지사항·사역 스토리·주보·갤러리 공통) */
export function PostPage({ board, params }: { board: BoardKey; params: Promise<{ id: string }> }) {
  return (
    <SubPage section="community" slug={board}>
      <Suspense fallback={<div className="mx-auto h-96 max-w-3xl animate-pulse rounded-2xl bg-cream" />}>
        {params.then(({ id }) => (
          <PostContent board={board} id={id} />
        ))}
      </Suspense>
    </SubPage>
  );
}

async function PostContent({ board, id }: { board: BoardKey; id: string }) {
  const post = await getPost(id);
  if (!post || post.board !== board) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <header className="border-b-2 border-navy pb-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {post.pinned && <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-navy-deep">공지</span>}
          {post.category && <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-semibold text-gold-dark">{post.category}</span>}
        </div>
        <h3 className="mt-3 text-2xl font-extrabold leading-snug text-navy md:text-3xl">{post.title}</h3>
        <div className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
          <p>
            {formatDate(post.date)}
            {post.authorName && <span className="before:mx-2 before:content-['·']">{post.authorName}</span>}
          </p>
          <Suspense fallback={null}>
            <AdminEditLink board={board} id={post.id} />
          </Suspense>
        </div>
      </header>

      {post.body && <div className="whitespace-pre-line py-10 text-[16px] leading-8 text-ink">{post.body}</div>}

      {post.images.length > 0 &&
        (board === "gallery" ? (
          <ul className={`grid gap-3 sm:grid-cols-2 ${post.body ? "" : "pt-10"}`}>
            {post.images.map((src, i) => (
              <li key={src} className={i === 0 && post.images.length % 2 === 1 ? "sm:col-span-2" : ""}>
                <PostFigure src={src} alt={`${post.title} 사진 ${i + 1}`} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={`space-y-4 ${post.body ? "" : "pt-10"}`}>
            {post.images.map((src, i) => (
              <PostFigure key={src} src={src} alt={`${post.title} ${board === "bulletin" ? `${i + 1}면` : `사진 ${i + 1}`}`} />
            ))}
          </div>
        ))}

      <div className="mt-12 flex justify-center border-t border-line pt-8">
        <Link
          href={boardHref(board)}
          className="rounded-full border border-navy px-8 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
        >
          목록으로
        </Link>
      </div>

      <Suspense fallback={<div className="mt-12 h-40 animate-pulse rounded-2xl bg-cream" />}>
        <Comments postId={post.id} returnTo={postHref(board, post.id)} />
      </Suspense>
    </article>
  );
}

async function AdminEditLink({ board, id }: { board: BoardKey; id: string }) {
  const user = await getCurrentUser();
  if (user?.role !== "admin") return null;
  return (
    <Link href={`/admin/${board}/${id}/edit`} className="shrink-0 rounded-full bg-cream px-4 py-1.5 font-semibold text-navy hover:bg-line">
      수정
    </Link>
  );
}

/** 댓글 — 누구나 읽기, 로그인 사용자 쓰기, 본인·관리자 삭제 */
async function Comments({ postId, returnTo }: { postId: string; returnTo: string }) {
  const [comments, user] = await Promise.all([getComments(postId), getCurrentUser()]);

  return (
    <section aria-labelledby="comments-title" className="mt-12 rounded-2xl bg-cream p-6 md:p-8">
      <h4 id="comments-title" className="text-lg font-bold text-navy">
        댓글 <span className="text-gold-dark">{comments.length}</span>
      </h4>

      {comments.length > 0 ? (
        <ul className="mt-5 divide-y divide-line">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3 py-5">
              <UserAvatar name={c.userName} image={c.userImage} className="size-9 text-sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm">
                    <span className="font-semibold text-ink">{c.userName}</span>
                    <time className="ml-2 text-xs text-muted" dateTime={new Date(c.createdAt).toISOString()}>
                      {new Date(c.createdAt).toLocaleString("ko-KR", {
                        timeZone: "Asia/Seoul",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </time>
                  </p>
                  {user && (user.id === c.userId || user.role === "admin") && <DeleteCommentButton id={c.id} />}
                </div>
                <p className="mt-1.5 whitespace-pre-line break-words text-[15px] leading-7 text-ink">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">첫 댓글을 남겨 주세요.</p>
      )}

      <div className="mt-6">
        {user ? (
          <CommentForm postId={postId} name={user.name} image={user.image} />
        ) : (
          <p className="rounded-xl bg-white px-5 py-4 text-sm text-muted">
            댓글은 로그인한 성도만 쓸 수 있습니다.{" "}
            <Link href={`/login?callbackURL=${encodeURIComponent(returnTo)}`} className="font-semibold text-navy underline">
              로그인하기
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
