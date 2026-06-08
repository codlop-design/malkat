import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

export const partnershipSchema = z
  .object({
    entityName: z.string().trim().min(3, "يجب أن يكون الاسم أكثر من 3 أحرف"),
    contactName: z.string().trim().min(3, "يجب أن يكون الاسم أكثر من 3 أحرف"),
    jobTitle: z.string().trim().min(3, "يجب أن يكون الاسم أكثر من 3 أحرف"),
    phone: phoneLoginSchema.shape.phone,
    email: loginSchema.shape.email,
    confirmEmail: z.string().trim().min(1, "تأكيد البريد الإلكتروني مطلوب"),
    entityType: z.string().trim().min(1, "يرجى اختيار نوع الجهة"),
    partnershipType: z.string().trim().min(1, "يرجى اختيار نوع الشراكة"),
    aboutEntity: z
      .string()
      .trim()
      .min(20, "يجب أن يكون النبذة أكثر من 20 حرف")
      .max(2000, "يجب أن يكون النبذة أقل من 2000 حرف"),
    partnershipDetails: z
      .string()
      .trim()
      .min(20, "يجب أن يكون التفاصيل أكثر من 20 حرف")
        .max(2000, "يجب أن يكون التفاصيل أقل من 2000 حرف"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "يجب أن يكون البريد الإلكتروني متطابق",
    path: ["confirmEmail"],
  });

export type PartnershipFormValues = z.infer<typeof partnershipSchema>;
