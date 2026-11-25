"use client";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { photos as images } from "../_data/images";
import { heroSlides } from "../_data/site";
import { Icon } from "./Icon";

const DELAY = 5000;

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 }, [
    Fade(),
    Autoplay({ delay: DELAY, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    emblaApi.on("select", onSelect).on("autoplay:play", onPlay).on("autoplay:stop", onStop);
    return () => {
      emblaApi.off("select", onSelect).off("autoplay:play", onPlay).off("autoplay:stop", onStop);
    };
  }, [emblaApi]);

  // 수동 이동 시 자동재생 타이머를 처음부터 다시 시작
  const go = useCallback(
    (fn: () => void) => {
      if (!emblaApi) return;
      fn();
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay?.isPlaying()) autoplay.reset();
    },
    [emblaApi],
  );

  const togglePlay = () => {
    const autoplay = emblaApi?.plugins().autoplay;
    if (!autoplay) return;
    if (autoplay.isPlaying()) autoplay.stop();
    else autoplay.play();
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="absolute inset-0" aria-roledescription="carousel" aria-label="메인 슬라이드">
      {/* 슬라이드 */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {heroSlides.map((s, i) => {
            const active = i === selected;
            return (
              <div
                key={s.image}
                className="relative h-full min-w-0 flex-[0_0_100%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${heroSlides.length}`}
                aria-hidden={!active}
              >
                <Image
                  src={images[s.image]}
                  alt=""
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  preload={i === 0}
                  className={`object-cover transition-transform duration-[7000ms] ease-out motion-reduce:transition-none ${
                    active ? "scale-100" : "scale-110"
                  }`}
                />
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-linear-to-b from-navy-deep/70 via-navy-deep/45 to-navy-deep/80" />

                {/* 텍스트 */}
                <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 pb-24 text-center text-white">
                  <div key={active ? `on-${selected}` : "off"} className={active ? "" : "opacity-0"}>
                    <p className="animate-fade-up text-xs font-semibold tracking-[0.4em] text-gold [animation-delay:200ms]">
                      {s.eyebrow}
                    </p>
                    <h2 className="mt-5 animate-fade-up text-4xl font-extrabold leading-tight tracking-tight [animation-delay:350ms] md:text-6xl lg:text-7xl">
                      {s.title}
                    </h2>
                    <span className="mx-auto mt-6 block h-0.5 w-14 animate-fade-up bg-gold [animation-delay:450ms]" />
                    <p className="mt-6 animate-fade-up whitespace-pre-line text-base leading-relaxed text-white/80 [animation-delay:550ms] md:text-lg">
                      {s.desc}
                    </p>
                    <Link
                      href={s.cta.href}
                      tabIndex={active ? 0 : -1}
                      className="mt-10 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold backdrop-blur-sm transition [animation-delay:700ms] hover:border-gold hover:bg-gold hover:text-navy-deep"
                    >
                      {s.cta.label}
                      <Icon name="arrow" className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 좌우 화살표 */}
      <button
        type="button"
        onClick={() => go(() => emblaApi?.scrollPrev())}
        className="absolute left-4 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold hover:bg-white/10 md:grid lg:left-8"
        aria-label="이전 슬라이드"
      >
        <Icon name="arrow" className="size-5 rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => go(() => emblaApi?.scrollNext())}
        className="absolute right-4 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold hover:bg-white/10 md:grid lg:right-8"
        aria-label="다음 슬라이드"
      >
        <Icon name="arrow" className="size-5" />
      </button>

      {/* 하단 컨트롤: 카운터 · 진행바 · 점 · 재생/정지 */}
      <div className="absolute inset-x-0 bottom-16 md:bottom-20">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-5 px-6 text-white">
          <span className="font-semibold tabular-nums text-sm">
            <span className="text-gold">{pad(selected + 1)}</span>
            <span className="text-white/50"> / {pad(heroSlides.length)}</span>
          </span>

          <div className="flex items-center gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => go(() => emblaApi?.scrollTo(i))}
                className="group relative h-1 overflow-hidden rounded-full bg-white/25 transition-all duration-500"
                style={{ width: i === selected ? 56 : 20 }}
                aria-label={`${i + 1}번 슬라이드로 이동`}
                aria-current={i === selected}
              >
                {i === selected && (
                  <span
                    key={`${selected}-${playing}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-gold"
                    style={{
                      animation: playing ? `hero-progress ${DELAY}ms linear forwards` : "none",
                      width: playing ? undefined : "100%",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={togglePlay}
            className="grid size-8 place-items-center rounded-full border border-white/30 transition hover:border-gold"
            aria-label={playing ? "자동재생 정지" : "자동재생 시작"}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
                <path d="M7 5v14l12-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 사진 출처 */}
      <a
        href={heroSlides[selected].credit.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-16 right-6 hidden text-[11px] text-white/40 transition hover:text-white/80 lg:block md:bottom-20"
      >
        Photo · {heroSlides[selected].credit.name} / Unsplash
      </a>
    </div>
  );
}
