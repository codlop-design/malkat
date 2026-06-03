"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { authLog } from "@/src/lib/authLog";

export default function RedirectIfAuthenticated() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    authLog("guest-redirect", "check", { user: user?.name ?? null });

    if (user) {
      authLog("guest-redirect", "→ redirect /profile (context user)");
      router.replace("/profile");
      return;
    }

    let cancelled = false;

    void refreshUser().then((current) => {
      if (!cancelled && current) {
        authLog("guest-redirect", "→ redirect /profile (after refresh)", {
          user: current.name,
        });
        router.replace("/profile");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [user, refreshUser, router]);

  return null;
}
