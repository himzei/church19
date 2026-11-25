import Link from "next/link";
import { Suspense } from "react";
import { SubPage, subPageMetadata } from "@/app/_components/SubPage";
import { BOARDS, formatDate, postHref } from "@/lib/board";
import { getPosts } from "@/lib/posts";
import { Empty, ListSkeleton, Pagination, readListParams } from "../_components/BoardParts";

export const metadata = subPageMetadata("community", "notices");

export default function Page({ searchParams }: PageProps<"/community/notices">) {
  return (
    <SubPage section="community" slug="notices">
      <Suspense fallback={<ListSkeleton />}>
        <List searchParams={searchParams} />
      </Suspense>
    </SubPage>
  );
}

async function List({ searchParams }: Pick<PageProps<"/community/notices">, "searchParams">) {
  const { page, q } = await readListParams(searchParams);
  const { items, total, pages, page: current } = await getPosts("notices", { page, q, pageSize: BOARDS.notices.pageSize });
  // 일반 글 번호 (고정 공지는 번호 대신 '공지')
  const firstNo = total - (current - 1) * BOARDS.notices.pageSize;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          전체 <span className="font-bold text-navy">{total}</span>건
        </p>
        <form role="search" className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="검색어를 입력하세요"
            aria-label="공지사항 검색"
            className="h-10 w-56 rounded-full border border-line px-4 text-sm outline-none focus:border-navy"
          />
          <button type="submit" className="h-10 rounded-full bg-navy px-5 text-sm font-semibold text-white">
            검색
          </button>
        </form>
      </div>

      {items.length === 0 ? (
        <Empty q={q} />
      ) : (
        <div className="overflow-hidden rounded-2xl border-t-2 border-navy">
          <table className="w-full text-sm">
            <thead className="hidden border-b border-line bg-cream text-muted md:table-header-group">
              <tr>
                <th className="w-20 py-3.5 font-semibold">번호</th>
                <th className="py-3.5 text-left font-semibold">제목</th>
                <th className="w-32 py-3.5 font-semibold">작성일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((n, i) => (
                <tr key={n.id} className={n.pinned ? "bg-gold/5" : "hover:bg-cream/60"}>
                  <td className="hidden py-4 text-center text-muted md:table-cell">
                    {n.pinned ? (
                      <span className="rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-navy-deep">공지</span>
                    ) : (
                      firstNo - i
                    )}
                  </td>
                  <td className="px-4 py-4 md:px-0">
                    <Link
                      href={postHref("notices", n.id)}
                      className={`hover:underline ${n.pinned ? "font-semibold text-navy" : "text-ink"}`}
                    >
                      {n.title}
                    </Link>
                    {n.commentCount > 0 && (
                      <span className="ml-1.5 text-xs font-semibold text-gold-dark">[{n.commentCount}]</span>
                    )}
                  </td>
                  <td className="py-4 pr-4 text-right text-muted md:pr-0 md:text-center">{formatDate(n.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination basePath="/community/notices" page={current} pages={pages} q={q} />
    </>
  );
}
