import { SubPage, subPageMetadata, Thumb, tones } from "@/app/_components/SubPage";
import { sermons } from "@/app/_data/site";

export const metadata = subPageMetadata("worship", "sermons");

const more = [
  { title: "두려움을 넘어서는 믿음", preacher: "담임목사", passage: "여호수아 1:1–9", date: "2026.10.25" },
  { title: "작은 자에게 한 것", preacher: "부목사", passage: "마태복음 25:31–40", date: "2026.10.18" },
  { title: "다시 시작하는 은혜", preacher: "담임목사", passage: "요한복음 21:15–19", date: "2026.10.11" },
  { title: "기도의 자리로", preacher: "담임목사", passage: "누가복음 18:1–8", date: "2026.10.04" },
];

const list = [...sermons, ...more];

export default function Page() {
  const [featured, ...rest] = list;
  return (
    <SubPage section="worship" slug="sermons" lead="주일 말씀을 언제 어디서나 다시 들으실 수 있습니다.">
      {/* 최신 설교 */}
      <a href="#" className="group grid gap-8 rounded-3xl bg-navy p-5 text-white md:grid-cols-[1.4fr_1fr] md:items-center md:p-6">
        <Thumb tone={tones[0]} play label={featured.passage} className="aspect-video" />
        <div className="px-2 pb-2 md:pb-0">
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy-deep">최신 설교</span>
          <p className="mt-5 text-3xl font-extrabold leading-snug">{featured.title}</p>
          <p className="mt-3 text-white/70">
            {featured.passage} · {featured.preacher}
          </p>
          <p className="mt-1 text-sm text-white/50">{featured.date}</p>
        </div>
      </a>

      <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((s, i) => (
          <a key={s.title} href="#" className="group block">
            <Thumb tone={tones[(i + 1) % tones.length]} play label={s.passage} />
            <p className="mt-4 text-xs text-muted">
              {s.date} · {s.preacher}
            </p>
            <p className="mt-1 text-lg font-bold text-ink group-hover:text-navy">{s.title}</p>
          </a>
        ))}
      </div>
    </SubPage>
  );
}
