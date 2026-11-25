import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

/**
 * 로그인이 필요한 페이지 보호.
 * - /profile: 세션 쿠키가 있는지만 빠르게 확인 (실제 세션 검증은 페이지에서 다시 한다)
 * - /admin:   세션과 권한까지 확인해 관리자가 아니면 404 (관리자 화면 틀도 보이지 않게).
 *             페이지·서버 액션에서도 requireAdmin 으로 한 번 더 확인한다.
 */
export async function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) return toLogin(request);

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return toLogin(request);
    if (session.user.role !== "admin") {
      return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
    }
  }
  return NextResponse.next();
}

function toLogin(request: NextRequest) {
  const url = new URL("/login", request.url);
  url.searchParams.set("callbackURL", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
