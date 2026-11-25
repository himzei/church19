import { SubPage, subPageMetadata, Thumb, tones } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("mission", "videos");

const videos = [
  { title: "베트남 단기선교 현장 스케치", tag: "단기선교", date: "2026.08.10" },
  { title: "케냐 우물 프로젝트 완공 보고", tag: "선교 보고", date: "2026.07.21" },
  { title: "캄보디아 어린이 학교 이야기", tag: "선교사 인터뷰", date: "2026.06.30" },
  { title: "카자흐스탄 현지 리더 훈련", tag: "선교 보고", date: "2026.05.18" },
  { title: "선교사 가정 안식년 인터뷰", tag: "선교사 인터뷰", date: "2026.04.02" },
  { title: "2026 선교주일 하이라이트", tag: "행사", date: "2026.03.15" },
];

export default function Page() {
  return (
    <SubPage
      section="mission"
      slug="videos"
      lead="선교 현장의 생생한 이야기를 영상으로 만나보세요."
    >
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <a key={v.title} href="#" className="group block">
            <Thumb tone={tones[(i + 3) % tones.length]} play />
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="rounded-full bg-cream px-2.5 py-1 font-semibold text-gold-dark">{v.tag}</span>
              <span className="text-muted">{v.date}</span>
            </div>
            <p className="mt-2 text-lg font-bold text-ink group-hover:text-navy">{v.title}</p>
          </a>
        ))}
      </div>
    </SubPage>
  );
}
