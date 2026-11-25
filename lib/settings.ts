// 사이트 설정 조회 (서버 전용) — 관리자가 바꾸면 updateTag(SETTINGS_TAG) 로 즉시 갱신
import { cacheLife, cacheTag } from "next/cache";
import { pool } from "./db";
import { SNS_KEYS, type SnsLinks, snsSettingKey } from "./sns";

export const SETTINGS_TAG = "settings";

export async function getSnsLinks(): Promise<SnsLinks> {
  "use cache";
  cacheTag(SETTINGS_TAG);
  cacheLife("days");
  const { rows } = await pool.query(`SELECT key, value FROM "site_setting" WHERE key = ANY($1)`, [
    SNS_KEYS.map(snsSettingKey),
  ]);
  const map = new Map(rows.map((r: { key: string; value: string }) => [r.key, r.value]));
  const links: SnsLinks = {};
  for (const k of SNS_KEYS) {
    const v = map.get(snsSettingKey(k));
    if (v) links[k] = v;
  }
  return links;
}
