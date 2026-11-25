// 기존 로컬 SQLite(church19.db) 데이터를 Supabase 로 한 번 옮기는 스크립트.
// 먼저 npm run db:migrate 를 실행한 뒤: npm run db:import
// 이미 있는 행(id 기준)은 건너뛰므로 여러 번 실행해도 안전하다.
import { existsSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { pool } from "../lib/db.ts";
import { AVATAR_BUCKET, avatarPath, supabaseAdmin } from "../lib/supabase.ts";

const FILE = process.argv[2] ?? "church19.db";
if (!existsSync(FILE)) {
  console.log(`가져올 파일(${FILE})이 없습니다. 건너뜁니다.`);
  process.exit(0);
}

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
  console.error("SUPABASE_URL / SUPABASE_SECRET_KEY 를 .env.local 에 먼저 설정해 주세요 (프로필 사진 이전에 필요).");
  process.exit(1);
}

const sqlite = new DatabaseSync(FILE, { readOnly: true });
type Row = Record<string, unknown>;

const DATE_COLS = new Set([
  "createdAt", "updatedAt", "expiresAt", "accessTokenExpiresAt", "refreshTokenExpiresAt",
]);
const BOOL_COLS = new Set(["emailVerified"]);

/** SQLite 값(문자열 날짜, 0/1)을 Postgres 타입으로 변환 */
function convert(row: Row): Row {
  const out: Row = {};
  for (const [k, v] of Object.entries(row)) {
    if (v === null || v === undefined) out[k] = null;
    else if (DATE_COLS.has(k)) out[k] = new Date(typeof v === "number" ? v : String(v));
    else if (BOOL_COLS.has(k)) out[k] = Boolean(v);
    else out[k] = v;
  }
  return out;
}

async function copyTable(table: string): Promise<number> {
  const exists = sqlite
    .prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?")
    .get(table);
  if (!exists) return 0;

  // Postgres 에 있는 컬럼만 복사 (예: 제거된 school/major 컬럼은 건너뜀)
  const { rows: pgCols } = await pool.query(
    "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1",
    [table],
  );
  const allowed = new Set(pgCols.map((c: { column_name: string }) => c.column_name));

  const rows = sqlite.prepare(`SELECT * FROM "${table}"`).all() as Row[];
  let inserted = 0;
  for (const raw of rows) {
    const row = convert(raw);
    const cols = Object.keys(row).filter((c) => allowed.has(c));
    const sql =
      `INSERT INTO "${table}" (${cols.map((c) => `"${c}"`).join(", ")}) ` +
      `VALUES (${cols.map((_, i) => `$${i + 1}`).join(", ")}) ON CONFLICT ("id") DO NOTHING`;
    const res = await pool.query(sql, cols.map((c) => row[c]));
    inserted += res.rowCount ?? 0;
  }
  console.log(`✓ ${table}: ${inserted}/${rows.length}행 복사`);
  return inserted;
}

const EXT: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/gif": "gif", "image/webp": "webp",
};

async function copyAvatars() {
  const exists = sqlite.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name='avatar'").get();
  if (!exists) return;
  const rows = sqlite.prepare("SELECT userId, mime, data, updatedAt FROM avatar").all() as {
    userId: string; mime: string; data: Uint8Array; updatedAt: number;
  }[];
  const storage = supabaseAdmin().storage.from(AVATAR_BUCKET);

  let moved = 0;
  for (const a of rows) {
    // 예전 로컬 주소(/api/avatar/...)를 쓰는 사용자만 옮긴다
    const { rows: users } = await pool.query(`SELECT image FROM "user" WHERE id = $1`, [a.userId]);
    if (!users[0]?.image?.startsWith("/api/avatar/")) continue;

    const path = avatarPath(a.userId, EXT[a.mime] ?? "bin", a.updatedAt);
    const { error } = await storage.upload(path, a.data, {
      contentType: a.mime, cacheControl: "31536000", upsert: true,
    });
    if (error) throw new Error(`아바타 업로드 실패 (${a.userId}): ${error.message}`);
    const url = storage.getPublicUrl(path).data.publicUrl;
    await pool.query(`UPDATE "user" SET image = $1 WHERE id = $2`, [url, a.userId]);
    moved++;
  }
  console.log(`✓ avatar: ${moved}/${rows.length}개를 Storage 로 이동`);
}

try {
  // 외래키 순서: user → account/session → verification
  for (const t of ["user", "account", "session", "verification"]) await copyTable(t);
  await copyAvatars();
  console.log("완료. 확인 후 church19.db 는 백업해 두거나 삭제해도 됩니다.");
} finally {
  await pool.end();
  sqlite.close();
}
