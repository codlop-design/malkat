"use client";

import { Direction } from "radix-ui";
import { Toaster } from "@/src/components/ui/sonner";
import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { AuthProvider } from "@/src/features/auth/context/AuthProvider";
import { CartProvider } from "@/src/features/cart/context/CartProvider";

type RootProvidersProps = {
  children: React.ReactNode;
  initialUser: AuthUser | null;
};

export function RootProviders({ children, initialUser }: RootProvidersProps) {
  return (
    <Direction.Provider dir="rtl">
      <AuthProvider initialUser={initialUser}>
        <CartProvider>
          <Toaster />
          {children}
        </CartProvider>
      </AuthProvider>
    </Direction.Provider>
  );
}
