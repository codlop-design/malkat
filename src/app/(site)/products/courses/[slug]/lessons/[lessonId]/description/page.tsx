import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getProductDetails } from "@/src/features/products/api/getProductDetails";
import CourseLessonDescriptionContent from "@/src/features/products/components/detail/CourseLessonDescriptionContent";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string; lessonId: string }>;
};

export default async function CourseLessonDescriptionPage({ params }: PageProps) {
  const { slug, lessonId: lessonIdParam } = await params;
  const lessonId = Number(lessonIdParam);

  if (!Number.isFinite(lessonId) || lessonId <= 0) {
    notFound();
  }

  const detailView = await getProductDetails("courses", slug);

  if (!detailView) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <CourseLessonDescriptionContent
        slug={slug}
        lessonId={lessonId}
        courseTitle={detailView.product.data.title}
      />
    </Suspense>
  );
}
