import { apiClient } from "@/src/lib/apiClient";
import {
  mapCourseStagesResponse,
} from "@/src/features/products/mapCourseStages";
import type { CourseStage } from "@/src/features/products/data/courseStages";
import type { CourseStagesApiResponse } from "@/src/features/products/types/courseStagesApi";

export async function getCourseStagesClient(
  slug: string,
): Promise<CourseStage[] | null> {
  const endpoint = `/courses/${slug}/stages`;
  const { data, status } = await apiClient.get<CourseStagesApiResponse>(
    endpoint,
    { validateStatus: () => true },
  );

  console.log("[CourseStages][client] raw result", {
    slug,
    endpoint,
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

  console.log("[CourseStages][client] mapped result", {
    slug,
    endpoint,
    mapped,
  });

  return mapped;
}
