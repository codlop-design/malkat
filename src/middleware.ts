import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { fetchSessionUser } from "@/src/features/auth/fetchSessionUser";
import { isAuthGuestPath } from "@/src/features/auth/routes";
import { getSiteUrl } from "@/src/lib/siteUrl";

function getSiteUrlFromRequest(request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    request.headers.get("host");
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";

  if (host) {
    return `${proto}://${host}`;
  }

  const fromEnv = process.env.SITE_URL?.replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }

  return getSiteUrl();
}

function getCookieHeader(request: NextRequest): string {
  return request.cookies
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

/**
 * Guest auth routes only (/login, …).
 * /profile is guarded on the client — session cookies live on the API host
 * (Sanctum), so server/middleware cannot read them on the Next.js host.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAuthGuestPath(pathname)) {
    return NextResponse.next();
  }

  const cookieHeader = getCookieHeader(request);
  if (!cookieHeader) {
    return NextResponse.next();
  }

  const user = await fetchSessionUser(
    cookieHeader,
    getSiteUrlFromRequest(request),
  );

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
