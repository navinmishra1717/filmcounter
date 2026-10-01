"use client";

import type { ReactNode } from "react";
import { Modal } from "antd";
import { cn } from "@/lib/cn";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  /** Runs once the close animation has finished; a good place to reset state. */
  afterClose?: () => void;
  title: ReactNode;
  width?: number;
  children: ReactNode;
};

// antd Modal (focus trap, scroll lock, Escape and backdrop close) without its default footer.
export function Dialog({ open, onClose, afterClose, title, width = 440, children }: DialogProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      afterClose={afterClose}
      title={title}
      width={width}
      footer={null}
      centered
      destroyOnHidden
      closeIcon={<span className="text-[16px] text-neutral-700">✕</span>}
      classNames={{ container: "p-4 shadow-lg", header: "mb-3", title: "leading-[1.55]" }}
    >
      {children}
    </Modal>
  );
}

export function DialogBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("text-[14px] opacity-85", className)}>{children}</div>;
}

export function DialogActions({ children }: { children: ReactNode }) {
  return <div className="mt-2 flex justify-end gap-2">{children}</div>;
}
