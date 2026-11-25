"use server";

import { updateTag } from "next/cache";
import { POST_LIMITS } from "@/lib/board";
import { getCurrentUser } from "@/lib/dal";
import { pool } from "@/lib/db";
import { tags } from "@/lib/posts";

type Result = { ok: true } | { ok: false; error: string };

/** 댓글 쓰기 — 로그인 사용자만 */
export async function addComment(postId: string, body: string): Promise<Result> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "로그인 후 댓글을 남길 수 있습니다." };

  const text = String(body ?? "").trim();
  if (!text) return { ok: false, error: "댓글 내용을 입력해 주세요." };
  if (text.length > POST_LIMITS.comment) return { ok: false, error: `댓글은 ${POST_LIMITS.comment}자 이내로 입력해 주세요.` };

  const { rows } = await pool.query(`SELECT board FROM "post" WHERE id = $1`, [String(postId)]);
  if (!rows[0]) return { ok: false, error: "글을 찾을 수 없습니다." };

  await pool.query(`INSERT INTO "comment" ("postId", "userId", body) VALUES ($1, $2, $3)`, [postId, user.id, text]);
  updateTag(tags.comments(postId));
  updateTag(tags.board(rows[0].board)); // 목록의 댓글 수
  return { ok: true };
}

/** 댓글 삭제 — 본인 또는 관리자 */
export async function deleteComment(commentId: string): Promise<Result> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "로그인이 필요합니다." };

  const { rows } = await pool.query(
    `SELECT c."postId", c."userId", p.board FROM "comment" c JOIN "post" p ON p.id = c."postId" WHERE c.id = $1`,
    [String(commentId)],
  );
  const c = rows[0];
  if (!c) return { ok: false, error: "이미 삭제된 댓글입니다." };
  if (c.userId !== user.id && user.role !== "admin") return { ok: false, error: "삭제 권한이 없습니다." };

  await pool.query(`DELETE FROM "comment" WHERE id = $1`, [commentId]);
  updateTag(tags.comments(c.postId));
  updateTag(tags.board(c.board));
  return { ok: true };
}
