import { H3, SubPage, subPageMetadata } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("about", "staff");

const groups = [
  {
    title: "목회자",
    people: [
      { name: "홍길동", role: "담임목사", duty: "설교 · 목회 총괄" },
      { name: "김은혜", role: "부목사", duty: "교구 · 새가족" },
      { name: "이소망", role: "교육목사", duty: "교회학교 · 청년부" },
      { name: "박믿음", role: "선교목사", duty: "세계선교 · 다언어 예배" },
    ],
  },
  {
    title: "전도사 · 사역자",
    people: [
      { name: "최사랑", role: "전도사", duty: "유치부 · 유년부" },
      { name: "정기쁨", role: "전도사", duty: "청소년부" },
      { name: "한찬양", role: "찬양사역자", duty: "경배와 찬양" },
      { name: "윤섬김", role: "행정간사", duty: "교회 행정 · 시설" },
    ],
  },
];

export default function Page() {
  return (
    <SubPage section="about" slug="staff" lead="church19를 함께 섬기는 사역자들을 소개합니다.">
      <div className="space-y-16">
        {groups.map((g) => (
          <section key={g.title}>
            <H3>{g.title}</H3>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {g.people.map((p, i) => (
                <li key={p.name} className="overflow-hidden rounded-2xl border border-line bg-white">
                  <div
                    className={`grid aspect-square place-items-center bg-linear-to-br ${
                      i % 2 ? "from-[#2f5d8a] to-navy" : "from-navy to-[#2f5d8a]"
                    }`}
                  >
                    <span className="grid size-24 place-items-center rounded-full bg-white/10 text-3xl font-bold text-white">
                      {p.name[0]}
                    </span>
                  </div>
                  <div className="p-5 text-center">
                    <p className="text-sm font-semibold text-gold-dark">{p.role}</p>
                    <p className="mt-1 text-lg font-bold text-navy">{p.name}</p>
                    <p className="mt-2 text-sm text-muted">{p.duty}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SubPage>
  );
}
