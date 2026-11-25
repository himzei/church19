// 프로필 항목 정의 — 서버(검증)와 클라이언트(UI)가 함께 사용

export const GENDERS = [
  { value: "", label: "선택 안 함" },
  { value: "male", label: "남성" },
  { value: "female", label: "여성" },
] as const;

export type Gender = (typeof GENDERS)[number]["value"];

export const HOBBY_PRESETS = [
  "독서", "운동", "등산", "여행", "음악 감상", "영화", "요리", "사진",
  "그림", "게임", "캠핑", "자전거", "러닝", "카페 탐방", "글쓰기", "봉사",
];

export const TALENT_PRESETS = [
  "찬양 · 보컬", "악기 연주", "영상 편집", "디자인", "사진 촬영", "음향 · 방송",
  "가르치기", "통역 · 번역", "IT · 프로그래밍", "요리", "운동 지도", "상담 · 경청",
];

export const LIMITS = {
  name: 30,
  tag: 20,
  tags: 10,
  avatarBytes: 1024 * 1024, // 업로드 1MB (클라이언트에서 400px로 줄여서 보냄)
};

/** "독서,여행" ↔ ["독서","여행"] — DB에는 쉼표로 이어 저장 */
export function parseTags(value: string | null | undefined): string[] {
  return value ? value.split(",").map((t) => t.trim()).filter(Boolean) : [];
}

export function serializeTags(tags: string[]): string {
  const clean = tags
    .map((t) => t.replace(/,/g, " ").trim().slice(0, LIMITS.tag))
    .filter(Boolean);
  return [...new Set(clean)].slice(0, LIMITS.tags).join(",");
}
