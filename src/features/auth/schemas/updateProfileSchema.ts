import { z } from "zod";

import { loginSchema } from "@/src/features/auth/schemas/loginSchema";
import { phoneLoginSchema } from "@/src/features/auth/schemas/phoneLoginSchema";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  email: loginSchema.shape.email,
  phone: phoneLoginSchema.shape.phone,
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

