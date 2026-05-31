"use client";

import { useState } from "react";
import PhoneInput from "@/src/components/PhoneInput";
import GoogleAuth from "@/src/components/GoogleAuth";
import { InputField } from "@/src/components/InputField";
import { SubmitButton } from "@/src/components/SubmitButton";
import { sendOtp, verifyOtp } from "@/src/features/auth/api/otpClient";
import {
  phoneOtpSchema,
  type PhoneOtpValues,
} from "@/src/features/auth/schemas/phoneOtpSchema";
import {
  phoneLoginSchema,
  type PhoneLoginFormValues,
} from "@/src/features/auth/schemas/phoneLoginSchema";
import {
  formatPhoneDisplay,
  maskPhone,
} from "@/src/features/auth/utils/maskContact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type PhoneLoginProps = {
  onContinueWithEmail: () => void;
};

type Step = "phone" | "otp";

export default function PhoneLogin({ onContinueWithEmail }: PhoneLoginProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const phoneForm = useForm<PhoneLoginFormValues>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<PhoneOtpValues>({
    resolver: zodResolver(phoneOtpSchema),
    defaultValues: { otp: "" },
  });

  function startResendCooldown() {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((seconds) => {
        if (seconds <= 1) {
          clearInterval(interval);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
  }

  async function onSendOtp(values: PhoneLoginFormValues) {
    const result = await sendOtp(values.phone);

    if (!result.success || !result.verificationToken) {
      toast.error(result.message);
      return;
    }

    setPhone(values.phone);
    setVerificationToken(result.verificationToken);
    setStep("otp");
    otpForm.reset({ otp: "" });
    startResendCooldown();
    toast.success(result.message);
  }

  async function onVerifyOtp(values: PhoneOtpValues) {
    const result = await verifyOtp(phone, verificationToken, values.otp);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/");
  }

  async function onResendOtp() {
    const result = await sendOtp(phone);

    if (!result.success || !result.verificationToken) {
      toast.error(result.message);
      return;
    }

    setVerificationToken(result.verificationToken);
    startResendCooldown();
    toast.success(result.message);
  }

  function onBack() {
    setStep("phone");
    otpForm.reset({ otp: "" });
  }

  const isSubmitting =
    phoneForm.formState.isSubmitting || otpForm.formState.isSubmitting;

  return (
    <>
      {step === "phone" ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={phoneForm.handleSubmit(onSendOtp)}
          noValidate
        >
          <PhoneInput
            error={phoneForm.formState.errors.phone?.message}
            disabled={isSubmitting}
            {...phoneForm.register("phone")}
          />

          <SubmitButton loading={phoneForm.formState.isSubmitting}>
            متابعة
          </SubmitButton>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="self-start text-sm text-[#454545] hover:text-primary hover:underline disabled:opacity-60"
          >
            رجوع
          </button>

          <p className="text-center text-sm text-[#454545]">
            أدخل الرمز المرسل إلى{" "}
            <span dir="ltr" className="font-medium text-black">
              {formatPhoneDisplay(maskPhone(phone))}
            </span>
          </p>

          <form
            className="flex flex-col gap-4"
            onSubmit={otpForm.handleSubmit(onVerifyOtp)}
            noValidate
          >
            <InputField
              label="رمز التحقق"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="0000"
              error={otpForm.formState.errors.otp?.message}
              disabled={isSubmitting}
              dir="ltr"
              style={{ textAlign: "center", letterSpacing: "0.4em" }}
              {...otpForm.register("otp")}
            />

            <SubmitButton loading={otpForm.formState.isSubmitting}>
              تحقق وتسجيل الدخول
            </SubmitButton>
          </form>

          <button
            type="button"
            disabled={resendCooldown > 0 || isSubmitting}
            onClick={onResendOtp}
            className="text-sm text-primary hover:underline disabled:cursor-not-allowed disabled:text-[#9CA3AF] disabled:no-underline"
          >
            {resendCooldown > 0
              ? `إعادة الإرسال خلال ${resendCooldown} ث`
              : "إعادة إرسال الرمز"}
          </button>
        </div>
      )}

      {step === "phone" ? <GoogleAuth /> : null}

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
