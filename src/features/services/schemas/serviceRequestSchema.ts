import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

export const serviceRequestSchema = z.object({
  name: z.string().min(3, "يجب أن يكون الاسم أكثر من 3 أحرف"),
  phone: phoneLoginSchema.shape.phone,
  email: loginSchema.shape.email,
  serviceType: z.string().min(1, "يرجى اختيار نوع الخدمة"),
  targetGroup: z.string().min(1, "يرجى اختيار الفئة المستهدفة"),
  details: z
    .string()
    .trim()
    .min(10, "يجب أن يكون التفاصيل أكثر من 10 أحرف")
    .max(2000, "يجب أن يكون التفاصيل أقل من 2000 حرف"),
});

export type ServiceRequestFormValues = z.infer<typeof serviceRequestSchema>;
