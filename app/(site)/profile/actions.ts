"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { IMAGE_EXT, sniffImage } from "@/lib/image-file";
import { GENDERS, LIMITS, serializeTags } from "@/lib/profile";
import { AVATAR_BUCKET, avatarPath, avatarPathFromUrl, supabaseAdmin } from "@/lib/supabase";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

async function currentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

async function currentUserId() {
  return (await currentUser())?.id ?? null;
}

/** 이전에 올린 아바타 파일 삭제 (카카오·구글 등 외부 사진 주소면 아무것도 안 함) */
async function deleteOldAvatar(image: string | null | undefined) {
  const path = avatarPathFromUrl(image);
  if (path) await supabaseAdmin().storage.from(AVATAR_BUCKET).remove([path]);
}

async function saveUser(userId: string, data: Record<string, unknown>) {
  const ctx = await auth.$context;
  await ctx.internalAdapter.updateUser(userId, { ...data, updatedAt: new Date() });
}

/* ───────── 개인정보 ───────── */

export type ProfileInput = {
  name: string;
  gender: string;
  hobbies: string[];
  talents: string[];
};

export async function updateProfile(input: ProfileInput): Promise<Result> {
  const userId = await currentUserId();
  if (!userId) return { ok: false, error: "로그인이 필요합니다." };

  const name = String(input.name ?? "").trim();
  if (name.length < 1) return { ok: false, error: "이름을 입력해 주세요." };
  if (name.length > LIMITS.name) return { ok: false, error: `이름은 ${LIMITS.name}자 이내로 입력해 주세요.` };


  const gender = String(input.gender ?? "");
  if (!GENDERS.some((g) => g.value === gender)) return { ok: false, error: "성별 값이 올바르지 않습니다." };

  const hobbies = Array.isArray(input.hobbies) ? input.hobbies.map(String) : [];
  const talents = Array.isArray(input.talents) ? input.talents.map(String) : [];

  await saveUser(userId, {
    name,
    // 빈 값은 null 로 저장 (선택 항목)
    gender: gender || null,
    hobbies: serializeTags(hobbies) || null,
    talents: serializeTags(talents) || null,
  });
  return { ok: true };
}

/* ───────── 프로필 사진 ───────── */

export async function uploadAvatar(form: FormData): Promise<Result<{ image: string }>> {
  const user = await currentUser();
  if (!user) return { ok: false, error: "로그인이 필요합니다." };

  const file = form.get("avatar");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "이미지 파일을 선택해 주세요." };
  if (file.size > LIMITS.avatarBytes) return { ok: false, error: "이미지는 1MB 이하만 올릴 수 있습니다." };

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mime = sniffImage(bytes);
  if (!mime) return { ok: false, error: "JPG, PNG, WEBP, GIF 이미지만 올릴 수 있습니다." };

  let image: string;
  try {
    const storage = supabaseAdmin().storage.from(AVATAR_BUCKET);
    const path = avatarPath(user.id, IMAGE_EXT[mime], Date.now());
    const { error } = await storage.upload(path, bytes, {
      contentType: mime,
      cacheControl: "31536000", // 파일명이 매번 달라지므로 오래 캐시해도 안전
      upsert: false,
    });
    if (error) throw error;
    image = storage.getPublicUrl(path).data.publicUrl;
  } catch (e) {
    console.error("[avatar] upload failed:", e instanceof Error ? e.message : e);
    return { ok: false, error: "사진을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }

  await saveUser(user.id, { image });
  await deleteOldAvatar(user.image).catch(() => {}); // 이전 파일 정리 (실패해도 무시)
  return { ok: true, image };
}

export async function removeAvatar(): Promise<Result> {
  const user = await currentUser();
  if (!user) return { ok: false, error: "로그인이 필요합니다." };
  await saveUser(user.id, { image: null });
  await deleteOldAvatar(user.image).catch(() => {});
  return { ok: true };
}
