"use client";

import GoogleAuth from "@/src/components/ui/GoogleAuth";
import { InputField } from "@/src/components/ui/InputField";
import { SubmitButton } from "@/src/components/ui/SubmitButton";
import {
  loginSchema,
  type LoginFormValues,
} from "@/src/features/auth/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

type EmailLoginProps = {
  onContinueWithPhone: () => void;
};

export default function EmailLogin({ onContinueWithPhone }: EmailLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit() {
    // TODO: wire up auth API
  }

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputField
          label="البريد الإلكتروني"
          type="email"
          placeholder="ادخل البريد الإلكترونى"
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register("email")}
        />

        <InputField
          label="كلمة المرور"
          type="password"
          placeholder="ادخل كلمة المرور"
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register("password")}
        />

        <Link
          href="/forgot-password"
          className="w-full text-end text-sm text-[#454545] hover:underline"
        >
          هل نسيت كلمة المرور؟
        </Link>

        <SubmitButton loading={isSubmitting}>تسجيل الدخول</SubmitButton>
      </form>

      <GoogleAuth />

      <button
        type="button"
        disabled={isSubmitting}
        onClick={onContinueWithPhone}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-(--primary) text-base font-medium text-[#000000] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Image
          src="/calling.svg"
          alt=""
          width={24}
          height={24}
        />
        <span>متابعة باستخدام رقم الجوال</span>
      </button>
    </>
  );
}
