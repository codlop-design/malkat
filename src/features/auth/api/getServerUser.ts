import { cookies } from "next/headers";
import { cache } from "react";

import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { resolveAuthUser } from "@/src/features/auth/api/resolveAuthUser";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";

export const getServerUser = cache(
  async function getServerUser(): Promise<AuthUser | null> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    if (!cookieHeader) {
      return null;
    }

    const siteUrl = await getRequestSiteUrl();
    return resolveAuthUser({ cookieHeader, siteUrl });
  },
);
