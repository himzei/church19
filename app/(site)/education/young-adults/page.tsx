import { Card, H3, SubPage, subPageMetadata } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("education", "young-adults");

const schedule = [
  { day: "주일", time: "오후 2:00", title: "청년 예배", desc: "찬양 · 말씀 · 기도로 드리는 청년 예배" },
  { day: "주일", time: "오후 3:30", title: "소그룹 모임", desc: "또래별 소그룹에서 말씀과 삶을 나눔" },
  { day: "금요일", time: "오후 9:00", title: "금요 기도회", desc: "청년 찬양팀이 인도하는 기도의 밤" },
];

const groups = [
  { name: "새내기", target: "20–24세", desc: "대학 생활과 진로를 함께 고민하는 공동체" },
  { name: "청년 1부", target: "25–29세", desc: "사회 초년생의 일터와 신앙을 나누는 공동체" },
  { name: "청년 2부", target: "30대", desc: "결혼 · 가정 · 커리어 안에서 믿음으로 사는 공동체" },
];

export default function Page() {
  return (
    <SubPage
      section="education"
      slug="young-adults"
      lead="20–30대가 함께 예배하고 꿈꾸며, 세상 속에서 그리스도인으로 살아가는 공동체입니다."
    >
      <section>
        <H3>정기 모임</H3>
        <ul className="grid gap-5 md:grid-cols-3">
          {schedule.map((s) => (
            <li key={s.title} className="rounded-2xl bg-navy p-7 text-white">
              <p className="text-sm text-gold">
                {s.day} · {s.time}
              </p>
              <p className="mt-2 text-xl font-bold">{s.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <H3>공동체</H3>
        <div className="grid gap-5 md:grid-cols-3">
          {groups.map((g) => (
            <Card key={g.name}>
              <p className="text-sm font-semibold text-gold-dark">{g.target}</p>
              <p className="mt-1 text-xl font-bold text-navy">{g.name}</p>
              <p className="mt-3 text-sm text-muted">{g.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-cream p-8">
          <p className="text-lg font-bold text-navy">수련회 · 단기선교</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            매년 여름과 겨울 수련회, 그리고 해외 단기선교를 통해 함께 성장합니다.
          </p>
        </div>
        <div className="rounded-2xl bg-cream p-8">
          <p className="text-lg font-bold text-navy">새가족 청년 환영</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            처음 오신 청년은 예배 후 비전홀 앞 안내데스크로 와 주세요. 새가족 모임으로 안내해 드립니다.
          </p>
        </div>
      </section>
    </SubPage>
  );
}
