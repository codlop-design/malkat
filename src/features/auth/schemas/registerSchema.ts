import { z } from "zod";

import { loginSchema } from "./loginSchema";
import { phoneLoginSchema } from "./phoneLoginSchema";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "الاسم مطلوب"),
    email: loginSchema.shape.email,
    phone: phoneLoginSchema.shape.phone,
    password: z.string().min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
    acceptedTerms: z.boolean().refine((v) => v === true, {
      message: "يجب الموافقة على الشروط والأحكام",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
