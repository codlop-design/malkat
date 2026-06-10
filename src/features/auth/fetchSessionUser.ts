import { parseAuthUser, USER_PATH } from "@/src/features/auth/parseUser";
import type { AuthUser } from "@/src/features/auth/types";
import { buildServerApiHeaders } from "@/src/lib/serverApiHeaders";

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
      headers: buildServerApiHeaders(cookieHeader, siteUrl),
      cache: "no-store",
    });

    const body = await response.json().catch(() => null);
    const user = response.ok ? parseAuthUser(body) : null;

    return user;
  } catch {
    return null;
  }
}
