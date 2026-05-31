import {
  ensureCsrfCookie,
  sanctumFetch,
} from "@/src/features/auth/lib/sanctumClient";
import type { AuthUser } from "@/src/features/auth/api/loginClient";

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
  const payload = { phone_code: PHONE_CODE, phone };
  console.log("[auth/otp] send", payload);

  try {
    await ensureCsrfCookie();

    const response = await sanctumFetch("/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as ApiResponse<SendOtpData>;
    console.log("[auth/otp] send response", data);

    if (!response.ok || !data.success) {
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
  } catch (error) {
    console.error("[auth/otp] send error", error);
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
  const payload = {
    phone_code: PHONE_CODE,
    phone,
    verification_token: verificationToken,
    otp,
  };

  console.log("[auth/otp] verify", {
    phone_code: PHONE_CODE,
    phone,
    verification_token: verificationToken,
    otp,
  });

  try {
    await ensureCsrfCookie();

    const response = await sanctumFetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as ApiResponse<AuthUser>;
    console.log("[auth/otp] verify response", data);

    if (!response.ok || !data.success) {
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
  } catch (error) {
    console.error("[auth/otp] verify error", error);
    return {
      success: false,
      message: "تعذر التحقق من الرمز، حاول مرة أخرى",
    };
  }
}
