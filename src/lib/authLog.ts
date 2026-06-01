const ENABLED =
  process.env.NODE_ENV === "development" ||
  process.env.AUTH_DEBUG === "true" ||
  process.env.NEXT_PUBLIC_AUTH_DEBUG === "true";

export function isAuthLogEnabled(): boolean {
  return ENABLED;
}

/** Logs to browser console (client) or terminal (server). Filter console by `[AUTH]`. */
export function authLog(
  scope: string,
  message: string,
  data?: Record<string, unknown>,
): void {
  if (!ENABLED) {
    return;
  }

  const tag = `[AUTH:${scope}]`;
  if (data) {
    console.log(tag, message, data);
  } else {
    console.log(tag, message);
  }
}
