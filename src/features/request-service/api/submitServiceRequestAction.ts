"use server";

import {
  serviceRequestSchema,
  type ServiceRequestFormValues,
} from "@/src/features/services/schemas/serviceRequestSchema";
import { postFormToApi } from "@/src/lib/postFormToApi";

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

  return postFormToApi(
    `${API_URL}/service-requests`,
    {
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
    },
    {
      successMessage: "تم إرسال طلبك بنجاح",
      fallbackErrorMessage: "تعذر إرسال الطلب، حاول مرة أخرى",
    },
  );
}
