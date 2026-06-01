import axios from "axios";

import type { AuthUser } from "@/src/features/auth/api/loginClient";
import {
  AUTH_USER_PATH,
  parseAuthUser,
} from "@/src/features/auth/api/sessionClient";
import { authDebug } from "@/src/lib/authDebug";

export type AuthUserProbe = {
  status: number | "network";
  user: AuthUser | null;
  responsePreview: string | null;
};

export async function probeAuthUser(options: {
  cookieHeader: string;
  siteUrl: string;
}): Promise<AuthUserProbe> {
  const { cookieHeader, siteUrl } = options;
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  if (!cookieHeader || !baseURL) {
    return { status: "network", user: null, responsePreview: null };
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

    const user = status < 400 ? parseAuthUser(data) : null;
    const preview =
      data && typeof data === "object"
        ? JSON.stringify(data).slice(0, 200)
        : String(data).slice(0, 200);

    authDebug("probe", "GET /auth/user", {
      status,
      siteUrl,
      baseURL,
      userResolved: user !== null,
      userName: user?.name ?? null,
    });

    return { status, user, responsePreview: preview };
  } catch (error) {
    authDebug("probe", "GET /auth/user failed", {
      message: error instanceof Error ? error.message : "unknown",
    });

    return { status: "network", user: null, responsePreview: null };
  }
}
