import { parseAuthUser, USER_PATH } from "@/src/features/auth/parseUser";
import type { AuthUser } from "@/src/features/auth/types";

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

/** Server — GET /auth/user with cookies from the browser request. */
export async function fetchSessionUser(
  cookieHeader: string,
  siteUrl: string,
): Promise<AuthUser | null> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!cookieHeader || !baseURL) {
    return null;
  }

  const url = `${baseURL}${USER_PATH}`;

  try {
    const response = await fetch(url, {
      headers: buildApiHeaders(cookieHeader, siteUrl),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return parseAuthUser(await response.json());
  } catch {
    return null;
  }
}
