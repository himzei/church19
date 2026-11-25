import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Pagination, readListParams } from "@/app/(site)/community/_components/BoardParts";
import { BOARDS, formatDate, isBoardKey, postHref } from "@/lib/board";
import { requireAdmin } from "@/lib/dal";
import { getPosts } from "@/lib/posts";
import { DeletePostButton } from "../_components/DeletePostButton";

export default function AdminBoardPage({ params, searchParams }: PageProps<"/admin/[board]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white" />}>
      <Content params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Content({ params, searchParams }: PageProps<"/admin/[board]">) {
  const { board } = await params;
  if (!isBoardKey(board)) notFound();
  await requireAdmin(`/admin/${board}`);

  const cfg = BOARDS[board];
  const { page, q } = await readListParams(searchParams);
  const { items, total, pages, page: current } = await getPosts(board, { page, q, pageSize: 15 });

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-navy">{cfg.label}</h1>
          <p className="mt-1.5 text-sm text-muted">
            전체 <b className="text-navy">{total}</b>건 ·{" "}
            <Link href={`/community/${board}`} className="underline hover:text-navy">
              사이트에서 보기
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <form className="flex gap-2">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="제목·내용 검색"
              aria-label="검색"
              className="h-10 w-48 rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-navy"
            />
          </form>
          <Link href={`/admin/${board}/new`} className="flex h-10 items-center rounded-xl bg-navy px-5 text-sm font-bold text-white hover:bg-navy-deep">
            + 새 글
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-line">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-line text-left text-xs font-semibold text-muted">
            <tr>
              <th className="px-5 py-3">제목</th>
              <th className="w-28 px-3 py-3">날짜</th>
              <th className="w-16 px-3 py-3 text-center">사진</th>
              <th className="w-16 px-3 py-3 text-center">댓글</th>
              <th className="w-44 px-5 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="py-16 text-center text-muted">
                  {q ? `‘${q}’ 검색 결과가 없습니다.` : "아직 글이 없습니다."}
                </td>
              </tr>
            )}
            {items.map((p) => (
              <tr key={p.id} className="hover:bg-cream/50">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    {p.pinned && <span className="rounded bg-gold px-1.5 py-0.5 text-[11px] font-bold text-navy-deep">고정</span>}
                    {p.category && <span className="rounded bg-cream px-1.5 py-0.5 text-[11px] font-semibold text-gold-dark">{p.category}</span>}
                    <Link href={`/admin/${board}/${p.id}/edit`} className="font-semibold text-ink hover:text-navy hover:underline">
                      {p.title}
                    </Link>
                  </div>
                </td>
                <td className="px-3 py-3.5 text-muted">{formatDate(p.date)}</td>
                <td className="px-3 py-3.5 text-center text-muted">{p.images.length || "-"}</td>
                <td className="px-3 py-3.5 text-center text-muted">{p.commentCount || "-"}</td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1.5">
                    <Link href={postHref(board, p.id)} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-muted hover:bg-cream">
                      보기
                    </Link>
                    <Link href={`/admin/${board}/${p.id}/edit`} className="rounded-lg bg-cream px-2.5 py-1.5 text-xs font-semibold text-navy hover:bg-line">
                      수정
                    </Link>
                    <DeletePostButton id={p.id} title={p.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination basePath={`/admin/${board}`} page={current} pages={pages} q={q} />
    </>
  );
}
