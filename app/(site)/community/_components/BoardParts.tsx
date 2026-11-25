import Image from "next/image";
import Link from "next/link";

/** 게시판 사진 — 업로드 사진(Supabase)과 기본 예시 사진(/hero) 모두 next/image 로 최적화 */
export function PostImage({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${className}`} />;
}

/** 원본 비율 그대로 보여 주는 본문 사진 */
export function PostFigure({ src, alt }: { src: string; alt: string }) {
  return (
    <a href={src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl bg-cream">
      <Image src={src} alt={alt} width={1600} height={1200} sizes="(min-width: 768px) 768px, 100vw" className="h-auto w-full" />
    </a>
  );
}

/** ?page=2&q=검색어 형태의 페이지 이동 */
export function Pagination({
  basePath,
  page,
  pages,
  q = "",
}: {
  basePath: string;
  page: number;
  pages: number;
  q?: string;
}) {
  if (pages <= 1) return null;
  const href = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (p > 1) sp.set("page", String(p));
    const s = sp.toString();
    return s ? `${basePath}?${s}` : basePath;
  };
  // 현재 페이지 앞뒤 2쪽씩
  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const nums = Array.from({ length: Math.min(5, pages) }, (_, i) => start + i);
  const btn = "grid size-9 place-items-center rounded-full transition";

  return (
    <nav aria-label="페이지" className="mt-12 flex justify-center gap-1.5 text-sm">
      {page > 1 ? (
        <Link href={href(page - 1)} className={`${btn} text-muted hover:bg-cream`} aria-label="이전 페이지">‹</Link>
      ) : (
        <span className={`${btn} text-line`} aria-hidden="true">‹</span>
      )}
      {nums.map((n) =>
        n === page ? (
          <span key={n} aria-current="page" className={`${btn} bg-navy font-bold text-white`}>{n}</span>
        ) : (
          <Link key={n} href={href(n)} className={`${btn} text-muted hover:bg-cream`}>{n}</Link>
        ),
      )}
      {page < pages ? (
        <Link href={href(page + 1)} className={`${btn} text-muted hover:bg-cream`} aria-label="다음 페이지">›</Link>
      ) : (
        <span className={`${btn} text-line`} aria-hidden="true">›</span>
      )}
    </nav>
  );
}

/** 목록이 비었을 때 */
export function Empty({ q }: { q?: string }) {
  return (
    <p className="rounded-2xl border border-dashed border-line py-20 text-center text-muted">
      {q ? `‘${q}’에 대한 검색 결과가 없습니다.` : "아직 등록된 글이 없습니다."}
    </p>
  );
}

export function ListSkeleton({ grid = false }: { grid?: boolean }) {
  return grid ? (
    <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="aspect-[4/3] rounded-xl bg-cream" />
      ))}
    </div>
  ) : (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="h-12 rounded-lg bg-cream" />
      ))}
    </div>
  );
}

/** searchParams 의 page/q 값 읽기 */
export async function readListParams(searchParams: Promise<Record<string, string | string[] | undefined>>) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  return { page: Number.parseInt(one(sp.page), 10) || 1, q: one(sp.q).trim().slice(0, 50) };
}
