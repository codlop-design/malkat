"use client";

import { Direction } from "radix-ui";
import { Toaster } from "@/src/components/ui/sonner";
import { AuthProvider } from "@/src/features/auth/context/AuthProvider";
import { CartProvider } from "@/src/features/cart/context/CartProvider";

type RootProvidersProps = {
  children: React.ReactNode;
};

export function RootProviders({ children }: RootProvidersProps) {
  return (
    <Direction.Provider dir="rtl">
      <AuthProvider>
        <CartProvider>
          <Toaster />
          {children}
        </CartProvider>
      </AuthProvider>
    </Direction.Provider>
  );
}
