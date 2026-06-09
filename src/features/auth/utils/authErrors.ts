import axios from "axios";

const INACTIVE_ACCOUNT_PATTERN = /غير\s*(نشط|مفعل|مفعّل)|not\s*active|inactive/i;

export function isInactiveAccountMessage(message: string): boolean {
  return INACTIVE_ACCOUNT_PATTERN.test(message);
}

export function enhanceAuthErrorMessage(message: string): string {
  if (isInactiveAccountMessage(message)) {
    return "حسابك غير مفعّل بعد. يرجى تفعيل حسابك عبر البريد الإلكتروني، أو تواصل مع الدعم إذا كنت بحاجة إلى مساعدة.";
  }

  return message;
}

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.length > 0) {
      return enhanceAuthErrorMessage(message);
    }
  }

  return fallback;
}

export function resolveAuthFailureMessage(
  message: string | undefined,
  fallback: string,
): string {
  if (typeof message === "string" && message.length > 0) {
    return enhanceAuthErrorMessage(message);
  }

  return fallback;
}
