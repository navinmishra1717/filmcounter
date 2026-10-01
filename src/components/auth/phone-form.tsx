"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, LinkButton } from "@/components/ui";
import { PHONE_LENGTH, digitsOnly, formatPhone } from "@/lib/phone";
import { ROUTES } from "@/lib/routes";
import { useAuthFlow } from "./auth-flow";
import { AuthError } from "./auth-panel";

export function PhoneForm() {
  const router = useRouter();
  const flow = useAuthFlow();
  const [phone, setPhone] = useState(flow.phone);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // TODO: replace the timeout with a real send-code request.
  const sendCode = (e: FormEvent) => {
    e.preventDefault();
    if (phone.length < PHONE_LENGTH) {
      setError("That number looks short — ten digits, please.");
      return;
    }
    setError("");
    setLoading(true);
    timer.current = setTimeout(() => {
      flow.setPhone(phone);
      router.push(ROUTES.verify);
    }, 900);
  };

  return (
    <>
      <form className="flex flex-col gap-[18px]" onSubmit={sendCode} noValidate>
        <Input
          label="Mobile number"
          type="tel"
          autoComplete="tel"
          autoFocus
          placeholder="(555) 018 4429"
          className="min-h-[46px] text-[18px] font-semibold"
          value={formatPhone(phone)}
          onChange={(e) => {
            setPhone(digitsOnly(e.target.value, PHONE_LENGTH));
            setError("");
          }}
        />
        <AuthError>{error}</AuthError>
        <Button type="submit" block loading={loading} className="mt-0 min-h-11">
          {loading ? "Sending…" : "Send code"}
        </Button>
      </form>
      <div className="flex flex-col gap-1.5 border-t border-divider pt-3.5">
        <LinkButton href={ROUTES.guest} variant="ghost" className="self-start">
          Continue as guest
        </LinkButton>
        <span className="text-[11.5px] text-neutral-600">New here? A code makes the account for you.</span>
      </div>
    </>
  );
}
