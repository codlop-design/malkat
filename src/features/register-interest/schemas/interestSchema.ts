import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

const sharedFields = {
  name: z.string().trim().min(2, "يجب أن يكون الاسم حرفين فأكثر"),
  phone: phoneLoginSchema.shape.phone,
  email: loginSchema.shape.email,
  message: z
    .string()
    .trim()
    .min(10, "يجب أن تكون الرسالة أكثر من 10 أحرف")
    .max(2000, "يجب أن تكون الرسالة أقل من 2000 حرف"),
};

export const interestOrganizationSchema = z.object({
  interested_applicant_types: z.literal("organization"),
  organization_type_id: z.string().min(1, "يرجى اختيار نوع الجهة"),
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
