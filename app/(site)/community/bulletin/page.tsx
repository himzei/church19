import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/app/_components/Icon";
import { SubPage, subPageMetadata } from "@/app/_components/SubPage";
import { BOARDS, formatDate, postHref } from "@/lib/board";
import { getPosts } from "@/lib/posts";
import { Empty, ListSkeleton, Pagination, readListParams } from "../_components/BoardParts";

export const metadata = subPageMetadata("community", "bulletin");

export default function Page({ searchParams }: PageProps<"/community/bulletin">) {
  return (
    <SubPage
      section="community"
      slug="bulletin"
      lead="매주 발행되는 church19 주보를 온라인으로 보실 수 있습니다."
    >
      <Suspense fallback={<ListSkeleton grid />}>
        <List searchParams={searchParams} />
      </Suspense>
    </SubPage>
  );
}

async function List({ searchParams }: Pick<PageProps<"/community/bulletin">, "searchParams">) {
  const { page } = await readListParams(searchParams);
  const { items, pages, page: current } = await getPosts("bulletin", { page, pageSize: BOARDS.bulletin.pageSize });
  if (items.length === 0) return <Empty />;

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((b, i) => {
          const latest = current === 1 && i === 0;
          return (
            <li key={b.id}>
              <Link href={postHref("bulletin", b.id)} className="group block">
                <div
                  className={`relative flex aspect-[3/4] flex-col justify-between rounded-xl p-5 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl ${
                    latest ? "bg-navy text-white" : "border border-line bg-cream text-navy"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold">
                      church<span className="text-gold">19</span>
                    </span>
                    {latest && <span className="rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold text-navy-deep">NEW</span>}
                  </div>
                  <div>
                    <p className={`text-xs ${latest ? "text-gold" : "text-gold-dark"}`}>{formatDate(b.date)}</p>
                    <p className="mt-1 text-lg font-bold leading-snug">{b.title}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold ${latest ? "text-white/70" : "text-muted"}`}>
                    <Icon name="bulletin" className="size-4" />
                    주보 보기{b.images.length > 0 && ` · ${b.images.length}면`}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <Pagination basePath="/community/bulletin" page={current} pages={pages} />
    </>
  );
}
