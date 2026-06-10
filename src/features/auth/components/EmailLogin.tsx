"use client";

import { InputField } from "@/src/components/InputField";
import { SubmitButton } from "@/src/components/SubmitButton";
import { completeLoginSuccess } from "@/src/features/auth/completeLoginSuccess";
import { loginWithEmail } from "@/src/features/auth/login";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import {
  loginSchema,
  type LoginFormValues,
} from "@/src/features/auth/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import GoogleAuth from "@/src/components/GoogleAuth";
import AuthFormAlert from "@/src/features/auth/components/AuthFormAlert";

type EmailLoginProps = {
  onContinueWithPhone: () => void;
};

export default function EmailLogin({ onContinueWithPhone }: EmailLoginProps) {
  const router = useRouter();
  const auth = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

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

  async function onSubmit(values: LoginFormValues) {
    setFormError(null);
    auth.beginAuthTransition();
    const result = await loginWithEmail(values);

    if (!(await completeLoginSuccess(auth, router, result))) {
      setFormError(result.message);
      toast.error(result.message);
      return;
    }
  }

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <AuthFormAlert message={formError} />

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
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary text-base font-medium text-[#000000] disabled:cursor-not-allowed disabled:opacity-70"
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
