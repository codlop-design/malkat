"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import PhoneInput from "@/src/components/PhoneInput";
import { InputField } from "@/src/components/InputField";
import { SelectField } from "@/src/components/SelectField";
import { SubmitButton } from "@/src/components/SubmitButton";
import {
  ENTITY_TYPE_OPTIONS,
  PARTNERSHIP_TYPE_OPTIONS,
} from "@/src/features/register-interest/data/options";
import {
  partnershipSchema,
  type PartnershipFormValues,
} from "@/src/features/partnership-request/schemas/partnershipSchema";

const textareaClassName =
  "w-full min-h-[120px] resize-none rounded-xl border border-[#E5E5E5] bg-[#FAF8F5] p-3 text-sm text-[#717171] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

const defaultValues: PartnershipFormValues = {
  entityName: "",
  contactName: "",
  jobTitle: "",
  phone: "",
  email: "",
  confirmEmail: "",
  entityType: "",
  partnershipType: "",
  aboutEntity: "",
  partnershipDetails: "",
};

export default function PartnershipForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipSchema),
    defaultValues,
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("تم إرسال طلب الشراكة بنجاح");
    reset(defaultValues);
  }

  return (
    <div
      className="mx-auto max-w-4xl rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-10"
      dir="rtl"
    >
      <h2 className="text-xl font-bold text-black md:text-2xl">
        ابدأ طلب شراكتك الآن
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#717171] md:text-base">
        سيقوم فريقنا بمراجعة طلبك والرد عليك خلال 24 ساعة عمل.
      </p>

      <form
        className="mt-8 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="اسم الجهة *"
            placeholder="ادخل اسم الجهة"
            error={errors.entityName?.message}
            disabled={isSubmitting}
            {...register("entityName")}
          />
          <InputField
            label="اسم المسؤول *"
            placeholder="ادخل الاسم"
            error={errors.contactName?.message}
            disabled={isSubmitting}
            {...register("contactName")}
          />
          <InputField
            label="المسمى الوظيفي *"
            placeholder="ادخل المسمى الوظيفي"
            error={errors.jobTitle?.message}
            disabled={isSubmitting}
            {...register("jobTitle")}
          />
          <InputField
            label="البريد الإلكتروني *"
            type="email"
            placeholder="example@email.com"
            error={errors.email?.message}
            disabled={isSubmitting}
            dir="ltr"
            {...register("email")}
          />
          <PhoneInput
            label="رقم الجوال *"
            placeholder="ادخل رقم الجوال"
            error={errors.phone?.message}
            disabled={isSubmitting}
            {...register("phone")}
          />
          <InputField
            label="تأكيد البريد الإلكتروني *"
            type="email"
            placeholder="example@email.com"
            error={errors.confirmEmail?.message}
            disabled={isSubmitting}
            dir="ltr"
            {...register("confirmEmail")}
          />
          <Controller
            name="entityType"
            control={control}
            render={({ field }) => (
              <SelectField
                label="نوع الجهة *"
                placeholder="اختر نوع الجهة"
                options={[...ENTITY_TYPE_OPTIONS]}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.entityType?.message}
                disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name="partnershipType"
            control={control}
            render={({ field }) => (
              <SelectField
                label="نوع الشراكة *"
                placeholder="اختر نوع الشراكة"
                options={[...PARTNERSHIP_TYPE_OPTIONS]}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.partnershipType?.message}
                disabled={isSubmitting}
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="about-entity"
            className="mb-2 block text-sm font-medium text-black"
          >
            نبذة عن الجهة *
          </label>
          <textarea
            id="about-entity"
            rows={4}
            placeholder="عرّفنا بمؤسستكم وأهدافكم التعليمية..."
            disabled={isSubmitting}
            className={textareaClassName}
            aria-invalid={errors.aboutEntity ? true : undefined}
            {...register("aboutEntity")}
          />
          {errors.aboutEntity ? (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.aboutEntity.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="partnership-details"
            className="mb-2 block text-sm font-medium text-black"
          >
            تفاصيل الشراكة *
          </label>
          <textarea
            id="partnership-details"
            rows={4}
            placeholder="صفوا نوع التعاون المطلوب والأهداف المتوقعة..."
            disabled={isSubmitting}
            className={textareaClassName}
            aria-invalid={errors.partnershipDetails ? true : undefined}
            {...register("partnershipDetails")}
          />
          {errors.partnershipDetails ? (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.partnershipDetails.message}
            </p>
          ) : null}
        </div>

        <SubmitButton
          loading={isSubmitting}
          className="mt-2 w-full gap-2 rounded-xl! flex"
        >
          <div className="flex items-center justify-center gap-2">
            <Send className="size-5" strokeWidth={2} aria-hidden />
            إرسال طلب الشراكة
          </div>
        </SubmitButton>
      </form>
    </div>
  );
}
