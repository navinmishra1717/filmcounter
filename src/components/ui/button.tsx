"use client";

import { Button as AntButton, type ButtonProps as AntButtonProps } from "antd";
import { buttonClassName, type ButtonStyleProps, type ButtonVariant } from "./button-styles";

const ANT_VARIANTS = {
  primary: { color: "primary", variant: "solid" },
  secondary: { color: "default", variant: "outlined" },
  ghost: { color: "primary", variant: "text" },
} as const satisfies Record<ButtonVariant, Pick<AntButtonProps, "color" | "variant">>;

export type ButtonProps = Omit<AntButtonProps, "type" | "variant" | "color" | "htmlType" | "block" | "className"> &
  ButtonStyleProps & {
    type?: "button" | "submit" | "reset";
  };

// antd Button (loading state, click wave, focus handling) dressed in the Modernist look.
export function Button({ variant = "primary", type = "button", block, className, ...props }: ButtonProps) {
  return (
    <AntButton
      {...ANT_VARIANTS[variant]}
      htmlType={type}
      className={buttonClassName({ variant, block, className })}
      {...props}
    />
  );
}
