import { brand, featureTiles, sermons } from "../_data/site";
import { Icon } from "./Icon";

export function Hero() {
  const latest = sermons[0];

  return (
    <section id="top" className="relative bg-navy text-white">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.28),transparent_65%)]" />
        <div className="absolute -bottom-60 right-0 size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(69,123,157,0.45),transparent_65%)]" />
        <span className="absolute -right-6 top-6 select-none font-serif text-[22rem] font-black leading-none text-white/[0.04] md:text-[30rem]">
          19
        </span>
        {/* 빛줄기 */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px lg:block bg-linear-to-b from-gold/60 via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-40 pt-20 md:pt-28 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs tracking-[0.2em] text-gold">
            WELCOME TO CHURCH19
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">
            사람을 살리고
            <br />
            <span className="text-gold">키우고, 세우는</span>
            <br />
            생명의 공동체
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
            {brand.slogan}. 처음 오신 당신을 진심으로 환영합니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#worship"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep transition hover:bg-gold-light"
            >
              예배 안내
              <Icon name="arrow" className="size-4" />
            </a>
            <a
              href="#vision"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10"
            >
              우리의 비전
            </a>
          </div>
        </div>

        {/* 최신 설교 카드 */}
        <a
          href="#sermons"
          className="group animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur [animation-delay:150ms]"
        >
          <div className={`relative aspect-video overflow-hidden rounded-xl bg-linear-to-br ${latest.tone}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent_55%)]" />
            <span className="absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold tracking-wider">
              LATEST SERMON
            </span>
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-white/90 text-navy shadow-xl transition group-hover:scale-110">
                <Icon name="play" className="size-9" />
              </span>
            </span>
          </div>
          <div className="px-2 pb-2 pt-4">
            <p className="text-xs text-gold">
              {latest.date} · {latest.passage}
            </p>
            <p className="mt-1 text-lg font-bold">{latest.title}</p>
            <p className="text-sm text-white/60">{latest.preacher}</p>
          </div>
        </a>
      </div>

      {/* 피처 타일 (히어로 하단에 겹침) */}
      <div className="relative mx-auto -mb-px max-w-7xl px-6">
        <div className="absolute inset-x-6 bottom-0 z-10 grid translate-y-1/2 grid-cols-2 overflow-hidden rounded-2xl bg-white text-ink shadow-xl md:grid-cols-4">
          {featureTiles.map((t, i) => (
            <a
              key={t.title}
              href={t.href}
              className={`group flex flex-col items-center gap-3 p-5 text-center transition hover:bg-cream sm:flex-row sm:gap-4 sm:text-left md:p-7 ${
                i > 0 ? "md:border-l" : ""
              } ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} border-line`}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cream text-navy transition group-hover:bg-navy group-hover:text-gold">
                <Icon name={t.icon} />
              </span>
              <span>
                <span className="block font-bold">{t.title}</span>
                <span className="block text-xs text-muted">{t.sub}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
