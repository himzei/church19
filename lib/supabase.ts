import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** 프로필 사진 버킷 (공개 읽기, 업로드·삭제는 서버만) */
export const AVATAR_BUCKET = "avatars";
/** 나눔터 게시물 사진 버킷 (공개 읽기, 업로드·삭제는 관리자 서버 액션만) */
export const BOARD_BUCKET = "board";

let admin: SupabaseClient | undefined;

/**
 * 서버 전용 Supabase 클라이언트 (Secret key 사용 → RLS 우회).
 * NEXT_PUBLIC_ 이 아닌 환경변수만 읽으므로 브라우저 번들에 포함되지 않는다.
 */
export function supabaseAdmin(): SupabaseClient {
  if (admin) return admin;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SECRET_KEY 가 설정되지 않았습니다 (.env.local 확인).");
  admin = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return admin;
}

/** 사용자별 아바타 파일 경로 — 업로드할 때마다 새 이름을 써서 캐시 문제를 피한다 */
export const avatarPath = (userId: string, ext: string, version: number) =>
  `${userId}/${version}.${ext}`;

/** 버킷의 공개 URL 접두사 */
export function publicPrefix(bucket: string): string | null {
  const base = process.env.SUPABASE_URL;
  return base ? `${base.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/` : null;
}

/** 공개 URL 이 해당 버킷의 파일이면 그 경로를 돌려준다 (삭제할 때 사용) */
export function storagePathFromUrl(bucket: string, url: string | null | undefined): string | null {
  const prefix = publicPrefix(bucket);
  if (!url || !prefix) return null;
  return url.startsWith(prefix) ? decodeURIComponent(url.slice(prefix.length)) : null;
}

export const avatarPathFromUrl = (image: string | null | undefined) =>
  storagePathFromUrl(AVATAR_BUCKET, image);
