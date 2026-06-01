import "server-only";

import { cookies, headers } from "next/headers";
import { cache } from "react";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { fetchSessionUser } from "@/src/features/auth/fetchSessionUser";
import type { AuthUser } from "@/src/features/auth/types";
import { authLog } from "@/src/lib/authLog";
import { getLaravelApiBase } from "@/src/lib/serverApiUrl";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";

async function readCookieHeader(): Promise<string> {
  const headerList = await headers();
  const fromRaw = headerList.get("cookie");

  if (fromRaw) {
    return fromRaw;
  }

  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

export const getServerUser = cache(async function getServerUser(): Promise<AuthUser | null> {
  const cookieHeader = await readCookieHeader();
  const hasSession = cookieHeader.includes(SESSION_COOKIE_NAME);

  authLog("getServerUser", "start", {
    hasSession,
    apiBase: hasSession ? getLaravelApiBase(await getRequestSiteUrl()) : null,
  });

  if (!hasSession) {
    return null;
  }

  const siteUrl = await getRequestSiteUrl();
  const apiBase = getLaravelApiBase(siteUrl);
  const user = await fetchSessionUser(cookieHeader, siteUrl, apiBase);

  authLog("getServerUser", "done", { user: user?.name ?? null });

  return user;
});

/** Whether the browser sent a session cookie (may still be invalid). */
export const hasSessionCookie = cache(async function hasSessionCookie(): Promise<boolean> {
  const cookieHeader = await readCookieHeader();
  return cookieHeader.includes(SESSION_COOKIE_NAME);
});
