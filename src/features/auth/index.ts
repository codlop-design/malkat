export type {
  AuthUser,
  LoginResult,
  SendOtpResult,
  VerifyOtpResult,
} from "@/src/features/auth/types";

export { fetchCurrentUser, logout } from "@/src/features/auth/session.client";
export { fetchSessionUser } from "@/src/features/auth/fetchSessionUser";
export { getServerUser } from "@/src/features/auth/session.server";

export { loginWithEmail, sendOtp, verifyOtp } from "@/src/features/auth/login";

export { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";

export {
  AUTH_GUEST_PATHS,
  PROTECTED_PATHS,
  isAuthGuestPath,
  isAuthRoute,
  isProtectedPath,
} from "@/src/features/auth/routes";

export { AuthProvider, useAuth } from "@/src/features/auth/context/AuthProvider";
