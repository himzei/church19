import Link from "next/link";
import { Suspense } from "react";
import { DeleteCommentButton } from "@/app/(site)/community/_components/CommentControls";
import { BOARD_KEYS, BOARDS, type BoardKey, postHref } from "@/lib/board";
import { requireAdmin } from "@/lib/dal";
import { pool } from "@/lib/db";
import { PageTitle } from "./_components/ui";

export default function AdminHome() {
  return (
    <>
      <PageTitle title="대시보드" desc="나눔터 게시판과 회원 현황을 한눈에 봅니다." />
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white" />}>
        <Dashboard />
      </Suspense>
    </>
  );
}

async function Dashboard() {
  await requireAdmin("/admin");

  const [{ rows: counts }, { rows: members }, { rows: comments }] = await Promise.all([
    pool.query(`SELECT board, count(*)::int AS n, max("createdAt") AS last FROM "post" GROUP BY board`),
    pool.query(`SELECT count(*)::int AS total, count(*) FILTER (WHERE role = 'admin')::int AS admins FROM "user"`),
    pool.query(
      `SELECT c.id, c.body, c."createdAt", coalesce(u.name, '알 수 없음') AS "userName", p.id AS "postId", p.board, p.title
       FROM "comment" c JOIN "post" p ON p.id = c."postId" LEFT JOIN "user" u ON u.id = c."userId"
       ORDER BY c."createdAt" DESC LIMIT 10`,
    ),
  ]);
  const byBoard = new Map(counts.map((r: { board: string; n: number }) => [r.board, r.n]));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {BOARD_KEYS.map((k) => (
          <Link key={k} href={`/admin/${k}`} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line transition hover:ring-navy">
            <p className="text-sm font-semibold text-muted">{BOARDS[k].label}</p>
            <p className="mt-2 text-3xl font-extrabold text-navy">{byBoard.get(k) ?? 0}</p>
            <p className="mt-1 text-xs text-muted">개의 글</p>
          </Link>
        ))}
        <Link href="/admin/members" className="rounded-2xl bg-navy p-5 text-white shadow-sm transition hover:bg-navy-deep">
          <p className="text-sm font-semibold text-white/70">회원</p>
          <p className="mt-2 text-3xl font-extrabold">{members[0].total}</p>
          <p className="mt-1 text-xs text-white/60">관리자 {members[0].admins}명</p>
        </Link>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-navy">빠른 작성</h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {BOARD_KEYS.map((k) => (
            <Link key={k} href={`/admin/${k}/new`} className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-navy hover:bg-line">
              + {BOARDS[k].label}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line">
        <h2 className="text-lg font-bold text-navy">최근 댓글</h2>
        {comments.length === 0 ? (
          <p className="mt-4 text-sm text-muted">아직 댓글이 없습니다.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {comments.map(
              (c: { id: string; body: string; createdAt: Date; userName: string; postId: string; board: BoardKey; title: string }) => (
                <li key={c.id} className="flex items-start justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm text-ink">{c.body}</p>
                    <p className="mt-1 text-xs text-muted">
                      <span className="font-semibold">{c.userName}</span> ·{" "}
                      {new Date(c.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", dateStyle: "short", timeStyle: "short" })} ·{" "}
                      <Link href={postHref(c.board, c.postId)} className="underline hover:text-navy">
                        [{BOARDS[c.board].label}] {c.title}
                      </Link>
                    </p>
                  </div>
                  <DeleteCommentButton id={c.id} />
                </li>
              ),
            )}
          </ul>
        )}
      </section>
    </div>
  );
}
