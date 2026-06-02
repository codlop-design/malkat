import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    password: z.string().min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف"),
    passwordConfirmation: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["passwordConfirmation"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

