"use client";

import GoogleAuth from "@/src/components/ui/GoogleAuth";
import PhoneInput from "@/src/components/ui/PhoneInput";
import Link from "next/link";
import { InputField } from "@/src/components/ui/InputField";
import { SubmitButton } from "@/src/components/ui/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/src/features/auth/schemas/registerSchema";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
  });

  async function onSubmit() {
    // TODO: wire up registration API (+966 قبل رقم الهاتف عند الطلب)
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <InputField
        label="الاسم"
        type="text"
        placeholder="ادخل الاسم"
        error={errors.firstName?.message}
        disabled={isSubmitting}
        {...register("firstName")}
      />

      <PhoneInput
        error={errors.phone?.message}
        disabled={isSubmitting}
        {...register("phone")}
      />

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

      <InputField
        label="تأكيد كلمة المرور"
        type="password"
        placeholder="أعد إدخال كلمة المرور"
        error={errors.confirmPassword?.message}
        disabled={isSubmitting}
        {...register("confirmPassword")}
      />

      <div>
        <div className="flex items-start gap-2.5" dir="rtl">
          <input
            id="register-terms"
            type="checkbox"
            disabled={isSubmitting}
            className="mt-0.5 size-[18px] shrink-0 cursor-pointer rounded border border-[#CFCFCF] bg-white text-(--primary) accent-(--primary) focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            {...register("acceptedTerms")}
          />
          <p className="text-sm leading-relaxed text-black">
            <label
              htmlFor="register-terms"
              className="cursor-pointer select-none"
            >
              بالتسجيل، فإنك توافق على{" "}
            </label>
            <Link
              href="/terms"
              className="text-black underline underline-offset-2 hover:opacity-80"
            >
              الشروط والأحكام
            </Link>
          </p>
        </div>
        {errors.acceptedTerms?.message ? (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.acceptedTerms.message}
          </p>
        ) : null}
      </div>

      <SubmitButton loading={isSubmitting}>انشاء حساب</SubmitButton>
      <GoogleAuth />

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-[#454545]">لديك حساب؟</span>
        <Link href="/login" className="text-sm text-[#454545] hover:underline">
          تسجيل الدخول
        </Link>
      </div>
    </form>
  );
}
