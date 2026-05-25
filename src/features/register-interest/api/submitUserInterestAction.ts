"use server";

import {
  interestSchema,
  type InterestFormValues,
} from "@/src/features/register-interest/schemas/interestSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type UserInterestActionResult = {
  success: boolean;
  message: string;
};

export async function submitUserInterestAction(
  values: InterestFormValues,
): Promise<UserInterestActionResult> {
  const parsed = interestSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "يرجى التحقق من البيانات المدخلة",
    };
  }

  const formData = new FormData();
  const data = parsed.data;

  formData.append("interested_applicant_types", data.interested_applicant_types);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone_code", "966");
  formData.append("phone", data.phone);
  formData.append("message", data.message);

  if (data.interested_applicant_types === "organization") {
    formData.append("orgnization_type_id", data.orgnization_type_id);
    formData.append("parternes_type_id", data.parternes_type_id);
  }

  try {
    const response = await fetch(`${API_URL}/user-interests`, {
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
        message: json.message ?? "تعذر إرسال الطلب، حاول مرة أخرى",
      };
    }

    return {
      success: true,
      message: json.message ?? "تم إرسال طلبك بنجاح",
    };
  } catch {
    return {
      success: false,
      message: "تعذر إرسال الطلب، حاول مرة أخرى",
    };
  }
}
