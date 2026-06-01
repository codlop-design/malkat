import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { isAuthGuestPath } from "@/src/features/auth/routes";

/**
 * Guest auth routes only — if session cookie exists, go home.
 * /profile is guarded in ProfilePageClient (API check), not here.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAuthGuestPath(pathname)) {
    return NextResponse.next();
  }

  const hasSession = request.cookies
    .getAll()
    .some((cookie) => cookie.name === SESSION_COOKIE_NAME && cookie.value.length > 0);

  if (hasSession) {
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
