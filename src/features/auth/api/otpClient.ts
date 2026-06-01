import type { AuthUser } from "@/src/features/auth/api/loginClient";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";

const PHONE_CODE = "966";

type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export type SendOtpResult = {
  success: boolean;
  message: string;
  verificationToken?: string;
};

export type VerifyOtpResult = {
  success: boolean;
  message: string;
  user?: AuthUser;
};

type SendOtpData = {
  verification_token?: string;
};

export async function sendOtp(phone: string): Promise<SendOtpResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<ApiResponse<SendOtpData>>(
      "/auth/otp/send",
      { phone_code: PHONE_CODE, phone },
    );

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر إرسال رمز التحقق",
      };
    }

    const verificationToken = data.data?.verification_token;

    if (!verificationToken) {
      return {
        success: false,
        message: "تعذر إرسال رمز التحقق",
      };
    }

    return {
      success: true,
      message: data.message ?? "تم إرسال رمز التحقق",
      verificationToken,
    };
  } catch {
    return {
      success: false,
      message: "تعذر إرسال رمز التحقق، حاول مرة أخرى",
    };
  }
}

export async function verifyOtp(
  phone: string,
  verificationToken: string,
  otp: string,
): Promise<VerifyOtpResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<ApiResponse<AuthUser>>(
      "/auth/otp/verify",
      {
        phone_code: PHONE_CODE,
        phone,
        verification_token: verificationToken,
        otp,
      },
    );

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "رمز التحقق غير صحيح",
      };
    }

    return {
      success: true,
      message: data.message ?? "تم تسجيل الدخول بنجاح",
      user: data.data,
    };
  } catch {
    return {
      success: false,
      message: "تعذر التحقق من الرمز، حاول مرة أخرى",
    };
  }
}
