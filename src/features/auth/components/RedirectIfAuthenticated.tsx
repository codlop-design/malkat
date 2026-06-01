"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";

/** On guest auth pages — send logged-in users to home. */
export default function RedirectIfAuthenticated() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/");
      return;
    }

    let cancelled = false;

    void refreshUser().then((current) => {
      if (!cancelled && current) {
        router.replace("/");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [user, refreshUser, router]);

  return null;
}
