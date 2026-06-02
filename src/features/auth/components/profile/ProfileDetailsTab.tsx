"use client";

import { toast } from "sonner";

import { InputField } from "@/src/components/InputField";
import PhoneInput from "@/src/components/PhoneInput";
import type { AuthUser } from "@/src/features/auth/types";

type ProfileDetailsTabProps = {
  user: AuthUser;
};

export default function ProfileDetailsTab({ user }: ProfileDetailsTabProps) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-black md:text-xl">
          المعلومات الشخصية
        </h1>
        <p className="text-sm text-[#6B7280]">الرئيسية / الملف الشخصي</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("تم حفظ البيانات");
        }}
        className="space-y-5"
        noValidate
      >
        <div className="grid gap-5 md:grid-cols-2">
          <InputField label="الاسم الكامل" defaultValue={user.name} disabled />
          <PhoneInput label="رقم الجوال" defaultValue={user.phone} disabled />
        </div>

        <InputField
          label="البريد الإلكتروني"
          type="email"
          defaultValue={user.email}
          disabled
        />

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-primary text-base font-bold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          حفظ البيانات
        </button>
      </form>
    </>
  );
}

