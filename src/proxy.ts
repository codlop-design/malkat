import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { isAuthGuestPath, isProtectedPath } from "@/src/features/auth/routes";
import { authLog } from "@/src/lib/authLog";

function clearAuthCookies(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  });
  response.cookies.set({
    name: "XSRF-TOKEN",
    value: "",
    maxAge: 0,
    path: "/",
  });
}

async function validateSession(request: NextRequest): Promise<boolean> {
  // Call our own route handler which clears cookies on 401/419.
  const url = new URL("/api/auth/user", request.url);
  const res = await fetch(url, {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  return res.status < 400;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieNames = request.cookies.getAll().map((c) => c.name);
  const hasSession = request.cookies
    .getAll()
    .some(
      (cookie) =>
        cookie.name === SESSION_COOKIE_NAME && cookie.value.length > 0,
    );

  authLog("proxy", "request", {
    pathname,
    cookieNames,
    hasMalkatSession: hasSession,
    isAuthGuest: isAuthGuestPath(pathname),
    isProtected: isProtectedPath(pathname),
  });

  if (isProtectedPath(pathname)) {
    if (!hasSession) {
      authLog("proxy", "protected — no session → redirect /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const ok = await validateSession(request);
    if (!ok) {
      authLog("proxy", "protected — invalid session → clear + redirect /login");
      const res = NextResponse.redirect(new URL("/login", request.url));
      clearAuthCookies(res);
      return res;
    }

    authLog("proxy", "protected — ok → next()");
    return NextResponse.next();
  }

  if (!isAuthGuestPath(pathname)) {
    return NextResponse.next();
  }

  if (hasSession) {
    const ok = await validateSession(request);
    if (ok) {
      authLog("proxy", "auth-guest — already logged in → redirect /");
      return NextResponse.redirect(new URL("/", request.url));
    }

    authLog("proxy", "auth-guest — invalid session → clear + allow");
    const res = NextResponse.next();
    clearAuthCookies(res);
    return res;
  }

  authLog("proxy", "→ next()");
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
