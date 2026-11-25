import { Card, H3, SubPage, subPageMetadata, Thumb, tones } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("worship", "praise");

const teams = [
  { name: "주일 찬양팀", desc: "주일 2·3부 예배 찬양 인도", time: "주일 오전 8:30 연습" },
  { name: "할렐루야 성가대", desc: "주일 3부 예배 성가", time: "주일 오전 10:00 연습" },
  { name: "청년 찬양팀", desc: "청년 예배 · 금요기도회 찬양", time: "토 오후 4:00 연습" },
];

const videos = [
  { title: "왕이신 나의 하나님 외", date: "2026.11.22" },
  { title: "은혜 아니면", date: "2026.11.15" },
  { title: "주님의 마음을 가진 자", date: "2026.11.08" },
  { title: "나의 가장 낮은 마음", date: "2026.11.01" },
  { title: "주 은혜임을", date: "2026.10.25" },
  { title: "온 땅이여 주를 찬양", date: "2026.10.18" },
];

export default function Page() {
  return (
    <SubPage
      section="worship"
      slug="praise"
      lead="찬양으로 하나님께 영광을 돌리고, 예배의 문을 여는 사역입니다."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {teams.map((t) => (
          <Card key={t.name}>
            <p className="text-lg font-bold text-navy">{t.name}</p>
            <p className="mt-2 text-sm text-muted">{t.desc}</p>
            <p className="mt-5 inline-block rounded-full bg-cream px-3 py-1 text-xs font-semibold text-gold-dark">
              {t.time}
            </p>
          </Card>
        ))}
      </div>

      <section className="mt-16">
        <H3>찬양 영상</H3>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <a key={v.title} href="#" className="group block">
              <Thumb tone={tones[(i + 2) % tones.length]} play />
              <p className="mt-4 text-xs text-muted">{v.date}</p>
              <p className="mt-1 font-bold text-ink group-hover:text-navy">{v.title}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-navy px-8 py-10 text-center text-white">
        <p className="text-xl font-bold">찬양으로 함께 섬기실 분을 기다립니다</p>
        <p className="mt-2 text-white/70">보컬 · 건반 · 기타 · 드럼 · 음향 · 영상 — 찬양사역팀 담당자에게 문의해 주세요.</p>
      </section>
    </SubPage>
  );
}
