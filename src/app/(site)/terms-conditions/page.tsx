import type { Metadata } from "next";

import PageHeader from "@/src/components/PageHeader";
import { getSettings } from "@/src/features/settings";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
};

export default async function TermsConditionsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="الشروط والأحكام"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الشروط والأحكام" },
        ]}
      />

      <section className="pb-16 pt-8">
        <div className="container" dir="rtl">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-lg font-bold text-black md:text-xl">
              الشروط والأحكام
            </h2>

            <p
              className="whitespace-pre-line text-sm leading-relaxed text-[#454545] md:text-base"
              dangerouslySetInnerHTML={{
                __html:
                  settings?.terms_and_conditions?.trim() ||
                  "سيتم إضافة الشروط والأحكام قريباً.",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
