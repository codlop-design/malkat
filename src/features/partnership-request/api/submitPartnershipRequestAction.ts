"use server";

import {
  partnershipSchema,
  type PartnershipFormValues,
} from "@/src/features/partnership-request/schemas/partnershipSchema";
import { postFormToApi } from "@/src/lib/postFormToApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type PartnershipRequestActionResult = {
  success: boolean;
  message: string;
};

export async function submitPartnershipRequestAction(
  values: PartnershipFormValues,
): Promise<PartnershipRequestActionResult> {
  const parsed = partnershipSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "يرجى التحقق من البيانات المدخلة",
    };
  }

  const data = parsed.data;
  const formData = new FormData();

  formData.append("organization_name", data.entityName);
  formData.append("responsible_name", data.contactName);
  formData.append("job_title", data.jobTitle);
  formData.append("phone_code", "966");
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  formData.append("organization_type_id", data.entityType);
  formData.append("parternes_type_id", data.partnershipType);
  formData.append("organization_about", data.aboutEntity);
  formData.append("partnership_details", data.partnershipDetails);

  return postFormToApi(
    `${API_URL}/partnership-requests`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
      },
      body: formData,
    },
    {
      successMessage: "تم إرسال طلب الشراكة بنجاح",
      fallbackErrorMessage: "تعذر إرسال الطلب، حاول مرة أخرى",
    },
  );
}
