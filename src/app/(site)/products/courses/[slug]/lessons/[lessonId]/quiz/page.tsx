import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getCourseQuiz } from "@/src/features/products/api/getCourseQuiz";
import { getProductDetails } from "@/src/features/products/api/getProductDetails";
import CourseQuizContent from "@/src/features/products/components/quiz/CourseQuizContent";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string; lessonId: string }>;
  searchParams: Promise<{ review?: string }>;
};

export default async function CourseLessonQuizPage({
  params,
  searchParams,
}: PageProps) {
  const { slug, lessonId: lessonIdParam } = await params;
  const { review } = await searchParams;
  const lessonId = Number(lessonIdParam);

  if (!Number.isFinite(lessonId) || lessonId <= 0) {
    notFound();
  }

  const detailView = await getProductDetails("courses", slug);

  if (!detailView) {
    notFound();
  }

  const isReview = review === "1";
  const initialQuizLoad = isReview
    ? await getCourseQuiz(slug, lessonId)
    : null;

  return (
    <Suspense fallback={null}>
      <CourseQuizContent
        slug={slug}
        lessonId={lessonId}
        courseTitle={detailView.product.data.title}
        isReview={isReview}
        initialQuizLoad={initialQuizLoad}
      />
    </Suspense>
  );
}
