/** Guest-only routes — logged-in users are redirected away (middleware + auth layout). */
export const AUTH_GUEST_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
] as const;

export function isAuthGuestPath(pathname: string): boolean {
  return AUTH_GUEST_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
