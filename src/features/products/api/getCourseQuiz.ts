import "server-only";

import { CATALOG_REVALIDATE_SECONDS } from "@/src/features/products/api/catalogList.types";
import type { CourseQuizLoadResult } from "@/src/features/products/data/courseStages";
import { parseCourseQuizApiResponse } from "@/src/features/products/mapCourseStages";
import type { CourseQuizApiResponse } from "@/src/features/products/types/courseStagesApi";
import { getServerApiFetchOptions } from "@/src/lib/serverApiHeaders";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCourseQuiz(
  slug: string,
  lessonId: number,
): Promise<CourseQuizLoadResult | null> {
  try {
    const fetchOptions = await getServerApiFetchOptions(
      CATALOG_REVALIDATE_SECONDS,
    );

    const response = await fetch(
      `${API_URL}/courses/${slug}/lessons/${lessonId}/quiz`,
      fetchOptions,
    );

    if (response.status === 401 || response.status === 419) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as CourseQuizApiResponse;

    if (json.success === false && !json.data) {
      return null;
    }

    return parseCourseQuizApiResponse(json);
  } catch {
    return null;
  }
}
