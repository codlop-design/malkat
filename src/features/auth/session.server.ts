import "server-only";

import { cookies, headers } from "next/headers";
import { cache } from "react";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { fetchSessionUser } from "@/src/features/auth/fetchSessionUser";
import type { AuthUser } from "@/src/features/auth/types";
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

/** Server Components — cached per request. */
export const getServerUser = cache(async function getServerUser(): Promise<AuthUser | null> {
  const cookieHeader = await readCookieHeader();

  if (!cookieHeader.includes(SESSION_COOKIE_NAME)) {
    return null;
  }

  return fetchSessionUser(cookieHeader, await getRequestSiteUrl());
});
