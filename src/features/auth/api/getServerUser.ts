import { cookies } from "next/headers";
import { cache } from "react";

import type { AuthUser } from "@/src/features/auth/api/loginClient";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ??
  "https://malkat-dashboard.codlop.sa";

const SESSION_COOKIE = "malkat-session";

type AuthUserResponse = {
  success: boolean;
  data?: AuthUser;
};

export const getServerUser = cache(async function getServerUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();

  if (!cookieStore.has(SESSION_COOKIE)) {
    return null;
  }

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    const response = await fetch(`${API_ORIGIN}/api/auth/user`, {
      headers: {
        Accept: "application/json",
        Cookie: cookieHeader,
        "X-Requested-With": "XMLHttpRequest",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as AuthUserResponse;

    if (!data.success || !data.data) {
      return null;
    }

    return data.data;
  } catch {
    return null;
  }
});
