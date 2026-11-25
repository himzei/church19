"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOARD_KEYS, BOARDS } from "@/lib/board";

const items = [
  { href: "/admin", label: "대시보드", exact: true },
  ...BOARD_KEYS.map((k) => ({ href: `/admin/${k}`, label: BOARDS[k].label, exact: false })),
  { href: "/admin/members", label: "회원 관리", exact: false },
  { href: "/admin/settings", label: "사이트 설정", exact: false },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="관리자 메뉴" className="overflow-x-auto px-3 pb-3 lg:pb-0">
      <p className="hidden px-3 pb-2 pt-4 text-[11px] font-semibold tracking-widest text-white/40 lg:block">MENU</p>
      <ul className="flex gap-1 lg:flex-col">
        {items.map((it) => {
          const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={`block whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  active ? "bg-white/10 text-gold" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
