"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";

export default function RedirectIfAuthenticated() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/profile");
      return;
    }

    let cancelled = false;

    void refreshUser().then((current) => {
      if (!cancelled && current) {
        router.replace("/profile");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [user, refreshUser, router]);

  return null;
}
