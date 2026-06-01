export const SESSION_COOKIE = "malkat-session";

export function hasSessionCookie(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  return document.cookie.includes(`${SESSION_COOKIE}=`);
}
