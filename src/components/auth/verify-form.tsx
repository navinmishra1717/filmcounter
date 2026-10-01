"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { formatPhone } from "@/lib/phone";
import { ROUTES } from "@/lib/routes";
import { useAuthFlow } from "./auth-flow";
import { AuthError, AuthHeading } from "./auth-panel";
import { CODE_LENGTH, CodeInput } from "./code-input";

export function VerifyForm() {
  const router = useRouter();
  const { phone, setSignedIn } = useAuthFlow();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // No number yet (page opened directly or reloaded): start from the phone step.
  useEffect(() => {
    if (!phone) router.replace(ROUTES.signIn);
  }, [phone, router]);

  if (!phone) return null;

  // TODO: replace the timeout with a real verify-code request.
  const verifyCode = (e: FormEvent) => {
    e.preventDefault();
    if (code.length < CODE_LENGTH) {
      setError("All six digits, then we're in.");
      return;
    }
    setError("");
    setLoading(true);
    timer.current = setTimeout(() => {
      setSignedIn(true);
      router.push(ROUTES.welcome);
    }, 950);
  };

  return (
    <>
      <AuthHeading title="Six digits, please.">
        Sent to {formatPhone(phone)} ·{" "}
        <Link href={ROUTES.signIn} className="text-accent underline underline-offset-[3px]">
          change
        </Link>
      </AuthHeading>
      <form className="flex flex-col gap-[18px]" onSubmit={verifyCode} noValidate>
        <CodeInput
          value={code}
          onChange={(next) => {
            setCode(next);
            setError("");
          }}
        />
        <AuthError>{error}</AuthError>
        <Button type="submit" block loading={loading} className="mt-0 min-h-11">
          {loading ? "Checking…" : "Sign in"}
        </Button>
      </form>
      <div className="flex items-center justify-between border-t border-divider pt-3.5">
        <Button
          variant="ghost"
          onClick={() => {
            setCode("");
            setError("");
          }}
        >
          Resend the code
        </Button>
        <Link href={ROUTES.forgotPassword} className="text-[12px] text-neutral-700 underline underline-offset-[3px]">
          Still nothing?
        </Link>
      </div>
    </>
  );
}
