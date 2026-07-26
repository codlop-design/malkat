import "server-only";

import { CATALOG_REVALIDATE_SECONDS } from "@/src/features/products/api/catalogList.types";
import { getServerApiFetchOptions } from "@/src/lib/serverApiHeaders";
import {
  mapCourseStagesResponse,
} from "@/src/features/products/mapCourseStages";
import type { CourseStage } from "@/src/features/products/data/courseStages";
import type { CourseStagesApiResponse } from "@/src/features/products/types/courseStagesApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCourseStages(
  slug: string,
): Promise<CourseStage[] | null> {
  try {
    const fetchOptions = await getServerApiFetchOptions(CATALOG_REVALIDATE_SECONDS);
    const endpoint = `${API_URL}/courses/${slug}/stages`;

    const response = await fetch(endpoint, fetchOptions);

    console.log("[CourseStages][server] response status", {
      slug,
      endpoint,
      status: response.status,
    });

    if (response.status === 401 || response.status === 419) {
      return null;
    }

    if (!response.ok) {
      return [];
    }

    const json = (await response.json()) as CourseStagesApiResponse;

    console.log("[CourseStages][server] raw result", {
      slug,
      endpoint,
      raw: json,
    });

    if (json.success === false) {
      return [];
    }

    return mapCourseStagesResponse(json);
  } catch {
    return [];
  }
}
