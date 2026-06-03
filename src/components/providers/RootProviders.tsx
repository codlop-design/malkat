"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
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
  hasSessionCookie: boolean;
};

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export function RootProviders({
  children,
  initialUser,
  hasSessionCookie,
}: RootProvidersProps) {
  const tree = (
    <Direction.Provider dir="rtl">
      <AuthProvider
        initialUser={initialUser}
        hasSessionCookie={hasSessionCookie}
      >
        <CartProvider>
          {isAuthLogEnabled() ? <AuthFlowLogger /> : null}
          <Toaster />
          {children}
        </CartProvider>
      </AuthProvider>
    </Direction.Provider>
  );

  if (!googleClientId) {
    return tree;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>{tree}</GoogleOAuthProvider>
  );
}
