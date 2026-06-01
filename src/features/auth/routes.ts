export const PROTECTED_PATHS = ["/profile"] as const;

export const AUTH_GUEST_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function isAuthGuestPath(pathname: string): boolean {
  return AUTH_GUEST_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

/** Middleware only handles guest auth routes; profile uses client session. */
export function needsAuthMiddleware(pathname: string): boolean {
  return isAuthGuestPath(pathname);
}
