import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

export const serviceRequestSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: phoneLoginSchema.shape.phone,
  email: loginSchema.shape.email,
  serviceType: z.string().min(1, "يرجى اختيار نوع الخدمة"),
  targetGroup: z.string().min(1, "يرجى اختيار الفئة المستهدفة"),
  details: z
    .string()
    .min(10, "يرجى كتابة تفاصيل لا تقل عن 10 أحرف")
    .max(2000, "التفاصيل طويلة جداً"),
});

export type ServiceRequestFormValues = z.infer<typeof serviceRequestSchema>;
