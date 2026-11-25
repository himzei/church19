import { H3, SubPage, subPageMetadata } from "@/app/_components/SubPage";
import { mission } from "@/app/_data/site";

export const metadata = subPageMetadata("mission", "world");

const regions = [
  { region: "동아시아", countries: ["중국", "몽골", "일본"], work: "교회 개척 · 신학교 사역" },
  { region: "동남아시아", countries: ["베트남", "캄보디아", "필리핀", "태국"], work: "교육 · 의료 · 어린이 사역" },
  { region: "중앙아시아", countries: ["카자흐스탄", "우즈베키스탄", "키르기스스탄"], work: "현지인 리더 양성" },
  { region: "아프리카", countries: ["케냐", "탄자니아", "우간다"], work: "우물 · 학교 · 지역개발" },
  { region: "유럽 · 기타", countries: ["러시아", "튀르키예", "독일"], work: "디아스포라 · 난민 사역" },
];

const stats = [
  ["19", "개국", "선교 파트너 국가"],
  ["24", "가정", "협력 선교사"],
  ["7", "개", "현지 교회 개척"],
];

export default function Page() {
  return (
    <SubPage section="mission" slug="world">
      <blockquote className="mx-auto max-w-3xl rounded-3xl bg-navy px-8 py-10 text-center text-white">
        <p className="font-serif text-2xl font-bold leading-relaxed md:text-3xl">“{mission.verse}”</p>
        <cite className="mt-4 block text-sm not-italic text-gold">— {mission.verseRef}</cite>
      </blockquote>

      <div className="mt-12 grid grid-cols-3 gap-4 text-center">
        {stats.map(([v, u, l]) => (
          <div key={l} className="border-t-2 border-gold pt-6">
            <p className="text-4xl font-black text-navy md:text-5xl">
              {v}
              <span className="ml-1 text-lg font-bold text-gold-dark">{u}</span>
            </p>
            <p className="mt-2 text-sm text-muted">{l}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <H3>지역별 선교 현황</H3>
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {regions.map((r) => (
            <li key={r.region} className="grid gap-3 px-6 py-6 md:grid-cols-[160px_1fr_auto] md:items-center">
              <p className="text-lg font-bold text-navy">{r.region}</p>
              <ul className="flex flex-wrap gap-2">
                {r.countries.map((c) => (
                  <li key={c} className="rounded-full bg-cream px-3 py-1 text-sm text-ink">
                    {c}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted">{r.work}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-3">
        {[
          ["기도로 동역", "매월 첫 주 선교 기도회에서 선교사님들을 위해 기도합니다."],
          ["물질로 동역", "선교 헌금은 전액 선교 현장과 선교사 후원에 사용됩니다."],
          ["몸으로 동역", "단기선교팀과 전문인 선교로 현장을 함께 섬깁니다."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl bg-cream p-7">
            <p className="text-lg font-bold text-navy">{t}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </section>
    </SubPage>
  );
}
