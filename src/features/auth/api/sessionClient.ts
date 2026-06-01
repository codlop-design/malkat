import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { AUTH_USER_PATH } from "@/src/features/auth/lib/authApi";
import { authDebug } from "@/src/features/auth/lib/authDebug";
import { parseAuthUserPayload } from "@/src/features/auth/lib/parseAuthUser";
import { hasSessionCookie } from "@/src/features/auth/lib/sessionCookie";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  authDebug("client", "fetchCurrentUser start", {
    path: AUTH_USER_PATH,
    withCredentials: true,
    hasSessionCookie: hasSessionCookie(),
  });

  try {
    const { data, status } = await apiClient.get<unknown>(AUTH_USER_PATH);

    authDebug("client", "fetchCurrentUser response", {
      status,
      raw: typeof data === "object" ? data : String(data),
    });

    if (status >= 400) {
      return null;
    }

    const user = parseAuthUserPayload(data);
    authDebug("client", "fetchCurrentUser parsed", {
      ok: user !== null,
      name: user?.name ?? null,
    });
    return user;
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
    authDebug("client", "logout", { status });
    return status < 400;
  } catch {
    return false;
  }
}
