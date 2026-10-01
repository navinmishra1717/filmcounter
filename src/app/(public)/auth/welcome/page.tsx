import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth/auth-panel";
import { Welcome } from "@/components/auth/welcome";

export const metadata: Metadata = { title: "Welcome back — FilmCounter" };

export default function WelcomePage() {
  return (
    <AuthPanel className="gap-4">
      <Welcome />
    </AuthPanel>
  );
}
