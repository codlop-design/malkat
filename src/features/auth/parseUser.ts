import type { AuthUser } from "@/src/features/auth/types";

export const USER_PATH = "/auth/user";

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
