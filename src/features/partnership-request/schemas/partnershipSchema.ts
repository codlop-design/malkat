import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

export const partnershipSchema = z
  .object({
    entityName: z.string().min(2, "اسم الجهة مطلوب"),
    contactName: z.string().min(2, "اسم المسؤول مطلوب"),
    jobTitle: z.string().min(2, "المسمى الوظيفي مطلوب"),
    phone: phoneLoginSchema.shape.phone,
    email: loginSchema.shape.email,
    confirmEmail: z.string().min(1, "تأكيد البريد الإلكتروني مطلوب"),
    entityType: z.string().min(1, "يرجى اختيار نوع الجهة"),
    partnershipType: z.string().min(1, "يرجى اختيار نوع الشراكة"),
    aboutEntity: z
      .string()
      .min(20, "يرجى كتابة نبذة لا تقل عن 20 حرفاً")
      .max(2000, "النبذة طويلة جداً"),
    partnershipDetails: z
      .string()
      .min(20, "يرجى كتابة تفاصيل لا تقل عن 20 حرفاً")
      .max(2000, "التفاصيل طويلة جداً"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "البريد الإلكتروني غير متطابق",
    path: ["confirmEmail"],
  });

export type PartnershipFormValues = z.infer<typeof partnershipSchema>;
