"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import PhoneInput from "@/src/components/ui/PhoneInput";
import { InputField } from "@/src/components/ui/InputField";
import { SubmitButton } from "@/src/components/ui/SubmitButton";
import {
  contactSchema,
  type ContactFormValues,
} from "@/src/features/contact/schemas/contactSchema";

const PURPOSE_OPTIONS = [
  { value: "inquiry" as const, label: "استفسار" },
  { value: "suggestion" as const, label: "اقتراح" },
];

const textareaClassName =
  "w-full min-h-[140px] resize-none rounded-xl border border-[#E5E5E5] p-3 text-sm text-[#717171] outline-none transition-colors placeholder:text-[#717171] focus:border-(--primary) disabled:cursor-not-allowed disabled:opacity-60";

export default function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      purpose: "inquiry",
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("تم إرسال رسالتك بنجاح");
    reset();
  }

  return (
    <div
      className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-8"
      dir="rtl"
    >
      <h2 className="text-xl font-bold text-black md:text-2xl">نموذج التواصل</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#454545] md:text-base">
        أرسل لنا رسالتك وسنعاود التواصل معك في أقرب وقت.
      </p>

      <form
        className="mt-6 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-black">
            غرض الرسالة
          </legend>
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-6">
                {PURPOSE_OPTIONS.map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-[#454545]"
                  >
                    <input
                      type="radio"
                      value={value}
                      checked={field.value === value}
                      onChange={() => field.onChange(value)}
                      disabled={isSubmitting}
                      className="size-4 accent-(--primary)"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.purpose ? (
            <p className="mt-1.5 text-sm text-red-600">{errors.purpose.message}</p>
          ) : null}
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="الاسم *"
            type="text"
            placeholder="ادخل الاسم"
            error={errors.name?.message}
            disabled={isSubmitting}
            {...register("name")}
          />
          <PhoneInput
            label="رقم الجوال *"
            placeholder="ادخل رقم الجوال"
            error={errors.phone?.message}
            disabled={isSubmitting}
            {...register("phone")}
          />
        </div>

        <InputField
          label="البريد الإلكتروني *"
          type="email"
          placeholder="ادخل بريدك الإلكتروني"
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register("email")}
        />

        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-sm font-medium text-black"
          >
            محتوى الرسالة *
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="اكتب رسالتك هنا..."
            disabled={isSubmitting}
            className={textareaClassName}
            aria-invalid={errors.message ? true : undefined}
            {...register("message")}
          />
          {errors.message ? (
            <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>
          ) : null}
        </div>

        <div className="flex justify-end pt-1">
          <SubmitButton loading={isSubmitting}>إرسال الرسالة</SubmitButton>
        </div>
      </form>
    </div>
  );
}
