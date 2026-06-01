import "server-only";

import { cookies, headers } from "next/headers";
import { cache } from "react";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { fetchSessionUser } from "@/src/features/auth/fetchSessionUser";
import type { AuthUser } from "@/src/features/auth/types";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";
import { authLog } from "@/src/lib/authLog";

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
