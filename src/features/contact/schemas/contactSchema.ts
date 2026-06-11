import { z } from "zod";

import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

export const contactSchema = z.object({
  full_name: z.string().trim().min(3, "يرجى إدخال الاسم الكامل"),
  email: z.string().trim().email("يرجى إدخال بريد إلكتروني صحيح"),
  phone: phoneLoginSchema.shape.phone,
  contact_type: z.string().min(1, "يرجى اختيار نوع التواصل"),
  organization_type_id: z.string().min(1, "يرجى اختيار نوع الجهة"),
  message: z
    .string("يرجى كتابة رسالتك")
    .trim()
    .min(50, " يرجى كتابة ما لا يقل عن 50 حرف"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
