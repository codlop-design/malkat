import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

export const contactSchema = z.object({
  purpose: z.enum(["inquiry", "suggestion"], {
    message: "يرجى اختيار غرض الرسالة",
  }),
  name: z.string().min(2, "الاسم مطلوب"),
  phone: phoneLoginSchema.shape.phone,
  email: loginSchema.shape.email,
  message: z
    .string()
    .min(10, "يرجى كتابة رسالة لا تقل عن 10 أحرف")
    .max(2000, "الرسالة طويلة جداً"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
