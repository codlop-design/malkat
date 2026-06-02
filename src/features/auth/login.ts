import type {
  AuthUser,
  LoginResult,
  SendOtpResult,
  VerifyOtpResult,
} from "@/src/features/auth/types";
import type { LoginFormValues } from "@/src/features/auth/schemas/loginSchema";

const PHONE_CODE = "966";

type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

async function login(payload: Record<string, string>): Promise<LoginResult> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as ApiResponse<AuthUser> | null;

    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message ?? "تعذر تسجيل الدخول، تحقق من البيانات",
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
      message: "تعذر تسجيل الدخول، حاول مرة أخرى",
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

export async function sendOtp(phone: string): Promise<SendOtpResult> {
  try {
    const res = await fetch("/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_code: PHONE_CODE, phone }),
    });
    const data = (await res
      .json()
      .catch(() => null)) as ApiResponse<{ verification_token?: string }> | null;

    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message ?? "تعذر إرسال رمز التحقق",
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
  } catch {
    return { success: false, message: "تعذر إرسال رمز التحقق، حاول مرة أخرى" };
  }
}

export async function verifyOtp(
  phone: string,
  verificationToken: string,
  otp: string,
): Promise<VerifyOtpResult> {
  try {
    const res = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_code: PHONE_CODE,
        phone,
        verification_token: verificationToken,
        otp,
      }),
    });
    const data = (await res.json().catch(() => null)) as ApiResponse<AuthUser> | null;

    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message ?? "رمز التحقق غير صحيح",
      };
    }

    return {
      success: true,
      message: data.message ?? "تم تسجيل الدخول بنجاح",
      user: data.data,
    };
  } catch {
    return { success: false, message: "تعذر التحقق من الرمز، حاول مرة أخرى" };
  }
}
