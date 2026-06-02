import { parseAuthUser, USER_PATH } from "@/src/features/auth/parseUser";
import type { AuthUser } from "@/src/features/auth/types";
import { authLog } from "@/src/lib/authLog";
import { buildServerApiHeaders } from "@/src/lib/serverApiHeaders";

/** Server — GET /auth/user with cookies from the browser request. */
export async function fetchSessionUser(
  cookieHeader: string,
  siteUrl: string,
): Promise<AuthUser | null> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  if (!cookieHeader || !baseURL) {
    authLog("server-fetch", "skip — no cookies or NEXT_PUBLIC_API_URL", {
      hasCookies: Boolean(cookieHeader),
      apiBase: baseURL ?? null,
    });
    return null;
  }

  const url = `${baseURL}${USER_PATH}`;
  const cookieNames = cookieHeader
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter(Boolean);

  authLog("server-fetch", "GET /auth/user", {
    url,
    siteUrl,
    cookieNames,
  });

  try {
    const response = await fetch(url, {
      headers: buildServerApiHeaders(cookieHeader, siteUrl),
      cache: "no-store",
    });

    const body = await response.json().catch(() => null);
    const user = response.ok ? parseAuthUser(body) : null;

    authLog("server-fetch", "response", {
      status: response.status,
      ok: response.ok,
      user: user?.name ?? null,
      preview: body ? JSON.stringify(body).slice(0, 120) : null,
    });

    return user;
  } catch (error) {
    authLog("server-fetch", "failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return null;
  }
}
