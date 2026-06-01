import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { AUTH_USER_PATH } from "@/src/features/auth/lib/authApi";
import { authDebug } from "@/src/features/auth/lib/authDebug";
import { parseAuthUserPayload } from "@/src/features/auth/lib/parseAuthUser";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  authDebug("client", "fetchCurrentUser via apiClient", {
    path: AUTH_USER_PATH,
    withCredentials: true,
  });

  try {
    const { data, status } = await apiClient.get<unknown>(AUTH_USER_PATH);

    if (status >= 400) {
      return null;
    }

    return parseAuthUserPayload(data);
  } catch (error) {
    authDebug("client", "fetchCurrentUser failed", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return null;
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    await ensureCsrfCookie();
    const { status } = await apiClient.post("/api/auth/logout");
    return status < 400;
  } catch {
    return false;
  }
}
