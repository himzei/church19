import type { Metadata } from "next";
import { Suspense } from "react";
import { enabledProviders } from "@/lib/auth";
import { Divider } from "../_components/fields";
import { LoginForm } from "../_components/LoginForm";
import { SocialButtons } from "../_components/SocialButtons";

export const metadata: Metadata = { title: "로그인 | church19" };

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight text-navy">로그인</h1>
      <p className="mt-2 text-muted">church19에 오신 것을 환영합니다.</p>

      <div className="mt-8">
        <SocialButtons enabled={enabledProviders} mode="login" />
      </div>

      <Divider>또는 이메일로 로그인</Divider>

      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
}
