import { parseAuthUser, USER_PATH } from "@/src/features/auth/parseUser";
import type { AuthUser } from "@/src/features/auth/types";
import { authLog } from "@/src/lib/authLog";

function buildApiHeaders(cookieHeader: string, siteUrl: string): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "ar",
    Cookie: cookieHeader,
    Origin: siteUrl,
    Referer: `${siteUrl}/`,
  };

  const xsrfMatch = cookieHeader.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);
  if (xsrfMatch?.[1]) {
    try {
      headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfMatch[1]);
    } catch {
      headers["X-XSRF-TOKEN"] = xsrfMatch[1];
    }
  }

  return headers;
}

/** Server — GET /auth/user with cookies from the incoming request. */
export async function fetchSessionUser(
  cookieHeader: string,
  siteUrl: string,
  apiBase: string,
): Promise<AuthUser | null> {
  const baseURL = apiBase.replace(/\/$/, "");

  if (!cookieHeader || !baseURL) {
    authLog("server-fetch", "skip", {
      hasCookies: Boolean(cookieHeader),
      apiBase: baseURL || null,
    });
    return null;
  }

  const url = `${baseURL}${USER_PATH}`;

  authLog("server-fetch", "GET /auth/user", {
    url,
    siteUrl,
    cookieNames: cookieHeader
      .split(";")
      .map((part) => part.trim().split("=")[0])
      .filter(Boolean),
  });

  try {
    const response = await fetch(url, {
      headers: buildApiHeaders(cookieHeader, siteUrl),
      cache: "no-store",
    });

    const body = await response.json().catch(() => null);
    const user = response.ok ? parseAuthUser(body) : null;

    authLog("server-fetch", "response", {
      status: response.status,
      ok: response.ok,
      user: user?.name ?? null,
      preview: body ? JSON.stringify(body).slice(0, 160) : null,
    });

    return user;
  } catch (error) {
    authLog("server-fetch", "failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return null;
  }
}
