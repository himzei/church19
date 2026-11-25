import { H3, InfoTable, SubPage, subPageMetadata } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("education", "church-school");

const depts = [
  { name: "영아부", age: "0–3세", color: "bg-[#f4c95d]" },
  { name: "유치부", age: "4–7세", color: "bg-[#f2994a]" },
  { name: "유년부", age: "초등 1–2학년", color: "bg-[#6fcf97]" },
  { name: "초등부", age: "초등 3–4학년", color: "bg-[#56ccf2]" },
  { name: "소년부", age: "초등 5–6학년", color: "bg-[#2f80ed]" },
  { name: "청소년부", age: "중 · 고등학생", color: "bg-[#9b51e0]" },
];

const rows = [
  ["영아부", "주일 오전 11:30", "교육관 1층 영아부실", "부모와 함께 드리는 예배"],
  ["유치부", "주일 오전 11:30", "교육관 1층 유치부실", "말씀 · 찬양 · 활동"],
  ["유년부 · 초등부", "주일 오전 11:30", "교육관 2층", "말씀 · 소그룹 · 큐티"],
  ["소년부", "주일 오전 11:30", "교육관 3층", "말씀 · 소그룹 · 제자훈련"],
  ["청소년부", "주일 오전 9:30", "비전홀", "예배 · 셀모임 · 수련회"],
];

export default function Page() {
  return (
    <SubPage
      section="education"
      slug="church-school"
      lead="다음 세대가 말씀 안에서 자라 하나님 나라의 일꾼이 되도록 가정과 교회가 함께 양육합니다."
    >
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {depts.map((d) => (
          <li key={d.name} className="rounded-2xl border border-line bg-white p-6 text-center">
            <span className={`mx-auto block size-12 rounded-full ${d.color}`} />
            <p className="mt-4 text-lg font-bold text-navy">{d.name}</p>
            <p className="mt-1 text-sm text-muted">{d.age}</p>
          </li>
        ))}
      </ul>

      <section className="mt-16">
        <H3>예배 시간 및 장소</H3>
        <InfoTable head={["부서", "시간", "장소", "내용"]} rows={rows} />
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-3">
        {[
          ["여름 · 겨울 성경학교", "방학마다 말씀과 놀이가 어우러진 성경학교를 엽니다."],
          ["부모 교육", "신앙의 첫 교사인 부모를 위한 자녀 양육 세미나를 진행합니다."],
          ["교사 훈련", "다음 세대를 섬기는 교사를 위한 정기 훈련과 모임이 있습니다."],
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
