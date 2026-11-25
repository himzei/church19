import { H3, InfoTable, SubPage, subPageMetadata } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("education", "bible-college");

const rows = [
  ["구약의 숲", "화 오전 10:00", "12주", "창세기부터 말라기까지 구약 전체 흐름"],
  ["신약의 숲", "화 오후 7:30", "12주", "복음서와 서신서로 보는 신약의 흐름"],
  ["모세오경 깊이 읽기", "수 오전 10:00", "10주", "창세기 ~ 신명기 강해"],
  ["로마서 강해", "목 오후 7:30", "10주", "복음의 핵심을 담은 로마서 강해"],
  ["조직신학 입문", "토 오전 10:00", "8주", "하나님 · 인간 · 구원 · 교회론 기초"],
];

export default function Page() {
  return (
    <SubPage
      section="education"
      slug="bible-college"
      lead="성경 전체를 깊이 있게 배우는 성도 성경대학입니다. 학기마다 새로운 강좌가 열립니다."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["학기", "봄학기 3–5월 · 가을학기 9–11월"],
          ["대상", "church19 등록 성도 누구나"],
          ["수강료", "교재비 실비 (강좌별 1–2만원)"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-navy p-7 text-white">
            <p className="text-sm text-gold">{k}</p>
            <p className="mt-2 text-lg font-bold">{v}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <H3>2026 가을학기 개설 강좌</H3>
        <InfoTable head={["강좌명", "시간", "기간", "내용"]} rows={rows} />
        <p className="mt-4 text-sm text-muted">
          * 수료 기준: 출석 80% 이상 · 과제 제출. 수료자에게 수료증을 드립니다.
        </p>
      </section>
    </SubPage>
  );
}
