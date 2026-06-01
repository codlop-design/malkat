"use client";

import { Direction } from "radix-ui";

import { Toaster } from "@/src/components/ui/sonner";
import type { AuthUser } from "@/src/features/auth/api/loginClient";
import AuthDebugLogger from "@/src/features/auth/components/AuthDebugLogger";
import { AuthProvider } from "@/src/features/auth/context/AuthProvider";
import { CartProvider } from "@/src/features/cart/context/CartProvider";
import { isAuthDebugEnabled } from "@/src/lib/authDebug";

type RootProvidersProps = {
  children: React.ReactNode;
  initialUser: AuthUser | null;
};

export function RootProviders({ children, initialUser }: RootProvidersProps) {
  return (
    <Direction.Provider dir="rtl">
      <AuthProvider initialUser={initialUser}>
        <CartProvider>
          {isAuthDebugEnabled() ? <AuthDebugLogger /> : null}
          <Toaster />
          {children}
        </CartProvider>
      </AuthProvider>
    </Direction.Provider>
  );
}
