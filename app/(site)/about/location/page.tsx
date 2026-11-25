import { Icon } from "@/app/_components/Icon";
import { Card, H3, SubPage, subPageMetadata } from "@/app/_components/SubPage";
import { brand } from "@/app/_data/site";

export const metadata = subPageMetadata("about", "location");

const ways = [
  { title: "지하철", lines: ["O호선 OO역 1번 출구 도보 5분", "O호선 OO역 3번 출구 도보 10분"] },
  { title: "버스", lines: ["간선 100, 200 — 'church19 앞' 하차", "지선 1019 — 'OO사거리' 하차 후 도보 3분"] },
  { title: "자가용", lines: ["내비게이션에 'church19' 또는 주소 입력", "주일에는 교회 주차장 및 제2주차장 이용"] },
];

export default function Page() {
  const q = encodeURIComponent(brand.address.replace(/^\(우\)\s*\d+\s*/, ""));
  return (
    <SubPage section="about" slug="location" lead="church19에 오시는 길을 안내해 드립니다.">
      {/* 지도 자리 — 실제 주소 확정 후 카카오맵/네이버지도 퍼가기 코드로 교체 */}
      <div className="relative grid aspect-[16/7] min-h-64 place-items-center overflow-hidden rounded-2xl bg-[#e8edf3]">
        <div className="absolute inset-0 bg-[linear-gradient(#d5dde8_1px,transparent_1px),linear-gradient(90deg,#d5dde8_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute left-0 right-0 top-1/2 h-6 -translate-y-1/2 bg-white/80" />
        <div className="absolute bottom-0 left-1/3 top-0 w-5 bg-white/80" />
        <div className="relative flex flex-col items-center">
          <span className="grid size-14 place-items-center rounded-full bg-navy text-gold shadow-xl">
            <Icon name="pin" className="size-7" />
          </span>
          <span className="mt-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-navy shadow">
            church19
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy px-7 py-6 text-white">
        <div>
          <p className="text-sm text-white/60">주소</p>
          <p className="mt-1 text-lg font-semibold">{brand.address}</p>
          <p className="mt-1 text-sm text-white/70">
            TEL {brand.tel} · FAX {brand.fax} · {brand.email}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={`https://map.kakao.com/?q=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#FEE500] px-5 py-2.5 text-sm font-bold text-black/85"
          >
            카카오맵
          </a>
          <a
            href={`https://map.naver.com/p/search/${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#03C75A] px-5 py-2.5 text-sm font-bold text-white"
          >
            네이버지도
          </a>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {ways.map((w) => (
          <Card key={w.title}>
            <H3>{w.title}</H3>
            <ul className="space-y-2 text-sm leading-relaxed text-muted">
              {w.lines.map((l) => (
                <li key={l} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {l}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </SubPage>
  );
}
