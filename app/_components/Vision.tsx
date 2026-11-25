import { vision } from "../_data/site";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

/** embedded: 소메뉴 페이지(/about/vision) 안에 넣을 때 — 배경·제목·여백 없이 본문만 */
export function Vision({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      id={embedded ? undefined : "vision"}
      className={embedded ? "" : "scroll-mt-20 bg-cream pb-24 pt-44 md:pt-48"}
    >
      <div className={embedded ? "" : "mx-auto max-w-7xl px-6"}>
        {!embedded && <SectionTitle eyebrow="OUR VISION" title="교회 비전" />}

        {/* 비전 선언 */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-serif text-3xl font-bold leading-snug text-navy md:text-5xl">
              “{vision.headline}”
            </p>
            <blockquote className="mt-10 rounded-2xl border border-gold/30 bg-white px-8 py-7 shadow-sm">
              <p className="font-serif text-lg leading-relaxed text-ink">{vision.verse}</p>
              <cite className="mt-3 block text-sm not-italic text-gold-dark">— {vision.verseRef}</cite>
            </blockquote>
            <p className="mt-8 leading-relaxed text-muted">{vision.statement}</p>
          </div>
        </Reveal>

        {/* 5대 사역 */}
        <div className="mt-20">
          <h3 className="mb-8 text-center text-xl font-bold text-navy">church19의 5대 사역</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {vision.pillars.map((p, i) => (
              <Reveal key={p.no} delay={i * 80}>
                <div className="group h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:bg-navy hover:shadow-xl">
                  <span className="font-serif text-3xl font-black text-gold/70 group-hover:text-gold">
                    {p.no}
                  </span>
                  <p className="mt-4 text-xl font-bold text-navy group-hover:text-white">{p.title}</p>
                  <p className="text-xs uppercase tracking-widest text-muted group-hover:text-white/50">
                    {p.en}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted group-hover:text-white/75">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 양육 5단계 */}
        <div className="mt-20 rounded-3xl bg-navy px-6 py-12 text-white md:px-12">
          <h3 className="text-center text-xl font-bold">
            제자로 세워지는 <span className="text-gold">5단계</span>
          </h3>
          <ol className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
            {vision.steps.map((s, i) => (
              <li key={s} className="relative flex flex-col items-center text-center">
                {i < vision.steps.length - 1 && (
                  <span className="absolute left-1/2 top-7 hidden h-px w-full bg-linear-to-r from-gold/70 to-white/10 md:block" />
                )}
                <span className="relative grid size-14 place-items-center rounded-full border-2 border-gold bg-navy font-serif text-lg font-bold text-gold">
                  {i + 1}
                </span>
                <span className="mt-3 font-semibold">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 비전 목표 */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {vision.goals.map((g, i) => (
            <Reveal key={g.label} delay={i * 100}>
              <div className="border-t-2 border-gold pt-6 text-center md:text-left">
                <p className="font-serif text-5xl font-black text-navy">
                  {g.value}
                  <span className="ml-1 text-xl font-bold text-gold-dark">{g.unit}</span>
                </p>
                <p className="mt-2 text-muted">{g.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
