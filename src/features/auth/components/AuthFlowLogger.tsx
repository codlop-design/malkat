"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";

export default function AuthFlowLogger() {
  const pathname = usePathname();
  const { user, isAuthReady, isAuthenticated } = useAuth();

  useEffect(() => {
    console.group(`[AUTH:route] ${pathname}`);

    void fetch("/api/debug/auth", { credentials: "include" })
      .then((res) => res.json())
      .then((report) => console.log("server snapshot", report))
      .catch((err) =>
        console.log("server snapshot failed", {
          message: err instanceof Error ? err.message : "unknown",
        }),
      );

    console.groupEnd();
  }, [pathname, user, isAuthReady, isAuthenticated]);

  return null;
}
