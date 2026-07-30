"use server";

import {
  contactSchema,
  type ContactFormValues,
} from "@/src/features/contact/schemas/contactSchema";
import { postFormToApi } from "@/src/lib/postFormToApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ContactActionResult = {
  success: boolean;
  message: string;
};

export async function submitContactAction(
  values: ContactFormValues,
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "يرجى التحقق من البيانات المدخلة",
    };
  }

  const formData = new FormData();
  formData.append("full_name", parsed.data.full_name);
  formData.append("email", parsed.data.email);
  formData.append("phone_code", "966");
  formData.append("phone", parsed.data.phone);
  formData.append("contact_type", parsed.data.contact_type);
  formData.append("organization_type_id", parsed.data.organization_type_id);
  formData.append("message", parsed.data.message);

  return postFormToApi(
    `${API_URL}/contact-us`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
      },
      body: formData,
    },
    {
      successMessage: "تم إرسال رسالتك بنجاح",
      fallbackErrorMessage: "تعذر إرسال الرسالة، حاول مرة أخرى",
    },
  );
}
