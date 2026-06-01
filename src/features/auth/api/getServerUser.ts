import { cookies } from "next/headers";
import { cache } from "react";

import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { AUTH_USER_PATH } from "@/src/features/auth/lib/authApi";
import { authDebug } from "@/src/features/auth/lib/authDebug";
import { parseAuthUserPayload } from "@/src/features/auth/lib/parseAuthUser";
import { SESSION_COOKIE } from "@/src/features/auth/lib/sessionCookie";
import { getSiteUrl } from "@/src/lib/siteUrl";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ??
  "https://malkat-dashboard.codlop.sa";

export const getServerUser = cache(async function getServerUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const cookieNames = cookieStore.getAll().map((cookie) => cookie.name);
  const hasSession = cookieStore.has(SESSION_COOKIE);

  authDebug("server", "getServerUser start", {
    cookieNames,
    hasSessionCookie: hasSession,
    path: AUTH_USER_PATH,
  });

  if (!hasSession) {
    authDebug("server", "skip — no session cookie");
    return null;
  }

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const siteUrl = getSiteUrl();
  const url = `${API_ORIGIN}${AUTH_USER_PATH}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Cookie: cookieHeader,
        "X-Requested-With": "XMLHttpRequest",
        Origin: siteUrl,
        Referer: `${siteUrl}/`,
      },
      cache: "no-store",
    });

    authDebug("server", "fetch response", {
      status: response.status,
      ok: response.ok,
    });

    if (!response.ok) {
      const body = await response.text();
      authDebug("server", "fetch failed body", { body: body.slice(0, 200) });
      return null;
    }

    const data: unknown = await response.json();
    const user = parseAuthUserPayload(data);

    authDebug("server", "parsed user", {
      ok: user !== null,
      name: user?.name ?? null,
    });

    return user;
  } catch (error) {
    authDebug("server", "fetch exception", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return null;
  }
});
