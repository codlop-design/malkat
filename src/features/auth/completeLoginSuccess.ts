import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

import type { AuthUser } from "@/src/features/auth/types";

type LoginSuccessPayload = {
  success: boolean;
  message: string;
  user?: AuthUser | null;
};

type AuthLoginActions = {
  setUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<AuthUser | null>;
  endAuthTransition: () => void;
};

export async function completeLoginSuccess(
  auth: AuthLoginActions,
  router: AppRouterInstance,
  result: LoginSuccessPayload,
): Promise<boolean> {
  if (!result.success) {
    auth.endAuthTransition();
    return false;
  }

  if (result.user) {
    auth.setUser(result.user);
  } else {
    await auth.refreshUser();
  }

  toast.success(result.message);
  router.replace("/profile");
  auth.endAuthTransition();
  router.refresh();

  return true;
}
