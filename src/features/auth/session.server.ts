import "server-only";

import { cache } from "react";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { fetchSessionUser } from "@/src/features/auth/fetchSessionUser";
import type { AuthUser } from "@/src/features/auth/types";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";
import { readRequestCookieHeader } from "@/src/lib/serverApiHeaders";

export const getServerUser = cache(
  async function getServerUser(): Promise<AuthUser | null> {
    const cookieHeader = await readRequestCookieHeader();

    if (!cookieHeader.includes(SESSION_COOKIE_NAME)) {
      return null;
    }

    const user = await fetchSessionUser(
      cookieHeader,
      await getRequestSiteUrl(),
    );

    return user;
  },
);

export const hasSessionCookie = cache(
  async function hasSessionCookie(): Promise<boolean> {
    const cookieHeader = await readRequestCookieHeader();
    return cookieHeader.includes(SESSION_COOKIE_NAME);
  },
);
