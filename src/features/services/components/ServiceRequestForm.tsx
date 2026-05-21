"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputField } from "@/src/components/InputField";
import PhoneInput from "@/src/components/PhoneInput";
import { SelectField } from "@/src/components/SelectField";
import { SubmitButton } from "@/src/components/SubmitButton";
import {
  SERVICE_TYPE_OPTIONS,
  TARGET_GROUP_OPTIONS,
} from "@/src/features/services/data/serviceRequestOptions";
import {
  serviceRequestSchema,
  type ServiceRequestFormValues,
} from "@/src/features/services/schemas/serviceRequestSchema";

const textareaClassName =
  "w-full min-h-[140px] resize-none rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm text-[#717171] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

const defaultValues: ServiceRequestFormValues = {
  name: "",
  phone: "",
  email: "",
  serviceType: "",
  targetGroup: "",
  details: "",
};

export default function ServiceRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues,
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("تم إرسال طلبك بنجاح");
    reset(defaultValues);
  }

  return (
    <div
      className="mx-auto max-w-4xl rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-10"
      dir="rtl"
    >
      <h3 className="text-xl font-bold text-black md:text-2xl">أرسل طلبك الآن</h3>
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
            label="الاسم *"
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
          placeholder="example@email.com"
          error={errors.email?.message}
          disabled={isSubmitting}
          dir="ltr"
          {...register("email")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="نوع الخدمة *"
            placeholder="اختر نوع الخدمة"
            options={SERVICE_TYPE_OPTIONS}
            error={errors.serviceType?.message}
            disabled={isSubmitting}
            {...register("serviceType")}
          />
          <SelectField
            label="الفئة المستهدفة *"
            placeholder="اختر الفئة"
            options={TARGET_GROUP_OPTIONS}
            error={errors.targetGroup?.message}
            disabled={isSubmitting}
            {...register("targetGroup")}
          />
        </div>

        <div>
          <label
            htmlFor="request-details"
            className="mb-2 block text-sm font-medium text-black"
          >
            تفاصيل الطلب *
          </label>
          <textarea
            id="request-details"
            placeholder="اكتب تفاصيل طلبك هنا..."
            disabled={isSubmitting}
            className={textareaClassName}
            aria-invalid={errors.details ? true : undefined}
            {...register("details")}
          />
          {errors.details ? (
            <p className="mt-1.5 text-sm text-red-600">{errors.details.message}</p>
          ) : null}
        </div>

        <SubmitButton loading={isSubmitting} className="mt-2 w-full rounded-xl!">
          <span className="flex items-center justify-center gap-2">
            <Send className="size-5" strokeWidth={2} aria-hidden />
            إرسال الطلب
          </span>
        </SubmitButton>
      </form>
    </div>
  );
}
