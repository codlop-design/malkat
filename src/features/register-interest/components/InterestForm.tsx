"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  interestSchema,
  type InterestFormValues,
} from "@/src/features/register-interest/schemas/interestSchema";

const REGISTRANT_OPTIONS = [
  { value: "entity" as const, label: "جهة" },
  { value: "individual" as const, label: "فرد" },
];

const textareaClassName =
  "w-full min-h-[140px] resize-none rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm text-[#717171] outline-none transition-colors placeholder:text-[#717171] focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

const defaultValues: InterestFormValues = {
  registrantType: "entity",
  entityName: "",
  entityType: "",
  partnershipType: "",
  phone: "",
  email: "",
  message: "",
};

export default function InterestForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<InterestFormValues>({
    resolver: zodResolver(interestSchema),
    defaultValues,
  });

  const registrantType = watch("registrantType");
  const isEntity = registrantType === "entity";

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("تم إرسال طلبك بنجاح");
    reset(defaultValues);
  }

  return (
    <div className="rounded-2xl bg-white p-6 md:p-8" dir="rtl">
      <h2 className="text-xl font-bold text-black md:text-2xl">نموذج التواصل</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#454545] md:text-base">
        نسعد باستقبال استفساراتكم وملاحظاتكم، وسنقوم بالرد عليكم في أقرب وقت ممكن
      </p>

      <form
        className="mt-6 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-black">
            نوع المسجل
          </legend>
          <Controller
            name="registrantType"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-6">
                {REGISTRANT_OPTIONS.map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-[#454545]"
                  >
                    <input
                      type="radio"
                      value={value}
                      checked={field.value === value}
                      onChange={() => {
                        const { phone, email, message } = getValues();
                        if (value === "entity") {
                          reset({
                            registrantType: "entity",
                            entityName: "",
                            entityType: "",
                            partnershipType: "",
                            phone,
                            email,
                            message: message ?? "",
                          });
                        } else {
                          reset({
                            registrantType: "individual",
                            name: "",
                            phone,
                            email,
                            message: message ?? "",
                          });
                        }
                      }}
                      disabled={isSubmitting}
                      className="size-4 accent-primary"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.registrantType ? (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.registrantType.message}
            </p>
          ) : null}
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          {isEntity ? (
            <InputField
              label="اسم الجهة *"
              type="text"
              placeholder="ادخل الاسم"
              error={
                "entityName" in errors ? errors.entityName?.message : undefined
              }
              disabled={isSubmitting}
              {...register("entityName")}
            />
          ) : (
            <InputField
              label="الاسم *"
              type="text"
              placeholder="ادخل الاسم"
              error={"name" in errors ? errors.name?.message : undefined}
              disabled={isSubmitting}
              {...register("name")}
            />
          )}
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

        {isEntity ? (
          <div className="grid gap-5 sm:grid-cols-2">
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
                  error={
                    "entityType" in errors
                      ? errors.entityType?.message
                      : undefined
                  }
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
                  error={
                    "partnershipType" in errors
                      ? errors.partnershipType?.message
                      : undefined
                  }
                  disabled={isSubmitting}
                />
              )}
            />
          </div>
        ) : null}

        <div>
          <label
            htmlFor="interest-message"
            className="mb-2 block text-sm font-medium text-black"
          >
            محتوى الرسالة
          </label>
          <textarea
            id="interest-message"
            rows={5}
            placeholder="محتوى الرسالة"
            disabled={isSubmitting}
            className={textareaClassName}
            {...register("message")}
          />
          {errors.message ? (
            <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>
          ) : null}
        </div>

        <SubmitButton loading={isSubmitting} className="mt-2 w-full">
          إرسال الرسالة
        </SubmitButton>
      </form>
    </div>
  );
}
