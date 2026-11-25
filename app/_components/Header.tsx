"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { brand, nav, quickLinks } from "../_data/site";
import { Icon } from "./Icon";
import { UserAvatar } from "./UserAvatar";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${brand.name} 홈`}>
      <span
        className={`grid size-9 place-items-center rounded-full font-serif text-sm font-bold ${
          light ? "bg-white text-navy" : "bg-navy text-white"
        }`}
      >
        19
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-navy"}`}>
        church<span className="text-gold">19</span>
      </span>
    </Link>
  );
}

// 링크 클릭 후 포커스가 남아 드롭다운이 열린 채로 있지 않도록
const blur = (e: React.MouseEvent<HTMLElement>) => e.currentTarget.blur();

function ActiveMainNav() {
  return <MainNav pathname={usePathname()} />;
}

function MainNav({ pathname }: { pathname: string }) {
  const activeKey = nav.find((n) => pathname.startsWith(`/${n.key}/`))?.key;
  return (
    <nav className="hidden h-full lg:block" aria-label="주 메뉴">
      <ul className="flex h-full">
        {nav.map((item) => (
          <li key={item.label} className="group relative h-full">
            <Link
              href={item.href}
              onClick={blur}
              aria-current={activeKey === item.key ? "page" : undefined}
              className={`flex h-full items-center px-6 text-[15px] font-semibold transition group-hover:text-navy ${
                activeKey === item.key ? "text-navy" : "text-ink"
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-6 bottom-0 h-0.5 origin-left bg-gold transition group-hover:scale-x-100 ${
                  activeKey === item.key ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
            {item.children.length > 0 && (
              <ul className="invisible absolute left-1/2 top-full w-44 -translate-x-1/2 translate-y-2 rounded-b-xl border border-line bg-white py-3 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {item.children.map((c) => (
                  <li key={c.label}>
                    <Link
                      href={c.href}
                      onClick={blur}
                      className={`block px-5 py-2 text-sm hover:bg-cream hover:text-navy ${
                        pathname === c.href ? "font-semibold text-navy" : "text-muted"
                      }`}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {/* 상단 퀵 바 */}
      <div className="hidden bg-navy-deep text-white/80 md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-end gap-6 px-6 text-xs">
          {quickLinks.map((q) => (
            <Link key={q.label} href={q.href} className="flex items-center gap-1.5 transition hover:text-gold">
              <Icon name={q.icon} className="size-4" />
              {q.label}
            </Link>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled ? "border-line bg-white/95 shadow-sm backdrop-blur" : "border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <Logo />

          {/* 현재 위치 표시는 주소를 읽어야 하므로 Suspense 안에서 (나머지 헤더는 정적으로 미리 렌더) */}
          <Suspense fallback={<MainNav pathname="" />}>
            <ActiveMainNav />
          </Suspense>

          <div className="flex items-center gap-2">
            <AuthButtons />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center rounded-full bg-navy text-white transition hover:bg-navy-deep"
              aria-label="전체메뉴 열기"
              aria-expanded={menuOpen}
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 전체메뉴 오버레이 */}
      <div
        className={`fixed inset-0 z-50 bg-navy-deep/97 text-white transition-opacity duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="전체메뉴"
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <Logo light />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="grid size-10 place-items-center rounded-full border border-white/20 transition hover:bg-white/10"
            aria-label="전체메뉴 닫기"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>
        <div className="mx-auto grid max-h-[calc(100vh-4.5rem)] max-w-7xl gap-10 overflow-y-auto px-6 py-10 sm:grid-cols-2 lg:grid-cols-5">
          {nav.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="mb-4 block border-b border-white/15 pb-3 text-xl font-bold text-gold"
              >
                {item.label}
              </Link>
              <ul className="space-y-2.5">
                {item.children.map((c) => (
                  <li key={c.label}>
                    <Link
                      href={c.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-white/75 transition hover:text-white"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex gap-3 sm:col-span-2 sm:hidden">
            <AuthButtons compact onNavigate={() => setMenuOpen(false)} />
          </div>
          <div className="grid grid-cols-3 gap-3 sm:col-span-2 lg:col-span-5">
            {quickLinks.map((q) => (
              <Link
                key={q.label}
                href={q.href}
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/5 py-4 text-sm text-white/80 transition hover:bg-white/10"
              >
                <Icon name={q.icon} className="size-6 text-gold" />
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/** 로그인 상태에 따라 로그인·회원가입 또는 사용자 이름·로그아웃 표시 */
function AuthButtons({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const base = compact
    ? "flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/25 px-4 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
    : "hidden items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-navy hover:text-navy sm:flex";

  if (isPending) return <span className={`${base} invisible`}>로그인</span>;

  if (session) {
    const { name, image, role } = session.user;
    return (
      <>
        {role === "admin" && (
          <Link
            href="/admin"
            onClick={onNavigate}
            className={
              compact
                ? base
                : "hidden items-center rounded-full bg-gold/15 px-3.5 py-2 text-sm font-bold text-gold-dark transition hover:bg-gold/25 lg:flex"
            }
          >
            관리자
          </Link>
        )}
        {compact ? (
          <Link href="/profile" onClick={onNavigate} className={base}>
            <UserAvatar name={name} image={image} className="size-6 text-[11px]" />
            내 프로필
          </Link>
        ) : (
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1 transition hover:bg-cream sm:pr-3"
            aria-label="내 프로필"
          >
            <UserAvatar name={name} image={image} className="size-9 text-sm" />
            <span className="hidden max-w-28 truncate text-sm font-semibold text-ink md:block">
              {name || "성도"}님
            </span>
          </Link>
        )}
        <button
          type="button"
          className={base}
          onClick={async () => {
            await signOut();
            onNavigate?.();
            router.refresh();
          }}
        >
          <Icon name="user" className="size-4" />
          로그아웃
        </button>
      </>
    );
  }

  return (
    <>
      <Link href="/login" onClick={onNavigate} className={base}>
        <Icon name="user" className="size-4" />
        로그인
      </Link>
      {compact && (
        <Link href="/signup" onClick={onNavigate} className={base}>
          회원가입
        </Link>
      )}
    </>
  );
}
