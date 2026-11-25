import { Card, H3, InfoTable, SubPage, subPageMetadata } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("worship", "parking");

const lots = [
  { name: "본관 주차장", spots: "60대", note: "장애인 · 노약자 · 임산부 우선" },
  { name: "제2주차장", spots: "120대", note: "교회 맞은편 OO빌딩 지하 (주일 무료)" },
  { name: "OO초등학교 운동장", spots: "80대", note: "주일 오전 7시 ~ 오후 3시" },
];

const shuttle = [
  ["1호차", "OO역 1번 출구", "08:50 / 10:50", "OO아파트 → OO시장 → 교회"],
  ["2호차", "OO동 주민센터", "09:00 / 11:00", "OO공원 → OO사거리 → 교회"],
  ["3호차", "OO역 3번 출구", "10:40", "OO병원 → 교회"],
];

export default function Page() {
  return (
    <SubPage
      section="worship"
      slug="parking"
      lead="주일에는 주차 공간이 부족합니다. 가급적 대중교통과 교회 차량을 이용해 주세요."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {lots.map((l) => (
          <Card key={l.name}>
            <p className="text-sm font-semibold text-gold-dark">{l.spots}</p>
            <p className="mt-1 text-xl font-bold text-navy">{l.name}</p>
            <p className="mt-3 text-sm text-muted">{l.note}</p>
          </Card>
        ))}
      </div>

      <section className="mt-16">
        <H3>교회 차량 운행 안내 (주일)</H3>
        <InfoTable head={["차량", "출발 장소", "출발 시간", "경유"]} rows={shuttle} />
      </section>

      <ul className="mt-10 space-y-2 rounded-2xl bg-cream p-6 text-sm text-muted">
        <li>· 주차 안내위원의 안내에 따라 주시면 감사하겠습니다.</li>
        <li>· 교회 주변 이면도로 및 상가 앞 주차는 이웃의 불편을 위해 삼가 주세요.</li>
        <li>· 차량 운행 문의: 교회 사무실 (평일 오전 9시 ~ 오후 6시)</li>
      </ul>
    </SubPage>
  );
}
