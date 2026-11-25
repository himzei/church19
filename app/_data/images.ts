import type { StaticImageData } from "next/image";
import bible from "@/public/hero/bible.jpg";
import community from "@/public/hero/community.jpg";
import fellowship from "@/public/hero/fellowship.jpg";
import sanctuary from "@/public/hero/sanctuary.jpg";
import worship from "@/public/hero/worship.jpg";
import type { BannerImage } from "./site";

/** Unsplash 사진 (Unsplash License) */
export const photos: Record<BannerImage, StaticImageData> = {
  worship,
  bible,
  community,
  sanctuary,
  fellowship,
};

export const photoCredits: Record<BannerImage, string> = {
  worship: "AMONWAT DUMKRUT",
  bible: "Aaron Burden",
  community: "Helena Lopes",
  sanctuary: "Debby Hudson",
  fellowship: "Small Group Network",
};
