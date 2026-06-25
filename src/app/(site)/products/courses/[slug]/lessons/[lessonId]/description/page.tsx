import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { getCourseLessonDescription } from "@/src/features/products/api/getCourseLessonDescription";
import { getProductDetails } from "@/src/features/products/api/getProductDetails";
import CourseLessonDescriptionContent from "@/src/features/products/components/detail/CourseLessonDescriptionContent";
import { productDetailHref } from "@/src/features/products/types";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string; lessonId: string }>;
  searchParams: Promise<{ returnTo?: string; stage?: string }>;
};

export default async function CourseLessonDescriptionPage({
  params,
  searchParams,
}: PageProps) {
  const { slug, lessonId: lessonIdParam } = await params;
  const { returnTo: returnToParam, stage } = await searchParams;
  const lessonId = Number(lessonIdParam);

  if (!Number.isFinite(lessonId) || lessonId <= 0) {
    notFound();
  }

  const detailView = await getProductDetails("courses", slug);

  if (!detailView) {
    notFound();
  }

  const returnTo = returnToParam ?? productDetailHref("courses", slug);
  const stageTitle = stage ?? "المرحلة";
  const description = await getCourseLessonDescription(slug, lessonId);

  if (!description) {
    return (
      <div className="container py-16" dir="rtl">
        <div className="rounded-2xl border border-[#E8E8E8] bg-white p-8 text-center">
          <p className="text-sm text-[#454545]">
            يجب تسجيل الدخول لعرض محتوى هذا الدرس، أو المحتوى غير متاح حالياً.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="h-11 px-6">
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href={returnTo}>العودة إلى البرنامج</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CourseLessonDescriptionContent
      courseTitle={detailView.product.data.title}
      description={description}
      returnTo={returnTo}
      stageTitle={stageTitle}
    />
  );
}
