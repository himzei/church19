// church19 사이트 콘텐츠. 실제 정보로 교체해 사용하세요.

export const brand = {
  name: "church19",
  nameKo: "처치19",
  slogan: "예배로 살리고, 말씀으로 키우고, 사랑으로 세우는 공동체",
  address: "(우) 00000 서울특별시 OO구 OO로 19",
  tel: "02-0000-0019",
  fax: "02-0000-0020",
  email: "hello@church19.org",
};

export type BannerImage = "worship" | "bible" | "community" | "sanctuary" | "fellowship";

export type Section = {
  label: string;
  en: string;
  desc: string;
  image: BannerImage;
  pages: { slug: string; label: string }[];
};

/** 사이트 메뉴 구조 — 각 소메뉴는 /{섹션}/{slug} 페이지 */
export const sections = {
  about: {
    label: "교회소개",
    en: "ABOUT US",
    desc: "사람을 살리고, 키우고, 세우는 생명의 공동체",
    image: "sanctuary",
    pages: [
      { slug: "greeting", label: "인사말" },
      { slug: "vision", label: "비전" },
      { slug: "history", label: "교회연혁" },
      { slug: "staff", label: "섬기는 사람들" },
      { slug: "location", label: "오시는 길" },
    ],
  },
  worship: {
    label: "예배",
    en: "WORSHIP",
    desc: "삶 전체로 드리는 살아 있는 예배",
    image: "worship",
    pages: [
      { slug: "services", label: "예배안내" },
      { slug: "sermons", label: "church19 TV" },
      { slug: "praise", label: "경배와 찬양" },
      { slug: "parking", label: "주차안내" },
    ],
  },
  education: {
    label: "교육·훈련",
    en: "EDUCATION",
    desc: "모든 세대를 그리스도의 제자로 세웁니다",
    image: "bible",
    pages: [
      { slug: "church-school", label: "교회학교" },
      { slug: "young-adults", label: "청년부" },
      { slug: "discipleship", label: "제자훈련" },
      { slug: "bible-college", label: "성경대학" },
    ],
  },
  mission: {
    label: "선교",
    en: "MISSION",
    desc: "땅끝까지 복음을 전하는 보냄 받은 공동체",
    image: "community",
    pages: [
      { slug: "world", label: "세계선교" },
      { slug: "videos", label: "선교영상" },
      { slug: "languages", label: "다언어 예배" },
    ],
  },
  community: {
    label: "나눔터",
    en: "COMMUNITY",
    desc: "함께 웃고 함께 우는 church19 가족 이야기",
    image: "fellowship",
    pages: [
      { slug: "notices", label: "공지사항" },
      { slug: "stories", label: "사역 스토리" },
      { slug: "bulletin", label: "주보" },
      { slug: "gallery", label: "갤러리" },
    ],
  },
} satisfies Record<string, Section>;

export type SectionKey = keyof typeof sections;

export const pageHref = (section: SectionKey, slug: string) => `/${section}/${slug}`;

export type NavItem = {
  key: SectionKey;
  label: string;
  href: string;
  children: { label: string; href: string }[];
};

export const nav: NavItem[] = (Object.keys(sections) as SectionKey[]).map((key) => {
  const s: Section = sections[key];
  return {
    key,
    label: s.label,
    href: pageHref(key, s.pages[0].slug),
    children: s.pages.map((p) => ({ label: p.label, href: pageHref(key, p.slug) })),
  };
});

export const quickLinks = [
  { label: "유튜브", icon: "youtube", href: "/worship/sermons" },
  { label: "온라인헌금", icon: "offering", href: "/community/bulletin" },
  { label: "성경", icon: "bible", href: "/education/bible-college" },
  { label: "온라인신청", icon: "form", href: "/education/discipleship" },
  { label: "주보", icon: "bulletin", href: "/community/bulletin" },
  { label: "공지사항", icon: "notice", href: "/community/notices" },
] as const;

export const featureTiles = [
  { title: "church19 TV", sub: "Sermons", icon: "play", href: "/worship/sermons" },
  { title: "사역 스토리", sub: "Ministry Story", icon: "heart", href: "/community/stories" },
  { title: "성경", sub: "Bible", icon: "bible", href: "/education/bible-college" },
  { title: "경배와 찬양", sub: "Praise & Worship", icon: "music", href: "/worship/praise" },
] as const;

export const vision = {
  headline: "살리고, 키우고, 세우는 교회",
  verse:
    "예수께서 모든 성과 촌에 두루 다니사 저희 회당에서 가르치시며 천국 복음을 전파하시며 모든 병과 모든 약한 것을 고치시니라",
  verseRef: "마태복음 9:35",
  statement:
    "church19는 하나님의 영광을 위해, 복음으로 사람을 살리고 말씀으로 제자를 키우며 사랑으로 서로를 세워 세상으로 보내는 공동체를 꿈꿉니다.",
  pillars: [
    { no: "01", title: "예배", en: "Worship", desc: "삶 전체로 드리는 살아 있는 예배" },
    { no: "02", title: "말씀", en: "Word", desc: "말씀을 깊이 배우고 삶으로 살아내는 훈련" },
    { no: "03", title: "교제", en: "Fellowship", desc: "작은 공동체 안에서 함께 우는 가족" },
    { no: "04", title: "섬김", en: "Service", desc: "받은 은사로 교회와 이웃을 섬기는 손" },
    { no: "05", title: "선교", en: "Mission", desc: "땅끝까지 복음을 전하는 보냄 받은 삶" },
  ],
  steps: ["오도록", "머물도록", "배우도록", "섬기도록", "보내도록"],
  goals: [
    { value: "19", unit: "개국", label: "선교 파트너 국가" },
    { value: "190", unit: "개", label: "삶을 나누는 소그룹" },
    { value: "1,900", unit: "명", label: "말씀으로 세워질 제자" },
  ],
};

export const worship = [
  {
    group: "주일예배",
    items: [
      { name: "1부 예배", time: "오전 7:30", place: "본당" },
      { name: "2부 예배", time: "오전 9:30", place: "본당" },
      { name: "3부 예배", time: "오전 11:30", place: "본당" },
      { name: "청년 예배", time: "오후 2:00", place: "비전홀" },
    ],
  },
  {
    group: "주중예배",
    items: [
      { name: "수요예배", time: "수 오후 7:30", place: "본당" },
      { name: "금요기도회", time: "금 오후 9:00", place: "본당" },
      { name: "새벽기도회", time: "월–토 오전 5:30", place: "본당" },
    ],
  },
];

export const sermons = [
  { title: "광야에서 부르는 노래", preacher: "담임목사", passage: "출애굽기 15:1–18", date: "2026.11.22", tone: "from-[#1d3557] to-[#457b9d]" },
  { title: "은혜로 걷는 제자의 길", preacher: "담임목사", passage: "누가복음 9:23–27", date: "2026.11.15", tone: "from-[#3d2c5e] to-[#7b5ea7]" },
  { title: "감사의 눈으로 보는 세상", preacher: "부목사", passage: "시편 103:1–5", date: "2026.11.08", tone: "from-[#6b3a1e] to-[#c9862f]" },
  { title: "함께 꿈꾸는 하나님 나라", preacher: "담임목사", passage: "마태복음 6:9–13", date: "2026.11.01", tone: "from-[#1f4d3a] to-[#4f9a72]" },
];

// 사역 스토리·공지사항은 DB(나눔터 게시판)에서 가져온다 — lib/posts.ts, 관리자 페이지에서 작성

export const aboutCards = [
  { title: "교회소개", desc: "church19의 이야기와 섬기는 사람들", icon: "church", href: "/about/greeting" },
  { title: "새가족안내", desc: "처음 오신 분을 환영합니다", icon: "users", href: "/worship/services" },
  { title: "예배안내", desc: "예배 시간과 장소 안내", icon: "clock", href: "/worship/services" },
  { title: "제자훈련원", desc: "단계별 신앙 훈련 과정", icon: "book", href: "/education/discipleship" },
] as const;

export const education = [
  { href: "/education/church-school", title: "교회학교", en: "Church School", desc: "영아부부터 청소년부까지 세대별 신앙 교육" },
  { href: "/education/young-adults", title: "청년부", en: "Young Adults", desc: "20–30대가 함께 예배하고 꿈꾸는 공동체" },
  { href: "/mission/languages", title: "English Ministry", en: "English Worship", desc: "영어로 드리는 예배와 성경공부" },
  { href: "/education/discipleship", title: "장년 훈련", en: "Discipleship", desc: "새가족·제자·사역 훈련과 성경대학" },
];

export const mission = {
  verse: "너희는 온 천하에 다니며 만민에게 복음을 전파하라",
  verseRef: "마가복음 16:15",
  languages: [
    { title: "중국어 예배", en: "Chinese Worship" },
    { title: "베트남어 예배", en: "Vietnamese Worship" },
    { title: "러시아어 예배", en: "Russian Worship" },
  ],
};

// 히어로 캐러셀 — 사진: Unsplash (Unsplash License, 무료 상업적 사용 가능)
export const heroSlides = [
  {
    image: "worship",
    eyebrow: "WORSHIP",
    title: "예배로 살아나는 교회",
    desc: "삶의 자리에서 하나님을 만나는 살아 있는 예배,\nchurch19가 당신을 초대합니다.",
    cta: { label: "예배 안내 바로가기", href: "/worship/services" },
    credit: { name: "AMONWAT DUMKRUT", url: "https://unsplash.com/photos/SfGalIOhZ6Q" },
  },
  {
    image: "bible",
    eyebrow: "THE WORD",
    title: "말씀으로 자라는 사람들",
    desc: "말씀을 깊이 배우고 삶으로 살아내며\n그리스도의 제자로 함께 자라갑니다.",
    cta: { label: "교육·훈련 바로가기", href: "/education/discipleship" },
    credit: { name: "Aaron Burden", url: "https://unsplash.com/photos/6ePvMShPwcs" },
  },
  {
    image: "community",
    eyebrow: "COMMUNITY",
    title: "사랑으로 세워가는 공동체",
    desc: "함께 웃고 함께 우는 가족,\n하나님 사랑과 이웃 사랑을 실천합니다.",
    cta: { label: "사역 스토리 보기", href: "/community/stories" },
    credit: { name: "Helena Lopes", url: "https://unsplash.com/photos/PGnqT0rXWLs" },
  },
  {
    image: "sanctuary",
    eyebrow: "WELCOME",
    title: "처음 오신 당신을 환영합니다",
    desc: "사람을 살리고, 키우고, 세우는 생명의 공동체\nchurch19에 오신 것을 진심으로 환영합니다.",
    cta: { label: "교회 소개 바로가기", href: "/about/greeting" },
    credit: { name: "Debby Hudson", url: "https://unsplash.com/photos/sgdyBq6kheQ" },
  },
] as const;
