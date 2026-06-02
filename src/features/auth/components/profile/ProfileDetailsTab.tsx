"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputField } from "@/src/components/InputField";
import PhoneInput from "@/src/components/PhoneInput";
import type { AuthUser } from "@/src/features/auth/types";
import { SubmitButton } from "@/src/components/SubmitButton";
import { updateProfile } from "@/src/features/auth/api/updateProfileClient";
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "@/src/features/auth/schemas/updateProfileSchema";

type ProfileDetailsTabProps = {
  user: AuthUser;
  onUserUpdated?: (user: AuthUser) => void;
};

export default function ProfileDetailsTab({
  user,
  onUserUpdated,
}: ProfileDetailsTabProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
  });

  useEffect(() => {
    reset({ name: user.name, phone: user.phone, email: user.email });
  }, [user.name, user.phone, user.email, reset]);

  async function onSubmit(values: UpdateProfileFormValues) {
    const result = await updateProfile({
      name: values.name,
      phone_code: user.phone_code || "966",
      phone: values.phone,
      email: values.email,
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    // If backend returned updated user, prefer it; otherwise fall back to optimistic merge.
    const nextUser =
      result.user ??
      ({
        ...user,
        name: values.name,
        phone: values.phone,
        email: values.email,
        full_phone: `+${user.phone_code || "966"}${values.phone}`,
      } satisfies AuthUser);

    onUserUpdated?.(nextUser);
    reset({ name: nextUser.name, phone: nextUser.phone, email: nextUser.email });
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-black md:text-xl">
          المعلومات الشخصية
        </h1>
        <p className="text-sm text-[#6B7280]">الرئيسية / الملف الشخصي</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <div className="grid gap-5 md:grid-cols-2">
          <InputField
            label="الاسم الكامل"
            placeholder="ادخل الاسم"
            error={errors.name?.message}
            disabled={isSubmitting}
            {...register("name")}
          />
          <PhoneInput
            label="رقم الجوال"
            placeholder="ادخل رقم الجوال"
            error={errors.phone?.message}
            disabled={isSubmitting}
            {...register("phone")}
          />
        </div>

        <InputField
          label="البريد الإلكتروني"
          type="email"
          placeholder="ادخل البريد الإلكتروني"
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register("email")}
        />

        <SubmitButton loading={isSubmitting} disabled={!isDirty}>
          حفظ البيانات
        </SubmitButton>
      </form>
    </>
  );
}

