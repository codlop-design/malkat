import { apiClient } from "@/src/lib/apiClient";
import {
  mapCourseStagesResponse,
} from "@/src/features/products/mapCourseStages";
import type { CourseStage } from "@/src/features/products/data/courseStages";
import type { CourseStagesApiResponse } from "@/src/features/products/types/courseStagesApi";

export async function getCourseStagesClient(
  slug: string,
): Promise<CourseStage[] | null> {
  const { data, status } = await apiClient.get<CourseStagesApiResponse>(
    `/courses/${slug}/stages`,
    { validateStatus: () => true },
  );

  console.log("[CourseStages] load response", {
    slug,
    status,
    raw: data,
  });

  if (status === 401 || status === 419) {
    return null;
  }

  if (status >= 400 || data?.success === false) {
    console.warn("[CourseStages] load failed", { slug, status, raw: data });
    return [];
  }

  const mapped = mapCourseStagesResponse(data ?? {});

  console.log("[CourseStages] load mapped", mapped);

  return mapped;
}
