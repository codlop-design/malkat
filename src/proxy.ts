import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { isAuthGuestPath, isProtectedPath } from "@/src/features/auth/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies
    .getAll()
    .some(
      (cookie) =>
        cookie.name === SESSION_COOKIE_NAME && cookie.value.length > 0,
    );

  if (isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  if (!isAuthGuestPath(pathname)) {
    return NextResponse.next();
  }

  if (hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/login/:path*",
    "/register",
    "/register/:path*",
    "/forgot-password",
    "/forgot-password/:path*",
    "/reset-password",
    "/reset-password/:path*",
    "/profile",
    "/profile/:path*",
  ],
};
