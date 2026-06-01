import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getServerUser } from "@/src/features/auth/api/getServerUser";
import { AUTH_USER_PATH } from "@/src/features/auth/lib/authApi";
import { API_ORIGIN } from "@/src/lib/apiOrigin";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";
import { getSiteUrl } from "@/src/lib/siteUrl";

const DEBUG_ENABLED =
  process.env.NODE_ENV !== "production" ||
  process.env.AUTH_DEBUG === "true";

export async function GET() {
  if (!DEBUG_ENABLED) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const cookieStore = await cookies();
  const cookieNames = cookieStore.getAll().map((cookie) => cookie.name);
  const user = await getServerUser();
  const requestSiteUrl = await getRequestSiteUrl();

  return NextResponse.json({
    endpoint: AUTH_USER_PATH,
    apiOrigin: API_ORIGIN,
    envSiteUrl: process.env.SITE_URL ?? null,
    resolvedSiteUrl: requestSiteUrl,
    fallbackSiteUrl: getSiteUrl(),
    cookieCount: cookieNames.length,
    cookieNames,
    serverUserResolved: user !== null,
    userName: user?.name ?? null,
  });
}
