"use client";

import PhoneInput from "@/src/components/PhoneInput";
import GoogleAuth from "@/src/components/GoogleAuth";
import { SubmitButton } from "@/src/components/SubmitButton";
import {
  phoneLoginSchema,
  type PhoneLoginFormValues,
} from "@/src/features/auth/schemas/phoneLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

type PhoneLoginProps = {
  onContinueWithEmail: () => void;
};

export default function PhoneLogin({ onContinueWithEmail }: PhoneLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneLoginFormValues>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      phone: "",
    },
  });

  async function onSubmit() {
    // TODO: wire up SMS / OTP API — أرفق +966 عند الطلب للباكند
  }

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <PhoneInput
          error={errors.phone?.message}
          disabled={isSubmitting}
          {...register("phone")}
        />

        <SubmitButton loading={isSubmitting}>متابعة</SubmitButton>
      </form>

      <GoogleAuth />

      <button
        type="button"
        disabled={isSubmitting}
        onClick={onContinueWithEmail}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary text-base font-medium text-[#000000] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Mail className="size-6" strokeWidth={1.75} aria-hidden />
        <span>متابعة باستخدام البريد الإلكتروني</span>
      </button>
    </>
  );
}
