import { Suspense } from "react";
import { Pagination, readListParams } from "@/app/(site)/community/_components/BoardParts";
import { UserAvatar } from "@/app/_components/UserAvatar";
import { requireAdmin } from "@/lib/dal";
import { pool } from "@/lib/db";
import { PageTitle } from "../_components/ui";
import { RoleSelect } from "../_components/RoleSelect";

export const metadata = { title: "회원 관리" };

const PAGE_SIZE = 20;

export default function MembersPage({ searchParams }: PageProps<"/admin/members">) {
  return (
    <>
      <PageTitle
        title="회원 관리"
        desc="관리자는 나눔터 글을 쓰고 고치고 지울 수 있습니다. 로그인 사용자는 글 읽기와 댓글 쓰기, 비로그인 방문자는 읽기만 가능합니다."
      />
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white" />}>
        <Members searchParams={searchParams} />
      </Suspense>
    </>
  );
}

type Row = { id: string; name: string; email: string; image: string | null; role: string | null; createdAt: Date; providers: string[] };

async function Members({ searchParams }: Pick<PageProps<"/admin/members">, "searchParams">) {
  const me = await requireAdmin("/admin/members");
  const { page, q } = await readListParams(searchParams);

  const where = q ? `WHERE u.name ILIKE $1 OR u.email ILIKE $1` : "";
  const args = q ? [`%${q.replace(/[\\%_]/g, "\\$&")}%`] : [];
  const { rows: c } = await pool.query(`SELECT count(*)::int AS n FROM "user" u ${where}`, args);
  const total: number = c[0].n;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pages);
  const { rows } = await pool.query(
    `SELECT u.id, u.name, u.email, u.image, u.role, u."createdAt",
            coalesce(array_agg(a."providerId") FILTER (WHERE a."providerId" IS NOT NULL), '{}') AS providers
     FROM "user" u LEFT JOIN "account" a ON a."userId" = u.id
     ${where}
     GROUP BY u.id ORDER BY (u.role = 'admin') DESC NULLS LAST, u."createdAt" DESC
     LIMIT ${PAGE_SIZE} OFFSET ${(current - 1) * PAGE_SIZE}`,
    args,
  );
  const providerLabel = (p: string) => ({ credential: "이메일", google: "Google", kakao: "카카오" })[p] ?? p;

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted">
          전체 <b className="text-navy">{total}</b>명
        </p>
        <form>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="이름·이메일 검색"
            aria-label="회원 검색"
            className="h-10 w-56 rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-navy"
          />
        </form>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-line">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-line text-left text-xs font-semibold text-muted">
            <tr>
              <th className="px-5 py-3">회원</th>
              <th className="px-3 py-3">로그인</th>
              <th className="px-3 py-3">가입일</th>
              <th className="w-40 px-5 py-3">권한</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {(rows as Row[]).map((u) => (
              <tr key={u.id}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={u.name} image={u.image} className="size-9 text-sm" />
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">
                        {u.name}
                        {u.id === me.id && <span className="ml-1.5 text-xs font-normal text-muted">(나)</span>}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {u.email.endsWith("@kakao.church19.local") ? "카카오 계정" : u.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-muted">{u.providers.map(providerLabel).join(", ") || "-"}</td>
                <td className="px-3 py-3 text-muted">
                  {new Date(u.createdAt).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" })}
                </td>
                <td className="px-5 py-3">
                  <RoleSelect userId={u.id} name={u.name} role={u.role === "admin" ? "admin" : "user"} disabled={u.id === me.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination basePath="/admin/members" page={current} pages={pages} q={q} />
    </>
  );
}
