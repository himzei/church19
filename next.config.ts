import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    serverActions: {
      // 관리자 사진 업로드 (사진은 브라우저에서 줄여 1장씩 보내며, 1장 최대 3MB)
      bodySizeLimit: "4mb",
    },
  },
  images: {
    // 나눔터 사진 (Supabase Storage 공개 버킷)
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
