import { parseAuthUser, USER_PATH } from "@/src/features/auth/parseUser";
import type { AuthUser } from "@/src/features/auth/types";
import { authLog } from "@/src/lib/authLog";

/** Browser — GET profile (withCredentials). */
export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const url = "/api/auth/user";

  authLog("client-fetch", "GET /auth/user", { url });

  try {
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json().catch(() => null);
    const user = response.status < 400 ? parseAuthUser(data) : null;

    authLog("client-fetch", "response", {
      status: response.status,
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
  await fetch("/api/auth/logout", { method: "POST" });
  authLog("client", "logout");
}
