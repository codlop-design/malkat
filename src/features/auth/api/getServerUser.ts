import { cookies } from "next/headers";
import { cache } from "react";

import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { resolveAuthUser } from "@/src/features/auth/api/resolveAuthUser";
import { authDebug } from "@/src/lib/authDebug";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";

export const getServerUser = cache(
  async function getServerUser(): Promise<AuthUser | null> {
    const cookieStore = await cookies();
    const all = cookieStore.getAll();
    const cookieHeader = all
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const cookieNames = all.map((cookie) => cookie.name);
    const siteUrl = await getRequestSiteUrl();

    if (!cookieHeader) {
      authDebug("server", "getServerUser — no cookies on Next.js request", {
        siteUrl,
      });
      return null;
    }

    const user = await resolveAuthUser({ cookieHeader, siteUrl });

    authDebug("server", "getServerUser result", {
      siteUrl,
      apiBase: process.env.NEXT_PUBLIC_API_URL ?? null,
      cookieNames,
      hasMalkatSession: cookieNames.includes("malkat-session"),
      userResolved: user !== null,
      userName: user?.name ?? null,
    });

    return user;
  },
);
