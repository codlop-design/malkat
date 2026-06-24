"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsLeft, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputField } from "@/src/components/InputField";
import PhoneInput from "@/src/components/PhoneInput";
import { SelectField } from "@/src/components/SelectField";
import { SubmitButton } from "@/src/components/SubmitButton";
import { submitContactAction } from "@/src/features/contact/api/submitContactAction";
import { submitFormWithNetworkCheck } from "@/src/lib/submitFormWithNetworkCheck";
import {
  contactSchema,
  type ContactFormValues,
} from "@/src/features/contact/schemas/contactSchema";
import type { ContactType } from "@/src/features/contact/types";
import { mapLookupOptions } from "@/src/features/register-interest/lib/mapLookupOptions";
import type { LookupOption } from "@/src/features/register-interest/types";

const defaultValues: ContactFormValues = {
  full_name: "",
  email: "",
  phone: "",
  contact_type: "",
  organization_type_id: "",
  message: "",
};

const textareaClassName =
  "w-full resize-none rounded-xl border border-[#E5E5E5] p-3 text-sm outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

type ContactFormProps = {
  contactTypes: ContactType[];
  organizationTypes: LookupOption[];
  variant?: "home" | "page";
};

export default function ContactForm({
  contactTypes,
  organizationTypes,
  variant = "home",
}: ContactFormProps) {
  const isPage = variant === "page";
  const messageId = isPage ? "contact-page-message" : "contact-home-message";

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  async function onSubmit(values: ContactFormValues) {
    const result = await submitFormWithNetworkCheck(() =>
      submitContactAction(values),
    );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    reset(defaultValues);
  }

  const typeOptions = contactTypes.map((type) => ({
    value: type.key,
    label: type.label,
  }));

  const organizationTypeOptions = mapLookupOptions(organizationTypes);

  const fields = (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label={isPage ? "الاسم *" : "الاسم الكامل *"}
          type="text"
          placeholder={isPage ? "ادخل الاسم" : "اسمك الكريم"}
          disabled={isSubmitting}
          error={errors.full_name?.message}
          {...register("full_name")}
        />

        {isPage ? (
          <PhoneInput
            label="رقم الجوال *"
            placeholder="ادخل رقم الجوال"
            disabled={isSubmitting}
            error={errors.phone?.message}
            {...register("phone")}
          />
        ) : (
          <InputField
            label="البريد الإلكتروني *"
            type="email"
            placeholder="example@email.com"
            dir="ltr"
            disabled={isSubmitting}
            error={errors.email?.message}
            {...register("email")}
          />
        )}
      </div>

      {isPage ? (
        <InputField
          label="البريد الإلكتروني *"
          type="email"
          placeholder="ادخل بريدك الإلكتروني"
          disabled={isSubmitting}
          error={errors.email?.message}
          {...register("email")}
        />
      ) : (
        <PhoneInput
          label="رقم الجوال *"
          disabled={isSubmitting}
          error={errors.phone?.message}
          {...register("phone")}
        />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Controller
          name="contact_type"
          control={control}
          render={({ field }) => (
            <SelectField
              label="نوع التواصل *"
              placeholder="اختر نوع التواصل"
              options={typeOptions}
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting || typeOptions.length === 0}
              error={errors.contact_type?.message}
            />
          )}
        />

        <Controller
          name="organization_type_id"
          control={control}
          render={({ field }) => (
            <SelectField
              label="نوع الجهة *"
              placeholder="اختر نوع الجهة"
              options={organizationTypeOptions}
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting || organizationTypeOptions.length === 0}
              error={errors.organization_type_id?.message}
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor={messageId}
          className="mb-2 block text-sm font-medium text-black"
        >
          {isPage ? (
            "محتوى الرسالة *"
          ) : (
            <>
              رسالتك <span className="text-red-500">*</span>
            </>
          )}
        </label>
        <textarea
          id={messageId}
          rows={isPage ? 5 : 6}
          placeholder={
            isPage
              ? "اكتب رسالتك هنا..."
              : "أخبرنا عن طفلك، مؤسستك، أو أي استفسار تريد..."
          }
          disabled={isSubmitting}
          className={`${textareaClassName} ${
            isPage
              ? "min-h-[140px] text-[#717171] placeholder:text-[#717171]"
              : "bg-white text-black placeholder:text-[#9CA3AF]"
          } ${errors.message ? " border-red-600" : ""}`}
          aria-invalid={errors.message ? true : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p className="mt-1.5 text-sm text-red-600">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {isPage ? (
        <div className="flex justify-start">
          <SubmitButton
            loading={isSubmitting}
            className="h-[50px] w-[200px] rounded-full!"
          >
            إرسال الرسالة
          </SubmitButton>
        </div>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-3.5 text-base font-medium text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>{isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-white/20">
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <ChevronsLeft className="size-4" strokeWidth={2.5} aria-hidden />
            )}
          </span>
        </button>
      )}
    </>
  );

  if (isPage) {
    return (
      <div
        className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-8"
        dir="rtl"
      >
        <h2 className="text-xl font-bold text-black md:text-2xl">
          نموذج التواصل
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#454545] md:text-base">
          أرسل لنا رسالتك وسنعاود التواصل معك في أقرب وقت.
        </p>
        <form
          className="mt-6 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {fields}
        </form>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-[0_4px_32px_rgba(0,0,0,0.06)] md:p-8"
    >
      {fields}
    </form>
  );
}
