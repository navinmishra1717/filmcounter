import type { Metadata } from "next";
import { AuthHeading, AuthPanel } from "@/components/auth/auth-panel";
import { LinkButton } from "@/components/ui";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Trouble signing in — FilmCounter" };

// Sign-in is passwordless, so "forgot password" is help for a code that hasn't arrived.
const HELP_ITEMS = [
  { title: "Resend the code", detail: "Wait thirty seconds — carriers dawdle." },
  { title: "Check the number", detail: "One wrong digit is the usual culprit." },
  { title: "Email me instead", detail: "We'll send a sign-in link to your ticket address." },
];

export default function ForgotPasswordPage() {
  return (
    <AuthPanel className="gap-4">
      <AuthHeading title="No code arriving?">Try one of these.</AuthHeading>
      <ul className="flex flex-col gap-px bg-divider">
        {HELP_ITEMS.map((item) => (
          <li key={item.title} className="bg-paper px-0.5 py-3">
            <div className="text-[13.5px] font-extrabold">{item.title}</div>
            <div className="text-[12px] text-neutral-700">{item.detail}</div>
          </li>
        ))}
      </ul>
      <LinkButton href={ROUTES.signIn} variant="secondary" className="self-start">
        Back
      </LinkButton>
    </AuthPanel>
  );
}
