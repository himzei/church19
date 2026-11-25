import Image from "next/image";
import Link from "next/link";
import sanctuary from "@/public/hero/sanctuary.jpg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1fr_1.1fr]">
      {/* 좌측 비주얼 */}
      <aside className="relative hidden overflow-hidden bg-navy-deep lg:block">
        <Image
          src={sanctuary}
          alt=""
          fill
          sizes="50vw"
          placeholder="blur"
          preload
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/60 to-navy-deep/30" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Brand light />
          <div>
            <p className="text-xs font-semibold tracking-[0.4em] text-gold">WELCOME HOME</p>
            <p className="mt-5 text-4xl font-extrabold leading-tight tracking-tight">
              사람을 살리고,
              <br />
              키우고, 세우는 공동체
            </p>
            <p className="mt-5 max-w-md leading-relaxed text-white/70">
              church19 회원이 되시면 온라인 신청, 주보, 소그룹 소식 등 더 많은 서비스를 이용하실 수 있습니다.
            </p>
          </div>
          <p className="text-[11px] text-white/40">Photo · Debby Hudson / Unsplash</p>
        </div>
      </aside>

      {/* 우측 폼 */}
      <main className="flex flex-col bg-white">
        <div className="flex items-center justify-between px-6 py-5 lg:justify-end lg:px-10">
          <span className="lg:hidden">
            <Brand />
          </span>
          <Link href="/" className="text-sm text-muted transition hover:text-navy">
            ← 홈으로
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-16">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="church19 홈">
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
