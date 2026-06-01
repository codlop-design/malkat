import axios from "axios";

import { parseAuthUser, USER_PATH } from "@/src/features/auth/parseUser";
import type { AuthUser } from "@/src/features/auth/types";

/** Middleware + server — GET profile with forwarded cookies. */
export async function fetchSessionUser(
  cookieHeader: string,
  siteUrl: string,
): Promise<AuthUser | null> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!cookieHeader || !baseURL) {
    return null;
  }

  try {
    const { data, status } = await axios.get<unknown>(USER_PATH, {
      baseURL,
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Language": "ar",
        Cookie: cookieHeader,
        Origin: siteUrl,
        Referer: `${siteUrl}/`,
      },
      validateStatus: () => true,
    });

    if (status >= 400) {
      return null;
    }

    return parseAuthUser(data);
  } catch {
    return null;
  }
}
