import { parseAuthUser, USER_PATH } from "@/src/features/auth/parseUser";
import type { AuthUser } from "@/src/features/auth/types";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";

/** Browser — GET profile (withCredentials). */
export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data, status } = await apiClient.get<unknown>(USER_PATH, {
      validateStatus: () => true,
    });

    const user = status < 400 ? parseAuthUser(data) : null;

    return user;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await ensureCsrfCookie();
  await apiClient.post("/auth/logout");
}
