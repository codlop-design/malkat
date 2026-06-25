import "server-only";

import { CATALOG_REVALIDATE_SECONDS } from "@/src/features/products/api/catalogList.types";
import type { CourseLessonDescription } from "@/src/features/products/data/courseStages";
import { mapCourseLessonDescriptionResponse } from "@/src/features/products/mapCourseStages";
import type { CourseLessonDescriptionApiResponse } from "@/src/features/products/types/courseStagesApi";
import { getServerApiFetchOptions } from "@/src/lib/serverApiHeaders";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCourseLessonDescription(
  slug: string,
  lessonId: number,
): Promise<CourseLessonDescription | null> {
  try {
    const fetchOptions = await getServerApiFetchOptions(
      CATALOG_REVALIDATE_SECONDS,
    );

    const response = await fetch(
      `${API_URL}/courses/${slug}/lessons/${lessonId}/description`,
      fetchOptions,
    );

    if (response.status === 401 || response.status === 419) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as CourseLessonDescriptionApiResponse;

    if (json.success === false || !json.data) {
      return null;
    }

    return mapCourseLessonDescriptionResponse(json.data);
  } catch {
    return null;
  }
}
