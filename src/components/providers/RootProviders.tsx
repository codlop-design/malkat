"use client";

import { Direction } from "radix-ui";

import { Toaster } from "@/src/components/ui/sonner";
import AuthFlowLogger from "@/src/features/auth/components/AuthFlowLogger";
import { AuthProvider } from "@/src/features/auth/context/AuthProvider";
import type { AuthUser } from "@/src/features/auth/types";
import { CartProvider } from "@/src/features/cart/context/CartProvider";
import { isAuthLogEnabled } from "@/src/lib/authLog";

type RootProvidersProps = {
  children: React.ReactNode;
  initialUser: AuthUser | null;
};

export function RootProviders({ children, initialUser }: RootProvidersProps) {
  return (
    <Direction.Provider dir="rtl">
      <AuthProvider initialUser={initialUser}>
        <CartProvider>
          {isAuthLogEnabled() ? <AuthFlowLogger /> : null}
          <Toaster />
          {children}
        </CartProvider>
      </AuthProvider>
    </Direction.Provider>
  );
}
