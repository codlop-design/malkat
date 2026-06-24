"use server";

import {
  interestSchema,
  type InterestFormValues,
} from "@/src/features/register-interest/schemas/interestSchema";
import { postFormToApi } from "@/src/lib/postFormToApi";

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
    formData.append("organization_type_id", data.organization_type_id);
    formData.append("parternes_type_id", data.parternes_type_id);
  }

  return postFormToApi(`${API_URL}/user-interests`, { method: "POST", body: formData }, {
    successMessage: "تم إرسال طلبك بنجاح",
    fallbackErrorMessage: "تعذر إرسال الطلب، حاول مرة أخرى",
  });
}
