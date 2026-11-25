import type { MetadataRoute } from "next";
import { postHref } from "@/lib/board";
import { getAllPostRefs } from "@/lib/posts";
import { siteUrl } from "@/lib/site-url";
import { pageHref, type SectionKey, sections } from "./_data/site";

/**
 * /sitemap.xml — 고정 페이지 + 나눔터 글 전체.
 * 글 목록은 'use cache' 로 캐시되며 관리자가 글을 쓰거나 고치면 함께 갱신된다.
 * 로그인·회원가입·프로필·관리자 페이지는 검색 노출 대상이 아니므로 넣지 않는다.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostRefs();
  const latest = (board: string) => posts.find((p) => p.board === board)?.updatedAt;
  const newest = posts[0]?.updatedAt;

  const home: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: newest, changeFrequency: "daily", priority: 1 },
  ];

  const menuPages: MetadataRoute.Sitemap = (Object.keys(sections) as SectionKey[]).flatMap((key) =>
    sections[key].pages.map((p) => {
      const board = key === "community" ? p.slug : null;
      return {
        url: siteUrl + pageHref(key, p.slug),
        lastModified: board ? latest(board) : undefined,
        changeFrequency: board ? ("daily" as const) : ("monthly" as const),
        priority: board ? 0.8 : 0.7,
      };
    }),
  );

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: siteUrl + postHref(p.board, p.id),
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const policies: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...home, ...menuPages, ...postPages, ...policies];
}
