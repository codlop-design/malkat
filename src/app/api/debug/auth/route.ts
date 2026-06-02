import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { getServerUser } from "@/src/features/auth/session.server";
import { USER_PATH } from "@/src/features/auth/parseUser";
import { isAuthLogEnabled } from "@/src/lib/authLog";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";

export async function GET() {
  if (!isAuthLogEnabled()) {
    return NextResponse.json({ error: "Set AUTH_DEBUG=true" }, { status: 404 });
  }

  const cookieStore = await cookies();
  const all = cookieStore.getAll();
  const siteUrl = await getRequestSiteUrl();

  const user = await getServerUser();

  return NextResponse.json({
    endpoint: USER_PATH,
    apiBase: process.env.NEXT_PUBLIC_API_URL ?? null,
    siteUrl,
    cookieNames: all.map((c) => c.name),
    hasMalkatSession: all.some((c) => c.name === SESSION_COOKIE_NAME),
    serverUser: user?.name ?? null,
    serverUserId: user?.id ?? null,
    hint: "Copy this JSON + console logs filtered by [AUTH]",
  });
}
