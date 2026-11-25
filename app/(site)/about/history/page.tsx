import { SubPage, subPageMetadata } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("about", "history");

const history = [
  {
    year: "2026",
    items: [
      ["11월", "추수감사주일 연합예배 및 지역 나눔 행사"],
      ["06월", "청년부 단기선교 (베트남)"],
      ["03월", "성경대학 봄학기 개강"],
    ],
  },
  {
    year: "2025",
    items: [
      ["10월", "다언어 예배부 신설 (중국어·베트남어·러시아어)"],
      ["05월", "교회학교 리모델링 및 비전홀 헌당"],
    ],
  },
  {
    year: "2023",
    items: [
      ["09월", "제자훈련원 개원"],
      ["04월", "세계선교회 창립, 첫 선교사 파송"],
    ],
  },
  {
    year: "2021",
    items: [
      ["12월", "현 예배당 입당 감사예배"],
      ["03월", "소그룹(사랑방) 사역 시작"],
    ],
  },
  {
    year: "2019",
    items: [
      ["09월", "church19 창립 예배"],
      ["06월", "개척 준비 기도모임 시작 (19명)"],
    ],
  },
];

export default function Page() {
  return (
    <SubPage
      section="about"
      slug="history"
      lead="2019년 19명의 기도로 시작된 church19의 발자취입니다. 지나온 모든 걸음이 하나님의 은혜였습니다."
    >
      <ol className="relative mx-auto max-w-3xl border-l-2 border-line pl-8 md:pl-12">
        {history.map((h) => (
          <li key={h.year} className="relative pb-14 last:pb-0">
            <span className="absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border-4 border-white bg-gold ring-2 ring-gold md:-left-[57px]" />
            <p className="text-3xl font-extrabold text-navy">{h.year}</p>
            <ul className="mt-5 space-y-3">
              {h.items.map(([m, t]) => (
                <li key={t} className="flex gap-5 rounded-xl bg-cream px-5 py-4">
                  <span className="w-10 shrink-0 font-bold text-gold-dark">{m}</span>
                  <span className="text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </SubPage>
  );
}
