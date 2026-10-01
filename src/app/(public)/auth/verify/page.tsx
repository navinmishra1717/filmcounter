import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth/auth-panel";
import { VerifyForm } from "@/components/auth/verify-form";

export const metadata: Metadata = { title: "Enter your code — FilmCounter" };

export default function VerifyPage() {
  return (
    <AuthPanel stepLabel="STEP 02 / 02">
      <VerifyForm />
    </AuthPanel>
  );
}
