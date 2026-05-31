"use server";

import {
  serviceRequestSchema,
  type ServiceRequestFormValues,
} from "@/src/features/services/schemas/serviceRequestSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ServiceRequestActionResult = {
  success: boolean;
  message: string;
};

export async function submitServiceRequestAction(
  values: ServiceRequestFormValues,
): Promise<ServiceRequestActionResult> {
  const parsed = serviceRequestSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "يرجى التحقق من البيانات المدخلة",
    };
  }

  const data = parsed.data;

  try {
    const response = await fetch(`${API_URL}/service-requests`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "ar",
      },
      body: JSON.stringify({
        name: data.name,
        phone_code: "966",
        phone: data.phone,
        email: data.email,
        service_type_id: Number(data.serviceType),
        target_group_id: Number(data.targetGroup),
        request_details: data.details,
      }),
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
