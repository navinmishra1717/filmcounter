import type { Metadata } from "next";
import { AuthHeading, AuthPanel } from "@/components/auth/auth-panel";
import { Button, Input, LinkButton } from "@/components/ui";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Guest booking — FilmCounter" };

export default function GuestPage() {
  return (
    <AuthPanel className="gap-4">
      <AuthHeading title="Guest booking">Where should the tickets land?</AuthHeading>
      <Input label="Email" type="email" autoComplete="email" autoFocus placeholder="you@example.com" className="min-h-11" />
      <Button block className="mt-0 min-h-11">
        Choose seats
      </Button>
      <LinkButton href={ROUTES.signIn} variant="ghost" className="self-start">
        Sign in instead
      </LinkButton>
    </AuthPanel>
  );
}
