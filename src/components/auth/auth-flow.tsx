"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AuthFlow = {
  /** Digits of the number the code was sent to; empty until the phone step is done. */
  phone: string;
  setPhone: (phone: string) => void;
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
};

const AuthFlowContext = createContext<AuthFlow | null>(null);

// Carries sign-in progress between the /auth routes. It lives in the auth layout,
// so it survives step-to-step navigation and resets on a full page load.
export function AuthFlowProvider({ children }: { children: ReactNode }) {
  const [phone, setPhone] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const value = useMemo(() => ({ phone, setPhone, signedIn, setSignedIn }), [phone, signedIn]);

  return <AuthFlowContext.Provider value={value}>{children}</AuthFlowContext.Provider>;
}

export function useAuthFlow() {
  const flow = useContext(AuthFlowContext);
  if (!flow) throw new Error("useAuthFlow must be used inside AuthFlowProvider");
  return flow;
}
