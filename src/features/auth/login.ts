import type {
  AuthUser,
  LoginResult,
  SendOtpResult,
  VerifyOtpResult,
} from "@/src/features/auth/types";
import type { LoginFormValues } from "@/src/features/auth/schemas/loginSchema";
import {
  getAuthErrorMessage,
  resolveAuthFailureMessage,
} from "@/src/features/auth/utils/authErrors";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";

const PHONE_CODE = "966";

type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

async function login(payload: Record<string, string>): Promise<LoginResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<ApiResponse<AuthUser>>(
      "/auth/login",
      payload,
    );

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: resolveAuthFailureMessage(
          data.message,
          "تعذر تسجيل الدخول، تحقق من البيانات",
        ),
      };
    }

    return {
      success: true,
      message: data.message ?? "تم تسجيل الدخول بنجاح",
      user: data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: getAuthErrorMessage(error, "تعذر تسجيل الدخول، حاول مرة أخرى"),
    };
  }
}

export function loginWithEmail(values: LoginFormValues): Promise<LoginResult> {
  return login({
    type: "email",
    email: values.email,
    password: values.password,
  });
}

export function loginWithGoogle(googleToken: string): Promise<LoginResult> {
  return login({
    type: "google",
    google_token: googleToken,
  });
}

export async function sendOtp(phone: string): Promise<SendOtpResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<
      ApiResponse<{ verification_token?: string }>
    >("/auth/otp/send", { phone_code: PHONE_CODE, phone });

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: resolveAuthFailureMessage(
          data.message,
          "تعذر إرسال رمز التحقق",
        ),
      };
    }

    const verificationToken = data.data?.verification_token;
    if (!verificationToken) {
      return { success: false, message: "تعذر إرسال رمز التحقق" };
    }

    return {
      success: true,
      message: data.message ?? "تم إرسال رمز التحقق",
      verificationToken,
    };
  } catch (error) {
    return {
      success: false,
      message: getAuthErrorMessage(error, "تعذر إرسال رمز التحقق، حاول مرة أخرى"),
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
        message: resolveAuthFailureMessage(
          data.message,
          "رمز التحقق غير صحيح",
        ),
      };
    }

    return {
      success: true,
      message: data.message ?? "تم تسجيل الدخول بنجاح",
      user: data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: getAuthErrorMessage(error, "تعذر التحقق من الرمز، حاول مرة أخرى"),
    };
  }
}
