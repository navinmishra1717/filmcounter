"use client";

import { useId } from "react";
import { Input as AntInput, type InputProps as AntInputProps } from "antd";
import { cn } from "@/lib/cn";

export type InputProps = AntInputProps & {
  /** When set, the input is rendered as a labelled field. */
  label?: string;
};

export function Input({ label, id, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const input = (
    <AntInput
      id={inputId}
      className={cn(
        "min-h-9 border-divider bg-surface px-2.5 py-1.5 text-[14px] text-ink caret-accent hover:border-ink/45 focus:border-accent",
        className,
      )}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <div>
      <label htmlFor={inputId} className="mb-[5px] block text-[12px] text-ink/70">
        {label}
      </label>
      {input}
    </div>
  );
}
