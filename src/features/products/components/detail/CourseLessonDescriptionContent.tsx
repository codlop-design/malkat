"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import PageHeader from "@/src/components/PageHeader";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { getCourseLessonDescriptionClient } from "@/src/features/products/api/getCourseLessonDescriptionClient";
import CourseLessonTextContent from "@/src/features/products/components/detail/CourseLessonTextContent";
import type { CourseLessonDescription } from "@/src/features/products/data/courseStages";
import { CATEGORY_META } from "@/src/features/products/data/categoryMeta";
import { productDetailHref } from "@/src/features/products/types";

type CourseLessonDescriptionContentProps = {
  slug: string;
  lessonId: number;
  courseTitle: string;
};

export default function CourseLessonDescriptionContent({
  slug,
  lessonId,
  courseTitle,
}: CourseLessonDescriptionContentProps) {
  const searchParams = useSearchParams();
  const stageTitle = searchParams.get("stage") ?? "المرحلة الأولى";
  const subtitle = searchParams.get("subtitle") ?? undefined;
  const returnTo =
    searchParams.get("returnTo") ?? productDetailHref("courses", slug);

  const { isAuthenticated, isAuthReady } = useAuth();
  const cacheKey = `${slug}:${lessonId}`;
  const [loadState, setLoadState] = useState<{
    key: string;
    lesson: CourseLessonDescription | null;
  }>({ key: "", lesson: null });

  const hasLoaded = loadState.key === cacheKey;
  const lesson = hasLoaded ? loadState.lesson : null;
  const isLoading = isAuthReady && isAuthenticated && !hasLoaded;

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;
    if (loadState.key === cacheKey) return;

    let cancelled = false;

    async function loadDescription() {
      const nextLesson = await getCourseLessonDescriptionClient(slug, lessonId);

      if (cancelled) return;

      setLoadState({ key: cacheKey, lesson: nextLesson });
    }

    void loadDescription();

    return () => {
      cancelled = true;
    };
  }, [cacheKey, isAuthenticated, isAuthReady, lessonId, loadState.key, slug]);

  const breadcrumbs = useMemo(
    () => [
      { label: "الرئيسية", href: "/" },
      { label: "المنتجات", href: "/bundle-products" },
      { label: courseTitle, href: returnTo },
      { label: stageTitle },
    ],
    [courseTitle, returnTo, stageTitle],
  );

  return (
    <>
      <PageHeader
        title={CATEGORY_META.courses.label}
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-[#FAFAFA] pb-16 pt-8 md:pt-10">
        <div className="container" dir="rtl">
          <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-8">
            {!isAuthReady || isLoading ? (
              <p className="text-sm text-[#717171]">جاري تحميل المحتوى...</p>
            ) : !isAuthenticated ? (
              <div>
                <p className="text-sm text-[#454545]">
                  يجب تسجيل الدخول للوصول إلى محتوى الدرس.
                </p>
                <Button asChild className="mt-4 h-11 px-6">
                  <Link href="/login">تسجيل الدخول</Link>
                </Button>
              </div>
            ) : !lesson ? (
              <div>
                <p className="text-sm text-[#454545]">
                  تعذر تحميل محتوى هذا الدرس.
                </p>
                <Button asChild variant="outline" className="mt-4 h-11 px-6">
                  <Link href={returnTo}>العودة إلى البرنامج</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-end">
                  <Button asChild variant="outline" className="h-10 px-4">
                    <Link href={returnTo}>العودة إلى البرنامج</Link>
                  </Button>
                </div>
                <CourseLessonTextContent
                  title={lesson.title}
                  subtitle={subtitle}
                  content={lesson.description}
                  className="mt-0 border-0 p-0"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
