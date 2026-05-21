import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

export const forgotPasswordEmailSchema = z.object({
  email: loginSchema.shape.email,
});

export const forgotPasswordPhoneSchema = z.object({
  phone: phoneLoginSchema.shape.phone,
});

export type ForgotPasswordEmailValues = z.infer<typeof forgotPasswordEmailSchema>;
export type ForgotPasswordPhoneValues = z.infer<typeof forgotPasswordPhoneSchema>;
