import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import { fetchSessionUser } from "@/src/features/auth/fetchSessionUser";
import type { AuthUser } from "@/src/features/auth/types";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";

/** Server Components — cached per request. */
export const getServerUser = cache(async function getServerUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (!cookieHeader) {
    return null;
  }

  return fetchSessionUser(cookieHeader, await getRequestSiteUrl());
});
