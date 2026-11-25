import { readFileSync } from "node:fs";
import { Pool, type PoolConfig } from "pg";

/**
 * Supabase Postgres 연결 풀.
 * DATABASE_URL: Supabase 대시보드 → Connect → "Session pooler" 연결 문자열 (IPv4 지원).
 */
function poolConfig(): PoolConfig {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("DATABASE_URL 이 설정되지 않았습니다 (.env.local 확인).");

  const url = new URL(raw);
  const local = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  // 연결 문자열의 sslmode 는 아래 ssl 설정을 덮어쓰므로 제거하고 여기서 직접 지정
  url.searchParams.delete("sslmode");

  const ca = process.env.DATABASE_SSL_CA; // Supabase 대시보드에서 받은 CA 인증서 파일 경로 (선택)
  return {
    connectionString: url.toString(),
    max: 10,
    ssl: local
      ? undefined
      : ca
        ? { ca: readFileSync(ca, "utf8") } // 인증서까지 검증
        : { rejectUnauthorized: false }, // 암호화만 (CA 미설정 시)
  };
}

// 개발 모드 핫리로드 때 연결 풀이 계속 늘어나지 않도록 전역에 1개만 유지
const g = globalThis as unknown as { __church19Pool?: Pool };
export const pool = g.__church19Pool ?? new Pool(poolConfig());
if (process.env.NODE_ENV !== "production") g.__church19Pool = pool;
