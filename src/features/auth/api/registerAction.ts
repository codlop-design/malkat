"use server";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/src/features/auth/schemas/registerSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type RegisterActionResult = {
  success: boolean;
  message: string;
};

export async function registerAction(
  values: RegisterFormValues,
): Promise<RegisterActionResult> {
  const parsed = registerSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "يرجى التحقق من البيانات المدخلة",
    };
  }

  const data = parsed.data;
  const formData = new FormData();

  formData.append("name", data.firstName);
  formData.append("phone_code", "966");
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  formData.append("policies_accepted", data.acceptedTerms ? "1" : "0");
  formData.append("password", data.password);
  formData.append("password_confirmation", data.confirmPassword);

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });

    const json = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !json.success) {
      return {
        success: false,
        message: json.message ?? "تعذر إنشاء الحساب، حاول مرة أخرى",
      };
    }

    return {
      success: true,
      message: json.message ?? "تم إنشاء الحساب بنجاح",
    };
  } catch {
    return {
      success: false,
      message: "تعذر إنشاء الحساب، حاول مرة أخرى",
    };
  }
}
