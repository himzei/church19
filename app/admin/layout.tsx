import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { UserAvatar } from "@/app/_components/UserAvatar";
import { requireAdmin } from "@/lib/dal";
import { AdminNav } from "./_components/AdminNav";

export const metadata: Metadata = {
  title: { default: "관리자 | church19", template: "%s | 관리자 | church19" },
  robots: { index: false, follow: false },
};

/**
 * 관리자 화면 틀. 권한 확인은 각 페이지와 서버 액션에서 다시 한다
 * (레이아웃은 화면 이동 때 다시 실행되지 않으므로 레이아웃만으로 보호하지 않는다).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f5f7] lg:flex-row">
      <aside className="shrink-0 bg-navy-deep text-white lg:sticky lg:top-0 lg:h-screen lg:w-60">
        <div className="flex h-16 items-center justify-between px-5 lg:h-20">
          <Link href="/admin" className="flex items-center gap-2 font-extrabold">
            <span className="grid size-8 place-items-center rounded-full bg-gold font-serif text-sm text-navy-deep">19</span>
            <span>
              church<span className="text-gold">19</span>
              <span className="ml-1.5 text-xs font-semibold text-white/50">관리자</span>
            </span>
          </Link>
        </div>
        <Suspense fallback={<div className="h-12" />}>
          <AdminNav />
        </Suspense>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-end gap-4 border-b border-line bg-white px-6">
          <Link href="/" className="text-sm font-semibold text-muted hover:text-navy">
            사이트 보기 ↗
          </Link>
          <Suspense fallback={<span className="size-8 rounded-full bg-cream" />}>
            <AdminBadge />
          </Suspense>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}

async function AdminBadge() {
  const user = await requireAdmin();
  return (
    <Link href="/profile" className="flex items-center gap-2 text-sm font-semibold text-ink">
      <UserAvatar name={user.name} image={user.image} className="size-8 text-xs" />
      {user.name}
    </Link>
  );
}
