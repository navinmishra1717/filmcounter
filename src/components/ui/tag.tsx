import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const VARIANTS = {
  accent: "bg-accent-100 text-accent-800",
  neutral: "bg-neutral-100 text-neutral-800",
  outline: "border border-accent text-accent",
};

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof VARIANTS;
};

export function Tag({ variant = "neutral", className, ...props }: TagProps) {
  return (
    <span
      className={cn("inline-flex items-center px-2.5 py-[3px] text-[11px] tracking-[0.02em]", VARIANTS[variant], className)}
      {...props}
    />
  );
}
