// 나눔터 예시 글 넣기 — 게시판이 비어 있을 때만 넣는다 (이미 글이 있는 게시판은 건너뜀)
// 실행: npm run db:seed
import { pool } from "../lib/db.ts";

type Seed = { title: string; date: string; body: string; category?: string; pinned?: boolean; images?: string[] };

const notices: Seed[] = [
  { title: "church19 홈페이지 회원가입 및 이용 안내", date: "2026-11-01", pinned: true,
    body: "church19 홈페이지가 새롭게 문을 열었습니다.\n\n회원가입 후 로그인하시면 나눔터의 모든 글에 댓글을 남기실 수 있습니다. 이메일, 카카오, 구글 계정으로 간편하게 가입하실 수 있으며, 첫 로그인 시 프로필을 입력하시면 소그룹·봉사 연결에 도움이 됩니다.\n\n이용 중 불편한 점은 교회 사무실로 알려 주세요." },
  { title: "2026 성탄 감사예배 및 성가대 모집 안내", date: "2026-11-20",
    body: "다가오는 성탄 감사예배를 함께 준비할 성가대원을 모집합니다.\n\n· 모집 기간: 11월 20일 ~ 12월 6일\n· 연습: 매주 주일 오후 2시, 본당\n· 신청: 교회 사무실 또는 성가대 총무\n\n찬양으로 섬기고 싶은 모든 성도님을 환영합니다." },
  { title: "겨울 성경학교 교사 지원 신청", date: "2026-11-18",
    body: "2027년 1월 겨울 성경학교를 함께 섬길 교사를 모집합니다. 아이들을 사랑하는 마음이면 충분합니다.\n\n교사 오리엔테이션은 12월 셋째 주일 오후에 진행됩니다." },
  { title: "사랑의 음악회 좌석 신청 안내", date: "2026-11-10",
    body: "지역 이웃을 초청하는 사랑의 음악회가 열립니다. 좌석 신청은 안내데스크에서 받습니다." },
  { title: "기부금 영수증 발급 일정 안내", date: "2026-11-03",
    body: "연말정산용 기부금 영수증은 2027년 1월 둘째 주부터 발급됩니다. 주민등록번호 확인이 필요하니 미리 사무실에 등록해 주세요." },
  { title: "11월 넷째 주 교회 소식", date: "2026-10-27", body: "이번 주 교회 소식을 전해 드립니다." },
  { title: "가을 성경대학 수료식 안내", date: "2026-10-20", body: "가을 성경대학 수료식이 주일 오후 예배 후 진행됩니다." },
  { title: "추수감사주일 헌금 및 나눔 안내", date: "2026-10-13", body: "추수감사주일 헌금의 일부는 지역 이웃을 위한 나눔에 사용됩니다." },
  { title: "교회 주차장 공사에 따른 주차 안내", date: "2026-10-06", body: "주차장 공사 기간 동안 인근 공영주차장을 이용해 주세요." },
  { title: "청년부 가을 수련회 신청", date: "2026-09-29", body: "청년부 가을 수련회 신청을 받습니다." },
  { title: "새가족 환영회 일정 변경 안내", date: "2026-09-22", body: "새가족 환영회가 한 주 뒤로 변경되었습니다." },
];

const stories: Seed[] = [
  { title: "감사로 채운 하루, 2026 추수감사주일", date: "2026-11-15", category: "행사", images: ["/hero/sanctuary.jpg"],
    body: "올해 추수감사주일은 온 성도가 한자리에 모여 한 해 동안 베풀어 주신 은혜를 고백하는 시간이었습니다.\n\n예배 후에는 각 소그룹이 준비한 음식을 나누며 풍성한 교제를 누렸습니다." },
  { title: "몸과 마음이 하나 되는 소그룹 가을 소풍", date: "2026-11-14", category: "소그룹", images: ["/hero/fellowship.jpg"],
    body: "선선한 가을 날씨 속에 소그룹 연합 소풍을 다녀왔습니다. 함께 걷고, 웃고, 기도하며 더 가까워지는 하루였습니다." },
  { title: "지역 어르신을 위한 김장 나눔 봉사", date: "2026-11-07", category: "섬김", images: ["/hero/community.jpg"],
    body: "올해도 지역 어르신 100가정에 김치를 나누었습니다. 이른 아침부터 함께해 주신 봉사자분들께 감사드립니다." },
  { title: "청년부 베트남 단기선교 이야기", date: "2026-08-12", category: "선교",
    body: "청년부 단기선교팀이 베트남에서 2주간의 사역을 마치고 돌아왔습니다." },
  { title: "여름 성경학교, 아이들의 웃음소리", date: "2026-07-28", category: "교회학교", images: ["/hero/bible.jpg"],
    body: "말씀과 찬양, 웃음이 가득했던 여름 성경학교 현장을 전합니다." },
  { title: "어르신 효도잔치 현장", date: "2026-05-10", category: "섬김",
    body: "가정의 달을 맞아 지역 어르신들을 모시고 효도잔치를 열었습니다." },
];

const bulletin: Seed[] = [
  { title: "추수감사절 후 첫 주일", date: "2026-11-22" },
  { title: "추수감사주일", date: "2026-11-15" },
  { title: "11월 둘째 주일", date: "2026-11-08" },
  { title: "11월 첫째 주일 · 성찬주일", date: "2026-11-01" },
  { title: "종교개혁주일", date: "2026-10-25" },
  { title: "10월 셋째 주일", date: "2026-10-18" },
].map((b) => ({ ...b, body: "예배 순서\n· 묵도 · 찬송 · 신앙고백 · 기도 · 성경봉독 · 찬양 · 설교 · 헌금 · 광고 · 축도" }));

const gallery: Seed[] = [
  { title: "주일 연합 찬양예배", date: "2026-11-22", images: ["/hero/worship.jpg", "/hero/sanctuary.jpg"], body: "" },
  { title: "추수감사주일 예배당", date: "2026-11-15", images: ["/hero/sanctuary.jpg"], body: "" },
  { title: "소그룹 가을 모임", date: "2026-11-14", images: ["/hero/fellowship.jpg", "/hero/community.jpg"], body: "" },
  { title: "가을 성경대학", date: "2026-10-20", images: ["/hero/bible.jpg"], body: "" },
  { title: "청년부 수련회", date: "2026-08-20", images: ["/hero/community.jpg"], body: "" },
];

const seeds = { notices, stories, bulletin, gallery } as const;

try {
  for (const [board, list] of Object.entries(seeds)) {
    const { rows } = await pool.query(`SELECT count(*)::int AS n FROM "post" WHERE board = $1`, [board]);
    if (rows[0].n > 0) {
      console.log(`- ${board}: 이미 글이 ${rows[0].n}개 있어 건너뜁니다.`);
      continue;
    }
    for (const s of list) {
      await pool.query(
        `INSERT INTO "post" (board, title, body, category, pinned, images, date) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [board, s.title, s.body, s.category ?? null, s.pinned ?? false, JSON.stringify(s.images ?? []), s.date],
      );
    }
    console.log(`✓ ${board}: 예시 글 ${list.length}개`);
  }
} finally {
  await pool.end();
}
