import { Suspense } from "react";
import { requireAdmin } from "@/lib/dal";
import { getSnsLinks } from "@/lib/settings";
import { PageTitle } from "../_components/ui";
import { SnsForm } from "../_components/SnsForm";

export const metadata = { title: "사이트 설정" };

export default function SettingsPage() {
  return (
    <>
      <PageTitle title="사이트 설정" desc="사이트 화면 오른쪽에 고정되는 SNS 바로가기 주소를 설정합니다." />
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white" />}>
        <Content />
      </Suspense>
    </>
  );
}

async function Content() {
  await requireAdmin("/admin/settings");
  return <SnsForm initial={await getSnsLinks()} />;
}
