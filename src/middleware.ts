import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  isAuthGuestPath,
  isProtectedPath,
  needsAuthMiddleware,
} from "@/src/features/auth/routes";
import { fetchSessionUser } from "@/src/features/auth/fetchSessionUser";
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!needsAuthMiddleware(pathname)) {
    return NextResponse.next();
  }

  const cookieHeader = getCookieHeader(request);
  const isProtected = isProtectedPath(pathname);
  const isAuthGuest = isAuthGuestPath(pathname);

  if (isProtected && !cookieHeader) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthGuest && !cookieHeader) {
    return NextResponse.next();
  }

  const user = await fetchSessionUser(
    cookieHeader,
    getSiteUrlFromRequest(request),
  );

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthGuest && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
