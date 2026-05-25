"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsLeft, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputField } from "@/src/components/InputField";
import PhoneInput from "@/src/components/PhoneInput";
import { SelectField } from "@/src/components/SelectField";
import { submitContactAction } from "@/src/features/home/api/contactAction";
import {
  contactSchema,
  type ContactFormValues,
} from "@/src/features/home/schemas/contactSchema";
import type { ContactType } from "@/src/features/home/types/contact";

const defaultValues: ContactFormValues = {
  full_name: "",
  email: "",
  phone: "",
  contact_type: "",
  message: "",
};

const textareaClassName =
  "w-full resize-none rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

type ContactFormProps = {
  contactTypes: ContactType[];
};

export default function ContactForm({ contactTypes }: ContactFormProps) {
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
    const result = await submitContactAction(values);

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl bg-white p-6 shadow-[0_4px_32px_rgba(0,0,0,0.06)] md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="الاسم الكامل *"
          placeholder="اسمك الكريم"
          disabled={isSubmitting}
          error={errors.full_name?.message}
          {...register("full_name")}
        />

        <InputField
          label="البريد الإلكتروني *"
          type="email"
          placeholder="example@email.com"
          dir="ltr"
          disabled={isSubmitting}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="mt-5">
        <PhoneInput
          label="رقم الجوال *"
          disabled={isSubmitting}
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className="mt-5">
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
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium text-black"
        >
          رسالتك <span className="text-red-500">*</span>
        </label>
        
        <textarea
          id="contact-message"
          rows={6}
          placeholder="أخبرنا عن طفلك، مؤسستك، أو أي استفسار تريد..."
          disabled={isSubmitting}
          className={textareaClassName}
          aria-invalid={errors.message ? true : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p className="mt-1.5 text-sm text-red-600">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-3.5 text-base font-medium text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
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
    </form>
  );
}
