"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";

/** Redirect logged-in users away from guest-only pages (login, register, …). */
export default function AuthGuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isAuthReady } = useAuth();

  useEffect(() => {
    if (isAuthReady && user) {
      router.replace("/");
    }
  }, [isAuthReady, user, router]);

  if (!isAuthReady) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div
          className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-label="جاري التحميل"
        />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return children;
}
