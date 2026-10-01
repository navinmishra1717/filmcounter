"use client";

import { digitsOnly } from "@/lib/phone";
import { Input } from "../ui";

export const CODE_LENGTH = 6;

function boxBorder(index: number, filledCount: number) {
  if (index < filledCount) return "border-accent";
  if (index === filledCount) return "border-neutral-600";
  return "border-divider";
}

type Props = {
  value: string;
  onChange: (code: string) => void;
};

// Six display boxes with one invisible input stretched over them.
export function CodeInput({ value, onChange }: Props) {
  return (
    <div className="relative flex gap-[7px] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
      {Array.from({ length: CODE_LENGTH }, (_, i) => (
        <div
          key={i}
          className={`grid h-14 flex-1 place-items-center border bg-surface text-[24px] font-extrabold ${boxBorder(i, value.length)}`}
        >
          {value[i] ?? ""}
        </div>
      ))}
      <Input
        className="absolute inset-0 w-full cursor-text border-0 opacity-0"
        value={value}
        onChange={(e) => onChange(digitsOnly(e.target.value, CODE_LENGTH))}
        inputMode="numeric"
        autoComplete="one-time-code"
        autoFocus
        aria-label="Verification code"
      />
    </div>
  );
}
