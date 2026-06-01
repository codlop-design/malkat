import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
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
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<LoginApiResponse>(
      "/auth/login",
      payload,
    );

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر تسجيل الدخول، تحقق من البيانات",
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
