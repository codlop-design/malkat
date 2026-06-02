import type { Metadata } from "next";

import PageHeader from "@/src/components/PageHeader";
import { getSettings } from "@/src/features/settings";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
};

export default async function PrivacyPolicyPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="سياسة الخصوصية"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "سياسة الخصوصية" },
        ]}
      />

      <section className="pb-16 pt-8">
        <div className="container" dir="rtl">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-lg font-bold text-black md:text-xl">
              سياسة الخصوصية
            </h2>

            <p className="whitespace-pre-line text-sm leading-relaxed text-[#454545] md:text-base">
              {settings?.privacy_policy?.trim() ||
                "سيتم إضافة سياسة الخصوصية قريباً."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
