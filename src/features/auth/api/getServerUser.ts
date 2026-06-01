import { cache } from "react";

import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { AUTH_USER_PATH } from "@/src/features/auth/lib/authApi";
import { authDebug } from "@/src/features/auth/lib/authDebug";
import { parseAuthUserPayload } from "@/src/features/auth/lib/parseAuthUser";
import { getApiServer } from "@/src/lib/apiServer";

export const getServerUser = cache(async function getServerUser(): Promise<AuthUser | null> {
  authDebug("server", "getServerUser via apiServer", { path: AUTH_USER_PATH });

  try {
    const api = await getApiServer();
    const { data, status } = await api.get<unknown>(AUTH_USER_PATH);

    authDebug("server", "getServerUser response", { status });

    if (status >= 400) {
      return null;
    }

    return parseAuthUserPayload(data);
  } catch (error) {
    authDebug("server", "getServerUser failed", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return null;
  }
});
