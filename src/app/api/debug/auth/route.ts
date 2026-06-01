import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getServerUser } from "@/src/features/auth/api/getServerUser";
import { AUTH_USER_PATH } from "@/src/features/auth/lib/authApi";
import { SESSION_COOKIE } from "@/src/features/auth/lib/sessionCookie";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const cookieStore = await cookies();
  const cookieNames = cookieStore.getAll().map((cookie) => cookie.name);
  const hasSession = cookieStore.has(SESSION_COOKIE);
  const user = await getServerUser();

  return NextResponse.json({
    endpoint: AUTH_USER_PATH,
    withCredentialsNote:
      "Browser axios uses withCredentials:true; server fetch forwards Cookie header",
    hasSessionCookie: hasSession,
    cookieNames,
    serverUserResolved: user !== null,
    userName: user?.name ?? null,
    apiOrigin:
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ??
      "https://malkat-dashboard.codlop.sa",
    siteUrl: process.env.SITE_URL ?? null,
    debugLogs: "Open browser console for [auth:client] / terminal for [auth:server]",
  });
}
