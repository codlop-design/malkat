export const OFFLINE_ERROR_MESSAGE =
  "لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة والمحاولة مرة أخرى.";

export const CONNECTION_ERROR_MESSAGE =
  "تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.";

export const FETCH_TIMEOUT_MS = 15_000;
export const SERVER_ACTION_TIMEOUT_MS = 30_000;

export function isOffline(): boolean {
  return typeof navigator !== "undefined" && !navigator.onLine;
}

export function isNetworkError(error: unknown): boolean {
  return (
    error instanceof TypeError ||
    (error instanceof DOMException &&
      (error.name === "AbortError" || error.name === "NetworkError")) ||
    (error instanceof Error &&
      (error.name === "TimeoutError" || error.message === "TIMEOUT"))
  );
}
