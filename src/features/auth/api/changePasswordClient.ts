import axios from "axios";

import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";

type ApiResponse = {
  success?: boolean;
  message?: string;
};

export type ChangePasswordResult = {
  success: boolean;
  message: string;
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

export async function changePassword(payload: {
  old_password: string;
  password: string;
  password_confirmation: string;
}): Promise<ChangePasswordResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.put<ApiResponse>(
      "/auth/change-password",
      payload,
    );

    if (status === 401 || status === 403) {
      return { success: false, message: "يرجى تسجيل الدخول أولاً" };
    }

    if (status >= 400 || data?.success === false) {
      return {
        success: false,
        message: data?.message ?? "تعذر تغيير كلمة المرور",
      };
    }

    return {
      success: true,
      message: data?.message ?? "تم تغيير كلمة المرور بنجاح",
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "تعذر تغيير كلمة المرور، حاول مرة أخرى"),
    };
  }
}

