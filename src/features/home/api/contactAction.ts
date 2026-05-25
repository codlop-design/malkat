"use server";

import { contactSchema, type ContactFormValues } from "@/src/features/home/schemas/contactSchema";

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
  formData.append("message", parsed.data.message);

  try {
    const response = await fetch(`${API_URL}/contact-us`, {
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
        message: json.message ?? "تعذر إرسال الرسالة، حاول مرة أخرى",
      };
    }

    return {
      success: true,
      message: json.message ?? "تم إرسال رسالتك بنجاح",
    };
  } catch {
    return {
      success: false,
      message: "تعذر إرسال الرسالة، حاول مرة أخرى",
    };
  }
}
