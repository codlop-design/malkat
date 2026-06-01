"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  AUTH_USER_PATH,
  fetchCurrentUser,
} from "@/src/features/auth/api/sessionClient";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { apiClient } from "@/src/lib/apiClient";
import { authDebug, isAuthDebugEnabled } from "@/src/lib/authDebug";

export default function AuthDebugLogger() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthDebugEnabled()) {
      return;
    }

    let cancelled = false;

    async function run() {
      console.group(`[auth:client] ${pathname}`);

      authDebug("client", "AuthProvider state", {
        pathname,
        isAuthenticated,
        clientUser: user?.name ?? null,
        clientUserId: user?.id ?? null,
      });

      const readableCookies = document.cookie || "(no readable cookies — session is HttpOnly)";
      authDebug("client", "document.cookie", { value: readableCookies });

      try {
        const { status, data } = await apiClient.get<unknown>(AUTH_USER_PATH, {
          validateStatus: () => true,
        });
        authDebug("client", "direct apiClient GET profile", {
          status,
          apiBase: process.env.NEXT_PUBLIC_API_URL ?? null,
          preview:
            data && typeof data === "object"
              ? JSON.stringify(data).slice(0, 200)
              : String(data).slice(0, 200),
        });
      } catch (error) {
        authDebug("client", "direct apiClient GET profile failed", {
          message: error instanceof Error ? error.message : "unknown",
        });
      }

      const fromHelper = await fetchCurrentUser();
      authDebug("client", "fetchCurrentUser()", {
        resolved: fromHelper !== null,
        userName: fromHelper?.name ?? null,
      });

      try {
        const res = await fetch("/api/debug/auth", { credentials: "include" });
        const serverReport = await res.json();
        authDebug("client", "server /api/debug/auth", serverReport);
      } catch (error) {
        authDebug("client", "/api/debug/auth failed", {
          message: error instanceof Error ? error.message : "unknown",
        });
      }

      console.groupEnd();

      if (cancelled) {
        return;
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [pathname, user, isAuthenticated]);

  return null;
}
