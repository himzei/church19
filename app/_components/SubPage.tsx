import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photoCredits, photos } from "../_data/images";
import { pageHref, type Section, type SectionKey, sections } from "../_data/site";

function lookup(section: SectionKey, slug: string) {
  const s: Section = sections[section];
  const page = s.pages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown page: ${section}/${slug}`);
  return { s, page };
}

/** 소메뉴 페이지의 <title> 생성 */
export function subPageMetadata(section: SectionKey, slug: string): Metadata {
  const { s, page } = lookup(section, slug);
  return { title: `${page.label} | ${s.label} | church19` };
}

/** 소메뉴 공통 틀: 배너 · 경로 · 탭 메뉴 · 페이지 제목 */
export function SubPage({
  section,
  slug,
  lead,
  children,
}: {
  section: SectionKey;
  slug: string;
  lead?: string;
  children: React.ReactNode;
}) {
  const { s, page } = lookup(section, slug);

  return (
    <>
      {/* 배너 */}
      <section className="relative h-64 overflow-hidden bg-navy-deep md:h-80">
        <Image
          src={photos[s.image]}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          preload
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy-deep/75 via-navy-deep/55 to-navy-deep/80" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-xs font-semibold tracking-[0.4em] text-gold">{s.en}</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{s.label}</h1>
          <p className="mt-4 text-sm text-white/75 md:text-base">{s.desc}</p>
        </div>
        <span className="absolute bottom-3 right-4 hidden text-[11px] text-white/40 md:block">
          Photo · {photoCredits[s.image]} / Unsplash
        </span>
      </section>

      {/* 경로 + 탭 메뉴 */}
      <div className="sticky top-18 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6">
          <nav aria-label="현재 위치" className="hidden shrink-0 text-sm text-muted lg:block">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-navy">
                  홈
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>{s.label}</li>
              <li aria-hidden="true">›</li>
              <li className="font-semibold text-navy">{page.label}</li>
            </ol>
          </nav>
          <nav aria-label={`${s.label} 메뉴`} className="-mx-6 overflow-x-auto px-6 lg:ml-auto lg:mr-0">
            <ul className="flex whitespace-nowrap">
              {s.pages.map((p) => {
                const active = p.slug === slug;
                return (
                  <li key={p.slug}>
                    <Link
                      href={pageHref(section, p.slug)}
                      aria-current={active ? "page" : undefined}
                      className={`relative block px-4 py-4 text-sm font-semibold transition md:px-5 md:text-[15px] ${
                        active ? "text-navy" : "text-muted hover:text-navy"
                      }`}
                    >
                      {p.label}
                      {active && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-gold" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* 본문 */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{page.label}</h2>
          <span className="mx-auto mt-5 block h-0.5 w-10 bg-gold" />
          {lead && <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted">{lead}</p>}
        </header>
        {children}
      </div>
    </>
  );
}

/* ── 페이지 본문에서 재사용하는 작은 조각들 ── */

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-line bg-white p-7 ${className}`}>{children}</div>;
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-5 text-xl font-bold text-navy">{children}</h3>;
}

export function InfoTable({
  head,
  rows,
}: {
  head: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-navy text-white">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-5 py-3.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-white">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-cream/60">
              {r.map((c, j) => (
                <td key={j} className={`px-5 py-4 ${j === 0 ? "font-semibold text-ink" : "text-muted"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** 사진 대신 쓰는 그라데이션 썸네일 */
export function Thumb({
  tone,
  label,
  play = false,
  className = "aspect-video",
}: {
  tone: string;
  label?: string;
  play?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-linear-to-br ${tone} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.25),transparent_55%)] transition duration-500 group-hover:scale-110" />
      {label && (
        <span className="absolute bottom-3 left-3 text-sm font-bold text-white/85">{label}</span>
      )}
      {play && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-12 place-items-center rounded-full bg-white/90 text-navy shadow-lg transition group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor" aria-hidden="true">
              <path d="M7 5v14l12-7z" />
            </svg>
          </span>
        </span>
      )}
    </div>
  );
}

export const tones = [
  "from-[#1d3557] to-[#457b9d]",
  "from-[#3d2c5e] to-[#7b5ea7]",
  "from-[#6b3a1e] to-[#c9862f]",
  "from-[#1f4d3a] to-[#4f9a72]",
  "from-[#5e1f2c] to-[#b25a6a]",
  "from-[#13294b] to-[#d4ad3f]",
];
