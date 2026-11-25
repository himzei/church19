import Link from "next/link";

export function PageTitle({ title, desc, action }: { title: string; desc?: string; action?: { href: string; label: string } }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy">{title}</h1>
        {desc && <p className="mt-1.5 text-sm text-muted">{desc}</p>}
      </div>
      {action && (
        <Link href={action.href} className="rounded-xl bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-deep">
          {action.label}
        </Link>
      )}
    </div>
  );
}
