import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import {
  optionalPhoneSchema,
  phoneLoginSchema,
} from "@/src/features/auth/schemas/phoneLoginSchema";

export function createUpdateProfileSchema(hasPassword: boolean) {
  return z.object({
    name: z.string().min(1, "الاسم مطلوب"),
    email: loginSchema.shape.email,
    phone: hasPassword ? phoneLoginSchema.shape.phone : optionalPhoneSchema,
  });
}

export const updateProfileSchema = createUpdateProfileSchema(true);

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

