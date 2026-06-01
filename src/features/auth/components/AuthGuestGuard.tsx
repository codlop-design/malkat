"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";

function AuthGuestLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div
        className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
        aria-label="جاري التحميل"
      />
    </div>
  );
}

/** Redirects logged-in users away from guest-only auth pages (client fallback). */
export default function AuthGuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isAuthReady } = useAuth();

  useLayoutEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  if (user) {
    return <AuthGuestLoading />;
  }

  if (!isAuthReady) {
    return <AuthGuestLoading />;
  }

  return children;
}
