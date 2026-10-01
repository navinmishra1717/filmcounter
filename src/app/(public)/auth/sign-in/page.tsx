import type { Metadata } from "next";
import { AuthHeading, AuthPanel } from "@/components/auth/auth-panel";
import { PhoneForm } from "@/components/auth/phone-form";

export const metadata: Metadata = { title: "Sign in — FilmCounter" };

export default function SignInPage() {
  return (
    <AuthPanel stepLabel="STEP 01 / 02">
      <AuthHeading title="What's your number?">One code, no passwords to forget.</AuthHeading>
      <PhoneForm />
    </AuthPanel>
  );
}
