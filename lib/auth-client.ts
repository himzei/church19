import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

// 같은 도메인의 /api/auth 를 사용하므로 baseURL 생략.
// inferAdditionalFields: session.user.role 등 추가 필드의 타입만 가져온다 (서버 코드는 번들되지 않음)
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
