import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

const sharedFields = {
  name: z.string().trim().min(2, "الاسم مطلوب"),
  phone: phoneLoginSchema.shape.phone,
  email: loginSchema.shape.email,
  message: z
    .string()
    .trim()
    .min(1, "يرجى كتابة رسالتك")
    .max(2000, "الرسالة طويلة جداً"),
};

export const interestOrganizationSchema = z.object({
  interested_applicant_types: z.literal("organization"),
  orgnization_type_id: z.string().min(1, "يرجى اختيار نوع الجهة"),
  parternes_type_id: z.string().min(1, "يرجى اختيار نوع الشراكة"),
  ...sharedFields,
});

export const interestIndividualSchema = z.object({
  interested_applicant_types: z.literal("individual"),
  ...sharedFields,
});

export const interestSchema = z.discriminatedUnion("interested_applicant_types", [
  interestOrganizationSchema,
  interestIndividualSchema,
]);

export type InterestFormValues = z.infer<typeof interestSchema>;
