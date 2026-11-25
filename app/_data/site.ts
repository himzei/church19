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

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    label: "교회소개",
    href: "#about",
    children: [
      { label: "인사말", href: "#about" },
      { label: "비전", href: "#vision" },
      { label: "교회연혁", href: "#about" },
      { label: "섬기는 사람들", href: "#about" },
      { label: "오시는 길", href: "#footer" },
    ],
  },
  {
    label: "예배",
    href: "#worship",
    children: [
      { label: "예배안내", href: "#worship" },
      { label: "church19 TV", href: "#sermons" },
      { label: "경배와 찬양", href: "#sermons" },
      { label: "주차안내", href: "#worship" },
    ],
  },
  {
    label: "교육·훈련",
    href: "#education",
    children: [
      { label: "교회학교", href: "#education" },
      { label: "청년부", href: "#education" },
      { label: "제자훈련", href: "#education" },
      { label: "성경대학", href: "#education" },
    ],
  },
  {
    label: "선교",
    href: "#mission",
    children: [
      { label: "세계선교", href: "#mission" },
      { label: "선교영상", href: "#mission" },
      { label: "다언어 예배", href: "#mission" },
    ],
  },
  {
    label: "나눔터",
    href: "#news",
    children: [
      { label: "공지사항", href: "#news" },
      { label: "사역 스토리", href: "#news" },
      { label: "주보", href: "#news" },
      { label: "갤러리", href: "#news" },
    ],
  },
];

export const quickLinks = [
  { label: "유튜브", icon: "youtube", href: "#sermons" },
  { label: "온라인헌금", icon: "offering", href: "#footer" },
  { label: "성경", icon: "bible", href: "#sermons" },
  { label: "온라인신청", icon: "form", href: "#about" },
  { label: "주보", icon: "bulletin", href: "#news" },
  { label: "공지사항", icon: "notice", href: "#news" },
] as const;

export const featureTiles = [
  { title: "church19 TV", sub: "Sermons", icon: "play", href: "#sermons" },
  { title: "사역 스토리", sub: "Ministry Story", icon: "heart", href: "#news" },
  { title: "성경", sub: "Bible", icon: "bible", href: "#sermons" },
  { title: "경배와 찬양", sub: "Praise & Worship", icon: "music", href: "#sermons" },
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

export const stories = [
  { title: "감사로 채운 하루, 2026 추수감사주일", date: "2026.11.15", tag: "행사" },
  { title: "몸과 마음이 하나 되는 소그룹 가을 소풍", date: "2026.11.14", tag: "소그룹" },
  { title: "지역 어르신을 위한 김장 나눔 봉사", date: "2026.11.07", tag: "섬김" },
];

export const notices = [
  { title: "2026 성탄 감사예배 및 성가대 모집 안내", date: "2026.11.20" },
  { title: "겨울 성경학교 교사 지원 신청", date: "2026.11.18" },
  { title: "사랑의 음악회 좌석 신청 안내", date: "2026.11.10" },
  { title: "기부금 영수증 발급 일정 안내", date: "2026.11.03" },
];

export const aboutCards = [
  { title: "교회소개", desc: "church19의 이야기와 섬기는 사람들", icon: "church", href: "#vision" },
  { title: "새가족안내", desc: "처음 오신 분을 환영합니다", icon: "users", href: "#worship" },
  { title: "예배안내", desc: "예배 시간과 장소 안내", icon: "clock", href: "#worship" },
  { title: "제자훈련원", desc: "단계별 신앙 훈련 과정", icon: "book", href: "#education" },
] as const;

export const education = [
  { title: "교회학교", en: "Church School", desc: "영아부부터 청소년부까지 세대별 신앙 교육" },
  { title: "청년부", en: "Young Adults", desc: "20–30대가 함께 예배하고 꿈꾸는 공동체" },
  { title: "English Ministry", en: "English Worship", desc: "영어로 드리는 예배와 성경공부" },
  { title: "장년 훈련", en: "Discipleship", desc: "새가족·제자·사역 훈련과 성경대학" },
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
