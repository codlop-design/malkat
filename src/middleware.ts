import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { resolveAuthUser } from "@/src/features/auth/api/resolveAuthUser";
import { isAuthGuestPath } from "@/src/features/auth/authRoutes";
import { getSiteUrl } from "@/src/lib/siteUrl";

function getSiteUrlFromRequest(request: NextRequest): string {
  const fromEnv = process.env.SITE_URL?.replace(/\/$/, "");

  if (fromEnv && !fromEnv.includes("localhost")) {
    return fromEnv;
  }

  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    request.headers.get("host");
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";

  if (host) {
    return `${proto}://${host}`;
  }

  return getSiteUrl();
}

export async function middleware(request: NextRequest) {
  if (!isAuthGuestPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const cookieHeader = request.cookies
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (!cookieHeader) {
    return NextResponse.next();
  }

  // Profile API is the source of truth — stale/expired cookies may still exist in the browser.
  const user = await resolveAuthUser({
    cookieHeader,
    siteUrl: getSiteUrlFromRequest(request),
  });

  if (user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
  ],
};
