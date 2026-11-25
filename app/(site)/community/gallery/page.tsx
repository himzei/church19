import Link from "next/link";
import { Suspense } from "react";
import { SubPage, subPageMetadata, Thumb, tones } from "@/app/_components/SubPage";
import { BOARDS, formatDate, postHref } from "@/lib/board";
import { getPosts } from "@/lib/posts";
import { Empty, ListSkeleton, Pagination, PostImage, readListParams } from "../_components/BoardParts";

export const metadata = subPageMetadata("community", "gallery");

export default function Page({ searchParams }: PageProps<"/community/gallery">) {
  return (
    <SubPage
      section="community"
      slug="gallery"
      lead="함께 웃고 함께 예배한 church19의 순간들을 사진으로 남깁니다."
    >
      <Suspense fallback={<ListSkeleton grid />}>
        <List searchParams={searchParams} />
      </Suspense>
    </SubPage>
  );
}

async function List({ searchParams }: Pick<PageProps<"/community/gallery">, "searchParams">) {
  const { page } = await readListParams(searchParams);
  const { items, pages, page: current } = await getPosts("gallery", { page, pageSize: BOARDS.gallery.pageSize });
  if (items.length === 0) return <Empty />;

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((it, i) => {
          const big = current === 1 && i === 0;
          return (
            <li key={it.id} className={big ? "col-span-2 row-span-2" : ""}>
              <Link href={postHref("gallery", it.id)} className="group relative block h-full overflow-hidden rounded-xl">
                {it.images[0] ? (
                  <div className={`relative ${big ? "aspect-square md:h-full md:aspect-auto" : "aspect-square"}`}>
                    <PostImage
                      src={it.images[0]}
                      alt={it.title}
                      sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      className="transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <Thumb tone={tones[i % tones.length]} className="aspect-square" />
                )}
                {it.images.length > 1 && (
                  <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2 py-0.5 text-xs font-semibold text-white">
                    +{it.images.length - 1}
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 text-white">
                  <span className="block font-semibold">{it.title}</span>
                  <span className="block text-xs text-white/70">{formatDate(it.date)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Pagination basePath="/community/gallery" page={current} pages={pages} />
    </>
  );
}
