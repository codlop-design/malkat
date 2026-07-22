import "server-only";

import { mapCourseBundle } from "@/src/features/products/mapCourseBundles";
import type {
  CourseBundleApiItem,
  CourseBundleListResult,
} from "@/src/features/products/types/courseBundle";
import type { CatalogPagination } from "@/src/features/products/types/catalogApi";
import { apiServer } from "@/src/lib/apiServer";

type CourseBundlesApiResponse = {
  success?: boolean;
  message?: string;
  data?: CourseBundleApiItem[];
  pagination?: CatalogPagination;
};

export async function getCourseBundles(
  page = 1,
): Promise<CourseBundleListResult | null> {
  try {
    const { data, status } = await apiServer.get<CourseBundlesApiResponse>(
      "/bundle-courses",
      {
        params: { page, per_page: 8 },
        validateStatus: () => true,
      },
    );

    if (status >= 400 || !data?.success || !Array.isArray(data.data)) {
      return null;
    }

    return {
      items: data.data.map(mapCourseBundle),
      pagination: data.pagination ?? {
        current_page: page,
        last_page: 1,
        per_page: data.data.length,
        total: data.data.length,
        from: data.data.length > 0 ? 1 : 0,
        to: data.data.length,
      },
    };
  } catch (error) {
    console.error("Fetch bundle courses exception:", error);
    return null;
  }
}
