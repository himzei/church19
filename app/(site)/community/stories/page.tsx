import Link from "next/link";
import { Suspense } from "react";
import { SubPage, subPageMetadata, Thumb, tones } from "@/app/_components/SubPage";
import { BOARDS, formatDate, postHref } from "@/lib/board";
import { getPosts } from "@/lib/posts";
import { Empty, ListSkeleton, Pagination, PostImage, readListParams } from "../_components/BoardParts";

export const metadata = subPageMetadata("community", "stories");

export default function Page({ searchParams }: PageProps<"/community/stories">) {
  return (
    <SubPage
      section="community"
      slug="stories"
      lead="church19 공동체 안에서 일어나는 은혜와 섬김의 이야기를 나눕니다."
    >
      <Suspense fallback={<ListSkeleton grid />}>
        <List searchParams={searchParams} />
      </Suspense>
    </SubPage>
  );
}

async function List({ searchParams }: Pick<PageProps<"/community/stories">, "searchParams">) {
  const { page } = await readListParams(searchParams);
  const { items, pages, page: current } = await getPosts("stories", { page, pageSize: BOARDS.stories.pageSize });
  if (items.length === 0) return <Empty />;

  return (
    <>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <Link key={s.id} href={postHref("stories", s.id)} className="group block">
            {s.images[0] ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream">
                <PostImage
                  src={s.images[0]}
                  alt=""
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition duration-500 group-hover:scale-105"
                />
                {s.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-navy">
                    {s.category}
                  </span>
                )}
              </div>
            ) : (
              <Thumb tone={tones[(i + 2) % tones.length]} className="aspect-[4/3]" label={s.category ?? undefined} />
            )}
            <p className="mt-4 text-lg font-bold leading-snug text-ink group-hover:text-navy">{s.title}</p>
            {s.body && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{s.body}</p>}
            <p className="mt-2 text-xs text-muted">
              {formatDate(s.date)}
              {s.commentCount > 0 && <span className="ml-2 font-semibold text-gold-dark">댓글 {s.commentCount}</span>}
            </p>
          </Link>
        ))}
      </div>
      <Pagination basePath="/community/stories" page={current} pages={pages} />
    </>
  );
}
