import { cn } from "@/lib/cn";

// Shared by Button (antd) and LinkButton (next/link) so both look the same.
const BASE =
  "inline-flex h-auto items-center justify-center gap-1.5 border border-transparent px-[14.4px] py-2 text-[14px] leading-[1.2] font-extrabold";

const VARIANTS = {
  primary: "bg-accent text-paper hover:bg-accent-600 active:bg-accent-700",
  secondary: "border-divider bg-transparent text-ink hover:bg-ink/[0.07] active:bg-ink/[0.14]",
  ghost: "px-1 text-accent hover:bg-accent/10 active:bg-accent/[0.18]",
};

export type ButtonVariant = keyof typeof VARIANTS;

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  /** Full width, with the label left-aligned. */
  block?: boolean;
  className?: string;
};

export function buttonClassName({ variant = "primary", block = false, className }: ButtonStyleProps) {
  return cn(BASE, VARIANTS[variant], block && "mt-2 w-full justify-start text-left", className);
}
