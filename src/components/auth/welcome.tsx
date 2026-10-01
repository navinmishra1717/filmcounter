"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Tag } from "@/components/ui";
import { FEATURED_FILM } from "@/lib/movies";
import { ROUTES } from "@/lib/routes";
import { useAuthFlow } from "./auth-flow";
import { AuthHeading } from "./auth-panel";

export function Welcome() {
  const router = useRouter();
  const { signedIn } = useAuthFlow();

  // Only reachable by finishing the code step.
  useEffect(() => {
    if (!signedIn) router.replace(ROUTES.signIn);
  }, [signedIn, router]);

  if (!signedIn) return null;

  return (
    <>
      <Tag variant="accent" className="self-start">
        Signed in
      </Tag>
      <AuthHeading title="Welcome back, Mira.">Row H held for {FEATURED_FILM}, 7:45pm.</AuthHeading>
      <Button block className="mt-0 min-h-11">
        Choose seats
      </Button>
    </>
  );
}
