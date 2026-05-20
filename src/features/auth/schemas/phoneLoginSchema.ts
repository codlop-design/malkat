import { z } from "zod";

/** يحوّل إلى 9 أرقام وطنية تبدأ بـ 5 (بدون 966). يقبل لصقاً بصيغة +9665... أو 05... */
function normalizeSaudiMobile(raw: string): string {
  let s = raw.replace(/\s/g, "");
  if (/^\+?966/.test(s)) {
    s = s.replace(/^\+?966/, "");
  }
  s = s.replace(/^0/, "");
  return s;
}

export const phoneLoginSchema = z.object({
  phone: z
    .string()
    .min(1, "رقم الجوال مطلوب")
    .transform(normalizeSaudiMobile)
    .refine(
      (digits) => /^5\d{8}$/.test(digits),
      "يرجى إدخال رقم جوال سعودي صحيح (9 أرقام يبدأ بـ 5)",
    ),
});

export type PhoneLoginFormValues = z.infer<typeof phoneLoginSchema>;
