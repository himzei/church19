import Link from "next/link";
import { SubPage, subPageMetadata } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("education", "discipleship");

const courses = [
  {
    step: "01",
    name: "새가족 과정",
    period: "4주",
    target: "등록 후 처음 오신 분",
    topics: ["복음의 기초", "교회 소개", "church19의 비전", "공동체 안으로"],
  },
  {
    step: "02",
    name: "성장 과정",
    period: "12주",
    target: "새가족 과정 수료자",
    topics: ["구원의 확신", "말씀과 기도", "예배하는 삶", "교제와 섬김"],
  },
  {
    step: "03",
    name: "제자 과정",
    period: "24주",
    target: "성장 과정 수료자",
    topics: ["제자의 정체성", "성경 개관", "성품과 영성", "전도와 양육"],
  },
  {
    step: "04",
    name: "사역 과정",
    period: "12주",
    target: "제자 과정 수료자",
    topics: ["은사 발견", "소그룹 리더십", "사역 실습", "파송"],
  },
];

export default function Page() {
  return (
    <SubPage
      section="education"
      slug="discipleship"
      lead="오도록 → 머물도록 → 배우도록 → 섬기도록 → 보내도록. 단계별 훈련으로 한 사람을 제자로 세웁니다."
    >
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {courses.map((c) => (
          <li key={c.step} className="relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
            <div className="bg-navy px-6 py-6 text-white">
              <span className="absolute right-4 top-2 text-6xl font-black text-white/10">{c.step}</span>
              <p className="text-xs font-bold tracking-widest text-gold">STEP {c.step}</p>
              <p className="mt-2 text-2xl font-extrabold">{c.name}</p>
              <p className="mt-1 text-sm text-white/60">{c.period}</p>
            </div>
            <div className="flex-1 p-6">
              <p className="text-sm text-muted">
                대상 · <span className="font-semibold text-ink">{c.target}</span>
              </p>
              <ul className="mt-4 space-y-2">
                {c.topics.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-ink">
                    <span className="size-1.5 rounded-full bg-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl bg-cream p-8 md:flex-row md:p-10">
        <div>
          <p className="text-xl font-bold text-navy">2027년 상반기 훈련 신청 안내</p>
          <p className="mt-2 text-muted">신청 기간: 2027년 1월 3일 ~ 1월 24일 · 개강: 2월 둘째 주</p>
        </div>
        <Link
          href="/login?callbackURL=/education/discipleship"
          className="shrink-0 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-navy-deep"
        >
          로그인 후 신청하기
        </Link>
      </div>
    </SubPage>
  );
}
