const ENABLED =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_AUTH_DEBUG === "true";

export function authDebug(
  scope: string,
  message: string,
  data?: Record<string, unknown>,
): void {
  if (!ENABLED) {
    return;
  }

  const payload = data ? ` ${JSON.stringify(data)}` : "";
  console.log(`[auth:${scope}] ${message}${payload}`);
}
