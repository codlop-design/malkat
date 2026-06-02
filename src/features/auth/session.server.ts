import "server-only";

import { cache } from "react";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { fetchSessionUser } from "@/src/features/auth/fetchSessionUser";
import type { AuthUser } from "@/src/features/auth/types";
import { authLog } from "@/src/lib/authLog";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";
import { readRequestCookieHeader } from "@/src/lib/serverApiHeaders";

export const getServerUser = cache(async function getServerUser(): Promise<AuthUser | null> {
  const cookieHeader = await readRequestCookieHeader();
  const cookieNames = cookieHeader
    ? cookieHeader.split(";").map((p) => p.trim().split("=")[0])
    : [];

  authLog("getServerUser", "start", {
    cookieNames,
    hasMalkatSession: cookieNames.includes(SESSION_COOKIE_NAME),
    apiBase: process.env.NEXT_PUBLIC_API_URL ?? null,
  });

  if (!cookieHeader.includes(SESSION_COOKIE_NAME)) {
    authLog("getServerUser", "no malkat-session cookie on this request");
    return null;
  }

  const user = await fetchSessionUser(cookieHeader, await getRequestSiteUrl());

  authLog("getServerUser", "done", {
    user: user?.name ?? null,
  });

  return user;
});

export const hasSessionCookie = cache(async function hasSessionCookie(): Promise<boolean> {
  const cookieHeader = await readRequestCookieHeader();
  return cookieHeader.includes(SESSION_COOKIE_NAME);
});
