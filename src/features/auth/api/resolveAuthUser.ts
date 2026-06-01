import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { probeAuthUser } from "@/src/features/auth/api/probeAuthUser";

type ResolveAuthUserOptions = {
  cookieHeader: string;
  siteUrl: string;
};

/** GET profile with forwarded session cookies (server / middleware). */
export async function resolveAuthUser({
  cookieHeader,
  siteUrl,
}: ResolveAuthUserOptions): Promise<AuthUser | null> {
  if (!cookieHeader) {
    return null;
  }

  const { user } = await probeAuthUser({ cookieHeader, siteUrl });
  return user;
}
