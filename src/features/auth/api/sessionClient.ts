import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import { authDebug } from "@/src/lib/authDebug";

export const AUTH_USER_PATH = "/auth/user";

export function parseAuthUser(data: unknown): AuthUser | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const record = data as Record<string, unknown>;

  if (record.success === false) {
    return null;
  }

  if (record.data && typeof record.data === "object") {
    return record.data as AuthUser;
  }

  if (typeof record.id === "number" && typeof record.email === "string") {
    return record as AuthUser;
  }

  return null;
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data, status } = await apiClient.get<unknown>("/auth/user", {
      validateStatus: () => true,
    });

    authDebug("client", "fetchCurrentUser response", {
      status,
      path: "/auth/user",
    });

    if (status >= 400) {
      return null;
    }
    return parseAuthUser(data);
  } catch (error) {
    authDebug("client", "fetchCurrentUser failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return null;
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    await ensureCsrfCookie();
    const { status } = await apiClient.post("/auth/logout");
    return status < 400;
  } catch {
    return false;
  }
}
