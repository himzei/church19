// 화면 오른쪽 SNS 바로가기 — 링크 주소는 관리자 > 사이트 설정에서 입력 (site_setting 테이블)
// 서버(검증)와 클라이언트(관리자 폼)가 함께 사용

export const SNS_KEYS = ["instagram", "youtube", "threads", "kakao"] as const;
export type SnsKey = (typeof SNS_KEYS)[number];
export type SnsLinks = Partial<Record<SnsKey, string>>;

export const SNS: Record<SnsKey, { label: string; placeholder: string; hosts: string[] }> = {
  instagram: {
    label: "인스타그램",
    placeholder: "https://www.instagram.com/church19",
    hosts: ["instagram.com", "www.instagram.com"],
  },
  youtube: {
    label: "유튜브",
    placeholder: "https://www.youtube.com/@church19",
    hosts: ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"],
  },
  threads: {
    label: "스레드",
    placeholder: "https://www.threads.com/@church19",
    hosts: ["threads.net", "www.threads.net", "threads.com", "www.threads.com"],
  },
  kakao: {
    label: "카카오톡 채널",
    placeholder: "https://pf.kakao.com/_xxxxxx",
    hosts: ["pf.kakao.com"],
  },
};

/** 설정 테이블에 저장하는 키 이름 */
export const snsSettingKey = (k: SnsKey) => `sns.${k}`;

/**
 * 입력한 주소 검사 — https 이면서 해당 SNS 도메인일 때만 허용한다
 * (javascript: 같은 위험한 주소나 엉뚱한 사이트 링크 방지). 빈 값은 '표시 안 함'.
 */
export function normalizeSnsUrl(key: SnsKey, raw: string): { ok: true; url: string } | { ok: false; error: string } {
  const value = raw.trim();
  if (!value) return { ok: true, url: "" };
  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return { ok: false, error: `${SNS[key].label}: 주소 형식이 올바르지 않습니다.` };
  }
  if (u.protocol === "http:") u.protocol = "https:";
  if (u.protocol !== "https:" || !SNS[key].hosts.includes(u.hostname.toLowerCase())) {
    return { ok: false, error: `${SNS[key].label}: ${SNS[key].hosts[0]} 주소만 입력할 수 있습니다.` };
  }
  if (u.toString().length > 300) return { ok: false, error: `${SNS[key].label}: 주소가 너무 깁니다.` };
  return { ok: true, url: u.toString() };
}
