// 나눔터 게시판 정의 — 서버(검증·조회)와 클라이언트(관리자 폼)가 함께 사용

export const BOARD_KEYS = ["notices", "stories", "bulletin", "gallery"] as const;
export type BoardKey = (typeof BOARD_KEYS)[number];

export type BoardConfig = {
  key: BoardKey;
  label: string;
  /** 목록 한 페이지 글 수 */
  pageSize: number;
  /** 상단 고정(공지) 사용 */
  pinnable: boolean;
  /** 말머리 사용 (예: 사역 스토리의 '섬김', '선교') */
  category: string | null;
  /** 사진 첨부 — 최대 장수와 안내 문구 */
  images: { max: number; required: boolean; hint: string };
  /** 본문 입력란 안내 */
  bodyHint: string;
  bodyRequired: boolean;
};

export const BOARDS: Record<BoardKey, BoardConfig> = {
  notices: {
    key: "notices",
    label: "공지사항",
    pageSize: 10,
    pinnable: true,
    category: null,
    images: { max: 5, required: false, hint: "본문 아래에 함께 보여 줄 사진 (선택)" },
    bodyHint: "공지 내용을 입력하세요.",
    bodyRequired: true,
  },
  stories: {
    key: "stories",
    label: "사역 스토리",
    pageSize: 9,
    pinnable: false,
    category: "말머리",
    images: { max: 10, required: false, hint: "첫 번째 사진이 목록의 대표 사진이 됩니다." },
    bodyHint: "사역 이야기를 들려주세요.",
    bodyRequired: true,
  },
  bulletin: {
    key: "bulletin",
    label: "주보",
    pageSize: 12,
    pinnable: false,
    category: null,
    images: { max: 8, required: false, hint: "주보 면을 순서대로 올려 주세요 (사진·스캔 이미지)." },
    bodyHint: "예배 순서, 광고 등 (선택)",
    bodyRequired: false,
  },
  gallery: {
    key: "gallery",
    label: "갤러리",
    pageSize: 12,
    pinnable: false,
    category: null,
    images: { max: 30, required: true, hint: "최소 1장 — 첫 번째 사진이 대표 사진이 됩니다." },
    bodyHint: "사진 설명 (선택)",
    bodyRequired: false,
  },
};

export const isBoardKey = (v: unknown): v is BoardKey =>
  typeof v === "string" && (BOARD_KEYS as readonly string[]).includes(v);

export const boardHref = (board: BoardKey) => `/community/${board}`;
export const postHref = (board: BoardKey, id: string) => `/community/${board}/${id}`;

export const POST_LIMITS = {
  title: 120,
  body: 20000,
  category: 20,
  comment: 1000,
  /** 클라이언트에서 줄인 뒤 올리는 사진 1장 최대 크기 */
  imageBytes: 3 * 1024 * 1024,
  /** 업로드 전 클라이언트에서 긴 변 기준으로 줄이는 크기 */
  imageMaxSide: 1920,
};

export type Post = {
  id: string;
  board: BoardKey;
  title: string;
  body: string;
  category: string | null;
  pinned: boolean;
  images: string[];
  /** 게시일 (YYYY-MM-DD) — 주보는 예배일 */
  date: string;
  authorName: string | null;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userImage: string | null;
  body: string;
  createdAt: Date;
};

/** 2026-11-22 → 2026.11.22 */
export const formatDate = (d: string) => d.replaceAll("-", ".");

/** 사용자 권한 */
export type Role = "user" | "admin";
export const isAdmin = (user: { role?: string | null } | null | undefined) => user?.role === "admin";
