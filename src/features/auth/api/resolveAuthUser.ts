import axios from "axios";

import type { AuthUser } from "@/src/features/auth/api/loginClient";
import {
  AUTH_USER_PATH,
  parseAuthUser,
} from "@/src/features/auth/api/sessionClient";

type ResolveAuthUserOptions = {
  cookieHeader: string;
  siteUrl: string;
};

/** GET profile with forwarded session cookies (server / middleware). */
export async function resolveAuthUser({
  cookieHeader,
  siteUrl,
}: ResolveAuthUserOptions): Promise<AuthUser | null> {
  if (!cookieHeader) {
    return null;
  }

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    return null;
  }

  try {
    const { data, status } = await axios.get<unknown>(AUTH_USER_PATH, {
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
