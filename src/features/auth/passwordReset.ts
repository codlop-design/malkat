import type {
  PasswordResetResetResult,
  PasswordResetSendResult,
  PasswordResetVerifyResult,
} from "@/src/features/auth/types";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import axios from "axios";

const PHONE_CODE = "+966";

type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
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

export async function sendPasswordResetEmail(
  email: string,
): Promise<PasswordResetSendResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<
      ApiResponse<{ verification_token?: string }>
    >("/auth/password-reset/send", {
      channel: "email",
      email,
    });

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر إرسال رمز التحقق",
      };
    }

    const verificationToken = data.data?.verification_token;
    if (!verificationToken) {
      return { success: false, message: "تعذر إرسال رمز التحقق" };
    }

    return {
      success: true,
      message: data.message ?? "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
      verificationToken,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "تعذر إرسال رمز التحقق، حاول مرة أخرى"),
    };
  }
}

export async function sendPasswordResetPhone(
  phone: string,
): Promise<PasswordResetSendResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<
      ApiResponse<{ verification_token?: string }>
    >("/auth/password-reset/send", {
      channel: "phone",
      phone_code: PHONE_CODE,
      phone,
    });

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر إرسال رمز التحقق",
      };
    }

    const verificationToken = data.data?.verification_token;
    if (!verificationToken) {
      return { success: false, message: "تعذر إرسال رمز التحقق" };
    }

    return {
      success: true,
      message: data.message ?? "تم إرسال رمز التحقق إلى جوالك",
      verificationToken,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "تعذر إرسال رمز التحقق، حاول مرة أخرى"),
    };
  }
}

export async function verifyPasswordResetOtp(
  verificationToken: string,
  otp: string,
): Promise<PasswordResetVerifyResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<
      ApiResponse<{ reset_token?: string }>
    >("/auth/password-reset/verify", {
      verification_token: verificationToken,
      otp,
    });

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "رمز التحقق غير صحيح",
      };
    }

    const resetToken = data.data?.reset_token;
    if (!resetToken) {
      return { success: false, message: "تعذر التحقق من الرمز" };
    }

    return {
      success: true,
      message: data.message ?? "تم التحقق من الرمز بنجاح",
      resetToken,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "تعذر التحقق من الرمز، حاول مرة أخرى"),
    };
  }
}

export async function resetPasswordWithToken(
  resetToken: string,
  password: string,
  passwordConfirmation: string,
): Promise<PasswordResetResetResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<ApiResponse>(
      "/auth/password-reset/reset",
      {
        reset_token: resetToken,
        password,
        password_confirmation: passwordConfirmation,
      },
    );

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر تغيير كلمة المرور",
      };
    }

    return {
      success: true,
      message: data.message ?? "تم تغيير كلمة المرور بنجاح",
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "تعذر تغيير كلمة المرور، حاول مرة أخرى"),
    };
  }
}
