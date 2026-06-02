"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputField } from "@/src/components/InputField";
import { SubmitButton } from "@/src/components/SubmitButton";
import { changePassword } from "@/src/features/auth/api/changePasswordClient";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/src/features/auth/schemas/changePasswordSchema";

const defaultValues: ChangePasswordFormValues = {
  oldPassword: "",
  password: "",
  passwordConfirmation: "",
};

export default function ChangePasswordTab() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  });

  async function onSubmit(values: ChangePasswordFormValues) {
    const result = await changePassword({
      old_password: values.oldPassword,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    reset(defaultValues);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-black md:text-xl">
          تغيير كلمة المرور
        </h1>
        <p className="text-sm text-[#6B7280]">الرئيسية / الملف الشخصي</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <InputField
          label="كلمة المرور الحالية"
          type="password"
          placeholder="ادخل كلمة المرور"
          error={errors.oldPassword?.message}
          disabled={isSubmitting}
          {...register("oldPassword")}
        />

        <InputField
          label="كلمة المرور الجديدة"
          type="password"
          placeholder="ادخل كلمة المرور"
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register("password")}
        />

        <InputField
          label="تأكيد كلمة المرور الجديدة"
          type="password"
          placeholder="ادخل كلمة المرور"
          error={errors.passwordConfirmation?.message}
          disabled={isSubmitting}
          {...register("passwordConfirmation")}
        />

        <SubmitButton loading={isSubmitting}>حفظ كلمة المرور</SubmitButton>
      </form>
    </>
  );
}

