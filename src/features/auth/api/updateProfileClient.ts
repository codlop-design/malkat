import axios from "axios";

import { parseAuthUser } from "@/src/features/auth/parseUser";
import type { AuthUser } from "@/src/features/auth/types";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";

type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

export type UpdateProfileResult = {
  success: boolean;
  message: string;
  user?: AuthUser;
};

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }
  return fallback;
}

export async function updateProfile(payload: {
  name: string;
  phone_code: string;
  phone: string;
  email: string;
}): Promise<UpdateProfileResult> {
  try {
    await ensureCsrfCookie();

    // Backend expects query params (as per docs), so send as params.
    const { data, status } = await apiClient.put<ApiResponse>("/auth/profile", null, {
      params: payload,
      validateStatus: () => true,
    });

    if (status === 401 || status === 403) {
      return { success: false, message: "يرجى تسجيل الدخول أولاً" };
    }

    if (status >= 400 || data?.success === false) {
      return {
        success: false,
        message: data?.message ?? "تعذر حفظ البيانات",
      };
    }

    const user = parseAuthUser(data);

    return {
      success: true,
      message: data?.message ?? "تم حفظ البيانات",
      user: user ?? undefined,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "تعذر حفظ البيانات، حاول مرة أخرى"),
    };
  }
}

