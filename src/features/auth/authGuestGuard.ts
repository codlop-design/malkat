import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { isAuthGuestPath } from "@/src/features/auth/routes";

/** Edge / proxy — redirect guest auth pages when session cookie is present. */
export function authGuestGuard(request: NextRequest): NextResponse {
  if (!isAuthGuestPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const hasSession = request.cookies
    .getAll()
    .some(
      (cookie) =>
        cookie.name === SESSION_COOKIE_NAME && cookie.value.length > 0,
    );

  if (hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const authGuestGuardMatcher = [
  "/login",
  "/login/:path*",
  "/register",
  "/register/:path*",
  "/forgot-password",
  "/forgot-password/:path*",
  "/reset-password",
  "/reset-password/:path*",
] as const;
