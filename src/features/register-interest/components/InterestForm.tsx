"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import PhoneInput from "@/src/components/PhoneInput";
import { InputField } from "@/src/components/InputField";
import { SelectField } from "@/src/components/SelectField";
import { SubmitButton } from "@/src/components/SubmitButton";
import { submitUserInterestAction } from "@/src/features/register-interest/api/submitUserInterestAction";
import { mapLookupOptions } from "@/src/features/register-interest/lib/mapLookupOptions";
import {
  interestSchema,
  type InterestFormValues,
} from "@/src/features/register-interest/schemas/interestSchema";
import type { RegisterInterestFormOptions } from "@/src/features/register-interest/types";

const textareaClassName =
  "w-full min-h-[140px] resize-none rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm text-[#717171] outline-none transition-colors placeholder:text-[#717171] focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

function buildDefaultValues(
  applicantType: InterestFormValues["interested_applicant_types"],
): InterestFormValues {
  const shared = { name: "", phone: "", email: "", message: "" };

  if (applicantType === "organization") {
    return {
      interested_applicant_types: "organization",
      orgnization_type_id: "",
      parternes_type_id: "",
      ...shared,
    };
  }

  return {
    interested_applicant_types: "individual",
    ...shared,
  };
}

type InterestFormProps = RegisterInterestFormOptions;

export default function InterestForm({
  applicantTypes,
  organizationTypes,
  partnershipTypes,
}: InterestFormProps) {
  const defaultApplicantType =
    applicantTypes.find((t) => t.key === "organization")?.key ??
    applicantTypes[0]?.key ??
    "organization";

  const defaultValues = buildDefaultValues(
    defaultApplicantType as InterestFormValues["interested_applicant_types"],
  );

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

  const interestedApplicantType = watch("interested_applicant_types");
  const isOrganization = interestedApplicantType === "organization";

  const organizationTypeOptions = mapLookupOptions(organizationTypes);
  const partnershipTypeOptions = mapLookupOptions(partnershipTypes);

  async function onSubmit(values: InterestFormValues) {
    const result = await submitUserInterestAction(values);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    reset(buildDefaultValues(values.interested_applicant_types));
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
            name="interested_applicant_types"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-6">
                {applicantTypes.map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-[#454545]"
                  >
                    <input
                      type="radio"
                      value={key}
                      checked={field.value === key}
                      onChange={() => {
                        const { phone, email, message } = getValues();
                        reset({
                          ...buildDefaultValues(
                            key as InterestFormValues["interested_applicant_types"],
                          ),
                          phone,
                          email,
                          message: message ?? "",
                        });
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
          {errors.interested_applicant_types ? (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.interested_applicant_types.message}
            </p>
          ) : null}
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label={isOrganization ? "اسم الجهة *" : "الاسم *"}
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

        {isOrganization ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="orgnization_type_id"
              control={control}
              render={({ field }) => (
                <SelectField
                  label="نوع الجهة *"
                  placeholder="اختر نوع الجهة"
                  options={organizationTypeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={
                    "orgnization_type_id" in errors
                      ? errors.orgnization_type_id?.message
                      : undefined
                  }
                  disabled={isSubmitting || organizationTypeOptions.length === 0}
                />
              )}
            />
            <Controller
              name="parternes_type_id"
              control={control}
              render={({ field }) => (
                <SelectField
                  label="نوع الشراكة *"
                  placeholder="اختر نوع الشراكة"
                  options={partnershipTypeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={
                    "parternes_type_id" in errors
                      ? errors.parternes_type_id?.message
                      : undefined
                  }
                  disabled={isSubmitting || partnershipTypeOptions.length === 0}
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
            محتوى الرسالة *
          </label>
          <textarea
            id="interest-message"
            rows={5}
            placeholder="محتوى الرسالة"
            disabled={isSubmitting}
            className={textareaClassName}
            aria-invalid={errors.message ? true : undefined}
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
