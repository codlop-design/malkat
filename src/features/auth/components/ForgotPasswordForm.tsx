"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputField } from "@/src/components/InputField";
import PhoneInput from "@/src/components/PhoneInput";
import { SubmitButton } from "@/src/components/SubmitButton";
import {
  forgotPasswordEmailSchema,
  forgotPasswordPhoneSchema,
  type ForgotPasswordEmailValues,
  type ForgotPasswordPhoneValues,
} from "@/src/features/auth/schemas/forgotPasswordSchema";
import {
  forgotPasswordOtpSchema,
  type ForgotPasswordOtpValues,
} from "@/src/features/auth/schemas/forgotPasswordOtpSchema";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/src/features/auth/schemas/resetPasswordSchema";
import {
  formatPhoneDisplay,
  maskEmail,
  maskPhone,
} from "@/src/features/auth/utils/maskContact";

type RecoveryMethod = "email" | "phone";
type Step = "method" | "contact" | "verify" | "reset" | "done";

const STEP_COPY: Record<
  Step,
  { title: string; subtitle: string }
> = {
  method: {
    title: "نسيت كلمة المرور؟",
    subtitle: "اختر طريقة استلام رمز التحقق أو رابط إعادة التعيين.",
  },
  contact: {
    title: "أدخل بيانات التواصل",
    subtitle: "سنرسل لك رمز التحقق لإكمال عملية استعادة كلمة المرور.",
  },
  verify: {
    title: "التحقق من الرمز",
    subtitle: "أدخل الرمز المرسل إليك، أو استخدم الرابط في بريدك إن اخترت البريد.",
  },
  reset: {
    title: "إعادة تعيين كلمة المرور",
    subtitle: "اختر كلمة مرور جديدة قوية لحسابك.",
  },
  done: {
    title: "تم بنجاح",
    subtitle: "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.",
  },
};

function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ForgotPasswordStepHeader({
  step,
  method,
  contact,
}: {
  step: Step;
  method: RecoveryMethod | null;
  contact: string;
}) {
  const copy = STEP_COPY[step];
  let subtitle = copy.subtitle;

  if (step === "contact" && method === "email") {
    subtitle = "سنرسل رمز التحقق ورابط إعادة التعيين إلى بريدك الإلكتروني.";
  } else if (step === "contact" && method === "phone") {
    subtitle = "سنرسل رمز التحقق عبر رسالة SMS إلى رقم جوالك.";
  } else if (step === "verify" && method && contact) {
    const target =
      method === "email"
        ? maskEmail(contact)
        : formatPhoneDisplay(maskPhone(contact));
    subtitle = `أدخل الرمز المرسل إلى ${target}.`;
  }

  return (
    <div className="flex flex-col gap-3 text-center">
      <p className="text-2xl font-medium">{copy.title}</p>
      <p className="text-base text-[#454545]">{subtitle}</p>
    </div>
  );
}

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<RecoveryMethod | null>(null);
  const [contact, setContact] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const goBack = useCallback(() => {
    if (step === "contact") setStep("method");
    else if (step === "verify") setStep("contact");
    else if (step === "reset") setStep("verify");
  }, [step]);

  const selectMethod = (next: RecoveryMethod) => {
    setMethod(next);
    setContact("");
    setStep("contact");
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((s) => {
        if (s <= 1) {
          clearInterval(interval);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  let stepContent: ReactNode;

  if (step === "method") {
    stepContent = (
      <MethodStep
        onSelectEmail={() => selectMethod("email")}
        onSelectPhone={() => selectMethod("phone")}
      />
    );
  } else if (step === "contact" && method) {
    stepContent = (
      <ContactStep
        method={method}
        onBack={goBack}
        onSuccess={(value) => {
          setContact(value);
          startResendCooldown();
          toast.success(
            method === "email"
              ? "تم إرسال الرمز والرابط إلى بريدك الإلكتروني"
              : "تم إرسال رمز التحقق إلى جوالك",
          );
          setStep("verify");
        }}
      />
    );
  } else if (step === "verify" && method) {
    stepContent = (
      <VerifyStep
        method={method}
        contact={contact}
        resendCooldown={resendCooldown}
        onBack={goBack}
        onResend={() => {
          startResendCooldown();
          toast.success("تم إعادة إرسال الرمز");
        }}
        onSuccess={() => setStep("reset")}
      />
    );
  } else if (step === "reset") {
    stepContent = (
      <ResetStep
        onBack={goBack}
        onSuccess={() => {
          toast.success("تم تغيير كلمة المرور بنجاح");
          setStep("done");
        }}
      />
    );
  } else {
    stepContent = <DoneStep />;
  }

  return (
    <div className="flex flex-col gap-6">
      <ForgotPasswordStepHeader step={step} method={method} contact={contact} />
      {stepContent}
    </div>
  );
}

function MethodStep({
  onSelectEmail,
  onSelectPhone,
}: {
  onSelectEmail: () => void;
  onSelectPhone: () => void;
}) {
  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <button
        type="button"
        onClick={onSelectPhone}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary text-base font-medium text-black transition-colors hover:bg-[#E8F6F4]"
      >
        <Image src="/calling.svg" alt="" width={24} height={24} />
        <span>استلام الرمز عبر الجوال</span>
      </button>
      <button
        type="button"
        onClick={onSelectEmail}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary text-base font-medium text-black transition-colors hover:bg-[#E8F6F4]"
      >
        <Mail className="size-6" strokeWidth={1.75} aria-hidden />
        <span>استلام الرمز والرابط عبر البريد</span>
      </button>
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="text-sm text-[#454545]">تذكرت كلمة المرور؟</span>
        <Link href="/login" className="text-sm text-primary hover:underline">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
}

function ContactStep({
  method,
  onBack,
  onSuccess,
}: {
  method: RecoveryMethod;
  onBack: () => void;
  onSuccess: (contact: string) => void;
}) {
  const emailForm = useForm<ForgotPasswordEmailValues>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: { email: "" },
  });
  const phoneForm = useForm<ForgotPasswordPhoneValues>({
    resolver: zodResolver(forgotPasswordPhoneSchema),
    defaultValues: { phone: "" },
  });

  const isEmail = method === "email";
  const isSubmitting = isEmail
    ? emailForm.formState.isSubmitting
    : phoneForm.formState.isSubmitting;

  async function onSubmitEmail(values: ForgotPasswordEmailValues) {
    await delay();
    onSuccess(values.email);
  }

  async function onSubmitPhone(values: ForgotPasswordPhoneValues) {
    await delay();
    onSuccess(values.phone);
  }

  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <button
        type="button"
        onClick={onBack}
        className="self-start text-sm text-[#454545] hover:text-primary hover:underline"
      >
        رجوع
      </button>

      {isEmail ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={emailForm.handleSubmit(onSubmitEmail)}
          noValidate
        >
          <InputField
            label="البريد الإلكتروني"
            type="email"
            placeholder="ادخل البريد الإلكترونى"
            error={emailForm.formState.errors.email?.message}
            disabled={isSubmitting}
            dir="ltr"
            {...emailForm.register("email")}
          />
          <SubmitButton loading={isSubmitting}>إرسال الرمز والرابط</SubmitButton>
        </form>
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={phoneForm.handleSubmit(onSubmitPhone)}
          noValidate
        >
          <PhoneInput
            label="رقم الجوال"
            error={phoneForm.formState.errors.phone?.message}
            disabled={isSubmitting}
            {...phoneForm.register("phone")}
          />
          <SubmitButton loading={isSubmitting}>إرسال رمز التحقق</SubmitButton>
        </form>
      )}
    </div>
  );
}

function VerifyStep({
  method,
  contact,
  resendCooldown,
  onBack,
  onResend,
  onSuccess,
}: {
  method: RecoveryMethod;
  contact: string;
  resendCooldown: number;
  onBack: () => void;
  onResend: () => void;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordOtpValues>({
    resolver: zodResolver(forgotPasswordOtpSchema),
    defaultValues: { code: "" },
  });

  async function onSubmit() {
    await delay();
    onSuccess();
  }

  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <button
        type="button"
        onClick={onBack}
        className="self-start text-sm text-[#454545] hover:text-primary hover:underline"
      >
        رجوع
      </button>

      {method === "email" ? (
        <p className="rounded-xl bg-[#E8F6F4] px-4 py-3 text-center text-sm text-[#454545]">
          تحقق أيضاً من بريدك — قد يصلك{" "}
          <Link
            href={`/reset-password?token=mock&email=${encodeURIComponent(contact)}`}
            className="font-medium text-primary hover:underline"
          >
            رابط إعادة التعيين
          </Link>{" "}
          مباشرة.
        </p>
      ) : null}

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputField
          label="رمز التحقق"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          error={errors.code?.message}
          disabled={isSubmitting}
          dir="ltr"
          style={{ textAlign: "center", letterSpacing: "0.4em" }}
          {...register("code")}
        />
        <SubmitButton loading={isSubmitting}>تحقق من الرمز</SubmitButton>
      </form>

      <button
        type="button"
        disabled={resendCooldown > 0 || isSubmitting}
        onClick={onResend}
        className="text-sm text-primary hover:underline disabled:cursor-not-allowed disabled:text-[#9CA3AF] disabled:no-underline"
      >
        {resendCooldown > 0
          ? `إعادة الإرسال خلال ${resendCooldown} ث`
          : "إعادة إرسال الرمز"}
      </button>
    </div>
  );
}

function ResetStep({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit() {
    await delay();
    onSuccess();
  }

  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <button
        type="button"
        onClick={onBack}
        className="self-start text-sm text-[#454545] hover:text-primary hover:underline"
      >
        رجوع
      </button>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
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
        <SubmitButton loading={isSubmitting}>إعادة تعيين كلمة المرور</SubmitButton>
      </form>
    </div>
  );
}

function DoneStep() {
  return (
    <div className="flex flex-col items-center gap-6 text-center" dir="rtl">
      <p className="text-base leading-relaxed text-[#454545]">
        تم تحديث كلمة المرور بنجاح. يمكنك تسجيل الدخول الآن.
      </p>
      <Link
        href="/login"
        className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
      >
        تسجيل الدخول
      </Link>
    </div>
  );
}
