"use server";

import { randomUUID } from "node:crypto";
import { updateTag } from "next/cache";
import { BOARDS, type BoardKey, isBoardKey, POST_LIMITS } from "@/lib/board";
import { getCurrentUser } from "@/lib/dal";
import { pool } from "@/lib/db";
import { IMAGE_EXT, sniffImage } from "@/lib/image-file";
import { tags } from "@/lib/posts";
import { SETTINGS_TAG } from "@/lib/settings";
import { normalizeSnsUrl, SNS_KEYS, type SnsLinks, snsSettingKey } from "@/lib/sns";
import { BOARD_BUCKET, publicPrefix, storagePathFromUrl, supabaseAdmin } from "@/lib/supabase";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };
const DENIED = { ok: false as const, error: "관리자 권한이 필요합니다." };

/** 모든 관리자 액션은 화면과 별개로 여기서 권한을 다시 확인한다 */
async function admin() {
  const user = await getCurrentUser();
  return user?.role === "admin" ? user : null;
}

/* ───────── 사진 ───────── */

/** 사진 1장 업로드 → 공개 URL (글 저장 전에 먼저 올린다) */
export async function uploadBoardImage(form: FormData): Promise<Result<{ url: string }>> {
  if (!(await admin())) return DENIED;
  const board = form.get("board");
  const file = form.get("file");
  if (!isBoardKey(board)) return { ok: false, error: "게시판이 올바르지 않습니다." };
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "사진을 선택해 주세요." };
  if (file.size > POST_LIMITS.imageBytes) return { ok: false, error: "사진 1장은 3MB 이하만 올릴 수 있습니다." };

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mime = sniffImage(bytes);
  if (!mime) return { ok: false, error: "JPG, PNG, WEBP, GIF 사진만 올릴 수 있습니다." };

  try {
    const storage = supabaseAdmin().storage.from(BOARD_BUCKET);
    const month = new Date().toISOString().slice(0, 7);
    const path = `${board}/${month}/${randomUUID()}.${IMAGE_EXT[mime]}`;
    const { error } = await storage.upload(path, bytes, { contentType: mime, cacheControl: "31536000", upsert: false });
    if (error) throw error;
    return { ok: true, url: storage.getPublicUrl(path).data.publicUrl };
  } catch (e) {
    console.error("[board] upload failed:", e instanceof Error ? e.message : e);
    return { ok: false, error: "사진을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
}

/** 저장소에서 사진 파일 지우기 (우리 버킷 파일만, 실패해도 글 작업은 계속) */
async function removeImages(urls: string[]) {
  const paths = urls.map((u) => storagePathFromUrl(BOARD_BUCKET, u)).filter((p): p is string => Boolean(p));
  if (paths.length === 0) return;
  try {
    await supabaseAdmin().storage.from(BOARD_BUCKET).remove(paths);
  } catch (e) {
    console.error("[board] remove failed:", e instanceof Error ? e.message : e);
  }
}

/* ───────── 게시물 ───────── */

export type PostInput = {
  id?: string;
  board: BoardKey;
  title: string;
  body: string;
  category: string;
  pinned: boolean;
  date: string;
  images: string[];
};

/** 업로드한 사진(우리 버킷) 또는 기본 예시 사진만 허용 */
function allowedImage(url: unknown): url is string {
  if (typeof url !== "string") return false;
  const prefix = publicPrefix(BOARD_BUCKET);
  return (prefix !== null && url.startsWith(prefix)) || /^\/hero\/[a-z-]+\.jpg$/.test(url);
}

function validate(input: PostInput): { ok: false; error: string } | { ok: true; data: Omit<PostInput, "id"> } {
  if (!isBoardKey(input.board)) return { ok: false, error: "게시판이 올바르지 않습니다." };
  const cfg = BOARDS[input.board];

  const title = String(input.title ?? "").trim();
  if (!title) return { ok: false, error: "제목을 입력해 주세요." };
  if (title.length > POST_LIMITS.title) return { ok: false, error: `제목은 ${POST_LIMITS.title}자 이내로 입력해 주세요.` };

  const body = String(input.body ?? "").replace(/\r\n/g, "\n").trim();
  if (cfg.bodyRequired && !body) return { ok: false, error: "내용을 입력해 주세요." };
  if (body.length > POST_LIMITS.body) return { ok: false, error: `내용은 ${POST_LIMITS.body.toLocaleString()}자 이내로 입력해 주세요.` };

  const category = cfg.category ? String(input.category ?? "").trim().slice(0, POST_LIMITS.category) : "";

  const date = String(input.date ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) return { ok: false, error: "날짜를 확인해 주세요." };

  const images = Array.isArray(input.images) ? input.images : [];
  if (!images.every(allowedImage)) return { ok: false, error: "사진 주소가 올바르지 않습니다. 다시 올려 주세요." };
  if (images.length > cfg.images.max) return { ok: false, error: `사진은 최대 ${cfg.images.max}장까지 올릴 수 있습니다.` };
  if (cfg.images.required && images.length === 0) return { ok: false, error: "사진을 1장 이상 올려 주세요." };

  return {
    ok: true,
    data: { board: input.board, title, body, category, pinned: cfg.pinnable && Boolean(input.pinned), date, images: [...new Set(images)] },
  };
}

export async function savePost(input: PostInput): Promise<Result<{ id: string }>> {
  const user = await admin();
  if (!user) return DENIED;
  const v = validate(input);
  if (!v.ok) return v;
  const d = v.data;

  if (!input.id) {
    const { rows } = await pool.query(
      `INSERT INTO "post" (board, title, body, category, pinned, images, date, "authorId")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [d.board, d.title, d.body, d.category || null, d.pinned, JSON.stringify(d.images), d.date, user.id],
    );
    updateTag(tags.board(d.board));
    return { ok: true, id: rows[0].id };
  }

  const { rows: old } = await pool.query(`SELECT board, images FROM "post" WHERE id = $1`, [String(input.id)]);
  if (!old[0]) return { ok: false, error: "글을 찾을 수 없습니다." };
  if (old[0].board !== d.board) return { ok: false, error: "게시판은 바꿀 수 없습니다." };

  await pool.query(
    `UPDATE "post" SET title = $2, body = $3, category = $4, pinned = $5, images = $6, date = $7, "updatedAt" = now()
     WHERE id = $1`,
    [input.id, d.title, d.body, d.category || null, d.pinned, JSON.stringify(d.images), d.date],
  );
  await removeImages((old[0].images as string[]).filter((u) => !d.images.includes(u)));
  updateTag(tags.board(d.board));
  updateTag(tags.post(input.id));
  return { ok: true, id: input.id };
}

export async function deletePost(id: string): Promise<Result> {
  if (!(await admin())) return DENIED;
  const { rows } = await pool.query(`DELETE FROM "post" WHERE id = $1 RETURNING board, images`, [String(id)]);
  if (!rows[0]) return { ok: false, error: "이미 삭제된 글입니다." };
  await removeImages(rows[0].images as string[]);
  updateTag(tags.board(rows[0].board));
  updateTag(tags.post(id));
  updateTag(tags.comments(id));
  return { ok: true };
}

/** 저장하지 않고 나간 글쓰기에서 올렸던 사진 정리 */
export async function discardImages(urls: string[]): Promise<Result> {
  if (!(await admin())) return DENIED;
  const list = (Array.isArray(urls) ? urls : []).filter(allowedImage);
  if (list.length === 0) return { ok: true };
  // 이미 어떤 글에 쓰이고 있는 사진은 지우지 않는다
  const { rows } = await pool.query(
    `SELECT DISTINCT jsonb_array_elements_text(images) AS url FROM "post" WHERE images ?| $1`,
    [list],
  );
  const used = new Set(rows.map((r: { url: string }) => r.url));
  await removeImages(list.filter((u) => !used.has(u)));
  return { ok: true };
}

/* ───────── 사이트 설정 (SNS 링크) ───────── */

export async function saveSnsLinks(input: Record<string, string>): Promise<Result<{ links: SnsLinks }>> {
  if (!(await admin())) return DENIED;
  const links: SnsLinks = {};
  for (const k of SNS_KEYS) {
    const r = normalizeSnsUrl(k, String(input?.[k] ?? ""));
    if (!r.ok) return r;
    if (r.url) links[k] = r.url;
  }
  for (const k of SNS_KEYS) {
    await pool.query(
      `INSERT INTO "site_setting" (key, value, "updatedAt") VALUES ($1, $2, now())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, "updatedAt" = now()`,
      [snsSettingKey(k), links[k] ?? ""],
    );
  }
  updateTag(SETTINGS_TAG);
  return { ok: true, links };
}

/* ───────── 회원 권한 ───────── */

export async function setUserRole(userId: string, role: "user" | "admin"): Promise<Result> {
  const me = await admin();
  if (!me) return DENIED;
  if (role !== "user" && role !== "admin") return { ok: false, error: "권한 값이 올바르지 않습니다." };
  if (userId === me.id) return { ok: false, error: "자기 자신의 권한은 바꿀 수 없습니다." };
  const { rowCount } = await pool.query(`UPDATE "user" SET role = $2, "updatedAt" = now() WHERE id = $1`, [String(userId), role]);
  if (!rowCount) return { ok: false, error: "회원을 찾을 수 없습니다." };
  return { ok: true };
}
