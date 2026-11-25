import {
  aboutCards,
  education,
  mission,
  notices,
  sermons,
  stories,
  worship,
} from "../_data/site";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

function MoreLink({ href, light = false }: { href: string; light?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1 text-sm font-semibold transition ${
        light ? "text-white/70 hover:text-gold" : "text-muted hover:text-navy"
      }`}
    >
      전체보기 <Icon name="plus" className="size-4" />
    </a>
  );
}

/* ───────── 교회 소개 ───────── */
export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <SectionTitle
            align="left"
            eyebrow="ABOUT US"
            title="church19를 소개합니다"
            desc="교회 소개, 새가족 안내, 예배 안내, 훈련 과정까지 church19의 모든 이야기를 만나보세요."
          />
          <p className="font-serif text-xl font-bold leading-relaxed text-navy">
            사람을 살리고, 키우고, 세우는
            <br />
            <span className="text-gold-dark">생명의 공동체</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {aboutCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <a
                href={c.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-navy hover:shadow-xl"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-cream text-navy transition group-hover:bg-navy group-hover:text-gold">
                  <Icon name={c.icon} className="size-7" />
                </span>
                <span className="mt-6 text-lg font-bold text-ink">{c.title}</span>
                <span className="mt-1 text-sm text-muted">{c.desc}</span>
                <Icon
                  name="arrow"
                  className="mt-6 size-5 text-muted transition group-hover:translate-x-1 group-hover:text-gold-dark"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 예배 안내 ───────── */
export function Worship() {
  return (
    <section id="worship" className="scroll-mt-20 bg-navy-deep py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          light
          eyebrow="WORSHIP"
          title="예배 안내"
          desc="하나님 앞에 함께 서는 시간, 언제든 church19의 예배에 오세요."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {worship.map((g) => (
            <div key={g.group} className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gold">
                <Icon name="clock" className="size-5" />
                {g.group}
              </h3>
              <ul className="divide-y divide-white/10">
                {g.items.map((w) => (
                  <li key={w.name} className="flex items-center justify-between py-4">
                    <span className="font-semibold">{w.name}</span>
                    <span className="flex items-center gap-4 text-sm">
                      <span className="text-white/50">{w.place}</span>
                      <span className="min-w-28 text-right font-serif text-base font-bold">{w.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 설교 영상 ───────── */
export function Sermons() {
  return (
    <section id="sermons" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <SectionTitle align="left" eyebrow="CHURCH19 TV" title="말씀과 찬양" />
          <div className="mb-12">
            <MoreLink href="#sermons" />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sermons.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <a href="#sermons" className="group block">
                <div className={`relative aspect-video overflow-hidden rounded-xl bg-linear-to-br ${s.tone}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.25),transparent_55%)] transition duration-500 group-hover:scale-110" />
                  <span className="absolute bottom-3 left-3 font-serif text-sm font-bold text-white/80">
                    {s.passage}
                  </span>
                  <span className="absolute inset-0 grid place-items-center opacity-80 transition group-hover:opacity-100">
                    <span className="grid size-12 place-items-center rounded-full bg-white/90 text-navy transition group-hover:scale-110">
                      <Icon name="play" className="size-7" />
                    </span>
                  </span>
                </div>
                <p className="mt-4 text-xs text-muted">
                  {s.date} · {s.preacher}
                </p>
                <p className="mt-1 font-bold text-ink transition group-hover:text-navy">{s.title}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 나눔터: 사역 스토리 + 공지사항 ───────── */
export function News() {
  return (
    <section id="news" className="scroll-mt-20 bg-cream py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center justify-between border-b-2 border-navy pb-4">
            <h3 className="text-xl font-bold text-navy">사역 스토리</h3>
            <MoreLink href="#news" />
          </div>
          <ul className="space-y-4">
            {stories.map((s, i) => (
              <li key={s.title}>
                <a href="#news" className="group flex gap-5 rounded-xl bg-white p-3 transition hover:shadow-md">
                  <span
                    className={`grid h-20 w-28 shrink-0 place-items-center rounded-lg font-serif text-2xl font-black text-white/80 ${
                      ["bg-[#c9862f]", "bg-[#4f9a72]", "bg-[#457b9d]"][i % 3]
                    }`}
                  >
                    {s.tag}
                  </span>
                  <span className="flex flex-col justify-center">
                    <span className="font-semibold text-ink group-hover:text-navy">{s.title}</span>
                    <span className="mt-1 text-xs text-muted">{s.date}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between border-b-2 border-navy pb-4">
            <h3 className="text-xl font-bold text-navy">공지사항</h3>
            <MoreLink href="#news" />
          </div>
          <ul className="divide-y divide-line rounded-xl bg-white px-6">
            {notices.map((n) => (
              <li key={n.title}>
                <a href="#news" className="group flex items-center justify-between gap-4 py-5">
                  <span className="flex items-center gap-3">
                    <span className="size-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="line-clamp-1 text-ink group-hover:text-navy group-hover:underline">
                      {n.title}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-muted">{n.date}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "주보", icon: "bulletin" },
              { label: "온라인헌금", icon: "offering" },
              { label: "기부금영수증", icon: "form" },
            ].map((b) => (
              <a
                key={b.label}
                href="#news"
                className="flex flex-col items-center gap-2 rounded-xl bg-navy py-5 text-sm font-semibold text-white transition hover:bg-navy-deep"
              >
                <Icon name={b.icon} className="size-6 text-gold" />
                {b.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── 교육·훈련 ───────── */
export function Education() {
  return (
    <section id="education" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="EDUCATION"
          title="교육·훈련"
          desc="우리는 신앙교육공동체로서 모든 세대를 그리스도의 제자로 양육하여 사역자로 세웁니다."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 80}>
              <a
                href="#education"
                className="group relative block h-full overflow-hidden rounded-2xl bg-navy p-8 text-white"
              >
                <span className="absolute -right-4 -top-6 font-serif text-8xl font-black text-white/5 transition group-hover:text-gold/20">
                  0{i + 1}
                </span>
                <p className="text-xs uppercase tracking-widest text-gold">{e.en}</p>
                <p className="mt-3 text-2xl font-bold">{e.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/65">{e.desc}</p>
                <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  바로가기 <Icon name="arrow" className="size-4 transition group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 선교 ───────── */
export function Mission() {
  return (
    <section
      id="mission"
      className="relative scroll-mt-20 overflow-hidden bg-linear-to-br from-navy to-[#1d4e6e] py-24 text-white"
    >
      <Icon
        name="globe"
        className="pointer-events-none absolute -right-24 -top-24 size-[32rem] text-white/[0.05]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionTitle align="left" light eyebrow="MISSION" title="church19 세계선교" />
          <p className="font-serif text-2xl font-bold leading-relaxed">“{mission.verse}”</p>
          <p className="mt-2 text-sm text-gold">— {mission.verseRef}</p>
          <p className="mt-6 text-white/70">지역 복음화에서 세계 선교까지, 보냄 받은 공동체로 살아갑니다.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#mission"
              className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy-deep transition hover:bg-gold-light"
            >
              선교회 바로가기
            </a>
            <a
              href="#mission"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              선교 영상 보기
            </a>
          </div>
        </div>
        <ul className="grid gap-4">
          {mission.languages.map((l) => (
            <li key={l.title}>
              <a
                href="#mission"
                className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-7 py-6 backdrop-blur transition hover:border-gold hover:bg-white/10"
              >
                <span>
                  <span className="block text-lg font-bold">{l.title}</span>
                  <span className="text-xs uppercase tracking-widest text-white/50">
                    {l.en} · Part of worship
                  </span>
                </span>
                <Icon name="arrow" className="size-5 text-gold transition group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
