import { featureTiles } from "../_data/site";
import { HeroCarousel } from "./HeroCarousel";
import { Icon } from "./Icon";

export function Hero() {
  return (
    // 상단 퀵바(md 이상 2.5rem) + 헤더(4.5rem)를 뺀 나머지 화면을 가득 채움
    <section
      id="top"
      className="relative h-[calc(100svh-4.5rem)] min-h-[560px] bg-navy-deep md:h-[calc(100svh-7rem)]"
    >
      <HeroCarousel />

      {/* 피처 타일 (히어로 하단에 겹침) */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-7xl translate-y-1/2 px-4 md:px-6">
        <div className="grid grid-cols-4 overflow-hidden rounded-2xl bg-white text-ink shadow-xl">
          {featureTiles.map((t, i) => (
            <a
              key={t.title}
              href={t.href}
              className={`group flex flex-col items-center gap-2 px-1 py-4 text-center transition hover:bg-cream md:flex-row md:gap-4 md:p-6 md:text-left lg:p-7 ${
                i > 0 ? "border-l border-line" : ""
              }`}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-navy transition group-hover:bg-navy group-hover:text-gold md:size-12">
                <Icon name={t.icon} className="size-5 md:size-6" />
              </span>
              <span>
                <span className="block text-xs font-bold md:text-base">{t.title}</span>
                <span className="hidden text-xs text-muted md:block">{t.sub}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
