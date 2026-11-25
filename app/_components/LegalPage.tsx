import Link from "next/link";

/** 이용약관·개인정보 처리방침 공통 틀 */
export function LegalPage({
  title,
  effective,
  intro,
  toc,
  children,
}: {
  title: string;
  effective: string;
  intro: React.ReactNode;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <header className="text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold-dark">POLICY</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{title}</h1>
          <p className="mt-4 text-sm text-muted">시행일 {effective}</p>
          <nav aria-label="정책 문서" className="mt-6 inline-flex rounded-full bg-white p-1 text-sm font-semibold shadow-sm ring-1 ring-line">
            {[
              { href: "/terms", label: "이용약관" },
              { href: "/privacy", label: "개인정보 처리방침" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={l.label === title ? "page" : undefined}
                className={`rounded-full px-5 py-2 transition ${l.label === title ? "bg-navy text-white" : "text-muted hover:text-navy"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </header>

        <article className="mt-10 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-line md:p-12">
          <div className="leading-8 text-ink">{intro}</div>

          <nav aria-label="목차" className="mt-8 rounded-2xl bg-cream p-6">
            <p className="text-sm font-bold text-navy">목차</p>
            <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm text-muted sm:grid-cols-2">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="hover:text-navy hover:underline">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal mt-10 space-y-10">{children}</div>
        </article>
      </div>
    </div>
  );
}

export function Clause({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="border-b border-line pb-3 text-lg font-bold text-navy">{title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-7 text-ink [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:marker:text-muted">
        {children}
      </div>
    </section>
  );
}

export function PolicyTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-cream text-navy">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line align-top">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? "font-semibold text-ink" : "text-muted"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
