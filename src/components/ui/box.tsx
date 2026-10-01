import type { ComponentPropsWithoutRef, ElementType } from "react";

export type BoxProps<T extends ElementType = "div"> = {
  /** Element or component to render, e.g. "section" or "li". Defaults to "div". */
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

// Unstyled layout primitive: pick the element with `as`, style it with Tailwind classes.
export function Box<T extends ElementType = "div">({ as, ...props }: BoxProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component {...props} />;
}
