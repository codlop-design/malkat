const ENABLED =
  process.env.NODE_ENV === "development" ||
  process.env.AUTH_DEBUG === "true" ||
  process.env.NEXT_PUBLIC_AUTH_DEBUG === "true";

export function isAuthDebugEnabled(): boolean {
  return ENABLED;
}

export function authDebug(
  scope: string,
  message: string,
  data?: Record<string, unknown>,
): void {
  if (!ENABLED) {
    return;
  }

  const label = `[auth:${scope}] ${message}`;
  if (data) {
    console.log(label, data);
  } else {
    console.log(label);
  }
}
