import {
  ensureCsrfCookie,
  sanctumFetch,
} from "@/src/features/auth/lib/sanctumClient";
import type { LoginFormValues } from "@/src/features/auth/schemas/loginSchema";

export type AuthUser = {
  id: number;
  name: string;
  phone_code: string;
  phone: string;
  full_phone: string;
  email: string;
  is_active: boolean;
  policies_accepted: boolean;
};

export type LoginResult = {
  success: boolean;
  message: string;
  user?: AuthUser;
};

type LoginApiResponse = {
  success: boolean;
  message: string;
  data?: AuthUser;
};

async function login(payload: Record<string, string>): Promise<LoginResult> {
  console.log("[auth/login] start", payload);

  try {
    await ensureCsrfCookie();

    const response = await sanctumFetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as LoginApiResponse;
    console.log("[auth/login] response", data);

    if (!response.ok || !data.success) {
      console.warn("[auth/login] failed", response.status, data.message);
      return {
        success: false,
        message: data.message ?? "تعذر تسجيل الدخول، تحقق من البيانات",
      };
    }

    console.log("[auth/login] success", data.data);
    return {
      success: true,
      message: data.message ?? "تم تسجيل الدخول بنجاح",
      user: data.data,
    };
  } catch (error) {
    console.error("[auth/login] error", error);
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

