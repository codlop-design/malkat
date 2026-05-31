import { z } from "zod";

export const phoneOtpSchema = z.object({
  otp: z
    .string()
    .min(1, "رمز التحقق مطلوب")
    .regex(/^\d{4,6}$/, "يرجى إدخال رمز التحقق الصحيح"),
});

export type PhoneOtpValues = z.infer<typeof phoneOtpSchema>;
