"use client";

import { Direction } from "radix-ui";
import { Toaster } from "@/src/components/ui/sonner";

type RootProvidersProps = {
  children: React.ReactNode;
};

export function RootProviders({ children }: RootProvidersProps) {
  return (
    <Direction.Provider dir="rtl">
      <Toaster />
      {children}
    </Direction.Provider>
  );
}
