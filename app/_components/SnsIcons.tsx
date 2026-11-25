import type { SnsKey } from "@/lib/sns";

/** SNS 아이콘 (브랜드 색 원형 배지). 크기는 className 으로 지정 */
const styles: Record<SnsKey, { bg: string; fg: string }> = {
  instagram: { bg: "bg-[linear-gradient(45deg,#feda75_0%,#fa7e1e_25%,#d62976_50%,#962fbf_75%,#4f5bd5_100%)]", fg: "text-white" },
  youtube: { bg: "bg-[#ff0000]", fg: "text-white" },
  threads: { bg: "bg-black", fg: "text-white" },
  kakao: { bg: "bg-[#fee500]", fg: "text-[#3c1e1e]" },
};

const glyphs: Record<SnsKey, React.ReactNode> = {
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="16.9" cy="7.1" r="0.6" fill="currentColor" stroke="none" />
    </g>
  ),
  youtube: <path d="M9.6 8.2v7.6L16 12z" fill="currentColor" />,
  threads: (
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      d="M17.2 8.4C16.3 5.9 14.3 4.6 12 4.6c-4.1 0-6.6 2.9-6.6 7.4s2.5 7.4 6.6 7.4c3.2 0 5.5-1.8 5.5-4.4 0-2.3-2-3.6-4.8-3.6-2.1 0-3.4 1-3.4 2.4 0 1.2 1 2 2.4 2 2 0 3.3-1.5 3.3-4.3 0-.6-.1-1.1-.2-1.6"
    />
  ),
  kakao: (
    <>
      <path
        fill="currentColor"
        d="M12 4.6c-4.6 0-8.3 2.9-8.3 6.5 0 2.3 1.5 4.3 3.8 5.5l-.8 3c-.1.3.2.5.5.3l3.6-2.4c.4 0 .8.1 1.2.1 4.6 0 8.3-2.9 8.3-6.5S16.6 4.6 12 4.6z"
      />
      <text x="12" y="13" textAnchor="middle" fontSize="5.2" fontWeight="800" fill="#fee500" fontFamily="Arial, sans-serif">
        CH
      </text>
    </>
  ),
};

export function SnsIcon({ name, className = "size-11" }: { name: SnsKey; className?: string }) {
  const s = styles[name];
  return (
    <span aria-hidden="true" className={`grid place-items-center rounded-full ${s.bg} ${s.fg} ${className}`}>
      <svg viewBox="0 0 24 24" className="size-[58%]">
        {glyphs[name]}
      </svg>
    </span>
  );
}
