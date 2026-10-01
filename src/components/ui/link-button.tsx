import type { ComponentProps } from "react";
import Link from "next/link";
import { buttonClassName, type ButtonStyleProps } from "./button-styles";

export type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & ButtonStyleProps;

// A navigation link that looks like a Button.
export function LinkButton({ variant, block, className, ...props }: LinkButtonProps) {
  return <Link className={buttonClassName({ variant, block, className })} {...props} />;
}
