"use client";

import { useEffect, useState } from "react";
import { brand, nav, quickLinks } from "../_data/site";
import { Icon } from "./Icon";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label={`${brand.name} 홈`}>
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
    </a>
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
            <a key={q.label} href={q.href} className="flex items-center gap-1.5 transition hover:text-gold">
              <Icon name={q.icon} className="size-4" />
              {q.label}
            </a>
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

          <nav className="hidden h-full lg:block" aria-label="주 메뉴">
            <ul className="flex h-full">
              {nav.map((item) => (
                <li key={item.label} className="group relative h-full">
                  <a
                    href={item.href}
                    className="flex h-full items-center px-6 text-[15px] font-semibold text-ink transition group-hover:text-navy"
                  >
                    {item.label}
                    <span className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition group-hover:scale-x-100" />
                  </a>
                  {item.children && (
                    <ul className="invisible absolute left-1/2 top-full w-44 -translate-x-1/2 translate-y-2 rounded-b-xl border border-line bg-white py-3 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <a href={c.href} className="block px-5 py-2 text-sm text-muted hover:bg-cream hover:text-navy">
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#login"
              className="hidden items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-navy hover:text-navy sm:flex"
            >
              <Icon name="user" className="size-4" />
              로그인
            </a>
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
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="mb-4 block border-b border-white/15 pb-3 text-xl font-bold text-gold"
              >
                {item.label}
              </a>
              <ul className="space-y-2.5">
                {item.children?.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-white/75 transition hover:text-white"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-3 sm:col-span-2 lg:col-span-5">
            {quickLinks.map((q) => (
              <a
                key={q.label}
                href={q.href}
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/5 py-4 text-sm text-white/80 transition hover:bg-white/10"
              >
                <Icon name={q.icon} className="size-6 text-gold" />
                {q.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
