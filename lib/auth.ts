import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { pool } from "./db.ts";

/** 소셜 로그인 키가 설정되어 있는지 (로그인 화면 버튼 활성화 여부에 사용) */
export const enabledProviders = {
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  kakao: Boolean(process.env.KAKAO_CLIENT_ID),
};

const requestKakaoEmail = process.env.KAKAO_REQUEST_EMAIL === "true";

export const auth = betterAuth({
  appName: "church19",
  // Supabase Postgres (lib/db.ts) — 테이블 생성: npm run db:migrate
  database: pool,

  user: {
    // 프로필 추가 정보 (모두 선택 입력).
    // input: false → 클라이언트가 /api/auth/update-user 로 직접 바꿀 수 없고,
    // 검증을 거치는 서버 액션(app/(site)/profile/actions.ts)으로만 저장된다.
    additionalFields: {
      gender: { type: "string", required: false, input: false },
      hobbies: { type: "string", required: false, input: false },
      talents: { type: "string", required: false, input: false },
      // 권한: "user"(로그인 사용자) | "admin"(관리자). 비로그인 방문자는 세션이 없다.
      // 관리자 지정: npm run admin:grant -- 이메일  또는 관리자 페이지 > 회원 관리
      role: { type: "string", required: false, defaultValue: "user", input: false },
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
  },

  socialProviders: {
    ...(enabledProviders.google && {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        prompt: "select_account" as const,
      },
    }),
    ...(enabledProviders.kakao && {
      kakao: {
        clientId: process.env.KAKAO_CLIENT_ID!,
        clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
        // 이메일 동의항목은 비즈 앱 인증이 필요하므로 기본은 닉네임·프로필 사진만 요청
        disableDefaultScope: true,
        scope: [
          "profile_nickname",
          "profile_image",
          ...(requestKakaoEmail ? ["account_email"] : []),
        ],
        // 이메일을 받지 못한 경우 카카오 회원번호로 고유한 대체 이메일을 만든다
        mapProfileToUser: (profile) => ({
          email: profile.kakao_account?.email ?? `kakao_${profile.id}@kakao.church19.local`,
        }),
      },
    }),
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "kakao"],
    },
  },

  // 서버 액션에서 로그인할 때 쿠키를 설정해 주는 플러그인 (항상 마지막에 둔다)
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
