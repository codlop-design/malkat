import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { isAuthGuestPath, isProtectedPath } from "@/src/features/auth/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname) && !isAuthGuestPath(pathname)) {
    return NextResponse.next();
  }

  const hasSession = request.cookies
    .getAll()
    .some((cookie) => cookie.name === SESSION_COOKIE_NAME && cookie.value.length > 0);

  if (isProtectedPath(pathname) && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthGuestPath(pathname) && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
