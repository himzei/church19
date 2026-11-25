import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/** /robots.txt — 사이트맵 위치 안내, 관리자·개인 화면은 수집 제외 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/profile", "/api/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
