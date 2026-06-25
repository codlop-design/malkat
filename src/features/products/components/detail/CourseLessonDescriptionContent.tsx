"use client";

import Link from "next/link";

import PageHeader from "@/src/components/PageHeader";
import { Button } from "@/src/components/ui/button";
import CourseLessonTextContent from "@/src/features/products/components/detail/CourseLessonTextContent";
import type { CourseLessonDescription } from "@/src/features/products/data/courseStages";
import { CATEGORY_META } from "@/src/features/products/data/categoryMeta";
import {
  categoryListingHref,
  productDetailHref,
} from "@/src/features/products/types";

type CourseLessonDescriptionContentProps = {
  courseTitle: string;
  description: CourseLessonDescription;
  returnTo: string;
  stageTitle: string;
};

export default function CourseLessonDescriptionContent({
  courseTitle,
  description,
  returnTo,
  stageTitle,
}: CourseLessonDescriptionContentProps) {
  const breadcrumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/products" },
    {
      label: CATEGORY_META.courses.label,
      href: categoryListingHref("courses"),
    },
    { label: courseTitle, href: returnTo },
    { label: stageTitle },
    { label: description.title },
  ];

  return (
    <>
      <PageHeader
        title={CATEGORY_META.courses.label}
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-[#FAFAFA] pb-16 pt-8 md:pt-10">
        <div className="container" dir="rtl">
          <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-8">
            <CourseLessonTextContent
              title={description.title}
              content={description.description}
            />

            <div className="mt-8 flex justify-end">
              <Button asChild variant="outline" className="h-11 min-w-40 px-8">
                <Link href={returnTo}>العودة إلى البرنامج</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
