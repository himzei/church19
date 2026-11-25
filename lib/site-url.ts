/** 사이트 주소 (sitemap·robots 에서 사용). 배포 시 BETTER_AUTH_URL 을 실제 도메인으로 바꾸면 함께 바뀐다. */
export const siteUrl = (process.env.BETTER_AUTH_URL || "http://localhost:3000").replace(/\/$/, "");
