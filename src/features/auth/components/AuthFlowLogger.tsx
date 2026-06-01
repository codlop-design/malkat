"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { authLog, isAuthLogEnabled } from "@/src/lib/authLog";

export default function AuthFlowLogger() {
  const pathname = usePathname();
  const { user, isAuthReady, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthLogEnabled()) {
      return;
    }

    console.group(`[AUTH:route] ${pathname}`);
    authLog("route", "navigation", {
      pathname,
      isAuthReady,
      isAuthenticated,
      user: user?.name ?? null,
    });

    void fetch("/api/debug/auth", { credentials: "include" })
      .then((res) => res.json())
      .then((report) => authLog("route", "server snapshot", report))
      .catch((err) =>
        authLog("route", "server snapshot failed", {
          message: err instanceof Error ? err.message : "unknown",
        }),
      );

    console.groupEnd();
  }, [pathname, user, isAuthReady, isAuthenticated]);

  return null;
}
