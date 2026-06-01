import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";

type AuthUserResponse = {
  success: boolean;
  data?: AuthUser;
};

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data, status } =
      await apiClient.get<AuthUserResponse>("/api/auth/user");

    if (status >= 400 || !data.success || !data.data) {
      return null;
    }

    return data.data;
  } catch {
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
