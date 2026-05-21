import { z } from "zod";

export const forgotPasswordOtpSchema = z.object({
  code: z
    .string()
    .min(1, "رمز التحقق مطلوب")
    .regex(/^\d{6}$/, "يرجى إدخال رمز مكوّن من 6 أرقام"),
});

export type ForgotPasswordOtpValues = z.infer<typeof forgotPasswordOtpSchema>;
