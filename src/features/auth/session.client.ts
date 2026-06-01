import { parseAuthUser, USER_PATH } from "@/src/features/auth/parseUser";
import type { AuthUser } from "@/src/features/auth/types";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import { authLog } from "@/src/lib/authLog";

/** Browser — GET profile (withCredentials). */
export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const url = `${apiClient.defaults.baseURL ?? ""}${USER_PATH}`;

  authLog("client-fetch", "GET /auth/user", { url });

  try {
    const { data, status } = await apiClient.get<unknown>(USER_PATH, {
      validateStatus: () => true,
    });

    const user = status < 400 ? parseAuthUser(data) : null;

    authLog("client-fetch", "response", {
      status,
      user: user?.name ?? null,
      preview: data ? JSON.stringify(data).slice(0, 120) : null,
    });

    return user;
  } catch (error) {
    authLog("client-fetch", "failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return null;
  }
}

export async function logout(): Promise<void> {
  await ensureCsrfCookie();
  await apiClient.post("/auth/logout");
  authLog("client", "logout");
}
