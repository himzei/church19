import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { parseTags } from "@/lib/profile";
import { AvatarEditor } from "./_components/AvatarEditor";
import { ProfileForm } from "./_components/ProfileForm";

export const metadata: Metadata = { title: "내 프로필 | church19" };

export default function ProfilePage({ searchParams }: PageProps<"/profile">) {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProfileContent({ searchParams }: Pick<PageProps<"/profile">, "searchParams">) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?callbackURL=/profile");

  const { welcome } = await searchParams;
  const isWelcome = welcome === "1";
  const u = session.user;

  const accounts = await auth.api.listUserAccounts({ headers: await headers() });
  const providers = accounts.map((a) => a.providerId);
  const loginWith = providers.includes("kakao")
    ? "카카오"
    : providers.includes("google")
      ? "Google"
      : "이메일";

  return (
    <>
      {isWelcome ? (
        <div className="mb-10 rounded-3xl bg-navy px-8 py-9 text-white md:px-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">WELCOME</p>
          <h1 className="mt-3 text-2xl font-extrabold md:text-3xl">{u.name || "성도"}님, church19에 오신 것을 환영합니다!</h1>
          <p className="mt-3 text-white/75">
            프로필을 채워 주시면 소그룹 · 봉사 연결에 도움이 됩니다. 모든 항목은 선택 입력이며, 나중에 언제든 바꿀 수 있어요.
          </p>
        </div>
      ) : (
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">내 프로필</h1>
          <p className="mt-2 text-muted">프로필 사진과 개인정보를 관리합니다.</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
        <aside className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-line lg:sticky lg:top-24">
          <AvatarEditor name={u.name} image={u.image ?? null} />
          <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">이메일</dt>
              <dd className="truncate font-medium text-ink" title={u.email}>
                {u.email.endsWith("@kakao.church19.local") ? "카카오 계정" : u.email}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">로그인</dt>
              <dd className="font-medium text-ink">{loginWith}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">가입일</dt>
              <dd className="font-medium text-ink">
                {new Date(u.createdAt).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" })}
              </dd>
            </div>
          </dl>
        </aside>

        <ProfileForm
          welcome={isWelcome}
          initial={{
            name: u.name ?? "",
            gender: u.gender ?? "",
            hobbies: parseTags(u.hobbies),
            talents: parseTags(u.talents),
          }}
        />
      </div>
    </>
  );
}

function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-10 h-10 w-48 rounded-lg bg-line" />
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="h-96 rounded-3xl bg-white" />
        <div className="h-[36rem] rounded-3xl bg-white" />
      </div>
    </div>
  );
}
