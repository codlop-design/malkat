"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputField } from "@/src/components/InputField";
import { SubmitButton } from "@/src/components/SubmitButton";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/src/features/auth/schemas/resetPasswordSchema";

type ResetPasswordFormProps = {
  token?: string;
};

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("تم تغيير كلمة المرور بنجاح");
    router.push("/login");
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center" dir="rtl">
        <p className="text-base text-[#454545]">
          رابط إعادة التعيين غير صالح أو منتهي الصلاحية.
        </p>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-primary hover:underline"
        >
          طلب رابط جديد
        </Link>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      dir="rtl"
    >
      <InputField
        label="كلمة المرور الجديدة"
        type="password"
        placeholder="ادخل كلمة المرور"
        error={errors.password?.message}
        disabled={isSubmitting}
        {...register("password")}
      />
      <InputField
        label="تأكيد كلمة المرور"
        type="password"
        placeholder="أعد إدخال كلمة المرور"
        error={errors.confirmPassword?.message}
        disabled={isSubmitting}
        {...register("confirmPassword")}
      />
      <SubmitButton loading={isSubmitting}>حفظ كلمة المرور</SubmitButton>
    </form>
  );
}
