// Supabase 초기 설정: Better Auth 테이블 + 나눔터(게시물·댓글) 테이블 + RLS 잠금 + Storage 버킷
// 실행: npm run db:migrate   (여러 번 실행해도 안전)
import { getMigrations } from "better-auth/db/migration";
import { auth } from "../lib/auth.ts";
import { pool } from "../lib/db.ts";
import { AVATAR_BUCKET, BOARD_BUCKET, supabaseAdmin } from "../lib/supabase.ts";

const AUTH_TABLES = ["user", "session", "account", "verification"];
const BOARD_TABLES = ["post", "comment", "site_setting"];
const IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

try {
  // 1) Better Auth 테이블 (user.role 등 추가 필드 포함)
  const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options);
  if (toBeCreated.length === 0 && toBeAdded.length === 0) {
    console.log("✓ 회원 테이블이 이미 최신 상태입니다.");
  } else {
    await runMigrations();
    console.log(
      `✓ 회원 테이블 마이그레이션 — 생성: ${toBeCreated.map((t) => t.table).join(", ") || "없음"}, ` +
        `컬럼 추가: ${toBeAdded.map((t) => t.table).join(", ") || "없음"}`,
    );
  }

  // 2) 나눔터 테이블
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "post" (
      "id"        text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "board"     text NOT NULL CHECK ("board" IN ('notices', 'stories', 'bulletin', 'gallery')),
      "title"     text NOT NULL,
      "body"      text NOT NULL DEFAULT '',
      "category"  text,
      "pinned"    boolean NOT NULL DEFAULT false,
      "images"    jsonb NOT NULL DEFAULT '[]'::jsonb,
      "date"      date NOT NULL DEFAULT current_date,
      "authorId"  text REFERENCES "user"("id") ON DELETE SET NULL,
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      "updatedAt" timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS "post_board_order_idx"
      ON "post" ("board", "pinned" DESC, "date" DESC, "createdAt" DESC);

    CREATE TABLE IF NOT EXISTS "comment" (
      "id"        text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "postId"    text NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
      "userId"    text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "body"      text NOT NULL,
      "createdAt" timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS "comment_post_idx" ON "comment" ("postId", "createdAt");
    CREATE INDEX IF NOT EXISTS "comment_recent_idx" ON "comment" ("createdAt" DESC);

    -- 사이트 설정 (SNS 링크 등): key/value
    CREATE TABLE IF NOT EXISTS "site_setting" (
      "key"       text PRIMARY KEY,
      "value"     text NOT NULL DEFAULT '',
      "updatedAt" timestamptz NOT NULL DEFAULT now()
    );
  `);
  console.log("✓ 나눔터 테이블:", BOARD_TABLES.join(", "));

  // 3) RLS 켜기 — 정책을 만들지 않으므로 Supabase 공개 API(anon/authenticated 키)로는
  //    어떤 행도 읽거나 쓸 수 없다. 앱 서버는 DATABASE_URL(테이블 소유자)로 접속하므로 영향 없음.
  for (const t of [...AUTH_TABLES, ...BOARD_TABLES]) {
    await pool.query(`ALTER TABLE "${t}" ENABLE ROW LEVEL SECURITY`);
  }
  console.log("✓ RLS 활성화:", [...AUTH_TABLES, ...BOARD_TABLES].join(", "));

  // 4) Storage 버킷 (Supabase 설정이 있을 때만)
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY) {
    const storage = supabaseAdmin().storage;
    const buckets = [
      { name: AVATAR_BUCKET, fileSizeLimit: 1024 * 1024 },
      { name: BOARD_BUCKET, fileSizeLimit: 3 * 1024 * 1024 },
    ];
    for (const b of buckets) {
      const options = { public: true, fileSizeLimit: b.fileSizeLimit, allowedMimeTypes: IMAGE_MIMES };
      const { data } = await storage.getBucket(b.name);
      const { error } = data
        ? await storage.updateBucket(b.name, options)
        : await storage.createBucket(b.name, options);
      if (error) throw new Error(`버킷 설정 실패 (${b.name}): ${error.message}`);
      console.log(`✓ Storage 버킷 '${b.name}' ${data ? "확인" : "생성"} 완료`);
    }
  } else {
    console.log("! SUPABASE_URL / SUPABASE_SECRET_KEY 가 없어 Storage 버킷 설정을 건너뜁니다.");
  }
} finally {
  await pool.end();
}
