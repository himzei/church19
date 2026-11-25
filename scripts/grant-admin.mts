// 관리자 권한 지정/해제
//   npm run admin:grant -- someone@example.com          → 관리자로 지정
//   npm run admin:grant -- someone@example.com --revoke → 일반 회원으로 되돌리기
import { pool } from "../lib/db.ts";

const email = process.argv[2];
const role = process.argv.includes("--revoke") ? "user" : "admin";

if (!email || email.startsWith("--")) {
  console.error("사용법: npm run admin:grant -- 이메일 [--revoke]");
  process.exit(1);
}

try {
  const { rows } = await pool.query(
    `UPDATE "user" SET role = $1, "updatedAt" = now() WHERE lower(email) = lower($2) RETURNING name`,
    [role, email],
  );
  if (rows.length === 0) {
    console.error(`가입된 회원이 없습니다: ${email}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${rows[0].name} (${email}) → ${role === "admin" ? "관리자" : "일반 회원"}`);
  }
} finally {
  await pool.end();
}
