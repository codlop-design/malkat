import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

const sharedFields = {
  phone: phoneLoginSchema.shape.phone,
  email: loginSchema.shape.email,
  message: z.string().max(2000, "الرسالة طويلة جداً").optional(),
};

export const interestEntitySchema = z.object({
  registrantType: z.literal("entity"),
  entityName: z.string().min(2, "اسم الجهة مطلوب"),
  entityType: z.string().min(1, "يرجى اختيار نوع الجهة"),
  partnershipType: z.string().min(1, "يرجى اختيار نوع الشراكة"),
  ...sharedFields,
});

export const interestIndividualSchema = z.object({
  registrantType: z.literal("individual"),
  name: z.string().min(2, "الاسم مطلوب"),
  ...sharedFields,
});

export const interestSchema = z.discriminatedUnion("registrantType", [
  interestEntitySchema,
  interestIndividualSchema,
]);

export type InterestFormValues = z.infer<typeof interestSchema>;
