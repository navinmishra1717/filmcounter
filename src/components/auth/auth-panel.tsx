import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/routes";

type Props = {
  /** e.g. "STEP 01 / 02"; omitted on screens outside the numbered steps. */
  stepLabel?: string;
  className?: string;
  children: ReactNode;
};

// The white panel every /auth screen sits in: brand, step counter, then the step itself.
export function AuthPanel({ stepLabel, className, children }: Props) {
  return (
    <div className="relative w-[420px] max-w-full bg-paper px-8 pt-[30px] pb-7 shadow-lg">
      <div className="mb-[22px] flex items-baseline justify-between border-b-2 border-divider pb-[11px]">
        <Link href={ROUTES.home} className="text-[17px] font-extrabold tracking-[-0.02em]">
          FILMCOUNTER
        </Link>
        <span className="font-mono text-[11px] font-semibold text-accent">{stepLabel}</span>
      </div>
      <div className={cn("flex animate-step-in flex-col gap-[18px]", className)}>{children}</div>
    </div>
  );
}

export function AuthHeading({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h1 className="mb-1.5 text-[25px] leading-[1.12] font-extrabold tracking-[-0.015em]">{title}</h1>
      <p className="text-[13.5px] text-neutral-700">{children}</p>
    </div>
  );
}

export function AuthError({ children }: { children: ReactNode }) {
  if (!children) return null;
  return <p className="-mt-1.5 text-[12.5px] font-semibold text-accent-700">{children}</p>;
}
