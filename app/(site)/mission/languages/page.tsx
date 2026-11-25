import { SubPage, subPageMetadata } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("mission", "languages");

const services = [
  { lang: "English", native: "English Worship", greet: "Welcome!", time: "Sun 1:30 PM", place: "소예배실" },
  { lang: "중국어", native: "中文礼拜", greet: "欢迎光临!", time: "주일 오후 2:00", place: "교육관 4층" },
  { lang: "베트남어", native: "Thờ phượng tiếng Việt", greet: "Xin chào!", time: "주일 오후 3:00", place: "교육관 3층" },
  { lang: "러시아어", native: "Богослужение на русском", greet: "Добро пожаловать!", time: "주일 오후 3:00", place: "비전홀 B" },
];

export default function Page() {
  return (
    <SubPage
      section="mission"
      slug="languages"
      lead="우리 곁에 온 이웃들과 각자의 언어로 함께 예배합니다."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.lang} className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="flex items-end justify-between bg-linear-to-br from-navy to-[#2f5d8a] px-7 py-8 text-white">
              <div>
                <p className="text-sm text-gold">{s.lang} 예배</p>
                <p className="mt-1 text-2xl font-bold">{s.native}</p>
              </div>
              <p className="text-lg font-semibold text-white/50">{s.greet}</p>
            </div>
            <dl className="grid grid-cols-2 divide-x divide-line">
              <div className="px-7 py-5">
                <dt className="text-xs text-muted">시간</dt>
                <dd className="mt-1 font-bold text-navy">{s.time}</dd>
              </div>
              <div className="px-7 py-5">
                <dt className="text-xs text-muted">장소</dt>
                <dd className="mt-1 font-bold text-navy">{s.place}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="mt-10 rounded-2xl bg-cream p-6 text-center text-sm text-muted">
        통역 예배, 한국어 교실, 생활 상담도 함께 운영합니다. 자세한 내용은 선교부로 문의해 주세요.
      </p>
    </SubPage>
  );
}
