import { Icon } from "@/app/_components/Icon";
import { Card, H3, InfoTable, SubPage, subPageMetadata } from "@/app/_components/SubPage";
import { worship } from "@/app/_data/site";

export const metadata = subPageMetadata("worship", "services");

const others = [
  ["영아부 · 유치부", "주일 오전 11:30", "교육관 1층"],
  ["유년부 · 초등부", "주일 오전 11:30", "교육관 2층"],
  ["청소년부", "주일 오전 9:30", "비전홀"],
  ["English Worship", "주일 오후 1:30", "소예배실"],
];

const firstVisit = [
  { icon: "users", title: "안내데스크 방문", desc: "본당 입구 새가족 안내데스크에서 안내위원이 맞이해 드립니다." },
  { icon: "form", title: "새가족 카드 작성", desc: "간단한 카드를 작성해 주시면 담당 교역자가 연락드립니다." },
  { icon: "heart", title: "새가족 환영회", desc: "예배 후 새가족실에서 차 한 잔과 함께 교회를 소개해 드립니다." },
];

export default function Page() {
  return (
    <SubPage section="worship" slug="services" lead="church19의 모든 예배는 누구에게나 열려 있습니다.">
      <div className="grid gap-6 md:grid-cols-2">
        {worship.map((g) => (
          <Card key={g.group}>
            <H3>{g.group}</H3>
            <ul className="divide-y divide-line">
              {g.items.map((w) => (
                <li key={w.name} className="flex items-center justify-between py-4">
                  <span className="font-semibold text-ink">{w.name}</span>
                  <span className="flex items-center gap-4 text-sm">
                    <span className="text-muted">{w.place}</span>
                    <span className="min-w-28 text-right text-base font-bold text-navy">{w.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <section className="mt-16">
        <H3>부서별 예배</H3>
        <InfoTable head={["부서", "시간", "장소"]} rows={others} />
      </section>

      <section className="mt-16 rounded-3xl bg-cream p-8 md:p-12">
        <h3 className="text-center text-2xl font-bold text-navy">처음 오셨나요?</h3>
        <p className="mt-2 text-center text-muted">church19에 처음 오신 분들을 위한 안내입니다.</p>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {firstVisit.map((f, i) => (
            <li key={f.title} className="rounded-2xl bg-white p-7 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-navy text-gold">
                <Icon name={f.icon} className="size-6" />
              </span>
              <p className="mt-4 text-xs font-bold text-gold-dark">STEP {i + 1}</p>
              <p className="mt-1 text-lg font-bold text-navy">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
            </li>
          ))}
        </ol>
      </section>
    </SubPage>
  );
}
