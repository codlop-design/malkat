import { apiClient } from "@/src/lib/apiClient";
import type { CourseLessonDescription } from "@/src/features/products/data/courseStages";
import type { CourseLessonDescriptionApiResponse } from "@/src/features/products/types/courseStagesApi";

export async function getCourseLessonDescriptionClient(
  slug: string,
  lessonId: number,
): Promise<CourseLessonDescription | null> {
  const { data, status } = await apiClient.get<CourseLessonDescriptionApiResponse>(
    `/courses/${slug}/lessons/${lessonId}/description`,
    { validateStatus: () => true },
  );

  if (status >= 400 || data?.success === false || !data?.data?.description) {
    return null;
  }

  return {
    id: data.data.id,
    title: data.data.title,
    description: data.data.description,
  };
}
