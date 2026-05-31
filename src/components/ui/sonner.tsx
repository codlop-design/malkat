"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      dir="rtl"
      position="bottom-right"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "font-[family-name:var(--font-baloo-bhaijaan-2)] text-sm shadow-lg",
          title: "font-medium",
          description: "text-[#454545]",
        },
      }}
      {...props}
    />
  );
}
