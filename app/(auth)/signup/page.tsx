import type { Metadata } from "next";
import { Suspense } from "react";
import { enabledProviders } from "@/lib/auth";
import { Divider } from "../_components/fields";
import { SignupForm } from "../_components/SignupForm";
import { SocialButtons } from "../_components/SocialButtons";

export const metadata: Metadata = { title: "회원가입 | church19" };

export default function SignupPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight text-navy">회원가입</h1>
      <p className="mt-2 text-muted">간편하게 가입하고 church19와 함께하세요.</p>

      <div className="mt-8">
        <SocialButtons enabled={enabledProviders} mode="signup" />
      </div>

      <Divider>또는 이메일로 가입</Divider>

      <Suspense>
        <SignupForm />
      </Suspense>
    </>
  );
}
