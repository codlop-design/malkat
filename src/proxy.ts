import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { isAuthGuestPath, isProtectedPath } from "@/src/features/auth/routes";
import { authLog } from "@/src/lib/authLog";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieNames = request.cookies.getAll().map((c) => c.name);
  const hasSession = request.cookies
    .getAll()
    .some((cookie) => cookie.name === SESSION_COOKIE_NAME && cookie.value.length > 0);

  authLog("proxy", "request", {
    pathname,
    cookieNames,
    hasMalkatSession: hasSession,
    isAuthGuest: isAuthGuestPath(pathname),
    isProtected: isProtectedPath(pathname),
  });

  if (isProtectedPath(pathname)) {
    authLog("proxy", "protected route — pass through (page handles auth)");
    return NextResponse.next();
  }

  if (!isAuthGuestPath(pathname)) {
    return NextResponse.next();
  }

  if (hasSession) {
    authLog("proxy", "→ redirect /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  authLog("proxy", "→ next()");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
    "/profile/:path*",
  ],
};
