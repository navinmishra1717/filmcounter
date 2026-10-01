import type { ElementType } from "react";
import { cn } from "@/lib/cn";
import { Box, type BoxProps } from "./box";

const ELEVATIONS = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

export type CardProps<T extends ElementType = "div"> = BoxProps<T> & {
  elevation?: keyof typeof ELEVATIONS;
  className?: string;
};

// Raised surface: stacked content on the surface colour, with optional shadow.
export function Card<T extends ElementType = "div">({ elevation = "none", className, ...props }: CardProps<T>) {
  return (
    <Box
      className={cn("flex flex-col gap-2 bg-surface p-3 text-ink", ELEVATIONS[elevation], className)}
      {...(props as BoxProps<ElementType>)}
    />
  );
}
