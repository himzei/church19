// 나눔터 게시물·댓글 조회 (서버 전용).
// 공개 데이터이므로 'use cache' 로 캐시하고, 관리자·댓글 서버 액션에서 updateTag 로 즉시 갱신한다.
import { cacheLife, cacheTag } from "next/cache";
import { BOARD_KEYS, type BoardKey, type Comment, type Post } from "./board";
import { pool } from "./db";

export const tags = {
  board: (board: BoardKey) => `posts:${board}`,
  post: (id: string) => `post:${id}`,
  comments: (postId: string) => `comments:${postId}`,
};

const SELECT_POST = (bodyExpr: string) => `
  SELECT p.id, p.board, p.title, ${bodyExpr} AS body, p.category, p.pinned, p.images,
         to_char(p.date, 'YYYY-MM-DD') AS date, u.name AS "authorName",
         (SELECT count(*)::int FROM "comment" c WHERE c."postId" = p.id) AS "commentCount",
         p."createdAt", p."updatedAt"
  FROM "post" p LEFT JOIN "user" u ON u.id = p."authorId"`;

const ORDER = `ORDER BY p.pinned DESC, p.date DESC, p."createdAt" DESC`;

const isUuid = (v: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

/** 목록 (본문은 앞부분만) */
export async function getPosts(
  board: BoardKey,
  { page = 1, pageSize, q = "" }: { page?: number; pageSize: number; q?: string },
): Promise<{ items: Post[]; total: number; page: number; pages: number }> {
  "use cache";
  cacheTag(tags.board(board));
  cacheLife("hours");

  const search = q.trim();
  const where = search ? `WHERE p.board = $1 AND (p.title ILIKE $2 OR p.body ILIKE $2)` : `WHERE p.board = $1`;
  const args: unknown[] = search ? [board, `%${search.replace(/[\\%_]/g, "\\$&")}%`] : [board];

  const { rows: countRows } = await pool.query(`SELECT count(*)::int AS n FROM "post" p ${where}`, args);
  const total: number = countRows[0].n;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), pages);

  const { rows } = await pool.query(
    `${SELECT_POST("left(p.body, 160)")} ${where} ${ORDER} LIMIT ${pageSize} OFFSET ${(current - 1) * pageSize}`,
    args,
  );
  return { items: rows as Post[], total, page: current, pages };
}

/** 최근 글 (홈 화면) */
export async function getLatestPosts(board: BoardKey, limit: number): Promise<Post[]> {
  "use cache";
  cacheTag(tags.board(board));
  cacheLife("hours");
  const { rows } = await pool.query(
    `${SELECT_POST("left(p.body, 160)")} WHERE p.board = $1 ${ORDER} LIMIT ${Math.floor(limit)}`,
    [board],
  );
  return rows as Post[];
}

/** 글 하나 (본문 전체) */
export async function getPost(id: string): Promise<Post | null> {
  "use cache";
  cacheTag(tags.post(id));
  cacheLife("hours");
  if (!isUuid(id)) return null;
  const { rows } = await pool.query(`${SELECT_POST("p.body")} WHERE p.id = $1`, [id]);
  return (rows[0] as Post) ?? null;
}

/** 사이트맵용: 모든 글의 주소 정보 */
export async function getAllPostRefs(): Promise<{ id: string; board: BoardKey; updatedAt: Date }[]> {
  "use cache";
  for (const b of BOARD_KEYS) cacheTag(tags.board(b));
  cacheLife("hours");
  const { rows } = await pool.query(`SELECT id, board, "updatedAt" FROM "post" ORDER BY "updatedAt" DESC LIMIT 5000`);
  return rows;
}

/** 글의 댓글 (오래된 순) */
export async function getComments(postId: string): Promise<Comment[]> {
  "use cache";
  cacheTag(tags.comments(postId));
  cacheLife("hours");
  if (!isUuid(postId)) return [];
  const { rows } = await pool.query(
    `SELECT c.id, c."postId", c."userId", c.body, c."createdAt",
            coalesce(u.name, '알 수 없음') AS "userName", u.image AS "userImage"
     FROM "comment" c LEFT JOIN "user" u ON u.id = c."userId"
     WHERE c."postId" = $1 ORDER BY c."createdAt" ASC`,
    [postId],
  );
  return rows as Comment[];
}
