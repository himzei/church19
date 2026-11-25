// Data Access Layer — 현재 사용자와 권한 확인을 한곳에서 처리한다.
// 화면에서 버튼을 숨기는 것과 별개로, 모든 서버 액션·관리자 페이지는 여기서 권한을 다시 확인한다.
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "./auth";
import { isAdmin } from "./board";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "user" | "admin";
};

/** 로그인한 사용자 (없으면 null). 한 요청 안에서는 한 번만 조회한다. */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const u = session.user;
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    image: u.image ?? null,
    role: isAdmin(u) ? "admin" : "user",
  };
});

/** 관리자만 통과. 비로그인 → 로그인 화면, 일반 회원 → 404 (관리자 페이지 존재를 드러내지 않음) */
export async function requireAdmin(callbackURL = "/admin"): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?callbackURL=${encodeURIComponent(callbackURL)}`);
  if (user.role !== "admin") notFound();
  return user;
}
