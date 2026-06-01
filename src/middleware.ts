import type { NextRequest } from "next/server";

import {
  authGuestGuard,
  authGuestGuardMatcher,
} from "@/src/features/auth/authGuestGuard";

export function middleware(request: NextRequest) {
  return authGuestGuard(request);
}

export const config = {
  matcher: [...authGuestGuardMatcher],
};
