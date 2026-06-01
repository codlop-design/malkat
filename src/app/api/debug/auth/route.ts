import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { getServerUser } from "@/src/features/auth/session.server";
import { USER_PATH } from "@/src/features/auth/parseUser";
import { isAuthLogEnabled } from "@/src/lib/authLog";
import { getLaravelApiBase } from "@/src/lib/serverApiUrl";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";

export async function GET() {
  if (!isAuthLogEnabled()) {
    return NextResponse.json({ error: "Set AUTH_DEBUG=true" }, { status: 404 });
  }

  const cookieStore = await cookies();
  const all = cookieStore.getAll();
  const siteUrl = await getRequestSiteUrl();
  const apiBase = getLaravelApiBase(siteUrl);
  const user = await getServerUser();

  return NextResponse.json({
    endpoint: USER_PATH,
    serverApiBase: apiBase,
    publicApiBase: process.env.NEXT_PUBLIC_API_URL ?? null,
    apiProxyTarget: process.env.API_PROXY_TARGET ?? null,
    siteUrl,
    cookieNames: all.map((c) => c.name),
    hasMalkatSession: all.some((c) => c.name === SESSION_COOKIE_NAME),
    serverUser: user?.name ?? null,
    serverUserId: user?.id ?? null,
    hint: "Filter console/terminal by [AUTH]. Restart dev server after .env changes.",
  });
}
