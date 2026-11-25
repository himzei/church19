import { getSnsLinks } from "@/lib/settings";
import { SNS, SNS_KEYS } from "@/lib/sns";
import { SnsIcon } from "./SnsIcons";

/** 화면 오른쪽에 고정되는 SNS 바로가기 (관리자 > 사이트 설정에서 입력한 것만 표시) */
export async function SnsFloat() {
  const links = await getSnsLinks();
  const items = SNS_KEYS.filter((k) => links[k]);
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="church19 SNS"
      className="fixed bottom-5 right-3 z-30 md:bottom-auto md:right-5 md:top-1/2 md:-translate-y-1/2"
    >
      <ul className="flex flex-col gap-2 rounded-full bg-white/80 p-1.5 shadow-lg ring-1 ring-black/5 backdrop-blur md:gap-2.5 md:p-2">
        {items.map((k) => (
          <li key={k}>
            <a
              href={links[k]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SNS[k].label} (새 창)`}
              title={SNS[k].label}
              className="block rounded-full transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <SnsIcon name={k} className="size-10 md:size-11" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
